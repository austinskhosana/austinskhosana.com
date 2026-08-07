import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Austin Skhosana`,
    description: post.excerpt,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-20">
      <Link
        href="/blog"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; Back to blog
      </Link>

      <header className="flex flex-col gap-3">
        <span className="text-sm text-muted">
          {formatDate(post.date)} &middot; Austin Skhosana
        </span>
        <h1 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div className="flex flex-col gap-6">
        {post.body.map((paragraph, i) => (
          <p key={i} className="font-mono text-sm leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
