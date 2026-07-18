import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { QdrantClient } from '@qdrant/js-client-rest';

import { VectorRepository } from '../vector.repository';
import { VectorDocument } from '../vector.types';

@Injectable()
export class QdrantRepository
  implements VectorRepository, OnModuleInit
{
  private readonly client: QdrantClient;

  private readonly collection = 'documents';

  constructor(
    private readonly config: ConfigService,
  ) {
    this.client = new QdrantClient({
      url:
        this.config.get('QDRANT_URL') ??
        'http://localhost:6333',
    });
  }

  async onModuleInit() {
    const collections =
      await this.client.getCollections();

    const exists =
      collections.collections.some(
        c => c.name === this.collection,
      );

    if (exists) {
      return;
    }

    await this.client.createCollection(
      this.collection,
      {
        vectors: {
          size: 768,
          distance: 'Cosine',
        },
      },
    );
  }

  async upsert(
    documents: VectorDocument[],
  ): Promise<void> {
    await this.client.upsert(
      this.collection,
      {
        wait: true,

        points: documents.map(doc => ({
          id: doc.id,

          vector: doc.embedding,

          payload: {
            content: doc.content,

            ...doc.metadata,
          },
        })),
      },
    );
  }

  async search(
    embedding: number[],
    limit: number,
  ): Promise<VectorDocument[]> {
    const result =
      await this.client.search(
        this.collection,
        {
          vector: embedding,

          limit,
        },
      );

    return result.map(item => ({
      id: String(item.id),

      content:
        item.payload?.content as string,

      embedding: [],

      metadata: item.payload ?? {},
    }));
  }
}