"use client";

import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <OSLink
      href={`/blog/${post.slug}`}
      windowKey={`blog:${post.slug}`}
      className={`flex items-center gap-3.5 rounded-2xl border border-border bg-white/50 p-3.5 shadow-lg shadow-black/5 backdrop-blur-xl ${className ?? ""}`}
    >
      {post.video ? (
        <video
          ref={videoRef}
          src={post.video}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-foreground text-lg leading-none text-background">
          ✽
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-mono text-xs text-muted">
          {formatDate(post.date)}
        </span>
        <span className="text-sm leading-snug font-medium text-foreground">
          {post.title}
        </span>
      </div>
    </OSLink>
  );
}

export function LatestPostWidget({ posts }: { posts: BlogPost[] }) {
  const [primary, secondary] = posts;

  return (
    <div className="group absolute top-6 right-6 z-30 hidden w-72 sm:block">
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
