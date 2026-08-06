"use client";

import { useState } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";

const tools = [
  {
    label: "Notion",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#111" />
        <text
          x="12"
          y="16.5"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#fff"
          fontFamily="ui-sans-serif, system-ui"
        >
          N
        </text>
      </svg>
    ),
  },
  {
    label: "Figma",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M9 2h4a3 3 0 0 1 0 6H9V2Z" fill="#F24E1E" />
        <path d="M9 8h4a3 3 0 0 1 0 6H9V8Z" fill="#A259FF" />
        <path d="M9 14h4v3a3 3 0 1 1-4-2.83V14Z" fill="#0ACF83" />
        <path d="M2 5a3 3 0 0 1 3-3h4v6H5a3 3 0 0 1-3-3Z" fill="#FF7262" />
        <circle cx="9" cy="11" r="3" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    label: "Photoshop",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#001E36" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#31A8FF"
          fontFamily="ui-sans-serif, system-ui"
        >
          Ps
        </text>
      </svg>
    ),
  },
  {
    label: "After Effects",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#00005B" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#9999FF"
          fontFamily="ui-sans-serif, system-ui"
        >
          Ae
        </text>
      </svg>
    ),
  },
  {
    label: "Illustrator",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#330000" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#FF9A00"
          fontFamily="ui-sans-serif, system-ui"
        >
          Ai
        </text>
      </svg>
    ),
  },
  {
    label: "CSS3",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2Z" fill="#1572B6" />
        <path d="M12 4v16.4l6-1.65L19.2 4H12Z" fill="#33A9DC" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="#fff"
          fontFamily="ui-sans-serif, system-ui"
        >
          3
        </text>
      </svg>
    ),
  },
  {
    label: "Framer",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A0A0A" />
        <path d="M7 6h10v4.5H11.5L17 15.5H11.5V19L7 14.5V10h4.5L7 6Z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "HTML5",
    node: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M3 2h18l-1.6 18L12 22l-7.4-2L3 2Z" fill="#E44D26" />
        <path d="M12 4v16.4l6-1.65L19.2 4H12Z" fill="#F16529" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fill="#fff"
          fontFamily="ui-sans-serif, system-ui"
        >
          5
        </text>
      </svg>
    ),
  },
];

const track = [...tools, ...tools];

export function ToolStack() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
      >
        {playing ? (
          <PauseIcon className="h-3 w-3" />
        ) : (
          <PlayIcon className="h-3 w-3" />
        )}
        Tool Stack
      </button>
      <div
        className="w-64 overflow-hidden sm:w-72"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max items-center gap-3"
          style={{
            animation: "marquee 16s linear infinite",
            animationPlayState: playing ? "running" : "paused",
          }}
        >
          {track.map((tool, i) => (
            <div
              key={`${tool.label}-${i}`}
              title={tool.label}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white"
            >
              {tool.node}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
