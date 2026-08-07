"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { WindowOrigin } from "./WindowManagerContext";

const MARGIN = 12;
const MIN_WIDTH = 360;
const MIN_HEIGHT = 280;
const CASCADE_STEP = 44;
const CASCADE_CYCLE = 6;
// Keeps windows clear of the floating dock at the bottom of the viewport.
const DOCK_EXCLUSION = 140;
const ENTER_DURATION = 380;
const EXIT_DURATION = 300;

type Rect = { x: number; y: number; width: number; height: number };
type Phase = "entering" | "idle" | "closing";

function genieVars(rect: Rect, origin: WindowOrigin) {
  return {
    "--gtx": `${origin.x - rect.x}px`,
    "--gty": `${origin.y - rect.y}px`,
    "--gsx": origin.width / rect.width,
    "--gsy": origin.height / rect.height,
  } as CSSProperties;
}

function clampPosition(rect: Rect): Rect {
  const maxX = Math.max(MARGIN, window.innerWidth - rect.width - MARGIN);
  const maxY = Math.max(
    MARGIN,
    window.innerHeight - rect.height - DOCK_EXCLUSION,
  );
  return {
    ...rect,
    x: Math.min(Math.max(rect.x, MARGIN), maxX),
    y: Math.min(Math.max(rect.y, MARGIN), maxY),
  };
}

export function WindowFrame({
  title,
  defaultSize,
  zIndex,
  spawnIndex,
  origin,
  onClose,
  onFocus,
  onMinimize,
  children,
}: {
  title: string;
  defaultSize: { width: number; height: number };
  zIndex: number;
  spawnIndex: number;
  origin?: WindowOrigin;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>(() =>
    origin ? "entering" : "idle",
  );
  const [rect, setRect] = useState<Rect>(() => {
    const width = Math.min(defaultSize.width, window.innerWidth - MARGIN * 2);
    const height = Math.min(defaultSize.height, window.innerHeight - MARGIN * 2);
    const offset = (spawnIndex % CASCADE_CYCLE) * CASCADE_STEP;
    return clampPosition({
      x: (window.innerWidth - width) / 2 + offset,
      y: Math.max(MARGIN * 3, (window.innerHeight - height) / 2 - 20) + offset,
      width,
      height,
    });
  });
  const [maximized, setMaximized] = useState(false);
  const preMaximizeRect = useRef<Rect | null>(null);
  const dragState = useRef<{ startX: number; startY: number; origin: Rect } | null>(
    null,
  );
  const resizeState = useRef<{ startX: number; startY: number; origin: Rect } | null>(
    null,
  );

  const handleDragStart = useCallback(
    (e: ReactPointerEvent) => {
      if (maximized || phase !== "idle") return;
      onFocus();
      dragState.current = { startX: e.clientX, startY: e.clientY, origin: rect };
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    },
    [rect, maximized, phase, onFocus],
  );

  const handleDragMove = useCallback((e: ReactPointerEvent) => {
    if (!dragState.current) return;
    const { startX, startY, origin } = dragState.current;
    setRect(
      clampPosition({
        ...origin,
        x: origin.x + (e.clientX - startX),
        y: origin.y + (e.clientY - startY),
      }),
    );
  }, []);

  const handleDragEnd = useCallback((e: ReactPointerEvent) => {
    dragState.current = null;
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  }, []);

  const handleResizeStart = useCallback(
    (e: ReactPointerEvent) => {
      if (maximized || phase !== "idle") return;
      e.stopPropagation();
      onFocus();
      resizeState.current = { startX: e.clientX, startY: e.clientY, origin: rect };
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    },
    [rect, maximized, phase, onFocus],
  );

  const handleResizeMove = useCallback((e: ReactPointerEvent) => {
    if (!resizeState.current) return;
    const { startX, startY, origin } = resizeState.current;
    setRect({
      ...origin,
      width: Math.min(
        Math.max(MIN_WIDTH, origin.width + (e.clientX - startX)),
        window.innerWidth - origin.x - MARGIN,
      ),
      height: Math.min(
        Math.max(MIN_HEIGHT, origin.height + (e.clientY - startY)),
        window.innerHeight - origin.y - DOCK_EXCLUSION,
      ),
    });
  }, []);

  const handleResizeEnd = useCallback((e: ReactPointerEvent) => {
    resizeState.current = null;
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  }, []);

  const toggleMaximize = useCallback(() => {
    if (maximized) {
      setRect(preMaximizeRect.current ?? rect);
      setMaximized(false);
    } else {
      preMaximizeRect.current = rect;
      setRect({
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setMaximized(true);
    }
  }, [rect, maximized]);

  const handleCloseClick = useCallback(() => {
    if (!origin || phase === "closing") {
      onClose();
      return;
    }
    setPhase("closing");
  }, [origin, phase, onClose]);

  const handleAnimationEnd = useCallback(() => {
    if (phase === "entering") setPhase("idle");
    else if (phase === "closing") onClose();
  }, [phase, onClose]);

  const animationStyle: CSSProperties =
    phase === "entering"
      ? {
          ...(origin ? genieVars(rect, origin) : null),
          animation: `genie-in ${ENTER_DURATION}ms var(--ease-in-out) forwards`,
          transformOrigin: "0 0",
          willChange: "transform, opacity",
        }
      : phase === "closing"
        ? {
            ...(origin ? genieVars(rect, origin) : null),
            animation: `genie-out ${EXIT_DURATION}ms var(--ease-in-out) forwards`,
            transformOrigin: "0 0",
            willChange: "transform, opacity",
          }
        : {};

  const isAnimating = phase !== "idle";

  return (
    <div
      className={`pointer-events-auto absolute flex flex-col overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/10 ${
        isAnimating ? "bg-white" : "bg-white/95 backdrop-blur-xl"
      }`}
      style={{
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        zIndex,
        ...animationStyle,
      }}
      onPointerDown={onFocus}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className="flex shrink-0 cursor-grab items-center border-b border-border px-4 py-3 active:cursor-grabbing"
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        onPointerUp={handleDragEnd}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleCloseClick}
            className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
          />
          <button
            type="button"
            aria-label="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onMinimize}
            className="h-3 w-3 rounded-full bg-[#febc2e] transition-opacity hover:opacity-80"
          />
          <button
            type="button"
            aria-label="Maximize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={toggleMaximize}
            className="h-3 w-3 rounded-full bg-[#28c840] transition-opacity hover:opacity-80"
          />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-muted select-none">
          {title}
        </span>
        <div className="w-[52px]" aria-hidden />
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>

      {!maximized && (
        <div
          role="presentation"
          onPointerDown={handleResizeStart}
          onPointerMove={handleResizeMove}
          onPointerUp={handleResizeEnd}
          className="absolute right-0 bottom-0 h-5 w-5 cursor-nwse-resize"
        />
      )}
    </div>
  );
}
