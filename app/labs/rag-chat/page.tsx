import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { ChatDemo } from "@/components/labs/chat-demo";

export const metadata: Metadata = {
  title: "Portfolio RAG Chat",
  description:
    "A streaming retrieval-augmented chat demo over Sumit's experience, projects and patents.",
};

const steps = [
  {
    title: "Retrieve",
    body: "The question is scored against a small in-memory knowledge base built from the site's content, and the top passages are selected.",
  },
  {
    title: "Augment",
    body: "Retrieved passages are injected into the system prompt as grounded context, alongside the conversation history.",
  },
  {
    title: "Generate",
    body: "A server-side route handler streams the model's answer token by token. With no API key set, a local demo stream runs instead.",
  },
];

export default function RagChatPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/labs"
          className="text-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All labs
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Portfolio RAG Chat
        </h1>
        <p className="text-muted mt-3 text-lg leading-relaxed">
          This is a genuine retrieval-augmented generation loop, not a scripted
          demo. Retrieval, prompt construction and streaming all run in the
          app&apos;s own API route.
        </p>

        <div className="mt-8">
          <ChatDemo />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="border-border bg-surface rounded-xl border p-5"
            >
              <span className="text-accent-strong font-mono text-xs">
                0{index + 1}
              </span>
              <h2 className="mt-2 font-medium text-white">{step.title}</h2>
              <p className="text-muted mt-2 text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="border-border bg-surface mt-12 rounded-xl border p-6">
          <h2 className="font-medium text-white">Reuse this pattern</h2>
          <p className="text-muted mt-2 text-sm leading-relaxed">
            The retriever and LLM client are interfaces in{" "}
            <code className="text-accent-strong font-mono text-xs">
              lib/rag
            </code>
            . Swap the in-memory retriever for a vector store, or point the
            OpenAI-compatible client at any provider (OpenAI, Groq, a local
            model, or a future Python FastAPI service), without touching the UI
            or the route.
          </p>
        </div>
      </Container>
    </div>
  );
}
