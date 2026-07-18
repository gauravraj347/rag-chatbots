import { Injectable } from '@nestjs/common';

import { LLMGateway } from '../../providers/llm/llm.gateway';
import { PromptService } from '../../prompts/prompt.service';

import { MemoryService } from '../memory/memory.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly llmGateway: LLMGateway,
    private readonly promptService: PromptService,
    private readonly memoryService: MemoryService,
  ) {}

  async ask(userInput: string) {
    this.memoryService.addUserMessage(userInput);

    const prompt =
      this.promptService.chat(userInput);

    const response =
      await this.llmGateway.generate({
        systemPrompt: prompt.systemPrompt,
        userPrompt: prompt.userPrompt,
        history: this.memoryService.getHistory(),
      });

    this.memoryService.addAssistantMessage(
      response.text,
    );

    return response;
  }
}