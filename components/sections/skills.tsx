import { skillGroups } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/badge";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        kicker="02 — Skills"
        title="Technical toolkit"
        description="The languages, frameworks and platforms I reach for most often."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="border-border bg-surface rounded-xl border p-6"
          >
            <h3 className="text-accent mb-4 font-mono text-xs tracking-widest uppercase">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
