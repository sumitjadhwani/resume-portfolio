import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { site } from "@/content/site";
import { Container } from "@/components/container";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <div className="border-border bg-surface relative overflow-hidden rounded-2xl border px-6 py-14 text-center sm:px-12">
          <div className="bg-accent/20 pointer-events-none absolute -top-24 left-1/2 h-56 w-[32rem] -translate-x-1/2 rounded-full blur-[100px]" />
          <div className="relative">
            <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
              08 — Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something
            </h2>
            <p className="text-muted mx-auto mt-4 max-w-xl text-base leading-relaxed">
              I&apos;m open to Gen AI, RAG and ML engineering roles. The fastest
              way to reach me is email.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="bg-accent hover:bg-accent-strong inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                <Mail className="size-4" />
                {site.email}
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-bg hover:border-accent/50 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border bg-bg hover:border-accent/50 inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-white transition-colors"
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
