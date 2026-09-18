import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Container } from "@/components/container";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
};

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <Container className="max-w-2xl">
        <Link
          href="/blog"
          className="text-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>

        <header className="mt-8">
          <div className="text-muted flex flex-wrap items-center gap-3 font-mono text-xs">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {post.readingTime} min read
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="border-border bg-surface text-muted hover:border-accent/50 hover:text-accent-strong rounded-full border px-3 py-1 font-mono text-xs transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : null}
        </header>

        <div className="prose prose-invert prose-zinc prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-accent-strong prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-accent/50 prose-blockquote:text-muted prose-strong:text-white mt-10 max-w-none">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
              },
            }}
          />
        </div>

        <div className="border-border mt-12 border-t pt-8">
          <Link
            href="/blog"
            className="text-accent-strong inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to all posts
          </Link>
        </div>
      </Container>
    </article>
  );
}
