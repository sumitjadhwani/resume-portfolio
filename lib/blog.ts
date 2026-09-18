import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
  draft: boolean;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

export type BlogTag = {
  tag: string;
  count: number;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
}

function toMeta(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): BlogPostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date:
      data.date instanceof Date
        ? data.date.toISOString()
        : typeof data.date === "string"
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: normalizeTags(data.tags),
    readingTime: readingTime(content),
    draft: data.draft === true,
  };
}

function readPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...toMeta(slug, data, content), content };
    });
}

function byDateDesc(a: BlogPostMeta, b: BlogPostMeta): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function toPostMeta(post: BlogPost): BlogPostMeta {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    summary: post.summary,
    tags: post.tags,
    readingTime: post.readingTime,
    draft: post.draft,
  };
}

export function getAllPosts(
  includeDrafts = process.env.NODE_ENV !== "production",
): BlogPostMeta[] {
  return readPosts()
    .filter((post) => includeDrafts || !post.draft)
    .sort(byDateDesc)
    .map(toPostMeta);
}

export function getPostBySlug(
  slug: string,
  includeDrafts = process.env.NODE_ENV !== "production",
): BlogPost | undefined {
  const post = readPosts().find((item) => item.slug === slug);
  if (!post) return undefined;
  if (post.draft && !includeDrafts) return undefined;
  return post;
}

export function getAllTags(
  includeDrafts = process.env.NODE_ENV !== "production",
): BlogTag[] {
  const counts = new Map<string, number>();
  for (const post of readPosts()) {
    if (!includeDrafts && post.draft) continue;
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  const target = tag.toLowerCase();
  return getAllPosts().filter((post) =>
    post.tags.some((item) => item.toLowerCase() === target),
  );
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
