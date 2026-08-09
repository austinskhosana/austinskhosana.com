import type { ComponentType } from "react";
import { BlogWindowContent } from "./BlogWindowContent";
import { PlaygroundWindowContent } from "./PlaygroundWindowContent";
import { AboutMeWindowContent } from "./AboutMeWindowContent";
import { CaseStudyContent } from "@/components/CaseStudyContent";
import { projects, blogPosts } from "@/lib/data";

export type WindowKey =
  | "blog"
  | "playground"
  | "about-me"
  | `work:${string}`
  | `blog:${string}`;

type RegistryEntry = {
  title: string;
  Content: ComponentType;
  defaultSize: { width: number; height: number };
  centerX?: boolean;
  fadeScroll?: boolean;
};

export const CASE_STUDY_SIZE = { width: 1120, height: 820 };
const BLOG_POST_SIZE = { width: 640, height: 620 };

const staticRegistry: Record<"blog" | "playground" | "about-me", RegistryEntry> = {
  blog: {
    title: "Blog",
    Content: BlogWindowContent,
    defaultSize: { width: 640, height: 620 },
  },
  playground: {
    title: "Playground",
    Content: PlaygroundWindowContent,
    defaultSize: { width: 780, height: 640 },
  },
  "about-me": {
    title: "About Me",
    Content: AboutMeWindowContent,
    defaultSize: { width: 640, height: 680 },
  },
};

const caseStudyRegistry: Record<string, RegistryEntry> = Object.fromEntries(
  projects.map((project) => [
    `work:${project.slug}`,
    {
      title: project.title,
      Content: () => <CaseStudyContent project={project} />,
      defaultSize: CASE_STUDY_SIZE,
      centerX: true,
      fadeScroll: true,
    },
  ]),
);

const blogPostRegistry: Record<string, RegistryEntry> = Object.fromEntries(
  blogPosts.map((post) => [
    `blog:${post.slug}`,
    {
      title: post.title,
      Content: () => <BlogWindowContent initialSlug={post.slug} />,
      defaultSize: BLOG_POST_SIZE,
    },
  ]),
);

export const windowRegistry: Record<WindowKey, RegistryEntry> = {
  ...staticRegistry,
  ...caseStudyRegistry,
  ...blogPostRegistry,
} as Record<WindowKey, RegistryEntry>;
