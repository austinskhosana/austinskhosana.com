"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { useAutoplayVideo } from "@/components/useAutoplayVideo";

export function CoverVideo({
  src,
  alt,
  width,
  height,
  fill = false,
  scale = 1.25,
  bordered = true,
  rounded = true,
  darkBorder = false,
  fitWidth = false,
  gamingFrame = false,
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
  // Only applies when `fill` is unset — drop the rounded corners,
  // border, and shadow, while still floating inside the grey tray.
  bordered?: boolean;
  rounded?: boolean;
  darkBorder?: boolean;
  fitWidth?: boolean;
  gamingFrame?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef);

  if (fill) {
    const video = (
      <video
        ref={videoRef}
        src={src}
        aria-label={alt}
        className={
          gamingFrame
            ? "h-full w-full object-cover"
            : fitWidth
              ? "h-full w-full object-contain"
              : "h-full w-full object-cover"
        }
        style={fitWidth ? undefined : { transform: `scale(${scale})` }}
        autoPlay
        loop
        muted
        playsInline
      />
    );

    return gamingFrame ? <GamingDeviceFrame>{video}</GamingDeviceFrame> : video;
  }

  const video = (
    <video
      ref={videoRef}
      src={src}
      aria-label={alt}
      className={`block max-h-full max-w-full ${rounded ? "rounded-2xl" : ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
      autoPlay
      loop
      muted
      playsInline
    />
  );

  const framedVideo = bordered ? (
    <div
      className={`max-h-full max-w-full border ${darkBorder ? "border-foreground/25" : "border-border"}`}
    >
      {video}
    </div>
  ) : (
    video
  );

  return gamingFrame ? <GamingDeviceFrame>{framedVideo}</GamingDeviceFrame> : framedVideo;
}

function GamingDeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-[1304/748] w-[82%] max-w-[1040px]">
      <div
        className="absolute overflow-hidden rounded-[1.2%] bg-black"
        style={{
          left: "11.58%",
          top: "6.82%",
          width: "76.84%",
          height: "83.96%",
        }}
      >
        {children}
      </div>
      <Image
        src="/images/imagegen/the-scene-device-frame.png"
        alt=""
        fill
        className="pointer-events-none select-none object-contain"
        sizes="(min-width: 1120px) 878px, 82vw"
        draggable={false}
      />
    </div>
  );
}
