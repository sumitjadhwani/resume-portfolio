import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { nav, site } from "@/content/site";
import { Container } from "./container";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="font-mono text-sm font-medium text-white">
              {site.name}
            </p>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {site.role} based in {site.location}.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="text-muted hover:text-accent-strong transition-colors"
              >
                <Mail className="size-4" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted hover:text-accent-strong transition-colors"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted hover:text-accent-strong transition-colors"
              >
                <GithubIcon className="size-4" />
              </a>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                className="text-muted transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-border text-muted mt-12 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
