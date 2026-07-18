export interface PromptTemplate {
  system: string;

  build(userInput: string): {
    systemPrompt: string;
    userPrompt: string;
  };
}