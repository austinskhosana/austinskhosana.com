import type { ComponentType } from "react";
import { BlogWindowContent } from "./BlogWindowContent";
import { PlaygroundWindowContent } from "./PlaygroundWindowContent";
import { AboutMeWindowContent } from "./AboutMeWindowContent";

export type WindowKey = "blog" | "playground" | "about-me";

export const windowRegistry: Record<
  WindowKey,
  {
    title: string;
    Content: ComponentType;
    defaultSize: { width: number; height: number };
  }
> = {
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
