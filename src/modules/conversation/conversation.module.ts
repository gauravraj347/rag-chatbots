import { Module } from '@nestjs/common';

import { ConversationService } from './conversation.service';

import { MemoryModule } from '../memory/memory.module';
import { PromptModule } from '../../prompts/prompt.module';
import { GeminiModule } from '../../providers/gemini/gemini.module';

@Module({
  imports: [
    MemoryModule,
    PromptModule,
    GeminiModule,
  ],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}