import { Injectable } from '@nestjs/common';

import { EmbeddingGateway } from '../../providers/embedding/embedding.gateway';

import { VectorRepository } from '../../vector/vector.repository';
import { VectorGateway } from '../../vector/vector.gateway';

@Injectable()
export class RetrievalService {
    constructor(
        private readonly embeddingGateway: EmbeddingGateway,
        private readonly vectorGateway: VectorGateway,
    ) { }

    async retrieve(
        question: string,
        limit = 5,
    ) {
        const embedding =
            await this.embeddingGateway.embed({
                text: question,
            });

        return this.vectorGateway.search(
            embedding.vector,
            limit,
        );
    }
}