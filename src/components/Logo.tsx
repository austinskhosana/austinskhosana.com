"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { useWindowManager } from "@/components/windows/WindowManagerContext";

export function Logo() {
  const { windows, closeAllWindows } = useWindowManager();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const isModifiedClick =
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
    if (!isModifiedClick && windows.length > 0) closeAllWindows();
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-2 text-[15px] font-medium text-foreground"
    >
      <span aria-hidden className="text-lg leading-none">
        ✽
      </span>
      <span className="font-normal">Austin Skhosana</span>
    </Link>
  );
}
