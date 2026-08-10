"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

// iOS Safari can silently refuse .play() on a <video> that isn't visible in
// the viewport at the moment it's called, and never retries on its own — a
// video mounted below the fold (project covers, case-study section videos)
// stays paused forever, even after scrolling it into view or reloading the
// page. Playing only once it actually intersects, and pausing again once it
// leaves, works around that and is cheap on battery/data besides.
export function useAutoplayVideo(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}
