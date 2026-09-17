import { experience } from "@/content/resume";
import { Section, SectionHeading } from "@/components/section";
import { Badge } from "@/components/badge";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        kicker="03 — Experience"
        title="Where I've worked"
        description="Four years across applied AI and backend engineering, from associate to Gen AI engineer."
      />
      <ol className="border-border relative space-y-12 border-l pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="relative">
            <span className="border-bg bg-accent absolute top-1.5 -left-[31px] size-3 rounded-full border-2 sm:-left-[39px]" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-white">
                {job.role}
                <span className="text-muted"> · {job.company}</span>
              </h3>
              <p className="text-muted font-mono text-xs">
                {job.start} — {job.end}
                {job.current ? (
                  <span className="ml-2 text-emerald-400">now</span>
                ) : null}
              </p>
            </div>
            <p className="text-muted mt-1 text-sm">{job.location}</p>

            {job.points ? (
              <ul className="mt-4 space-y-2">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                  >
                    <span className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}

            {job.projects ? (
              <div className="mt-5 space-y-4">
                {job.projects.map((project) => (
                  <div
                    key={project.name}
                    className="border-border bg-surface rounded-xl border p-5"
                  >
                    <h4 className="font-medium text-white">{project.name}</h4>
                    <p className="text-muted mt-1 text-sm">
                      {project.description}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {project.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                        >
                          <span className="bg-cyan mt-2 size-1 shrink-0 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <Badge variant="accent">Open to Gen AI & ML engineering roles</Badge>
      </div>
    </Section>
  );
}
