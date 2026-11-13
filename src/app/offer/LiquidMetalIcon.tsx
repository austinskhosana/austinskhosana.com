"use client";

import dynamic from "next/dynamic";
import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type SVGProps,
} from "react";
import {
  ChatBubbleOvalLeftIcon,
  PlayIcon,
  PlayPauseIcon,
} from "@heroicons/react/24/solid";

const LiquidMetal = dynamic(
  () =>
    import("@paper-design/shaders-react").then((module) => module.LiquidMetal),
  { ssr: false },
);

type IconComponent = ReturnType<typeof forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>>;

const BoardIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function BoardIcon(props, ref) {
    return (
      <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="2" y="3" width="20" height="3.5" rx="1.3" />
        <rect x="2" y="8.5" width="5.2" height="12.5" rx="1.4" />
        <rect x="9.4" y="8.5" width="5.2" height="12.5" rx="1.4" />
        <rect x="16.8" y="8.5" width="5.2" height="9" rx="1.4" />
      </svg>
    );
  },
);

const ApprovalTileIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function ApprovalTileIcon(props, ref) {
    return (
      <svg ref={ref} viewBox="0 0 24 24" fill="currentColor" {...props}>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      </svg>
    );
  },
);

const DollarSignIcon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  function DollarSignIcon(props, ref) {
    return (
      <svg ref={ref} viewBox="0 0 16 16" fill="currentColor" {...props}>
        <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.7c1.217.124 1.808.777 1.9 1.569h1.656c-.1-1.596-1.422-2.74-3.556-2.875V1H7.591v1.413c-1.914.145-3.315 1.24-3.315 2.845 0 1.58.947 2.449 2.89 2.945l.425.11v3.836c-1.296-.173-1.858-.89-1.96-1.368H4Zm3.591-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.599 1.6-1.73v3.346Zm1.043 1.634c1.23.335 1.852.889 1.852 1.736 0 1.06-.793 1.716-1.852 1.835V8.58Z" />
      </svg>
    );
  },
);

const icons: Record<
  "start" | "queue" | "approve" | "updates" | "pricing" | "pause",
  { icon: IconComponent; overlay?: "check" }
> = {
  start: { icon: PlayIcon },
  queue: { icon: BoardIcon },
  approve: { icon: ApprovalTileIcon, overlay: "check" },
  updates: { icon: ChatBubbleOvalLeftIcon },
  pricing: { icon: DollarSignIcon },
  pause: { icon: PlayPauseIcon },
};

export type LiquidMetalIconName = keyof typeof icons;

export function LiquidMetalIcon({
  name,
  label,
}: {
  name: LiquidMetalIconName;
  label: string;
}) {
  const { icon: Icon, overlay } = icons[name];
  const iconRef = useRef<SVGSVGElement>(null);
  const [iconUrl, setIconUrl] = useState("");

  useLayoutEffect(() => {
    if (!iconRef.current) return;

    const svg = iconRef.current.cloneNode(true) as SVGSVGElement;
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "1024");
    svg.setAttribute("height", "1024");
    svg.setAttribute("fill", "#ffffff");
    svg.setAttribute("color", "#ffffff");
    svg.removeAttribute("class");
    svg.removeAttribute("style");

    setIconUrl(
      `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.outerHTML)}`,
    );
  }, [Icon]);

  return (
    <div
      className="relative h-48 w-48 shrink-0"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : "true"}
    >
      <Icon
        ref={iconRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      {iconUrl && (
        <LiquidMetal
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          width="100%"
          height="100%"
          image={iconUrl}
          colorBack="#aaaaac00"
          colorTint="#ffffff"
          shape="diamond"
          repetition={2}
          softness={0.1}
          shiftRed={0.3}
          shiftBlue={0.3}
          distortion={0.07}
          contour={0.4}
          angle={70}
          speed={1}
          scale={0.6}
          rotation={0}
          offsetX={0}
          offsetY={0}
          fit="contain"
          maxPixelCount={180_000}
        />
      )}
      {overlay === "check" && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5.5 12.5 4.1 4.1L18.8 7" />
        </svg>
      )}
    </div>
  );
}
