"use client";

import { useEffect } from "react";
import { useWindowManager } from "./WindowManagerContext";
import { windowRegistry } from "./registry";
import { WindowFrame } from "./WindowFrame";

export function WindowLayer() {
  const {
    windows,
    closeWindow,
    focusWindow,
    toggleMinimize,
    registerContentEl,
    updateScrollProgress,
  } = useWindowManager();

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
  const visibleWindows = windows.filter((w) => !w.minimized);
  const hasVisibleWindows = visibleWindows.length > 0;
  const topVisibleZ = visibleWindows.reduce(
    (max, w) => Math.max(max, w.zIndex),
    -Infinity,
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-white/20 backdrop-blur-xl transition-opacity duration-300 ease-[var(--ease-out)]"
        style={{ opacity: hasVisibleWindows ? 1 : 0 }}
      />

      {visibleWindows
        .map((w) => {
          const entry = windowRegistry[w.key];
          const Content = entry.Content;
          return (
            <WindowFrame
              key={w.key}
              title={entry.title}
              defaultSize={entry.defaultSize}
              centerX={entry.centerX}
              fadeScroll={entry.fadeScroll}
              zIndex={w.zIndex}
              focused={w.zIndex === topVisibleZ}
              spawnIndex={w.spawnIndex}
              origin={w.origin}
              navDirection={w.navDirection}
              forceClose={w.closing}
              onClose={() => closeWindow(w.key)}
              onFocus={() => focusWindow(w.key)}
              onMinimize={() => toggleMinimize(w.key)}
              onContentRef={(el) => registerContentEl(w.key, el)}
              onScrollProgress={(progress) => updateScrollProgress(w.key, progress)}
            >
              <Content />
            </WindowFrame>
          );
        })}

      {minimized.length > 0 && (
        <div className="pointer-events-auto fixed bottom-32 left-6 z-50 flex max-w-[min(320px,calc(100vw-3rem))] flex-col gap-2">
          {minimized.map((w) => (
            <button
              key={w.key}
              type="button"
              onClick={() => {
                focusWindow(w.key);
                toggleMinimize(w.key);
              }}
              className="flex max-w-full items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 font-mono text-xs text-subtle shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl transition-[transform,color,box-shadow] duration-150 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:text-foreground hover:shadow-xl active:translate-y-0 active:scale-[0.98] motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30" />
              <span className="truncate">{windowRegistry[w.key].title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
