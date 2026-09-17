import type { ChatMessage, LlmClient } from "./types";

type OpenAiOptions = {
  apiKey: string;
  baseUrl: string;
  model: string;
};

export class OpenAiCompatibleClient implements LlmClient {
  readonly name: string;
  readonly available = true;

  constructor(private readonly options: OpenAiOptions) {
    this.name = `openai-compatible:${options.model}`;
  }

  async *stream(messages: ChatMessage[]): AsyncIterable<string> {
    const { apiKey, baseUrl, model } = this.options;
    const response = await fetch(
      `${baseUrl.replace(/\/$/, "")}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ model, messages, stream: true }),
      },
    );

    if (!response.ok || !response.body) {
      const detail = await response.text().catch(() => "");
      throw new Error(`LLM request failed (${response.status}): ${detail}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const event of events) {
        for (const line of event.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) yield delta;
          } catch {
            continue;
          }
        }
      }
    }
  }
}

export async function* streamText(
  text: string,
  delayMs = 16,
): AsyncIterable<string> {
  const chunks = text.match(/\s*\S+/g) ?? [text];
  for (const chunk of chunks) {
    yield chunk;
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

export function createLlmClient(): LlmClient | null {
  const apiKey =
    process.env.LLM_API_KEY ??
    process.env.OPENAI_API_KEY ??
    process.env.GROQ_API_KEY;

  if (!apiKey) return null;

  const baseUrl =
    process.env.LLM_BASE_URL ??
    (process.env.GROQ_API_KEY
      ? "https://api.groq.com/openai/v1"
      : "https://api.openai.com/v1");

  const model = process.env.LLM_MODEL ?? "gpt-4o-mini";

  return new OpenAiCompatibleClient({ apiKey, baseUrl, model });
}
