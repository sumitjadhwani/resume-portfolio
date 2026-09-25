import { Container } from "@/components/container";

const stats = [
  { value: "5+", label: "Years experience" },
  { value: "90%", label: "Fewer hallucinations" },
  { value: "10K", label: "Concurrent users" },
  { value: "1", label: "US patent filed" },
];

export function Stats() {
  return (
    <section className="border-border bg-surface/40 border-y">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-4 sm:py-14">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-gradient font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
                {stat.value}
              </dt>
              <dd className="text-muted mt-2 text-sm">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
