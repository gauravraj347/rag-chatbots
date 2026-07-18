import { Injectable } from '@nestjs/common';

import { VectorFactory } from './vector.factory';

import { VectorDocument } from './vector.types';

@Injectable()
export class VectorGateway {
  constructor(
    private readonly factory: VectorFactory,
  ) {}

  upsert(
    documents: VectorDocument[],
  ) {
    return this.factory
      .getRepository()
      .upsert(documents);
  }

  search(
    embedding: number[],
    limit: number,
  ) {
    return this.factory
      .getRepository()
      .search(
        embedding,
        limit,
      );
  }
}