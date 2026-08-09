"use client";

import { useWindowManager } from "./WindowManagerContext";
import { projects } from "@/lib/data";

export function CaseStudyTimeline() {
  const { windows, scrollToFraction } = useWindowManager();

  const active = windows
    .filter((w) => w.key.startsWith("work:") && !w.minimized && !w.closing)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  if (!active) return null;

  const slug = active.key.slice("work:".length);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;

  const stops = [
    "Overview",
    ...project.sections.map((section) => section.heading),
    ...(project.gallery && project.gallery.length > 0 ? ["Gallery"] : []),
  ];

  const progress = active.scrollProgress ?? 0;
  const activeIndex = Math.min(
    stops.length - 1,
    Math.floor(progress * stops.length),
  );

  return (
    <div className="pointer-events-none fixed top-1/2 left-6 z-30 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {stops.map((label, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`${project.slug}-${label}`}
            type="button"
            onClick={() =>
              scrollToFraction(active.key, index / (stops.length - 1 || 1))
            }
            style={{ animationDelay: `${Math.min(index, 6) * 40}ms` }}
            className="group pointer-events-auto flex animate-[timeline-item-in_260ms_var(--ease-out)_forwards] items-center gap-3 py-0.5 opacity-0"
          >
            <span
              className={`h-px shrink-0 transition-all duration-200 ${
                isActive
                  ? "w-8 bg-foreground/70"
                  : "w-4 bg-border group-hover:bg-foreground/40"
              }`}
            />
            <span
              className={`max-w-[140px] truncate font-mono text-xs transition-opacity duration-200 ${
                isActive
                  ? "text-foreground opacity-100"
                  : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
