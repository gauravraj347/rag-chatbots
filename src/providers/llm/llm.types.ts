export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';

  content: string;
}

export interface LLMRequest {
  systemPrompt?: string;

  userPrompt: string;

  history?: ChatMessage[];

  temperature?: number;

  topP?: number;

  maxTokens?: number;

  stream?: boolean;

  metadata?: Record<string, unknown>;
}

export interface LLMUsage {
  inputTokens: number;

  outputTokens: number;

  totalTokens: number;
}

export interface LLMResponse {
  text: string;

  model: string;

  latency: number;

  usage: LLMUsage;
}