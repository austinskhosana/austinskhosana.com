"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useIsDesktop } from "./useIsDesktop";
import { useWindowManager } from "./WindowManagerContext";
import type { WindowKey } from "./registry";

export function OSLink({
  windowKey,
  onClick,
  ...linkProps
}: { windowKey: WindowKey } & ComponentProps<typeof Link>) {
  const isDesktop = useIsDesktop();
  const { openWindow } = useWindowManager();

  return (
    <Link
      {...linkProps}
      onClick={(e) => {
        if (isDesktop) {
          e.preventDefault();
          const rect = e.currentTarget.getBoundingClientRect();
          openWindow(windowKey, {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          });
        }
        onClick?.(e);
      }}
    />
  );
}
