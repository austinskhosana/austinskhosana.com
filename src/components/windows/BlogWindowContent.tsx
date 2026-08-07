import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";

export function BlogWindowContent() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-20">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Blog
      </h1>
      <div className="flex flex-col">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
