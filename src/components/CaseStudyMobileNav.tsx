"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { projects } from "@/lib/data";

export function CaseStudyMobileNav({ slug }: { slug: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigableProjects = projects.filter((project) => !project.hiddenFromHome);
  const index = navigableProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev =
    navigableProjects[
      (index - 1 + navigableProjects.length) % navigableProjects.length
    ];
  const next = navigableProjects[(index + 1) % navigableProjects.length];

  const items = [
    {
      href: `/work/${prev.slug}`,
      label: `Previous case study: ${prev.title}`,
      tooltip: "Previous",
      Icon: ArrowLeftCircleIcon,
    },
    {
      href: "/",
      label: "Home",
      tooltip: "Home",
      Icon: HomeIcon,
    },
    {
      href: `/work/${next.slug}`,
      label: `Next case study: ${next.title}`,
      tooltip: "Next",
      Icon: ArrowRightCircleIcon,
    },
  ];

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
          {items.map((item, itemIndex) => {
            const hoverDistance =
              hoveredIndex === null
                ? Number.POSITIVE_INFINITY
                : Math.abs(hoveredIndex - itemIndex);
            const dockMotionClass =
              hoverDistance === 0
                ? "[--dock-scale:1.12] [--dock-y:-7px]"
                : hoverDistance === 1
                  ? "[--dock-scale:1.045] [--dock-y:-2px]"
                  : "[--dock-scale:1] [--dock-y:0px]";
            const buttonClass = [
              dockMotionClass,
              "flex h-11 w-11 items-center justify-center rounded-full border [transform:translate3d(0,var(--dock-y),0)_scale(var(--dock-scale))] transition-[transform,background-color,border-color,color,box-shadow] duration-[170ms] ease-[var(--ease-out)] will-change-transform active:[--dock-scale:0.97] active:[--dock-y:0px] motion-reduce:[--dock-scale:1] motion-reduce:[--dock-y:0px] motion-reduce:transition-colors motion-reduce:active:[--dock-scale:1] sm:h-[52px] sm:w-[52px]",
              "border-border bg-white text-muted shadow-sm shadow-black/5 [@media(hover:hover)_and_(pointer:fine)]:hover:border-border [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#f1f1f1] [@media(hover:hover)_and_(pointer:fine)]:hover:text-foreground [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-md",
            ].join(" ");

            return (
              <div
                key={item.href}
                className="group relative"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHoveredIndex(itemIndex);
                }}
                onFocus={() => setHoveredIndex(itemIndex)}
                onBlur={() => setHoveredIndex(null)}
              >
                <span
                  role="presentation"
                  className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs whitespace-nowrap text-foreground opacity-0 shadow-lg shadow-black/5 transition-[transform,opacity] duration-150 ease-[var(--ease-out)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:translate-y-0"
                >
                  {item.tooltip}
                </span>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={buttonClass}
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
