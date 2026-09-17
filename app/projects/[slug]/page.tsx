import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="text-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">{project.organization}</Badge>
            <Badge>{project.period}</Badge>
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted mt-3 text-lg">{project.subtitle}</p>
        </header>

        <div className="mt-10 space-y-5">
          {project.overview.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-zinc-300"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-accent font-mono text-xs tracking-widest uppercase">
            Highlights
          </h2>
          <ul className="mt-5 space-y-3">
            {project.highlights.map((point) => (
              <li
                key={point}
                className="flex gap-3 text-base leading-relaxed text-zinc-300"
              >
                <span className="bg-accent mt-2.5 size-1.5 shrink-0 rounded-full" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-border mt-12 border-t pt-8">
          <h2 className="text-accent font-mono text-xs tracking-widest uppercase">
            Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </section>

        {project.lab ? (
          <section className="border-border bg-surface mt-12 rounded-xl border p-6">
            <h2 className="font-medium text-white">Interactive demo</h2>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {project.lab.available
                ? "Try a live, in-browser version of this project."
                : "A live prototype for this project is planned. Check the Labs section for available demos."}
            </p>
            <Link
              href="/labs"
              className="text-accent-strong mt-4 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
            >
              Go to Labs
            </Link>
          </section>
        ) : null}
      </Container>
    </article>
  );
}
