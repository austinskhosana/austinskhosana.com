"use client";

import { useWindowManager } from "./WindowManagerContext";
import { CASE_STUDY_SIZE } from "./registry";
import { projects } from "@/lib/data";

// The window is centered, so the rail's available width is derived from
// its known half-width (mirrors CaseStudyNav) — labels truncate to fit
// whatever space is actually free instead of spilling under the window.
const RAIL_LEFT_OFFSET = 24; // matches the `left-6` on the rail below
const RAIL_GAP = 20;

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
    ...project.sections.map((section) => section.navLabel ?? section.heading),
    ...(project.gallery && project.gallery.length > 0 ? ["Gallery"] : []),
  ];

  const progress = active.scrollProgress ?? 0;
  const activeIndex = Math.min(
    stops.length - 1,
    Math.floor(progress * stops.length),
  );

  const maxRailWidth = `max(0px, calc(50vw - ${
    CASE_STUDY_SIZE.width / 2 + RAIL_LEFT_OFFSET + RAIL_GAP
  }px))`;

  return (
    <div
      style={{ maxWidth: maxRailWidth }}
      className="pointer-events-none fixed top-1/2 left-6 z-50 hidden -translate-y-1/2 flex-col gap-3 overflow-hidden xl:flex"
    >
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
              className={`min-w-0 flex-1 truncate font-mono text-xs transition-opacity duration-200 ${
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
