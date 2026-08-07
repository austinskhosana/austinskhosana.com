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
      className={`flex items-start gap-2.5 rounded-2xl border border-border bg-white/50 p-3 shadow-lg shadow-black/5 backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-foreground text-sm leading-none text-background">
        ✽
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-semibold text-foreground">
            Austin&apos;s Blog
          </span>
          <span className="shrink-0 font-mono text-[11px] text-muted">
            {formatDate(post.date)}
          </span>
        </div>
        <span className="text-[13px] leading-snug text-foreground/80">
          {post.title}
        </span>
      </div>
    </Link>
  );
}

export function LatestPostWidget({ posts }: { posts: BlogPost[] }) {
  const [primary, secondary] = posts;

  return (
    <div className="group absolute top-6 right-6 z-30 hidden w-64 sm:block">
      {secondary && (
        <PostCard
          post={secondary}
          className="absolute inset-x-0 top-0 z-0 origin-top translate-y-5 scale-[0.9] opacity-90 shadow-xl shadow-black/10 transition-all duration-300 ease-out group-hover:translate-y-[calc(100%+10px)] group-hover:scale-100 group-hover:opacity-100"
        />
      )}
      <PostCard
        post={primary}
        className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      />
    </div>
  );
}
