"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { WindowKey } from "./registry";

export type WindowOrigin = { x: number; y: number; width: number; height: number };

export type OpenWindow = {
  key: WindowKey;
  zIndex: number;
  minimized: boolean;
  spawnIndex: number;
  origin?: WindowOrigin;
  closing?: boolean;
  scrollProgress?: number;
};

function isCaseStudyKey(key: WindowKey) {
  return key.startsWith("work:");
}

type WindowManagerContextValue = {
  windows: OpenWindow[];
  openWindow: (key: WindowKey, origin?: WindowOrigin) => void;
  closeWindow: (key: WindowKey) => void;
  closeAllWindows: () => void;
  focusWindow: (key: WindowKey) => void;
  toggleMinimize: (key: WindowKey) => void;
  registerContentEl: (key: WindowKey, el: HTMLDivElement | null) => void;
  updateScrollProgress: (key: WindowKey, progress: number) => void;
  scrollToFraction: (key: WindowKey, fraction: number) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null,
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const zCounter = useRef(50);
  const spawnCounter = useRef(0);
  const contentRefs = useRef<Map<WindowKey, HTMLDivElement>>(new Map());

  const openWindow = useCallback((key: WindowKey, origin?: WindowOrigin) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => {
      // Only one case study can be open at a time — any other case study
      // gets replaced: minimized ones drop silently, visible ones animate
      // out (genie) via the `closing` flag picked up by WindowFrame.
      const base = isCaseStudyKey(key)
        ? prev
            .filter((w) => !(isCaseStudyKey(w.key) && w.key !== key && w.minimized))
            .map((w) =>
              isCaseStudyKey(w.key) && w.key !== key
                ? { ...w, closing: true }
                : w,
            )
        : prev;

      const existing = base.find((w) => w.key === key);
      if (existing) {
        return base.map((w) =>
          w.key === key
            ? { ...w, minimized: false, zIndex: z, closing: false }
            : w,
        );
      }
      const spawnIndex = spawnCounter.current;
      spawnCounter.current += 1;
      return [...base, { key, zIndex: z, minimized: false, spawnIndex, origin }];
    });
  }, []);

  const closeWindow = useCallback((key: WindowKey) => {
    contentRefs.current.delete(key);
    setWindows((prev) => prev.filter((w) => w.key !== key));
  }, []);

  // Minimized windows aren't mounted, so they can be dropped immediately;
  // visible ones are marked closing so WindowFrame can genie-out first.
  const closeAllWindows = useCallback(() => {
    setWindows((prev) =>
      prev.filter((w) => !w.minimized).map((w) => ({ ...w, closing: true })),
    );
  }, []);

  const registerContentEl = useCallback(
    (key: WindowKey, el: HTMLDivElement | null) => {
      if (el) contentRefs.current.set(key, el);
      else contentRefs.current.delete(key);
    },
    [],
  );

  const updateScrollProgress = useCallback((key: WindowKey, progress: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.key === key ? { ...w, scrollProgress: progress } : w)),
    );
  }, []);

  const scrollToFraction = useCallback((key: WindowKey, fraction: number) => {
    const el = contentRefs.current.get(key);
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    el.scrollTo({ top: max * fraction, behavior: "smooth" });
  }, []);

  const focusWindow = useCallback((key: WindowKey) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) =>
      prev.map((w) => (w.key === key ? { ...w, zIndex: z } : w)),
    );
  }, []);

  const toggleMinimize = useCallback((key: WindowKey) => {
    setWindows((prev) =>
      prev.map((w) => (w.key === key ? { ...w, minimized: !w.minimized } : w)),
    );
  }, []);

  const value = useMemo(
    () => ({
      windows,
      openWindow,
      closeWindow,
      closeAllWindows,
      focusWindow,
      toggleMinimize,
      registerContentEl,
      updateScrollProgress,
      scrollToFraction,
    }),
    [
      windows,
      openWindow,
      closeWindow,
      closeAllWindows,
      focusWindow,
      toggleMinimize,
      registerContentEl,
      updateScrollProgress,
      scrollToFraction,
    ],
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error(
      "useWindowManager must be used within a WindowManagerProvider",
    );
  }
  return ctx;
}
