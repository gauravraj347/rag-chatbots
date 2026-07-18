import { Injectable } from '@nestjs/common';

import {
  ChatMessage,
  LLMRequest,
} from '../../llm/llm.types';

@Injectable()
export class GeminiAdapter {
  toContents(request: LLMRequest) {
    const contents: {
      role: 'user' | 'model';
      parts: { text: string }[];
    }[] = [];

    // Previous conversation
    for (const message of request.history ?? []) {
      contents.push({
        role: this.mapRole(message),
        parts: [
          {
            text: message.content,
          },
        ],
      });
    }

    // Current request
    contents.push({
      role: 'user',
      parts: [
        {
          text: `${request.systemPrompt ?? ''}

${request.userPrompt}`,
        },
      ],
    });

    return contents;
  }

  private mapRole(message: ChatMessage): 'user' | 'model' {
    switch (message.role) {
      case 'assistant':
        return 'model';

      case 'user':
      case 'system':
      default:
        return 'user';
    }
  }
}