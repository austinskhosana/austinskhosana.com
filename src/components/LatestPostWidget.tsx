import type { BlogPost } from "@/lib/data";
import { OSLink } from "@/components/windows/OSLink";

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
    <OSLink
      href={`/blog/${post.slug}`}
      windowKey={`blog:${post.slug}`}
      className={`flex items-center gap-3 rounded-2xl border border-border bg-white/50 p-3 shadow-lg shadow-black/5 backdrop-blur-xl ${className ?? ""}`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-foreground text-base leading-none text-background">
        ✽
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-mono text-[11px] text-muted">
          {formatDate(post.date)}
        </span>
        <span className="text-[13px] leading-snug font-medium text-foreground">
          {post.title}
        </span>
      </div>
    </OSLink>
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
