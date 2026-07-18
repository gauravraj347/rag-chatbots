import { Injectable } from '@nestjs/common';

import { PdfLoader } from '../../loaders/pdf/pdf.loader';
import { ChunkingService } from '../chunking/chunking.service';

import { EmbeddingGateway } from '../../providers/embedding/embedding.gateway';

import { InMemoryVectorRepository } from '../../providers/vector/in-memory-vector.repository';
import { VectorDocument } from '../../providers/vector/vector.types';

@Injectable()
export class IngestionService {
  constructor(
    private readonly pdfLoader: PdfLoader,
    private readonly chunking: ChunkingService,
    private readonly embeddingGateway: EmbeddingGateway,
    private readonly repository: InMemoryVectorRepository,
  ) {}

  async ingest(filePath: string) {
    const document =
      await this.pdfLoader.load(filePath);

    const chunks =
      this.chunking.split(document.content);

    const vectors: VectorDocument[] = [];

    for (const chunk of chunks) {
      const embedding =
        await this.embeddingGateway.embed({
          text: chunk.content,
        });

      vectors.push({
        id: chunk.id,
        content: chunk.content,
        embedding: embedding.vector,
        metadata: {
          ...document.metadata,
          ...chunk.metadata,
          chunkIndex: chunk.index,
        },
      });
    }

    await this.repository.upsert(vectors);

    return {
      chunks: chunks.length,
      vectors: vectors.length,
    };
  }
}