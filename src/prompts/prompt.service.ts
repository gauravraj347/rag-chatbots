import { Injectable } from '@nestjs/common';

import { ChatPrompt } from './templates/chat.prompt';
import { RagPrompt } from './templates/rag.prompt';

@Injectable()
export class PromptService {
  chat(question: string) {
    return ChatPrompt.build({
      question,
    });
  }

  rag(context: string, question: string) {
    return RagPrompt.build({
      context,
      question,
    });
  }
}