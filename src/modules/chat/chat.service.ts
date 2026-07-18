import { Injectable } from '@nestjs/common';

import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly conversationService: ConversationService,
  ) {}

  async ask(prompt: string) {
    return this.conversationService.chat(prompt);
  }
}