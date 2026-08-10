"use client";

import Link from "next/link";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { projects } from "@/lib/data";

export function CaseStudyMobileNav({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const buttonClass =
    "flex h-[52px] w-[52px] items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-border hover:bg-[#e5e5e5] hover:text-foreground";

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-40 backdrop-blur-xl [mask-image:linear-gradient(to_top,black,transparent)] [-webkit-mask-image:linear-gradient(to_top,black,transparent)]"
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-10 z-50 flex justify-center">
        <nav className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-white p-2 shadow-lg shadow-black/5">
          <Link
            href={`/work/${prev.slug}`}
            aria-label={`Previous case study: ${prev.title}`}
            className={buttonClass}
          >
            <ArrowLeftCircleIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </Link>
          <Link href="/" aria-label="Home" className={buttonClass}>
            <HomeIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </Link>
          <Link
            href={`/work/${next.slug}`}
            aria-label={`Next case study: ${next.title}`}
            className={buttonClass}
          >
            <ArrowRightCircleIcon className="h-[22px] w-[22px]" strokeWidth={1.8} />
          </Link>
        </nav>
      </div>
    </>
  );
}
