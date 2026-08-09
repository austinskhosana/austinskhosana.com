"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { blogPosts } from "@/lib/data";
import { useWindowManager } from "./WindowManagerContext";
import { OSLink } from "./OSLink";
import type { WindowKey } from "./registry";

type DocStep = {
  kind: "doc";
  command: string;
  output: string[];
};

type ListingStep = {
  kind: "listing";
  command: string;
};

type PostStep = {
  kind: "post";
  command: string;
  slug: string;
};

type Step = DocStep | ListingStep | PostStep;

const ASCII_ART = `      ..          ..
. uW8"      x .d88"
\`t888        5888R          u.
 8888   .    '888R    ...ue888b       uL
 9888.z88N    888R    888R Y888r  .ue888Nc..
 9888  888E   888R    888R I888> d88E\`"888E\`
 9888  888E   888R    888R I888> 888E  888E
 9888  888E   888R    888R I888> 888E  888E
 9888  888E   888R   u8888cJ888  888E  888E
.8888  888"  .888B .  "*888*P"   888& .888E
 \`%888*%"    ^*888%     'Y"      *888" 888&
    "\`         "%                 \`"   "888E
                                 .dWi   \`88E
                                 4888~  J8%
                                  ^"===*"\`   "`;

const BASE_STEPS: Step[] = [
  {
    kind: "doc",
    command: "open blog.md",
    output: [
      "# Blog",
      "Notes on design, code, and the tools shaping how I build.",
    ],
  },
  {
    kind: "listing",
    command: "ls ./posts",
  },
];

const TYPE_SPEED = 45;
const OUTPUT_DELAY = 300;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Cursor() {
  return (
    <span
      className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-foreground align-middle"
      style={{ animation: "blink 1s step-end infinite" }}
      aria-hidden
    />
  );
}

function PromptPrefix() {
  return (
    <>
      <span className="text-accent">austin@portfolio</span>
      <span className="text-muted">:</span>
      <span className="text-muted">~/blog</span>
      <span className="text-muted">$</span>{" "}
    </>
  );
}

function StepOutput({
  step,
  isActive,
  onGoBack,
}: {
  step: Step;
  isActive: boolean;
  onGoBack: () => void;
}) {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const cdBufferRef = useRef("");

  useEffect(() => {
    if (isActive && step.kind === "listing") {
      itemRefs.current[0]?.focus();
    }
  }, [isActive, step.kind]);

  if (step.kind === "doc") {
    return (
      <>
        <p className="text-foreground">{step.output[0]}</p>
        {step.output.slice(1).map((line) => (
          <p key={line} className="text-muted">
            {line}
          </p>
        ))}
      </>
    );
  }

  if (step.kind === "listing") {
    function handleKeyDown(
      event: KeyboardEvent<HTMLAnchorElement>,
      index: number,
    ) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const next = itemRefs.current[index + 1] ?? itemRefs.current[0];
        next?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const prev =
          itemRefs.current[index - 1] ??
          itemRefs.current[itemRefs.current.length - 1];
        prev?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        itemRefs.current[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        itemRefs.current[itemRefs.current.length - 1]?.focus();
      }
    }

    return (
      <>
        {blogPosts.map((post, index) => (
          <OSLink
            key={post.slug}
            ref={(el: HTMLAnchorElement | null) => {
              itemRefs.current[index] = el;
            }}
            href={`/blog/${post.slug}`}
            windowKey={`blog:${post.slug}`}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="group flex w-full items-baseline justify-between gap-4 text-left focus:outline-none focus-visible:bg-foreground focus-visible:text-white"
          >
            <span className="text-foreground underline underline-offset-2 transition-colors group-hover:text-accent group-focus-visible:text-white">
              {post.title}
            </span>
            <span className="whitespace-nowrap text-muted group-focus-visible:text-white/70">
              {formatDate(post.date)}
            </span>
          </OSLink>
        ))}
      </>
    );
  }

  const post = blogPosts.find((p) => p.slug === step.slug);
  if (!post) return null;

  return (
    <>
      {post.image && post.imageWidth && post.imageHeight && (
        <Image
          src={post.image}
          alt={post.imageAlt ?? post.title}
          width={post.imageWidth}
          height={post.imageHeight}
          quality={100}
          className="h-auto w-full"
          sizes="(min-width: 672px) 592px, 100vw"
        />
      )}
      <p className="text-foreground">{post.title}</p>
      <p className="text-muted">{formatDate(post.date)}</p>
      {post.body.map((paragraph, i) => (
        <p key={i} className="text-muted">
          {paragraph}
        </p>
      ))}
      <button
        type="button"
        onClick={onGoBack}
        onKeyDown={(event) => {
          if (event.key === "Backspace") {
            event.preventDefault();
            onGoBack();
            return;
          }
          if (/^[a-zA-Z]$/.test(event.key)) {
            cdBufferRef.current = (cdBufferRef.current + event.key)
              .slice(-2)
              .toLowerCase();
            if (cdBufferRef.current === "cd") {
              event.preventDefault();
              onGoBack();
            }
          } else {
            cdBufferRef.current = "";
          }
        }}
        autoFocus={isActive}
        className="w-fit text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground focus-visible:underline"
      >
        ← cd ..
      </button>
    </>
  );
}

export function BlogWindowContent({ initialSlug }: { initialSlug?: string } = {}) {
  const { closeWindow } = useWindowManager();
  const [steps, setSteps] = useState<Step[]>(() =>
    initialSlug
      ? [{ kind: "post", command: "open post.md", slug: initialSlug }]
      : BASE_STEPS,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [completed, setCompleted] = useState(0);

  const allDone = stepIndex >= steps.length;
  const activeStep = steps[stepIndex];
  const commandDone = allDone || typed.length === activeStep.command.length;

  useEffect(() => {
    if (allDone) return;
    if (!commandDone) {
      const timeout = setTimeout(() => {
        setTyped(activeStep.command.slice(0, typed.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setCompleted((c) => c + 1);
      setStepIndex((i) => i + 1);
      setTyped("");
    }, OUTPUT_DELAY);
    return () => clearTimeout(timeout);
  }, [typed, commandDone, allDone, activeStep]);

  // A post window only ever shows a single "post" step (see initial state
  // above), so going back just closes that window instead of navigating
  // back to a listing that was never rendered here.
  function goBack() {
    if (initialSlug) closeWindow(`blog:${initialSlug}` as WindowKey);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed">
        {!initialSlug && (
          <pre
            aria-hidden
            className="mb-10 w-fit font-mono text-[10px] leading-[10px] whitespace-pre text-foreground/70 select-none"
          >
            {ASCII_ART}
          </pre>
        )}

        {steps.slice(0, completed).map((step, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className="text-foreground">
              <PromptPrefix />
              {step.command}
            </p>
            <StepOutput
              step={step}
              isActive={i === completed - 1}
              onGoBack={goBack}
            />
          </div>
        ))}

        <p className="text-foreground">
          <PromptPrefix />
          {!allDone && typed}
          {(allDone || !commandDone) && <Cursor />}
        </p>
      </div>
    </div>
  );
}
