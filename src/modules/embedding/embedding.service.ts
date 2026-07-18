import { Injectable } from '@nestjs/common';

import { EmbeddingGateway } from '../../providers/embedding/embedding.gateway';

@Injectable()
export class EmbeddingService {
  constructor(
    private readonly embeddingGateway: EmbeddingGateway,
  ) {}

  async generate(text: string) {
    return this.embeddingGateway.embed({
      text,
    });
  }
}