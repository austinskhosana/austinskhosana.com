"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import type { ComponentType, SVGProps } from "react";
import { OSLink } from "@/components/windows/OSLink";
import { useIsDesktop } from "@/components/windows/useIsDesktop";
import { useWindowManager } from "@/components/windows/WindowManagerContext";
import type { WindowKey } from "@/components/windows/registry";
import { CaseStudyMobileNav } from "@/components/CaseStudyMobileNav";

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="3.5" y="9" width="3.5" height="11.5" rx="0.5" />
      <circle cx="5.25" cy="4.75" r="2" />
      <path d="M11 20.5V9h3.3v1.6c.6-1 1.7-1.85 3.4-1.85 2.5 0 4.3 1.65 4.3 5.2v6.55h-3.5v-6.1c0-1.6-.6-2.6-1.95-2.6-1.1 0-1.75.75-2.05 1.45-.1.25-.13.6-.13.95v6.3H11Z" />
    </svg>
  );
}

const items: {
  href: string;
  label: string;
  external?: boolean;
  windowKey?: WindowKey;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/about-me", label: "About", windowKey: "about-me", Icon: UserIcon },
  {
    href: "/playground",
    label: "Playground",
    windowKey: "playground",
    Icon: BeakerIcon,
  },
  {
    href: "https://github.com/austinskhosana",
    label: "GitHub",
    external: true,
    Icon: GitHubIcon,
  },
  {
    href: "https://www.linkedin.com/in/austinskhosana/",
    label: "LinkedIn",
    external: true,
    Icon: LinkedInIcon,
  },
  { href: "/blog", label: "Blog", windowKey: "blog", Icon: LightBulbIcon },
];

export function FloatingDock() {
  const isDesktop = useIsDesktop();
  const { windows, closeAllWindows } = useWindowManager();
  const hasOpenWindows = windows.length > 0;
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // A case study is always a real page (not a window), so the full dock
  // gives way to a focused prev/home/next rail on every screen size.
  const caseStudySlug = pathname.match(/^\/work\/([^/]+)$/)?.[1];
  if (caseStudySlug) {
    return <CaseStudyMobileNav slug={caseStudySlug} />;
  }

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-40 backdrop-blur-xl [mask-image:linear-gradient(to_top,black,transparent)] [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-10 z-50 flex justify-center">
        <nav
          className="pointer-events-auto flex items-end gap-1.5 rounded-full border border-white/70 bg-white/85 p-1.5 shadow-xl shadow-black/10 ring-1 ring-black/5 backdrop-blur-xl sm:gap-2 sm:p-2"
          onPointerLeave={() => setHoveredIndex(null)}
        >
          {items.map((item, index) => {
            const isRouteActive =
              !item.external &&
              (pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`)));
            const hoverDistance =
              hoveredIndex === null ? Number.POSITIVE_INFINITY : Math.abs(hoveredIndex - index);
            const dockMotionClass =
              hoverDistance === 0
                ? "[--dock-scale:1.12] [--dock-y:-7px]"
                : hoverDistance === 1
                  ? "[--dock-scale:1.045] [--dock-y:-2px]"
                  : "[--dock-scale:1] [--dock-y:0px]";
            const className = [
              dockMotionClass,
              "flex h-11 w-11 items-center justify-center rounded-full border [transform:translate3d(0,var(--dock-y),0)_scale(var(--dock-scale))] transition-[transform,background-color,border-color,color,box-shadow] duration-[170ms] ease-[var(--ease-out)] will-change-transform active:[--dock-scale:0.97] active:[--dock-y:0px] motion-reduce:[--dock-scale:1] motion-reduce:[--dock-y:0px] motion-reduce:transition-colors motion-reduce:active:[--dock-scale:1] sm:h-[52px] sm:w-[52px]",
              "border-border bg-white text-muted shadow-sm shadow-black/5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-border [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f1f1f1] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md",
            ].join(" ");

            const tooltip = (
              <span
                role="presentation"
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground opacity-0 shadow-lg shadow-black/5 transition-[transform,opacity] duration-150 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:translate-y-0"
              >
                {item.label}
              </span>
            );

            if (item.windowKey) {
              return (
                <div
                  key={item.href}
                  className="group relative"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHoveredIndex(index);
                  }}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                >
                  {tooltip}
                  <OSLink
                    href={item.href}
                    windowKey={item.windowKey}
                    aria-label={item.label}
                    aria-current={isRouteActive ? "page" : undefined}
                    className={className}
                  >
                    <item.Icon className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" strokeWidth={1.8} />
                  </OSLink>
                </div>
              );
            }

            return (
              <div key={item.href} className="group relative">
                {tooltip}
                <Link
                  href={item.href}
                  aria-label={item.label}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={className}
                  aria-current={isRouteActive ? "page" : undefined}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHoveredIndex(index);
                  }}
                  onFocus={() => setHoveredIndex(index)}
                  onBlur={() => setHoveredIndex(null)}
                  onClick={(e) => {
                    if (item.href === "/" && isDesktop && hasOpenWindows) {
                      e.preventDefault();
                      closeAllWindows();
                    }
                  }}
                >
                  <item.Icon className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" strokeWidth={1.8} />
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
