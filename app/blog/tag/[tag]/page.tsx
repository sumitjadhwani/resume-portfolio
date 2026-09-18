import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { Container } from "@/components/container";
import { PostCard } from "@/components/blog/post-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/tag/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Posts tagged “${decoded}”`,
    description: `Blog posts tagged ${decoded}.`,
  };
}

export default async function BlogTagPage({
  params,
}: PageProps<"/blog/tag/[tag]">) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <Container>
        <Link
          href="/blog"
          className="text-muted inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          All posts
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Tagged <span className="text-gradient">{decoded}</span>
        </h1>
        <p className="text-muted mt-3">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
