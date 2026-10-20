"use client";

import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";

export function Nav() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/work/");

  return (
    <header>
      <div
        className={`flex items-center px-6 pt-12 pb-5 sm:px-8 md:px-12 ${
          isCaseStudy ? "justify-center" : "justify-start"
        }`}
      >
        <Logo />
      </div>
    </header>
  );
}
