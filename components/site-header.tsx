"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container } from "./container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open
          ? "border-border bg-bg/80 border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-medium text-white"
        >
          <span className="border-border bg-surface-2 text-accent-strong group-hover:border-accent/50 flex size-7 items-center justify-center rounded-md border text-xs transition-colors">
            SJ
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href.startsWith("#") ? href(item.href) : item.href}
              className="text-muted rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent/40 bg-accent/10 text-accent-strong hover:bg-accent/20 ml-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="text-muted rounded-md p-2 transition-colors hover:text-white md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <nav className="border-border bg-bg border-t md:hidden">
          <Container className="flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href.startsWith("#") ? href(item.href) : item.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:bg-surface rounded-md px-3 py-2.5 text-sm transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-strong mt-1 rounded-md px-3 py-2.5 text-sm font-medium"
            >
              Resume
            </a>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
