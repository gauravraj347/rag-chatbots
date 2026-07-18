import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { InMemoryVectorRepository } from './in-memory-vector.repository';
import { QdrantRepository } from './qdrant/qdrant.repository';

@Injectable()
export class VectorFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly memory: InMemoryVectorRepository,
    private readonly qdrant: QdrantRepository,
  ) {}

  getRepository() {
    const provider =
      this.config.get<string>(
        'VECTOR_PROVIDER',
      ) ?? 'memory';

    switch (provider) {
      case 'qdrant':
        return this.qdrant;

      default:
        return this.memory;
    }
  }
}