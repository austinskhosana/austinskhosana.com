import type { ComponentType } from "react";
import { BlogWindowContent } from "./BlogWindowContent";
import { PlaygroundWindowContent } from "./PlaygroundWindowContent";
import { PlaygroundItemWindowContent } from "./PlaygroundItemWindowContent";
import { AboutMeWindowContent } from "./AboutMeWindowContent";
import { CaseStudyContent } from "@/components/CaseStudyContent";
import { TITLE_BAR_HEIGHT } from "./WindowFrame";
import { projects, blogPosts, playgroundItems } from "@/lib/data";

export type WindowKey =
  | "blog"
  | "playground"
  | "about-me"
  | `work:${string}`
  | `blog:${string}`
  | `playground:${string}`;

type RegistryEntry = {
  title: string;
  Content: ComponentType;
  defaultSize: { width: number; height: number };
  centerX?: boolean;
  fadeScroll?: boolean;
};

export const CASE_STUDY_SIZE = { width: 1120, height: 820 };
const BLOG_POST_SIZE = { width: 640, height: 620 };
const PLAYGROUND_ITEM_SIZE = { width: 640, height: 560 };
const PLAYGROUND_IMAGE_WIDTH = 880;
const PLAYGROUND_IMAGE_MIN_HEIGHT = 320;
const PLAYGROUND_IMAGE_MAX_HEIGHT = 780;

function playgroundItemSize(item: (typeof playgroundItems)[number]) {
  if (!item.imageWidth || !item.imageHeight) {
    return PLAYGROUND_ITEM_SIZE;
  }
  // Window height must cover the title bar *plus* the image area, or the
  // image area is shorter than the width/aspect-ratio math assumes and the
  // image shrinks to fit — leaving gaps on the sides instead of hugging them.
  const imageHeight = Math.round(
    PLAYGROUND_IMAGE_WIDTH * (item.imageHeight / item.imageWidth),
  );
  return {
    width: PLAYGROUND_IMAGE_WIDTH,
    height:
      TITLE_BAR_HEIGHT +
      Math.min(
        PLAYGROUND_IMAGE_MAX_HEIGHT,
        Math.max(PLAYGROUND_IMAGE_MIN_HEIGHT, imageHeight),
      ),
  };
}

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

const playgroundItemRegistry: Record<string, RegistryEntry> = Object.fromEntries(
  playgroundItems.map((item) => [
    `playground:${item.slug}`,
    {
      title: item.name,
      Content: () => <PlaygroundItemWindowContent slug={item.slug} />,
      defaultSize: playgroundItemSize(item),
    },
  ]),
);

export const windowRegistry: Record<WindowKey, RegistryEntry> = {
  ...staticRegistry,
  ...caseStudyRegistry,
  ...blogPostRegistry,
  ...playgroundItemRegistry,
} as Record<WindowKey, RegistryEntry>;
