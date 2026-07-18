import { VectorDocument } from './vector.types';

export interface VectorRepository {
  upsert(
    documents: VectorDocument[],
  ): Promise<void>;

  search(
    embedding: number[],
    limit: number,
  ): Promise<VectorDocument[]>;
}