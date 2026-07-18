import { Module } from '@nestjs/common';

import { GeminiProvider } from './gemini.provider';

import { GeminiAdapter } from './adapter/gemini.adapter';

import { LLMFactory } from '../llm/llm.factory';
import { LLMGateway } from '../llm/llm.gateway';

@Module({
  providers: [
    GeminiProvider,
    GeminiAdapter,
    LLMFactory,
    LLMGateway,
  ],
  exports: [
    LLMGateway,
  ],
})
export class GeminiModule {}