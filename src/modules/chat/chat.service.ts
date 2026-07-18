import { Injectable } from '@nestjs/common';

import { LLMGateway } from '../../providers/llm/llm.gateway';

@Injectable()
export class ChatService {
  constructor(
    private readonly llmGateway: LLMGateway,
  ) {}

  async ask(prompt: string) {
    return this.llmGateway.generate({
      prompt,
    });
  }
}