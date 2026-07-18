import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

import { GeminiModule } from '../../providers/gemini/gemini.module';
import { PromptModule } from '../../prompts/prompt.module';
import { MemoryModule } from '../memory/memory.module';

@Module({
  imports: [
    GeminiModule,
    PromptModule,
    MemoryModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule { }