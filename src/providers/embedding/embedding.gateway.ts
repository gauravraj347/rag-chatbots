import { Injectable } from '@nestjs/common';

import { EmbeddingFactory } from './embedding.factory';
import {
  EmbeddingRequest,
  EmbeddingResponse,
} from './embedding.types';

@Injectable()
export class EmbeddingGateway {
  constructor(
    private readonly factory: EmbeddingFactory,
  ) {}

  embed(
    request: EmbeddingRequest,
  ): Promise<EmbeddingResponse> {
    return this.factory
      .getProvider()
      .embed(request);
  }
}