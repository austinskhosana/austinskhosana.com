"use client";

import { useRef } from "react";
import { useAutoplayVideo } from "@/components/useAutoplayVideo";

export function CoverVideo({
  src,
  alt,
  width,
  height,
  fill = false,
  scale = 1.25,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Edge-to-edge, cropped, no border/shadow — for covers meant to bleed to
  // the tray's edges instead of floating inside it as a framed object.
  fill?: boolean;
  // Only applies when `fill` is set — crop-in amount so the cropped edges
  // don't show empty space for clips that don't quite cover the tray.
  scale?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef);

  if (fill) {
    return (
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        className="h-full w-full object-cover"
        style={{ transform: `scale(${scale})` }}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

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
