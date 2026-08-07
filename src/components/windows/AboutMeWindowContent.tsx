import { Terminal, type TerminalStep } from "@/components/terminal/Terminal";

const STEPS: TerminalStep[] = [
  {
    command: "cat about.md",
    output: (
      <>
        <p className="text-foreground">
          Hi there! I&apos;m Austin Skhosana, a designer based in
          Johannesburg, South Africa.
        </p>
        <p className="text-muted">
          My practice bridges high-fidelity mocks and increasingly shares
          syntax and code prototypes for frontend work that Figma cannot
          fully capture. I care more about developer experience than
          conventional design talking points.
        </p>
        <p className="text-muted">
          I focus on cross-functional collaboration, championing the
          material software exists in, and the people who help us
          designers ship it to users.
        </p>
      </>
    ),
  },
];

export function AboutMeWindowContent() {
  return <Terminal path="~/about-me" steps={STEPS} />;
}
