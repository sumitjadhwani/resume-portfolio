import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate, type BlogPostMeta } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group border-border bg-surface hover:border-accent/50 rounded-xl border p-6 transition-all hover:-translate-y-0.5">
      <div className="text-muted flex items-center gap-3 font-mono text-xs">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {post.readingTime} min read
        </span>
      </div>

      <h2 className="mt-3 text-lg font-medium text-white">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent-strong">
          {post.title}
        </Link>
      </h2>

      <p className="text-muted mt-2 text-sm leading-relaxed">{post.summary}</p>

      {post.tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="border-border bg-bg text-muted hover:border-accent/50 hover:text-accent-strong rounded-full border px-2.5 py-0.5 font-mono text-xs transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  );
}
