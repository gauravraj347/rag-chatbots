import { Injectable } from '@nestjs/common';

import { LLMFactory } from './llm.factory';
import { LLMRequest } from './llm.types';

@Injectable()
export class LLMGateway {
  constructor(
    private readonly factory: LLMFactory,
  ) {}

  async generate(request: LLMRequest) {
    const provider = this.factory.getProvider();

    return provider.generate(request);
  }
}