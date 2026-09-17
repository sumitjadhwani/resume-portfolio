import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/content/projects";
import { Badge } from "@/components/badge";

const statusLabel: Record<ProjectStatus, string> = {
  production: "Production",
  patent: "Patent pending",
  prototype: "Prototype",
  archived: "Archived",
};

const statusVariant: Record<
  ProjectStatus,
  "green" | "accent" | "cyan" | "default"
> = {
  production: "green",
  patent: "accent",
  prototype: "cyan",
  archived: "default",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group border-border bg-surface hover:border-accent/50 flex flex-col rounded-xl border p-6 transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-white">{project.title}</h3>
          <p className="text-muted mt-1 text-sm">{project.subtitle}</p>
        </div>
        <ArrowUpRight className="text-muted group-hover:text-accent-strong size-4 shrink-0 transition-colors" />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 4).map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>

      <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
        <span className="text-muted font-mono text-xs">
          {project.organization}
        </span>
        <Badge variant={statusVariant[project.status]}>
          {statusLabel[project.status]}
        </Badge>
      </div>
    </Link>
  );
}
