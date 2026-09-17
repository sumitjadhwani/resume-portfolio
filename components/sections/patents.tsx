import { ShieldCheck } from "lucide-react";
import { patents } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";

export function Patents() {
  return (
    <Section id="patents">
      <SectionHeading
        kicker="05 — Patents"
        title="Invented & filed"
        description="A Transformer-based approach to detecting and masking PII in images, now a pending US patent application."
      />
      <div className="space-y-6">
        {patents.map((patent) => (
          <div
            key={patent.title}
            className="border-border bg-surface rounded-xl border p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="border-accent/30 bg-accent/10 text-accent-strong mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                <ShieldCheck className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-medium text-white">
                  {patent.title}
                </h3>
                <p className="text-accent-strong mt-1 font-mono text-xs">
                  {patent.meta}
                </p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {patent.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
