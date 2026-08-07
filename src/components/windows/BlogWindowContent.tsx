"use client";

import { useEffect, useState } from "react";
import { blogPosts } from "@/lib/data";

type DocStep = {
  kind: "doc";
  command: string;
  output: string[];
};

type ListingStep = {
  kind: "listing";
  command: string;
};

type CdStep = {
  kind: "cd";
  command: string;
};

type PostStep = {
  kind: "post";
  command: string;
  slug: string;
};

type Step = DocStep | ListingStep | CdStep | PostStep;

const BASE_STEPS: Step[] = [
  {
    kind: "doc",
    command: "cat blog.md",
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
  onOpenPost,
  onGoBack,
}: {
  step: Step;
  onOpenPost: (slug: string) => void;
  onGoBack: () => void;
}) {
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
    return (
      <>
        {blogPosts.map((post) => (
          <button
            key={post.slug}
            type="button"
            onClick={() => onOpenPost(post.slug)}
            className="group flex w-full items-baseline justify-between gap-4 text-left"
          >
            <span className="text-foreground underline underline-offset-2 transition-colors group-hover:text-accent">
              {post.title}
            </span>
            <span className="whitespace-nowrap text-muted">
              {formatDate(post.date)}
            </span>
          </button>
        ))}
      </>
    );
  }

  if (step.kind === "cd") {
    return null;
  }

  const post = blogPosts.find((p) => p.slug === step.slug);
  if (!post) return null;

  return (
    <>
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
        className="w-fit text-muted transition-colors hover:text-foreground"
      >
        ← cd ..
      </button>
    </>
  );
}

export function BlogWindowContent() {
  const [steps, setSteps] = useState<Step[]>(BASE_STEPS);
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

  function openPost(slug: string) {
    setSteps((prev) => [
      ...prev,
      { kind: "cd", command: `cd ./posts/${slug}` },
      { kind: "post", command: "cat post.md", slug },
    ]);
  }

  function goBack() {
    setSteps((prev) => [...prev, { kind: "cd", command: "cd .." }]);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed">
        {steps.slice(0, completed).map((step, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className="text-foreground">
              <PromptPrefix />
              {step.command}
            </p>
            <StepOutput step={step} onOpenPost={openPost} onGoBack={goBack} />
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
