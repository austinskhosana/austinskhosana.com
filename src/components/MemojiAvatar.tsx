"use client";

import { useRef } from "react";
import { useAutoplayVideo } from "@/components/useAutoplayVideo";

export function MemojiAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useAutoplayVideo(videoRef);

  return (
    <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-[#f5f5f5]">
      <video
        ref={videoRef}
        src="/videos/memoji.mp4"
        className="h-full w-full scale-[1.2] object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
