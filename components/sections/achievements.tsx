import { ShieldCheck } from "lucide-react";
import { achievements, patents } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        kicker="06 — Achievements"
        title="Recognition & community"
        description="A pending patent, plus certifications, awards and volunteering outside day-to-day delivery."
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
                <p className="text-accent mb-1 font-mono text-xs tracking-widest uppercase">
                  Patent
                </p>
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

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {achievements.map((group) => (
          <div
            key={group.title}
            className="border-border bg-surface rounded-xl border p-6"
          >
            <h3 className="text-accent mb-4 font-mono text-xs tracking-widest uppercase">
              {group.title}
            </h3>
            <ul className="space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                >
                  <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
