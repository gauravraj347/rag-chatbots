import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmbeddingProvider } from './embedding.interface';

import { GeminiEmbeddingProvider } from './providers/gemini/gemini-embedding.provider';

@Injectable()
export class EmbeddingFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly gemini: GeminiEmbeddingProvider,
  ) {}

  getProvider(): EmbeddingProvider {
    const provider =
      this.config.get<string>('EMBEDDING_PROVIDER') ??
      'gemini';

    switch (provider) {
      case 'gemini':
      default:
        return this.gemini;
    }
  }
}