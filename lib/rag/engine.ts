import { createRetriever } from "./retriever";
import { createLlmClient, streamText } from "./providers";
import type { ChatMessage, RetrievedDoc } from "./types";

const SYSTEM_PROMPT = [
  "You are the AI assistant embedded in Sumit Jadhwani's portfolio site.",
  "Answer questions about Sumit's experience, skills, projects and patents using ONLY the provided context.",
  "If the answer is not in the context, say you don't know and suggest contacting sumitjadhwani1@gmail.com.",
  "Be concise, accurate and professional.",
].join(" ");

function lastUserMessage(messages: ChatMessage[]): string {
  return (
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? ""
  );
}

export function retrieveContext(query: string, k = 3): RetrievedDoc[] {
  return createRetriever().retrieve(query, k);
}

export function ragStatus() {
  const llm = createLlmClient();
  return { provider: llm?.name ?? "local-demo", liveLlm: Boolean(llm) };
}

function buildSystemPrompt(docs: RetrievedDoc[]): string {
  const context =
    docs.length === 0
      ? "(no matching context found)"
      : docs
          .map((doc, index) => `[${index + 1}] ${doc.title}\n${doc.content}`)
          .join("\n\n");
  return `${SYSTEM_PROMPT}\n\nContext:\n${context}`;
}

function fallbackAnswer(query: string, docs: RetrievedDoc[]): string {
  if (docs.length === 0) {
    return "I don't have that in the knowledge base yet. Try asking about Sumit's RAG work, his patent, his skills or his education — or email him at sumitjadhwani1@gmail.com.";
  }
  const body = docs
    .map((doc) => `• ${doc.title} — ${doc.content}`)
    .join("\n\n");
  return `Here's what I found in Sumit's knowledge base for "${query}":\n\n${body}\n\nThis is a local demo response. Set LLM_API_KEY to stream answers from a real model.`;
}

export async function* answer(messages: ChatMessage[]): AsyncIterable<string> {
  const query = lastUserMessage(messages);
  const docs = retrieveContext(query);
  const llm = createLlmClient();

  if (llm) {
    yield* llm.stream([
      { role: "system", content: buildSystemPrompt(docs) },
      ...messages,
    ]);
    return;
  }

  yield* streamText(fallbackAnswer(query, docs));
}
