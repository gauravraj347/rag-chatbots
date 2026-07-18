import { Injectable } from '@nestjs/common';

import { ChatMessage } from '../../providers/llm/llm.types';

@Injectable()
export class MemoryService {
  private readonly history: ChatMessage[] = [];

  getHistory(): ChatMessage[] {
    return [...this.history];
  }

  addUserMessage(content: string) {
    this.history.push({
      role: 'user',
      content,
    });
  }

  addAssistantMessage(content: string) {
    this.history.push({
      role: 'assistant',
      content,
    });
  }

  clear() {
    this.history.length = 0;
  }
}