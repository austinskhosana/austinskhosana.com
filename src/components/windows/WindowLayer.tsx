"use client";

import { useEffect } from "react";
import { useWindowManager } from "./WindowManagerContext";
import { windowRegistry } from "./registry";
import { WindowFrame } from "./WindowFrame";

export function WindowLayer() {
  const { windows, closeWindow, focusWindow, toggleMinimize } =
    useWindowManager();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      const visible = windows.filter((w) => !w.minimized);
      if (visible.length === 0) return;
      const top = visible.reduce((a, b) => (b.zIndex > a.zIndex ? b : a));
      closeWindow(top.key);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow]);

  const minimized = windows.filter((w) => w.minimized);
  const hasVisibleWindows = windows.some((w) => !w.minimized);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 backdrop-blur-xl transition-opacity duration-300 ease-[var(--ease-out)]"
        style={{ opacity: hasVisibleWindows ? 1 : 0 }}
      />

      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const entry = windowRegistry[w.key];
          const Content = entry.Content;
          return (
            <WindowFrame
              key={w.key}
              title={entry.title}
              defaultSize={entry.defaultSize}
              centerX={entry.centerX}
              zIndex={w.zIndex}
              spawnIndex={w.spawnIndex}
              origin={w.origin}
              onClose={() => closeWindow(w.key)}
              onFocus={() => focusWindow(w.key)}
              onMinimize={() => toggleMinimize(w.key)}
            >
              <Content />
            </WindowFrame>
          );
        })}

      {minimized.length > 0 && (
        <div className="pointer-events-auto fixed bottom-32 left-6 z-50 flex flex-col gap-2">
          {minimized.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => {
                focusWindow(w.key);
                toggleMinimize(w.key);
              }}
              className="rounded-full border border-border bg-white/90 px-4 py-2 font-mono text-xs text-foreground/70 shadow-lg shadow-black/5 backdrop-blur-xl transition-colors hover:text-foreground"
            >
              {windowRegistry[w.key].title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
