import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { labs } from "@/content/labs";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Interactive prototypes — RAG chatbots and AI agents running live in the browser.",
};

export default function LabsPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
          Labs
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Interactive prototypes
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Small, working demos of the techniques I use in production. Each one
          is a self-contained Next.js route backed by a server-side API handler,
          so model credentials never reach the browser.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {labs.map((lab) => {
            const available = lab.status === "live";
            const card = (
              <div className="border-border bg-surface group-hover:border-accent/50 flex h-full flex-col rounded-xl border p-6 transition-all group-hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="border-accent/30 bg-accent/10 text-accent-strong flex size-10 items-center justify-center rounded-lg border">
                    <FlaskConical className="size-5" />
                  </span>
                  <Badge variant={available ? "green" : "default"}>
                    {available ? "Live" : "Planned"}
                  </Badge>
                </div>
                <h2 className="mt-5 text-lg font-medium text-white">
                  {lab.title}
                </h2>
                <p className="text-muted mt-2 flex-1 text-sm leading-relaxed">
                  {lab.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {lab.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                {available ? (
                  <span className="text-accent-strong mt-5 inline-flex items-center gap-1 text-sm font-medium">
                    Open demo
                    <ArrowUpRight className="size-4" />
                  </span>
                ) : (
                  <span className="text-muted mt-5 text-sm">In progress</span>
                )}
              </div>
            );

            return available ? (
              <Link key={lab.slug} href={lab.href} className="group">
                {card}
              </Link>
            ) : (
              <div key={lab.slug} className="group cursor-default opacity-80">
                {card}
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
