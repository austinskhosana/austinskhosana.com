import Link from "next/link";
import type { BlogPost } from "@/lib/data";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-2 border-b border-border py-6 first:pt-0"
    >
      <span className="text-xs text-muted">{formatDate(post.date)}</span>
      <h3 className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="font-mono text-sm leading-relaxed text-muted">{post.excerpt}</p>
    </Link>
  );
}
