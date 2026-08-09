"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import type { NavDirection, WindowOrigin } from "./WindowManagerContext";

const MARGIN = 12;
const MIN_WIDTH = 360;
const MIN_HEIGHT = 280;
const CASCADE_STEP = 44;
const CASCADE_CYCLE = 6;
// Keeps windows clear of the floating dock (and its hover tooltips) at the
// bottom of the viewport.
const DOCK_EXCLUSION = 160;
const ENTER_DURATION = 380;
const EXIT_DURATION = 300;
export const NAV_DURATION = 260;
const REDUCED_DURATION = 150;

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return reduced;
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
  centerX,
  fadeScroll,
  zIndex,
  spawnIndex,
  origin,
  navDirection,
  forceClose,
  onClose,
  onFocus,
  onMinimize,
  onContentRef,
  onScrollProgress,
  children,
}: {
  title: string;
  defaultSize: { width: number; height: number };
  centerX?: boolean;
  fadeScroll?: boolean;
  zIndex: number;
  spawnIndex: number;
  origin?: WindowOrigin;
  navDirection?: NavDirection;
  forceClose?: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onContentRef?: (el: HTMLDivElement | null) => void;
  onScrollProgress?: (progress: number) => void;
  children: ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>(() =>
    origin || navDirection ? "entering" : "idle",
  );
  const [rect, setRect] = useState<Rect>(() => {
    const width = Math.min(defaultSize.width, window.innerWidth - MARGIN * 2);
    const height = Math.min(defaultSize.height, window.innerHeight - MARGIN * 2);
    const offset = (spawnIndex % CASCADE_CYCLE) * CASCADE_STEP;
    return clampPosition({
      x: (window.innerWidth - width) / 2 + (centerX ? 0 : offset),
      y: Math.max(MARGIN * 3, (window.innerHeight - height) / 2 - 20) + offset,
      width,
      height,
    });
  });
  const reducedMotion = usePrefersReducedMotion();
  const [maximized, setMaximized] = useState(false);
  const preMaximizeRect = useRef<Rect | null>(null);
  const contentElRef = useRef<HTMLDivElement | null>(null);
  const [scrollEdges, setScrollEdges] = useState({ atTop: true, atBottom: true });

  const updateScrollEdges = useCallback((el: HTMLDivElement) => {
    const atTop = el.scrollTop <= 1;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    setScrollEdges({ atTop, atBottom });
  }, []);

  const setContentEl = useCallback(
    (el: HTMLDivElement | null) => {
      contentElRef.current = el;
      onContentRef?.(el);
      if (el) updateScrollEdges(el);
    },
    [onContentRef, updateScrollEdges],
  );
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

  // A window without an origin or nav direction can't animate out, so a
  // forced replacement has to be removed immediately — that's an
  // external-system update (telling the manager to drop this window),
  // which is what effects are for.
  useEffect(() => {
    if (forceClose && phase === "idle" && !origin && !navDirection) {
      onClose();
    }
  }, [forceClose, phase, origin, navDirection, onClose]);

  // Windows with an origin or nav direction animate out instead; derive
  // that during render rather than syncing it into state from an effect.
  // Checked regardless of the current phase — a replacement can arrive
  // while a window is still mid-entrance, and forcing it to closing then
  // (rather than only from "idle") is what lets that entrance be
  // interrupted instead of leaving the window stuck replaying it forever.
  const effectivePhase: Phase =
    forceClose && (origin || navDirection) ? "closing" : phase;

  useEffect(() => {
    if (contentElRef.current) updateScrollEdges(contentElRef.current);
  }, [rect.height, maximized, updateScrollEdges]);

  const handleAnimationEnd = useCallback(() => {
    if (effectivePhase === "entering") setPhase("idle");
    else if (effectivePhase === "closing") onClose();
  }, [effectivePhase, onClose]);

  const animationStyle: CSSProperties =
    effectivePhase === "entering"
      ? reducedMotion
        ? {
            animation: `fade-in ${REDUCED_DURATION}ms var(--ease-out) forwards`,
          }
        : navDirection
          ? {
              animation: `case-slide-in-${navDirection} ${NAV_DURATION}ms var(--ease-out) forwards`,
              willChange: "transform, opacity",
            }
          : {
              ...(origin ? genieVars(rect, origin) : null),
              animation: `genie-in ${ENTER_DURATION}ms var(--ease-in-out) forwards`,
              transformOrigin: "0 0",
              willChange: "transform, opacity",
            }
      : effectivePhase === "closing"
        ? reducedMotion
          ? {
              animation: `fade-out ${REDUCED_DURATION}ms var(--ease-out) forwards`,
            }
          : navDirection
            ? {
                animation: `case-slide-out-${navDirection} ${NAV_DURATION}ms var(--ease-out) forwards`,
                willChange: "transform, opacity",
              }
            : {
                ...(origin ? genieVars(rect, origin) : null),
                animation: `genie-out ${EXIT_DURATION}ms var(--ease-in-out) forwards`,
                transformOrigin: "0 0",
                willChange: "transform, opacity",
              }
        : {};

  return (
    <div
      className="pointer-events-auto absolute flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/10"
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

      <div className="relative flex-1 overflow-hidden">
        {fadeScroll && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent transition-opacity duration-200 ${
              scrollEdges.atTop ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        <div
          ref={setContentEl}
          onScroll={(e) => {
            const el = e.currentTarget;
            if (onScrollProgress) {
              const max = el.scrollHeight - el.clientHeight;
              onScrollProgress(max > 0 ? el.scrollTop / max : 0);
            }
            if (fadeScroll) updateScrollEdges(el);
          }}
          className={`h-full overflow-y-auto overscroll-contain ${
            fadeScroll
              ? "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : ""
          }`}
        >
          {children}
        </div>

        {fadeScroll && (
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent transition-opacity duration-200 ${
              scrollEdges.atBottom ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

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
