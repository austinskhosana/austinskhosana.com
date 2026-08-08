"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import type { Project } from "@/lib/data";

type LightboxImage = { src: string; alt: string; width: number; height: number };
type Rect = { x: number; y: number; width: number; height: number };

const MARGIN = 48;
const DRAG_MARGIN = 8;
const TITLE_BAR_HEIGHT = 41;
const CONTENT_PADDING = 16;
const ENTER_DURATION = 380;
const EXIT_DURATION = 300;

const ZOOM_MIN = 25;
const ZOOM_MAX = 300;
const ZOOM_STEP = 25;

function computeLayout(image: LightboxImage, zoomPercent: number) {
  const maxContentW = window.innerWidth - MARGIN * 2 - CONTENT_PADDING * 2;
  const maxContentH =
    window.innerHeight -
    MARGIN * 2 -
    TITLE_BAR_HEIGHT -
    CONTENT_PADDING * 2;
  const fitScale = Math.min(
    1,
    maxContentW / image.width,
    maxContentH / image.height,
  );
  const baseW = image.width * fitScale;
  const baseH = image.height * fitScale;
  const imgWidth = baseW * (zoomPercent / 100);
  const imgHeight = baseH * (zoomPercent / 100);
  const contentWidth = Math.min(imgWidth, maxContentW);
  const contentHeight = Math.min(imgHeight, maxContentH);
  return {
    imgWidth,
    imgHeight,
    windowWidth: contentWidth + CONTENT_PADDING * 2,
    windowHeight: contentHeight + CONTENT_PADDING * 2 + TITLE_BAR_HEIGHT,
  };
}

function clampRect(rect: Rect): Rect {
  const maxX = Math.max(
    DRAG_MARGIN,
    window.innerWidth - rect.width - DRAG_MARGIN,
  );
  const maxY = Math.max(
    DRAG_MARGIN,
    window.innerHeight - rect.height - DRAG_MARGIN,
  );
  return {
    ...rect,
    x: Math.min(Math.max(rect.x, DRAG_MARGIN), maxX),
    y: Math.min(Math.max(rect.y, DRAG_MARGIN), maxY),
  };
}

function genieVars(rect: Rect, origin: Rect): CSSProperties {
  return {
    "--gtx": `${origin.x - rect.x}px`,
    "--gty": `${origin.y - rect.y}px`,
    "--gsx": origin.width / rect.width,
    "--gsy": origin.height / rect.height,
  } as CSSProperties;
}

