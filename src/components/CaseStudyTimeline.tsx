"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/data";

// Case studies are a real page (not a floating window), so the rail's
// available width is derived from the content column's fixed max-w-[1120px]
// (the imagery's width, wider than the max-w-2xl text column it sits beside)
// rather than a window's known size — mirrors the old windowed rail's math,
// just anchored to the page layout instead.
const CONTENT_MAX_WIDTH = 1120;
const RAIL_LEFT_OFFSET = 24; // matches the `left-6` on the rail below
const RAIL_GAP = 20;

export function CaseStudyTimeline({ project }: { project: Project }) {
  const [progress, setProgress] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Published as a CSS variable (rather than lifted state) so the content
  // column — a separate sibling, not a child — can read the rail's actual
  // rendered width (which varies with its longest label, up to its max-width
  // cap) and shift itself over by exactly half of it, keeping equal space on
  // both sides of the content instead of guessing a fixed offset.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--case-study-rail-width",
        `${entry.contentRect.width}px`,
      );
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--case-study-rail-width");
    };
  }, []);

  const stops = [
    "Overview",
    ...project.sections.map((section) => section.navLabel ?? section.heading),
    ...(project.gallery && project.gallery.length > 0 ? ["Gallery"] : []),
  ];

  const activeIndex = Math.min(
    stops.length - 1,
    Math.floor(progress * stops.length),
  );

  function scrollToFraction(fraction: number) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * fraction, behavior: "smooth" });
  }

  const maxRailWidth = `max(0px, calc(50vw - ${
    CONTENT_MAX_WIDTH / 2 + RAIL_LEFT_OFFSET + RAIL_GAP
  }px))`;

  return (
    <div
      ref={railRef}
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
              scrollToFraction(index / (stops.length - 1 || 1))
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
