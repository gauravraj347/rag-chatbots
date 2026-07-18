import { Module } from '@nestjs/common';

import { GeminiProvider } from './gemini.provider';

import { LLMGateway } from '../llm/llm.gateway';
import { LLMFactory } from '../llm/llm.factory';

@Module({
  providers: [
    GeminiProvider,
    LLMGateway,
    LLMFactory,
  ],
  exports: [
    LLMGateway,
  ],
})
export class GeminiModule {}