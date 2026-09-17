import { Section, SectionHeading } from "@/components/section";

const focus = [
  {
    title: "Gen AI & RAG",
    body: "Hybrid retrieval agents, tool-calling, and grounding strategies that cut hallucinations in real deployments.",
  },
  {
    title: "LLM engineering",
    body: "Fine-tuning SLMs and OSS models, prompt/system design, and cost-aware model routing.",
  },
  {
    title: "Full-stack delivery",
    body: "Python and FastAPI services with the frontend and infrastructure needed to ship them.",
  },
  {
    title: "Scale & reliability",
    body: "Cloud deployment, containerized workloads, and CI pipelines built for 10K concurrent users.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        kicker="01 — About"
        title="From prototypes to production systems"
        description="I work across the stack, but my focus is applied AI: turning research ideas into systems people actually use, then making them fast, reliable and affordable."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {focus.map((item) => (
          <div
            key={item.title}
            className="border-border bg-surface hover:border-accent/40 rounded-xl border p-6 transition-colors"
          >
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
