import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies of production AI systems, a pending patent and personal ML projects.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Things I&apos;ve built
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Production AI systems, a patented invention and selected personal
          projects — each written up as a short case study.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </div>
  );
}
