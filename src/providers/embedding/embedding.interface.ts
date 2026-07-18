import {
  EmbeddingRequest,
  EmbeddingResponse,
} from './embedding.types';

export interface EmbeddingProvider {
  embed(
    request: EmbeddingRequest,
  ): Promise<EmbeddingResponse>;
}