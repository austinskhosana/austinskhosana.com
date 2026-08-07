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
};

type WindowManagerContextValue = {
  windows: OpenWindow[];
  openWindow: (key: WindowKey, origin?: WindowOrigin) => void;
  closeWindow: (key: WindowKey) => void;
  focusWindow: (key: WindowKey) => void;
  toggleMinimize: (key: WindowKey) => void;
};

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null,
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const zCounter = useRef(50);
  const spawnCounter = useRef(0);

  const openWindow = useCallback((key: WindowKey, origin?: WindowOrigin) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) => {
      const existing = prev.find((w) => w.key === key);
      if (existing) {
        return prev.map((w) =>
          w.key === key ? { ...w, minimized: false, zIndex: z } : w,
        );
      }
      const spawnIndex = spawnCounter.current;
      spawnCounter.current += 1;
      return [...prev, { key, zIndex: z, minimized: false, spawnIndex, origin }];
    });
  }, []);

  const closeWindow = useCallback((key: WindowKey) => {
    setWindows((prev) => prev.filter((w) => w.key !== key));
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
    () => ({ windows, openWindow, closeWindow, focusWindow, toggleMinimize }),
    [windows, openWindow, closeWindow, focusWindow, toggleMinimize],
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
