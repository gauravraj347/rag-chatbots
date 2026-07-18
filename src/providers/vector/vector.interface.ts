import { VectorDocument } from './vector.types';

export interface VectorStore {
  upsert(
    documents: VectorDocument[],
  ): Promise<void>;

  search(
    embedding: number[],
    limit: number,
  ): Promise<VectorDocument[]>;
}