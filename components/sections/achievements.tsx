import { achievements } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading
        kicker="07 — Achievements"
        title="Recognition & community"
        description="Certifications, awards and volunteering outside day-to-day delivery."
      />
      <div className="grid gap-6 md:grid-cols-3">
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
