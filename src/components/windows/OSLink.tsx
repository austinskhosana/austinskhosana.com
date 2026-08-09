"use client";

import Link from "next/link";
import { forwardRef } from "react";
import type { ComponentProps } from "react";
import { useIsDesktop } from "./useIsDesktop";
import { useWindowManager } from "./WindowManagerContext";
import type { WindowKey } from "./registry";

export const OSLink = forwardRef<
  HTMLAnchorElement,
  { windowKey: WindowKey } & ComponentProps<typeof Link>
>(function OSLink({ windowKey, onClick, ...linkProps }, ref) {
  const isDesktop = useIsDesktop();
  const { openWindow } = useWindowManager();

  return (
    <Link
      {...linkProps}
      ref={ref}
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
});
