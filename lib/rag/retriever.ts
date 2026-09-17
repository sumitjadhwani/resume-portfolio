import {
  education,
  experience,
  patents,
  profile,
  skillGroups,
} from "@/content/resume";
import { projects } from "@/content/projects";
import type { Retriever, RetrievedDoc } from "./types";

type Doc = { id: string; title: string; content: string };

const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "it",
  "its",
  "as",
  "at",
  "by",
  "from",
  "that",
  "this",
  "these",
  "those",
  "i",
  "me",
  "my",
  "you",
  "your",
  "what",
  "which",
  "who",
  "how",
  "why",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "about",
  "into",
  "over",
  "across",
  "using",
  "used",
  "use",
  "their",
  "there",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

const knowledgeBase: Doc[] = [
  { id: "profile", title: "Professional summary", content: profile.summary },
  {
    id: "skills",
    title: "Technical skills",
    content: skillGroups
      .map((group) => `${group.title}: ${group.items.join(", ")}`)
      .join("\n"),
  },
  ...experience.map((job) => ({
    id: `experience-${job.company}-${job.start}`,
    title: `${job.role} at ${job.company} (${job.start} – ${job.end})`,
    content: [
      job.points?.join(" "),
      job.projects
        ?.map(
          (project) =>
            `${project.name}: ${project.description} ${project.points.join(" ")}`,
        )
        .join("\n"),
    ]
      .filter(Boolean)
      .join("\n"),
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    content: [
      project.summary,
      project.overview.join(" "),
      project.highlights.join(" "),
    ]
      .join(" ")
      .concat(` Stack: ${project.stack.join(", ")}.`),
  })),
  ...patents.map((patent) => ({
    id: "patent",
    title: patent.title,
    content: `${patent.meta}. ${patent.points.join(" ")}`,
  })),
  ...education.map((item) => ({
    id: `education-${item.institution}`,
    title: `${item.institution} — ${item.credential}`,
    content: [item.period, item.detail, item.highlights?.join(" ")]
      .filter(Boolean)
      .join(". "),
  })),
];

export function createRetriever(docs: Doc[] = knowledgeBase): Retriever {
  const index = docs.map((doc) => ({
    doc,
    tokens: tokenize(`${doc.title} ${doc.content}`),
  }));

  return {
    retrieve(query: string, k = 3): RetrievedDoc[] {
      const queryTokens = tokenize(query);
      if (queryTokens.length === 0) return [];

      const scored = index.map(({ doc, tokens }) => {
        const counts = new Map<string, number>();
        for (const token of tokens) {
          counts.set(token, (counts.get(token) ?? 0) + 1);
        }
        let score = 0;
        for (const token of queryTokens) {
          score += counts.get(token) ?? 0;
        }
        return { id: doc.id, title: doc.title, content: doc.content, score };
      });

      return scored
        .filter((doc) => doc.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
    },
  };
}
