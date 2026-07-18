// import { Injectable } from '@nestjs/common';
// import OpenAI from 'openai';

// import { LLMProvider } from '../llm/llm.interface';
// import { LLMRequest, LLMResponse } from '../llm/llm.types';

// @Injectable()
// export class OpenAIProvider implements LLMProvider {
//   private readonly client: OpenAI;

//   constructor() {
//     this.client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//   }

//   async generate(request: LLMRequest): Promise<LLMResponse> {
//     const startedAt = Date.now();

//     try {
//       const response = await this.client.responses.create({
//         model: 'gpt-5.6',
//         input: request.prompt,
//       });

//       return {
//         text: response.output_text,
//         model: String(response.model),
//         latency: Date.now() - startedAt,
//         usage: {
//           inputTokens: response.usage?.input_tokens ?? 0,
//           outputTokens: response.usage?.output_tokens ?? 0,
//           totalTokens: response.usage?.total_tokens ?? 0,
//         },
//       };
//     } catch (error) {
//       console.error(error);
//       throw new Error('Failed to generate AI response');
//     }
//   }
// }