import Link from "next/link";
import type { BlogPost } from "@/lib/data";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`flex items-center gap-3 rounded-2xl border border-border bg-white/50 p-3 shadow-lg shadow-black/5 backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fce7f3]" />
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs text-muted">
          {formatDate(post.date)}
        </span>
        <span className="text-sm leading-snug font-medium text-foreground">
          {post.title}
        </span>
      </div>
    </Link>
  );
}

export function LatestPostWidget({ posts }: { posts: BlogPost[] }) {
  const [primary, secondary] = posts;

  return (
    <div className="group fixed top-6 right-6 z-30 hidden w-64 sm:block">
      {secondary && (
        <PostCard
          post={secondary}
          className="absolute inset-x-0 top-0 z-0 origin-top translate-x-4 translate-y-4 scale-[0.94] opacity-60 shadow-md transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-[calc(100%+10px)] group-hover:scale-100 group-hover:opacity-100 group-hover:shadow-lg"
        />
      )}
      <PostCard
        post={primary}
        className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      />
    </div>
  );
}
