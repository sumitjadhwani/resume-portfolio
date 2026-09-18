import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { Container } from "@/components/container";
import { PostCard } from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on Gen AI, RAG systems, LLM engineering and shipping AI to production.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <p className="text-accent mb-3 font-mono text-xs tracking-widest uppercase">
          Blog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Writing
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg leading-relaxed">
          Notes on Gen AI, RAG systems and shipping AI to production — the parts
          that don&apos;t fit in a bullet point.
        </p>

        {tags.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="border-border bg-surface text-muted hover:border-accent/50 hover:text-accent-strong rounded-full border px-3 py-1 font-mono text-xs transition-colors"
              >
                {tag}
                <span className="ml-1.5 text-zinc-600">{count}</span>
              </Link>
            ))}
          </div>
        ) : null}

        {posts.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="border-border bg-surface text-muted mt-12 rounded-xl border p-6 text-sm">
            No posts yet. Add an <code>.mdx</code> file under{" "}
            <code>content/blog</code>.
          </p>
        )}
      </Container>
    </div>
  );
}
