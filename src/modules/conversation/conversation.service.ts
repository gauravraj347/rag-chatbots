import { Injectable } from '@nestjs/common';

import { MemoryService } from '../memory/memory.service';
import { TokenService } from '../token/token.service';

import { PromptService } from '../../prompts/prompt.service';
import { LLMGateway } from '../../providers/llm/llm.gateway';

@Injectable()
export class ConversationService {
  constructor(
    private readonly memoryService: MemoryService,
    private readonly promptService: PromptService,
    private readonly tokenService: TokenService,
    private readonly llmGateway: LLMGateway,
  ) {}

  async chat(userInput: string) {
    this.memoryService.addUserMessage(userInput);

    const prompt = this.promptService.chat(userInput);

    const history = this.tokenService.trimHistory(
      this.memoryService.getHistory(),
      4000,
    );

    const response = await this.llmGateway.generate({
      systemPrompt: prompt.systemPrompt,
      userPrompt: prompt.userPrompt,
      history,
    });

    this.memoryService.addAssistantMessage(response.text);

    return response;
  }
}