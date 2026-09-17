import { answer, ragStatus } from "@/lib/rag/engine";
import type { ChatMessage } from "@/lib/rag/types";

export const runtime = "nodejs";

export async function GET() {
  return Response.json(ragStatus());
}

export async function POST(request: Request) {
  let payload: { messages?: ChatMessage[] };
  try {
    payload = await request.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = (payload.messages ?? []).filter(
    (message) => message.role === "user" || message.role === "assistant",
  );

  if (messages.length === 0) {
    return new Response("At least one message is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of answer(messages)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[error] ${message}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
