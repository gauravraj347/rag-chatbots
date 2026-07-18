import { Module } from '@nestjs/common';

import { EmbeddingController } from './embedding.controller';
import { EmbeddingService } from './embedding.service';

import { EmbeddingGateway } from '../../providers/embedding/embedding.gateway';
import { EmbeddingFactory } from '../../providers/embedding/embedding.factory';

import { GeminiEmbeddingModule } from '../../providers/embedding/providers/gemini/gemini-embedding.module';

@Module({
  imports: [
    GeminiEmbeddingModule,
  ],
  controllers: [
    EmbeddingController,
  ],
  providers: [
    EmbeddingService,
    EmbeddingGateway,
    EmbeddingFactory,
  ],
})
export class EmbeddingModule {}