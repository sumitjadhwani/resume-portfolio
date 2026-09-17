import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { Section, SectionHeading } from "@/components/section";
import { ProjectCard } from "@/components/project-card";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        kicker="04 — Projects"
        title="Selected work"
        description="AI systems shipped to production, plus a patented invention. Each has a case study with the problem, the approach and the results."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-10">
        <Link
          href="/projects"
          className="text-accent-strong inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
        >
          All projects
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
