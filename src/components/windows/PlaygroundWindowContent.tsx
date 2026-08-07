"use client";

import { useEffect, useState } from "react";
import { projects } from "@/lib/data";

type DocStep = {
  kind: "doc";
  command: string;
  output: string[];
};

type ListingStep = {
  kind: "listing";
  command: string;
  items: { name: string; slug: string }[];
};

type CdStep = {
  kind: "cd";
  command: string;
};

type ProjectStep = {
  kind: "project";
  command: string;
  slug: string;
};

type Step = DocStep | ListingStep | CdStep | ProjectStep;

const PROJECT_ITEMS = [
  { name: "project 1", slug: "pixelvault" },
  { name: "project 2", slug: "thespectator" },
  { name: "project 3", slug: "comments-moderation" },
  { name: "project 4", slug: "spectra-2" },
];

const BASE_STEPS: Step[] = [
  {
    kind: "doc",
    command: "cat playground.md",
    output: [
      "# The Playground",
      "A collection of my design explorations across illustration, design and code.",
    ],
  },
  {
    kind: "listing",
    command: "ls ./projects",
    items: PROJECT_ITEMS,
  },
];

const TYPE_SPEED = 45;
const OUTPUT_DELAY = 300;

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
      <span className="text-muted">~/playground</span>
      <span className="text-muted">$</span>{" "}
    </>
  );
}

function StepOutput({
  step,
  onOpenProject,
  onGoBack,
}: {
  step: Step;
  onOpenProject: (slug: string) => void;
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
        {step.items.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => onOpenProject(item.slug)}
            className="w-fit text-left text-foreground underline underline-offset-2 transition-colors hover:text-accent"
          >
            {item.name}
          </button>
        ))}
      </>
    );
  }

  if (step.kind === "cd") {
    return null;
  }

  const project = projects.find((p) => p.slug === step.slug);
  if (!project) return null;

  return (
    <>
      <p className="text-foreground">{project.title}</p>
      <p className="text-muted">{project.description}</p>
      <p className="text-muted">Role: {project.role}</p>
      <p className="text-muted">Tools: {project.tools}</p>
      <p className="text-muted">Tags: {project.tags.join(", ")}</p>
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

export function PlaygroundWindowContent() {
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

  function openProject(slug: string) {
    setSteps((prev) => [
      ...prev,
      { kind: "cd", command: `cd ./projects/${slug}` },
      { kind: "project", command: "cat readme.md", slug },
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
            <StepOutput
              step={step}
              onOpenProject={openProject}
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
