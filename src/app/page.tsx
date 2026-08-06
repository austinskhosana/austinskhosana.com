import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ToolStack } from "@/components/ToolStack";
import { ProjectCard } from "@/components/ProjectCard";
import { BlogCard } from "@/components/BlogCard";
import { LatestPostWidget } from "@/components/LatestPostWidget";
import { projects, blogPosts } from "@/lib/data";

const widgetPosts = [
  blogPosts.find((post) => post.slug === "tailwind-the-last-css-framework-3")!,
  blogPosts.find((post) => post.slug === "vibe-coding-101-and-figma-make-2")!,
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-24 px-6 py-20">
      <LatestPostWidget posts={widgetPosts} />

      <section className="mx-auto flex max-w-md flex-col items-center gap-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-[#f5f5f5] text-2xl text-muted">
          AS
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1 className="font-display text-2xl leading-snug font-semibold sm:text-3xl">
            Hi! name is Austin Skhosana
            <br />
            I&apos;m a Designer and Developer
          </h1>
          <p className="font-mono text-sm leading-relaxed text-muted">
            I love making things so I just built{" "}
            <Link
              href="/work/pixelvault"
              className="text-foreground underline underline-offset-2"
            >
              Pixel Vault↗
            </Link>
            , a code storage and sharing solution for teams! Sometimes I
            draw, Sometimes I code, Sometimes I centre divs, sometimes with
            CSS and sometimes with English.
          </p>
        </div>

        <CopyEmailButton />
        <ToolStack />
      </section>

      <section className="flex flex-col gap-16">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <section className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-xl font-medium">From the Blog</h2>
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
