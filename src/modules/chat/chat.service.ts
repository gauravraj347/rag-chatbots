import { Injectable } from '@nestjs/common';

import { LLMGateway } from '../../providers/llm/llm.gateway';
import { PromptService } from '../../prompts/prompt.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly llmGateway: LLMGateway,
    private readonly promptService: PromptService,
  ) {}

  async ask(prompt: string) {
    const finalPrompt =
      this.promptService.chat(prompt);

    return this.llmGateway.generate({
      prompt: finalPrompt,
    });
  }
}