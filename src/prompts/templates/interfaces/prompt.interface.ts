export interface PromptResult {
  systemPrompt: string;
  userPrompt: string;
}

export interface PromptTemplate<TInput = unknown> {
  system: string;

  build(input: TInput): PromptResult;
}