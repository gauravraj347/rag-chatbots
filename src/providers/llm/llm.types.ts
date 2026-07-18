/**
 * Generic request sent to any LLM provider.
 */
export interface LLMRequest {
  prompt: string;

  model?: string;

  temperature?: number;

  maxTokens?: number;

  systemPrompt?: string;
}

/**
 * Token usage returned by the provider.
 */
export interface LLMUsage {
  inputTokens: number;

  outputTokens: number;

  totalTokens: number;
}

/**
 * Unified response returned from every provider.
 */
export interface LLMResponse {
  text: string;

  model: string;

  latency: number;

  usage: LLMUsage;
}