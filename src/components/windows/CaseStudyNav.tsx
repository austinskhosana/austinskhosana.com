"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useWindowManager } from "./WindowManagerContext";
import { CASE_STUDY_SIZE } from "./registry";
import { NAV_DURATION } from "./WindowFrame";
import { projects } from "@/lib/data";

// The window is centered (centerX), so the rail's distance from the
// viewport edge is derived from the window's known half-width rather than
// a fixed offset — keeping it snug against the window edge at any viewport
// width instead of drifting away on wide screens.
const RAIL_GAP = 20;

export function CaseStudyNav() {
  const { windows, openWindow } = useWindowManager();
  // Keyframe-driven transitions can't retarget mid-flight, so a click while
  // one is still playing would stack overlapping windows instead of
  // cleanly continuing — debounce the rail for the transition's duration.
  const [navigating, setNavigating] = useState(false);
  const navigatingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (navigatingTimeout.current) clearTimeout(navigatingTimeout.current);
    };
  }, []);

  const active = windows
    .filter((w) => w.key.startsWith("work:") && !w.minimized && !w.closing)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  if (!active) return null;

  const slug = active.key.slice("work:".length);
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  function navigate(targetSlug: string, direction: "up" | "down") {
    if (navigating) return;
    setNavigating(true);
    openWindow(`work:${targetSlug}`, undefined, direction);
    navigatingTimeout.current = setTimeout(() => setNavigating(false), NAV_DURATION);
  }

  // Mirrors the dock's own button pattern: a white circle chip per icon,
  // with a border that reads clearly against the shared frosted pill.
  // Sized down from the dock's 52px so the rail reads as secondary.
  const buttonClass =
    "group relative flex h-[46px] w-[46px] items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:bg-[#e5e5e5] hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

  return (
    <div
      style={{ left: `calc(50vw + ${CASE_STUDY_SIZE.width / 2}px + ${RAIL_GAP}px)` }}
      // Width pinned to 62.5px to match Nav.tsx's rendered header height
      // (py-5 + the logo's 15px line-height) — keeps the rail's footprint
      // visually consistent with the top navbar.
      className="pointer-events-none fixed top-1/2 z-50 hidden w-[62.5px] animate-[nav-in-right_320ms_var(--ease-out)_forwards] flex-col items-center gap-2 rounded-full border border-border bg-white/90 p-2 shadow-lg shadow-black/5 backdrop-blur xl:flex"
    >
      <button
        type="button"
        aria-label={`Previous case study: ${prev.title}`}
        onClick={() => navigate(prev.slug, "down")}
        disabled={navigating}
        className={`pointer-events-auto ${buttonClass}`}
      >
        <ArrowUpCircleIcon className="h-4 w-4" />
        <span className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-y-1/2 scale-95 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground opacity-0 shadow-lg shadow-black/5 transition-[opacity,transform] duration-150 group-hover:scale-100 group-hover:opacity-100">
          {prev.title}
        </span>
      </button>
      <button
        type="button"
        aria-label={`Next case study: ${next.title}`}
        onClick={() => navigate(next.slug, "up")}
        disabled={navigating}
        className={`pointer-events-auto ${buttonClass}`}
      >
        <ArrowDownCircleIcon className="h-4 w-4" />
        <span className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-y-1/2 scale-95 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground opacity-0 shadow-lg shadow-black/5 transition-[opacity,transform] duration-150 group-hover:scale-100 group-hover:opacity-100">
          {next.title}
        </span>
      </button>
    </div>
  );
}
