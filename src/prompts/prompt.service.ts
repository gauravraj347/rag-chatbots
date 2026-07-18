import { Injectable } from '@nestjs/common';

import { ChatPrompt } from './templates/chat.prompt';

@Injectable()
export class PromptService {
  private readonly chatPrompt = new ChatPrompt();

  chat(userInput: string) {
    return this.chatPrompt.build(userInput);
  }
}