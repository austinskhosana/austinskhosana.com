"use client";

import { useEffect, useRef } from "react";

export function CoverVideo({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      className="max-h-full max-w-full rounded-2xl border border-border shadow-lg shadow-black/5"
      style={{ aspectRatio: `${width} / ${height}` }}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}
