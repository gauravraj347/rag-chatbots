import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import { LLMProvider } from '../llm/llm.interface';
import {
  ChatMessage,
  LLMRequest,
  LLMResponse,
} from '../llm/llm.types';

@Injectable()
export class GeminiProvider implements LLMProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    this.model =
      this.configService.get<string>('GEMINI_MODEL') ??
      'gemini-2.5-flash';

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async generate(request: LLMRequest): Promise<LLMResponse> {
    const startedAt = Date.now();

    const contents = this.buildContents(request);

    const response = await this.client.models.generateContent({
      model: this.model,
      contents,
    });

    return {
      text: response.text ?? '',
      model: this.model,
      latency: Date.now() - startedAt,
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens: response.usageMetadata?.totalTokenCount ?? 0,
      },
    };
  }

  /**
   * Convert our generic LLMRequest into Gemini contents format
   */
  private buildContents(request: LLMRequest) {
    const contents: {
      role: 'user' | 'model';
      parts: { text: string }[];
    }[] = [];

    // Previous conversation
    for (const message of request.history ?? []) {
      contents.push({
        role: this.mapRole(message),
        parts: [
          {
            text: message.content,
          },
        ],
      });
    }

    // Current user message
    contents.push({
      role: 'user',
      parts: [
        {
          text: `${request.systemPrompt ?? ''}

${request.userPrompt}`,
        },
      ],
    });

    return contents;
  }

  /**
   * Convert generic roles to Gemini roles
   */
  private mapRole(message: ChatMessage): 'user' | 'model' {
    switch (message.role) {
      case 'assistant':
        return 'model';

      case 'user':
      case 'system':
      default:
        return 'user';
    }
  }
}