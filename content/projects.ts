export type ProjectStatus = "production" | "patent" | "prototype" | "archived";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  overview: string[];
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
  lab?: { available: boolean };
};

export const projects: Project[] = [
  {
    slug: "conversational-ai-bot",
    title: "Conversational AI Bot",
    subtitle: "Hybrid RAG + live web-search agent",
    organization: "Axentia · University of Mississippi",
    period: "2025",
    status: "production",
    featured: true,
    summary:
      "A tool-calling agent that blends retrieval over a private knowledge base with live web search to answer student questions with up-to-the-minute information.",
    overview: [
      "Students needed accurate, current answers without waiting on staff. A pure retrieval system went stale quickly, and a pure LLM hallucinated too often.",
      "I built a hybrid agent that decides per query whether to retrieve from the indexed knowledge base, run a live web search, or combine both — then grounds its answer in the returned evidence.",
    ],
    highlights: [
      "Reduced model hallucinations by over 90%.",
      "Deployed across three platforms: Web, WhatsApp and Telegram.",
      "Tool-calling architecture with a hybrid RAG + web-search retrieval strategy.",
    ],
    stack: ["Python", "FastAPI", "RAG", "AI Agents", "Tool Calling", "AWS"],
    lab: { available: false },
  },
  {
    slug: "transcript-genie",
    title: "Transcript Genie",
    subtitle: "AI assistant for academic credential evaluation",
    organization: "Axentia",
    period: "2025",
    status: "production",
    featured: true,
    summary:
      "A multi-stage document pipeline that turns international academic records into US GPA equivalents using an OCR ensemble and chained LLM calls.",
    overview: [
      "International transcripts arrive in inconsistent formats, scans and languages, making manual credential evaluation slow and expensive.",
      "I engineered a multi-stage pipeline: an ensemble of OCR models extracts and normalizes the records, then chained LLM calls interpret courses and grades and compute a US GPA equivalent.",
    ],
    highlights: [
      "Ensemble OCR plus chained LLM calls for robust extraction and interpretation.",
      "Cost reduced by routing tasks across GPT-5, specialized OSS models for simpler work, and the Groq API for high-speed inference.",
      "Multi-stage design keeps each step auditable and independently replaceable.",
    ],
    stack: ["Python", "OCR", "LLM Chaining", "Groq", "GPT-5", "OSS Models"],
    lab: { available: false },
  },
  {
    slug: "multi-rag-docs",
    title: "Multi-RAG Product Documentation",
    subtitle: "Retrieval system that cut support load",
    organization: "Nice Systems",
    period: "2023 – 2025",
    status: "production",
    featured: true,
    summary:
      "A multi-source RAG system that answers product questions from documentation, saving at least 25% of support hours.",
    overview: [
      "Support handled repetitive product-documentation questions that were already answered across scattered sources.",
      "I built a multi-RAG system that routes questions across several indexes and synthesizes grounded answers, letting customers and agents self-serve.",
    ],
    highlights: [
      "Saved at least 25% of support hours.",
      "Multi-index routing across documentation sources.",
      "Ran alongside scaling work to 10K concurrent users.",
    ],
    stack: ["Python", "RAG", "Vector Stores", "Elasticsearch", "AWS"],
    lab: { available: false },
  },
  {
    slug: "pii-masking",
    title: "Transformer PII Masking in Images",
    subtitle: "Patented end-to-end PII detection and masking",
    organization: "Nice Systems · U.S. Patent App. 18/888,490",
    period: "2024",
    status: "patent",
    featured: true,
    summary:
      "A Transformer-based system that detects and masks PII in on-screen images for GDPR and CCPA compliance, including multi-line data.",
    overview: [
      "Automation captures images of an agent's screen that previously had to be masked by hand for GDPR and CCPA compliance — there was no end-to-end solution.",
      "The invention couples OCR with Transformer-based detection and a unique row-wise data feed to improve accuracy and catch multi-line PII.",
    ],
    highlights: [
      "U.S. Patent App. 18/888,490, filed Nov 2024 (patent pending).",
      "End-to-end detection and masking rather than a manual workflow.",
      "Row-wise feed improves accuracy on multi-line PII.",
    ],
    stack: ["Python", "Transformers", "OCR", "LLMs"],
    lab: { available: false },
  },
  {
    slug: "voice-covid-diagnosis",
    title: "ML Voice-Based COVID Diagnosis",
    subtitle: "Screening from cough recordings",
    organization: "Personal project",
    period: "2021",
    status: "archived",
    featured: false,
    summary:
      "An ML-based COVID-19 screening tool that detects infection patterns in voice and cough recordings.",
    overview: [
      "Explored whether acoustic features in cough recordings carry a detectable signal for COVID-19 infection.",
      "Compared logistic regression, SVM and XGBoost classifiers trained on public cough datasets from Kaggle.",
    ],
    highlights: [
      "Achieved 75% accuracy (F1 = 0.72) with an XGBoost ensemble.",
      "Tested against datasets from Kaggle.",
    ],
    stack: ["Python", "scikit-learn", "XGBoost", "Feature Engineering"],
    lab: { available: false },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
