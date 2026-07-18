import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import { LLMProvider } from '../llm/llm.interface';
import { LLMRequest, LLMResponse } from '../llm/llm.types';

@Injectable()
export class GeminiProvider implements LLMProvider {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
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

    const response = await this.client.models.generateContent({
      model: this.model,
      contents: request.prompt,
    });

    return {
      text: response.text ?? '',
      model: this.model,
      latency: Date.now() - startedAt,
      usage: {
        inputTokens: response.usageMetadata?.promptTokenCount ?? 0,
        outputTokens:
          response.usageMetadata?.candidatesTokenCount ?? 0,
        totalTokens:
          response.usageMetadata?.totalTokenCount ?? 0,
      },
    };
  }
}