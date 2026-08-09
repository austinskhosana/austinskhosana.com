"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  BeakerIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
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

  // On mobile/tablet, a case study is a real page rather than a window, so
  // the full dock gives way to a focused prev/home/next rail — mirroring
  // the dedicated CaseStudyNav rail desktop windows get.
  const caseStudySlug = !isDesktop
    ? pathname.match(/^\/work\/([^/]+)$/)?.[1]
    : undefined;
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
        <nav className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-white/90 p-2 shadow-lg shadow-black/5 backdrop-blur">
          {items.map((item) => {
            const className =
              "flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-border hover:bg-[#e5e5e5] hover:text-foreground";

            const tooltip = (
              <span
                role="presentation"
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 scale-95 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground opacity-0 shadow-lg shadow-black/5 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
              >
                {item.label}
              </span>
            );

            if (item.windowKey) {
              return (
                <div key={item.href} className="group relative">
                  {tooltip}
                  <OSLink
                    href={item.href}
                    windowKey={item.windowKey}
                    aria-label={item.label}
                    className={className}
                  >
                    <item.Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
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
                  onClick={(e) => {
                    if (item.href === "/" && isDesktop && hasOpenWindows) {
                      e.preventDefault();
                      closeAllWindows();
                    }
                  }}
                >
                  <item.Icon className="h-[22px] w-[22px]" strokeWidth={1.8} />
                </Link>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
