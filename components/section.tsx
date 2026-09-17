import { cn } from "@/lib/cn";
import { Container } from "./container";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      {kicker ? (
        <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted mt-4 text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
