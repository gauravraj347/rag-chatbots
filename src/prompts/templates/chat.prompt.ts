import { PromptTemplate } from './interfaces/prompt.interface';

export class ChatPrompt implements PromptTemplate {
  system = `
You are an experienced AI Assistant.

Always provide
- Correct
- Helpful
- Professional
responses.
`;

  build(userInput: string): string {
    return `
${this.system}

User:

${userInput}
`;
  }
}