"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Bot, LoaderCircle, User } from "lucide-react";
import { cn } from "@/lib/cn";

type Message = { role: "user" | "assistant"; content: string };

const suggestions = [
  "What RAG systems has Sumit built?",
  "Tell me about his patent.",
  "What is his cloud experience?",
  "Is he open to new roles?",
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [provider, setProvider] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((response) => response.json())
      .then((data) => setProvider(data.provider as string))
      .catch(() => setProvider(null));
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || streaming) return;

    const history: Message[] = [...messages, { role: "user", content }];
    setInput("");
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: accumulated }]);
      }
    } catch {
      setMessages([
        ...history,
        {
          role: "assistant",
          content: "Something went wrong reaching the model. Please try again.",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="border-border bg-surface flex h-[32rem] flex-col overflow-hidden rounded-2xl border">
      <div className="border-border flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2 text-sm text-white">
          <Bot className="text-accent-strong size-4" />
          RAG assistant
        </div>
        <span className="text-muted font-mono text-xs">
          {provider ? provider : "connecting…"}
        </span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-muted text-sm">
              Ask anything about Sumit&apos;s background.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => send(suggestion)}
                  className="border-border bg-bg text-muted hover:border-accent/50 rounded-full border px-3 py-1.5 text-xs transition-colors hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {message.role === "assistant" ? (
                <span className="border-border bg-bg text-accent-strong mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border">
                  <Bot className="size-4" />
                </span>
              ) : null}
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  message.role === "user"
                    ? "bg-accent text-white"
                    : "border-border bg-bg border text-zinc-300",
                )}
              >
                {message.content || (
                  <LoaderCircle className="text-muted size-4 animate-spin" />
                )}
              </div>
              {message.role === "user" ? (
                <span className="border-border bg-bg text-muted mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border">
                  <User className="size-4" />
                </span>
              ) : null}
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
        className="border-border flex items-center gap-2 border-t p-3"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question…"
          className="border-border bg-bg placeholder:text-muted focus:border-accent/60 flex-1 rounded-lg border px-4 py-2.5 text-sm text-white focus:outline-none"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          aria-label="Send message"
          className="bg-accent hover:bg-accent-strong flex size-10 items-center justify-center rounded-lg text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          {streaming ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowUp className="size-4" />
          )}
        </button>
      </form>
    </div>
  );
}
