import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GeminiProvider } from '../gemini/gemini.provider';
import { LLMProvider } from './llm.interface';

@Injectable()
export class LLMFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly geminiProvider: GeminiProvider,
  ) {}

  getProvider(): LLMProvider {
    const provider =
      this.configService.get<string>('LLM_PROVIDER') ?? 'gemini';

    switch (provider.toLowerCase()) {
      case 'gemini':
        return this.geminiProvider;

      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  }
}