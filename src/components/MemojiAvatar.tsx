"use client";

import { useEffect, useRef } from "react";

export function MemojiAvatar() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-[#f5f5f5]">
      <video
        ref={videoRef}
        src="/videos/memoji.mov"
        className="h-full w-full scale-[1.2] object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
