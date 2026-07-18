export interface EmbeddingRequest {
  text: string;
}

export interface EmbeddingResponse {
  vector: number[];

  model: string;

  dimensions: number;

  latency: number;
}