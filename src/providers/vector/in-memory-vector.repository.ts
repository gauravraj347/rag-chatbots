import { Injectable } from '@nestjs/common';

import { VectorDocument } from './vector.types';
import { VectorRepository } from './vector.repository';

@Injectable()
export class InMemoryVectorRepository
  implements VectorRepository
{
  private readonly documents: VectorDocument[] = [];

  async upsert(
    documents: VectorDocument[],
  ): Promise<void> {
    this.documents.push(...documents);
  }

  async search(): Promise<VectorDocument[]> {
    return this.documents;
  }

  getAll(): VectorDocument[] {
    return this.documents;
  }
}