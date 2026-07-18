export interface TextChunk {
  id: string;

  content: string;

  index: number;

  metadata: Record<string, unknown>;
}