import { Injectable } from '@nestjs/common';

import { randomUUID } from 'crypto';

import { TextChunk } from './chunk.types';

@Injectable()
export class ChunkingService {
  split(
    text: string,
    chunkSize = 1000,
    overlap = 200,
  ): TextChunk[] {
    const chunks: TextChunk[] = [];

    let start = 0;

    let index = 0;

    while (start < text.length) {
      const end = Math.min(
        start + chunkSize,
        text.length,
      );

      chunks.push({
        id: randomUUID(),

        index,

        content: text.slice(start, end),

        metadata: {},
      });

      start += chunkSize - overlap;

      index++;
    }

    return chunks;
  }
}