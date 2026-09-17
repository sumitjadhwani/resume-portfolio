import { GraduationCap } from "lucide-react";
import { education } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        kicker="06 — Education"
        title="Academic background"
        description="Formal training in information technology, plus an intensive Gen AI cohort."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((item) => (
          <div
            key={item.institution}
            className="border-border bg-surface rounded-xl border p-6"
          >
            <GraduationCap className="text-accent-strong size-5" />
            <h3 className="mt-4 font-medium text-white">{item.institution}</h3>
            <p className="mt-1 text-sm text-zinc-300">{item.credential}</p>
            <p className="text-muted mt-1 font-mono text-xs">
              {item.period}
              {item.detail ? ` · ${item.detail}` : ""}
            </p>
            {item.highlights ? (
              <ul className="mt-4 space-y-2">
                {item.highlights.map((point) => (
                  <li
                    key={point}
                    className="text-muted flex gap-3 text-sm leading-relaxed"
                  >
                    <span className="bg-cyan mt-2 size-1 shrink-0 rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
