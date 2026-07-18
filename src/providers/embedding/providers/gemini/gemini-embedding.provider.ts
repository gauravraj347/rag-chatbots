import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

import { EmbeddingProvider } from '../../embedding.interface';
import {
  EmbeddingRequest,
  EmbeddingResponse,
} from '../../embedding.types';

@Injectable()
export class GeminiEmbeddingProvider implements EmbeddingProvider {
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
      this.configService.get<string>('GEMINI_EMBEDDING_MODEL') ??
      'text-embedding-004';

    this.client = new GoogleGenAI({
      apiKey,
    });
  }

  async embed(
    request: EmbeddingRequest,
  ): Promise<EmbeddingResponse> {
    const startedAt = Date.now();

    const response = await this.client.models.embedContent({
      model: this.model,
      contents: request.text,
    });

    const vector = response.embeddings?.[0]?.values ?? [];

    return {
      vector,
      model: this.model,
      dimensions: vector.length,
      latency: Date.now() - startedAt,
    };
  }
}