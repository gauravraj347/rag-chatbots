export interface VectorDocument {
  id: string;

  content: string;

  embedding: number[];

  metadata: Record<string, unknown>;
}