export interface LoadedDocument {
  content: string;

  metadata: Record<string, any>;
}

export interface DocumentLoader {
  load(
    filePath: string,
  ): Promise<LoadedDocument>;
}