function Lightbox({
  image,
  origin,
  onClose,
}: {
  image: LightboxImage | null;
  origin: Rect | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"entering" | "idle" | "closing">(
    "entering",
  );
  const [mountedImage, setMountedImage] = useState<LightboxImage | null>(
    null,
  );
  const [mountedOrigin, setMountedOrigin] = useState<Rect | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [zoom, setZoom] = useState(100);
  const dragState = useRef<{
    startX: number;
    startY: number;
    origin: Rect;
  } | null>(null);

  if (image && image !== mountedImage && phase !== "closing") {
    setMountedImage(image);
    setMountedOrigin(origin);
    setPhase("entering");
    setZoom(100);
    const layout = computeLayout(image, 100);
    setRect(
      clampRect({
        x: (window.innerWidth - layout.windowWidth) / 2,
        y: (window.innerHeight - layout.windowHeight) / 2,
        width: layout.windowWidth,
        height: layout.windowHeight,
      }),
    );
  }

  useEffect(() => {
    if (!mountedImage) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") requestClose();
      if (e.key === "+" || e.key === "=") applyZoom(zoom + ZOOM_STEP);
      if (e.key === "-") applyZoom(zoom - ZOOM_STEP);
      if (e.key === "0") applyZoom(100);
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountedImage, zoom]);

  if (!mountedImage || !rect) return null;

  function requestClose() {
    setPhase("closing");
    onClose();
  }

  function handleAnimationEnd() {
    if (phase === "closing") {
      setMountedImage(null);
      setPhase("idle");
    } else if (phase === "entering") {
      setPhase("idle");
    }
  }

  function applyZoom(nextZoom: number) {
    // Window size is fixed once opened — zoom only resizes the image inside
    // it (scrolling to reveal overflow). Resizing the window on every zoom
    // step would shift the +/- controls out from under the cursor.
    setZoom(Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, nextZoom)));
  }

  function handleDragStart(e: ReactPointerEvent) {
    if (phase !== "idle" || !rect) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, origin: rect };
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }

  function handleDragMove(e: ReactPointerEvent) {
    if (!dragState.current) return;
    const { startX, startY, origin } = dragState.current;
    setRect(
      clampRect({
        ...origin,
        x: origin.x + (e.clientX - startX),
        y: origin.y + (e.clientY - startY),
      }),
    );
  }

  function handleDragEnd(e: ReactPointerEvent) {
    dragState.current = null;
    (e.currentTarget as Element).releasePointerCapture(e.pointerId);
  }

  const layout = computeLayout(mountedImage, zoom);

  const animationStyle: CSSProperties =
    phase !== "idle" && mountedOrigin
      ? {
          ...genieVars(rect, mountedOrigin),
          animation: `${
            phase === "closing" ? "genie-out" : "genie-in"
          } ${phase === "closing" ? EXIT_DURATION : ENTER_DURATION}ms var(--ease-in-out) forwards`,
          transformOrigin: "0 0",
        }
      : {};

  return createPortal(
    <div className="fixed inset-0 z-[100]" onClick={requestClose}>
      <div
        className="absolute flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/20"
        style={{
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height,
          ...animationStyle,
        }}
        onClick={(e) => e.stopPropagation()}
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
              onClick={requestClose}
              className="h-3 w-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
            />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
          </div>
          <span className="flex-1 truncate px-4 text-center font-mono text-xs text-muted select-none">
            {mountedImage.alt}
          </span>
          <div
            className="flex shrink-0 items-center gap-0.5 font-mono text-xs text-muted select-none"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => applyZoom(zoom - ZOOM_STEP)}
              disabled={zoom <= ZOOM_MIN}
              className="flex h-5 w-5 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              −
            </button>
            <button
              type="button"
              aria-label="Reset zoom"
              onClick={() => applyZoom(100)}
              className="w-11 text-center transition-colors hover:text-foreground"
            >
              {zoom}%
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => applyZoom(zoom + ZOOM_STEP)}
              disabled={zoom >= ZOOM_MAX}
              className="flex h-5 w-5 items-center justify-center rounded transition-colors hover:bg-black/5 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 overflow-auto bg-[#f5f5f5] p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mountedImage.src}
            alt={mountedImage.alt}
            className="m-auto shrink-0 max-w-none"
            style={{ width: layout.imgWidth, height: layout.imgHeight }}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function CaseStudyContent({ project }: { project: Project }) {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(
    null,
  );
  const [lightboxOrigin, setLightboxOrigin] = useState<Rect | null>(null);

  function openLightbox(
    e: ReactMouseEvent<HTMLButtonElement>,
    img: LightboxImage,
  ) {
    const r = e.currentTarget.getBoundingClientRect();
    setLightboxOrigin({ x: r.x, y: r.y, width: r.width, height: r.height });
    setLightboxImage(img);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-20">
      <header className="flex flex-col gap-6">
        <span className="text-sm text-muted">{project.title}</span>
        <h1 className="text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.description}
        </h1>
        <div className="flex flex-wrap gap-x-16 gap-y-6 border-t border-border pt-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">
              Role
            </span>
            <span>{project.role}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">
              Tools
            </span>
            <span>{project.tools}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-muted">
              Skills
            </span>
            <span>{project.tags.join(", ")}</span>
          </div>
        </div>
      </header>

      {project.image && (
        <button
          type="button"
          onClick={(e) =>
            openLightbox(e, {
              src: project.image!,
              alt: project.imageAlt ?? project.title,
              width: project.imageWidth ?? 1600,
              height: project.imageHeight ?? 1000,
            })
          }
          aria-label={`View larger image: ${project.imageAlt ?? project.title}`}
          className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-[#f5f5f5]"
        >
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover object-top transition-opacity duration-150 ease-[var(--ease-out)] group-hover:opacity-90"
            sizes="640px"
            priority
          />
        </button>
      )}

      <div className="flex flex-col gap-12">
        {project.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-medium tracking-tight">
              {section.heading}
            </h2>
            {section.body.length > 1 ? (
              <ul className="flex flex-col gap-3">
                {section.body.map((line) => (
                  <li
                    key={line}
                    className="font-mono text-sm leading-relaxed text-muted"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-sm leading-relaxed text-muted">
                {section.body[0]}
              </p>
            )}

            {section.images && section.images.length > 0 && (
              <div className="flex flex-col gap-6">
                {section.images.map((image) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={(e) =>
                      openLightbox(e, {
                        src: image.src,
                        alt: image.alt,
                        width: image.width,
                        height: image.height,
                      })
                    }
                    aria-label={`View larger image: ${image.alt}`}
                    className="group block w-full cursor-zoom-in overflow-hidden bg-[#f5f5f5]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-auto w-full transition-opacity duration-150 ease-[var(--ease-out)] group-hover:opacity-90"
                      sizes="640px"
                    />
                  </button>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {project.gallery.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={(e) =>
                openLightbox(e, {
                  src: image.src,
                  alt: image.alt,
                  width: image.width,
                  height: image.height,
                })
              }
              aria-label={`View larger image: ${image.alt}`}
              className="group relative block aspect-[9/16] cursor-zoom-in overflow-hidden bg-[#f5f5f5]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-150 ease-[var(--ease-out)] group-hover:opacity-90"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        image={lightboxImage}
        origin={lightboxOrigin}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
