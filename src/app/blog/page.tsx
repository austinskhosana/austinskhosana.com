import type { Metadata } from "next";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Austin Skhosana",
  description: "Works by Austin Skhosana",
};

export default function BlogDirectory() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-20">
      <h1 className="font-display text-3xl font-medium">Blog</h1>
      <div className="flex flex-col">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
