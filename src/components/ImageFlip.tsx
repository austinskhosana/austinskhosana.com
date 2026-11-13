"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageFlipProps = {
  images: string[];
  alt?: string;
  intervalMs?: number;
};

/**
 * Instantly cycles through a set of images without fading between frames.
 * Pass at least two image paths to get the looping effect.
 */
export function ImageFlip({
  images,
  alt = "",
  intervalMs = 1200,
}: ImageFlipProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || images.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs, reducedMotion]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-full w-full">
      <Image
        src={images[index]}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 76vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
