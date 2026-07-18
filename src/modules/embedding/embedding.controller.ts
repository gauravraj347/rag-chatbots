import { Body, Controller, Post } from '@nestjs/common';

import { EmbeddingService } from './embedding.service';

@Controller('embeddings')
export class EmbeddingController {
  constructor(
    private readonly embeddingService: EmbeddingService,
  ) {}

  @Post()
  async create(
    @Body('text') text: string,
  ) {
    return this.embeddingService.generate(text);
  }
}