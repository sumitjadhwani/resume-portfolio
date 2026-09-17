export type Lab = {
  slug: string;
  href: string;
  title: string;
  description: string;
  status: "live" | "planned";
  tags: string[];
};

export const labs: Lab[] = [
  {
    slug: "rag-chat",
    href: "/labs/rag-chat",
    title: "Portfolio RAG Chat",
    description:
      "Ask questions about my experience, projects and patents. A streaming retriever-augmented chat backed by a server-side route handler.",
    status: "live",
    tags: ["RAG", "Streaming", "LLM"],
  },
  {
    slug: "document-qa",
    href: "/labs",
    title: "Document Q&A",
    description:
      "Upload a document and ask questions against it — the same retriever pattern applied to your own files.",
    status: "planned",
    tags: ["RAG", "OCR", "Embeddings"],
  },
  {
    slug: "tool-agent",
    href: "/labs",
    title: "Tool-Calling Agent",
    description:
      "An agent that decides between retrieval and live web search, mirroring the hybrid bot I shipped in production.",
    status: "planned",
    tags: ["Agents", "Tool Calling", "Web Search"],
  },
];
