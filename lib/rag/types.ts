export type Role = "system" | "user" | "assistant";

export type ChatMessage = {
  role: Role;
  content: string;
};

export type RetrievedDoc = {
  id: string;
  title: string;
  content: string;
  score: number;
};

export interface Retriever {
  retrieve(query: string, k?: number): RetrievedDoc[];
}

export interface LlmClient {
  readonly name: string;
  readonly available: boolean;
  stream(messages: ChatMessage[]): AsyncIterable<string>;
}
