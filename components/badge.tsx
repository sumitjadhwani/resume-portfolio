import { cn } from "@/lib/cn";

const styles: Record<string, string> = {
  default: "border-border bg-surface-2 text-muted",
  accent: "border-accent/30 bg-accent/10 text-accent-strong",
  cyan: "border-cyan/30 bg-cyan/10 text-cyan",
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs whitespace-nowrap",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
