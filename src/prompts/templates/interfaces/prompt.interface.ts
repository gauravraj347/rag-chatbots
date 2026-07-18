export interface PromptTemplate {
  system: string;

  build(userInput: string): string;
}