import {
  PromptResult,
  PromptTemplate,
} from './interfaces/prompt.interface';

interface ChatPromptInput {
  question: string;
}

export const ChatPrompt: PromptTemplate<ChatPromptInput> = {
  system: `
You are a helpful AI assistant.
`,

  build(input): PromptResult {
    return {
      systemPrompt: this.system,
      userPrompt: input.question,
    };
  },
};