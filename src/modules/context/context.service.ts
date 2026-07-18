import { Injectable } from '@nestjs/common';

import { VectorDocument } from '../../providers/vector/vector.types';

@Injectable()
export class ContextService {
  build(
    documents: VectorDocument[],
  ): string {
    return documents
      .map(
        (doc, index) =>
`Document ${index + 1}

${doc.content}`,
      )
      .join('\n\n----------------\n\n');
  }
}