import { Injectable } from '@nestjs/common';

import { ChatMessage } from '../../providers/llm/llm.types';

@Injectable()
export class TokenService {
  /**
   * Very rough estimate:
   * 1 token ≈ 4 characters (English).
   * We'll replace this with model-specific tokenization later.
   */
  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  estimateHistory(messages: ChatMessage[]): number {
    return messages.reduce(
      (total, message) =>
        total + this.estimateTokens(message.content),
      0,
    );
  }

  trimHistory(
    history: ChatMessage[],
    maxTokens: number,
  ): ChatMessage[] {
    const trimmed = [...history];

    while (
      trimmed.length &&
      this.estimateHistory(trimmed) > maxTokens
    ) {
      trimmed.shift();
    }

    return trimmed;
  }
}