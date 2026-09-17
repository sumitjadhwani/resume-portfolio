import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/content/resume";
import { site } from "@/content/site";
import { Container } from "@/components/container";

const stats = [
  { value: "4+", label: "Years experience" },
  { value: "90%", label: "Fewer hallucinations" },
  { value: "10K", label: "Concurrent users" },
  { value: "1", label: "US patent filed" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="bg-accent/20 pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full blur-[120px]" />
      <Container className="relative">
        <div className="animate-fade-up max-w-3xl">
          <p className="border-border bg-surface/60 text-muted mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {site.role} · {site.location}
          </p>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-6xl">
            Building AI systems that hold up in{" "}
            <span className="text-gradient">production</span>.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="#projects"
              className="bg-accent hover:bg-accent-strong inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              View projects
              <ArrowRight className="size-4" />
            </Link>
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-surface hover:border-accent/50 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <Download className="size-4" />
              Download CV
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="text-muted hover:bg-surface rounded-lg p-2.5 transition-colors hover:text-white"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:bg-surface rounded-lg p-2.5 transition-colors hover:text-white"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted hover:bg-surface rounded-lg p-2.5 transition-colors hover:text-white"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>

          <dl className="border-border mt-14 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-2xl font-semibold text-white">
                  {stat.value}
                </dt>
                <dd className="text-muted mt-1 text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
