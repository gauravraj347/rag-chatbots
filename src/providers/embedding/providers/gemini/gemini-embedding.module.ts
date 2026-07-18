import { Module } from '@nestjs/common';

import { GeminiEmbeddingProvider } from './gemini-embedding.provider';

@Module({
  providers: [GeminiEmbeddingProvider],
  exports: [GeminiEmbeddingProvider],
})
export class GeminiEmbeddingModule {}