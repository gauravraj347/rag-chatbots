import {
  PromptResult,
  PromptTemplate,
} from './interfaces/prompt.interface';

interface RagPromptInput {
  context: string;
  question: string;
}

export const RagPrompt: PromptTemplate<RagPromptInput> = {
  system: `
You are an AI assistant.

Answer ONLY using the provided context.

If the answer cannot be found in the provided context,
reply exactly:

"I don't know based on the provided documents."
`,

  build(input): PromptResult {
    return {
      systemPrompt: this.system,
      userPrompt: `
Context:

${input.context}

Question:

${input.question}
`,
    };
  },
};