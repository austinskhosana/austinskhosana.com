"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { playgroundItems } from "@/lib/data";
import type { PlaygroundCategory } from "@/lib/data";

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

type ItemStep = {
  kind: "item";
  command: string;
  slug: string;
};

type Step = DocStep | ListingStep | CdStep | ItemStep;

const ASCII_ART = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⠤⢤⣀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠐⣿⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠴⠒⢋⣉⣀⣠⣄⣀⣈⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠄⠀⠀⠀⠀⠀⠀⠀⠀⣸⡆⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⣠⣴⣾⣯⠴⠚⠉⠉⠀⠀⠀⠀⣤⠏⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣄⠀⠀⠀⠀⠀⠀⡿⡇⠁⠀⠀⠀⠀⠀⠀⠀⡀⠂⠀⠀⠀⠀⣠⣴⡿⠿⢛⠁⠁⣸⠀⠀⠀⠀⠀⣤⣾⠵⠚⠁
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠱⢄⠀⠀⣠⠀⡇⢧⠀⠀⠀⠀⠀⠀⠖⠁⠀⠀⠀⣠⣴⠿⠋⠁⠀⠀⠀⠀⠘⣿⠀⣀⡠⠞⠛⠁⠂⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡈⣻⡦⣞⡿⣷⠸⣄⣠⢶⡟⠁⠀⠀⠀⣀⣴⠟⠋⠁⠀⠀⠀⠀⠐⠠⡤⣾⣙⣶⡶⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣂⡷⠰⣔⣾⣖⣾⡷⢿⣀⣀⣀⣤⢾⣋⠁⠀⠀⠀⣀⢀⣀⣀⣀⣀⠀⢀⢿⠑⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠠⡦⠴⠴⠤⠦⠤⠤⠤⠤⠤⠴⠶⢾⣽⣙⠒⢺⣿⣿⣿⣿⢾⠶⣧⡼⢏⠑⠚⠋⠉⠉⡉⡉⠉⠉⠹⠈⠁⠉⠀⠨⢾⡂⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠂⠐⠀⠀⠀⠈⣇⡿⢯⢻⣟⣇⣷⣞⡛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣆⠀⠀⠀⠀⢠⡷⡛⣛⣼⣿⠟⢙⣧⠇⡄⠀⠀⠀⠀⠀⠀⠰⡆⠀⠀⠀⠀⢠⣾⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⢶⠏⠉⠀⠀⠀⠀⠀⠿⢠⣴⡟⡗⡾⡒⡿⠯⢏⡅⠀⠀⠀⠀⣀⢀⣠⣧⣀⣀⠀⠀⠀⠚⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⢴⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⣠⣷⢿⣫⡽⡿⠿⠗⢷⠀⠀⠑⣗⡀⠀⠀⠀⠈⠙⣿⢭⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⡴⢏⡵⠛⠀⠀⠀⠀⠀⠀⠀⣀⣴⠞⠛⠀⠰⡟⣿⠀⡌⠀⠀⠀⠀⠀⠀⠁⠢⡀⠀⠀⠂⢿⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣼⠛⣲⡏⠁⠀⠀⠀⠀⠀⢀⣠⡾⠋⠉⠀⠀⠀⠀⣧⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠣⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⡴⠟⠀⢰⡯⠄⠀⠀⠀⠀⣠⢴⠟⠉⠀⠀⠀⠀⠀⠀⠀⠘⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⡾⠁⠁⠀⠘⠧⠤⢤⣤⠶⠏⠙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠘⣇⠂⢀⣀⣀⠤⠞⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠈⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

const CATEGORIES: PlaygroundCategory[] = [
  "illustration",
  "design",
  "code",
  "artificial-intelligence",
];

function itemsForCategory(category: PlaygroundCategory) {
  return playgroundItems
    .filter((item) => item.category === category)
    .map((item) => ({ name: item.name, slug: item.slug }));
}

const BASE_STEPS: Step[] = [
  {
    kind: "doc",
    command: "open playground.md",
    output: [
      "# The Playground",
      "A collection of my design explorations across illustration, design and code.",
    ],
  },
  ...CATEGORIES.map(
    (category): ListingStep => ({
      kind: "listing",
      command: `ls ./${category}`,
      items: itemsForCategory(category),
    }),
  ),
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
  isActive,
  onOpenItem,
  onGoBack,
}: {
  step: Step;
  isActive: boolean;
  onOpenItem: (slug: string) => void;
  onGoBack: () => void;
}) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
      event: KeyboardEvent<HTMLButtonElement>,
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

    if (step.items.length === 0) {
      return <p className="text-muted">nothing here yet</p>;
    }

    return (
      <>
        {step.items.map((item, index) => (
          <button
            key={item.slug}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            onClick={() => onOpenItem(item.slug)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className="w-fit text-left text-foreground underline underline-offset-2 transition-colors hover:text-accent focus:outline-none focus-visible:bg-foreground focus-visible:text-white"
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

  const item = playgroundItems.find((p) => p.slug === step.slug);
  if (!item) return null;

  return (
    <>
      <p className="text-foreground">{item.name}</p>
      <p className="text-muted">{item.description}</p>
      <p className="text-muted">Category: {item.category}</p>
      <button
        type="button"
        onClick={onGoBack}
        onKeyDown={(event) => {
          if (event.key === "Backspace") {
            event.preventDefault();
            onGoBack();
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

  function openItem(slug: string) {
    const item = playgroundItems.find((p) => p.slug === slug);
    if (!item) return;
    setSteps((prev) => [
      ...prev,
      { kind: "cd", command: `cd ./${item.category}/${slug}` },
      { kind: "item", command: "open readme.md", slug },
    ]);
  }

  function goBack() {
    setSteps((prev) => [...prev, { kind: "cd", command: "cd .." }]);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 pt-3 pb-10">
      <div className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed">
        <pre
          aria-hidden
          className="mb-10 w-fit font-mono text-[6px] leading-[6px] whitespace-pre text-foreground/70 select-none"
        >
          {ASCII_ART}
        </pre>

        {steps.slice(0, completed).map((step, i) => (
          <div key={i} className="flex flex-col gap-2">
            <p className="text-foreground">
              <PromptPrefix />
              {step.command}
            </p>
            <StepOutput
              step={step}
              isActive={i === completed - 1}
              onOpenItem={openItem}
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
