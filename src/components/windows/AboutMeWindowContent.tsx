import Link from "next/link";
import { ToolStack } from "@/components/ToolStack";

const interests = ["Drawing", "Coding", "Reading"];

export function AboutMeWindowContent() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-16 px-6 py-20">
      <section className="flex flex-col gap-6">
        <h1 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi there! I&apos;m Austin Skhosana, a designer based in
          Johannesburg, South Africa.
        </h1>
        <p className="font-mono text-sm leading-relaxed text-muted">
          My practice bridges high-fidelity mocks and increasingly shares
          syntax and code prototypes for frontend work that Figma cannot
          fully capture. I care more about developer experience than
          conventional design talking points.
        </p>
        <p className="font-mono text-sm leading-relaxed text-muted">
          I focus on cross-functional collaboration, championing the
          material software exists in, and the people who help us
          designers ship it to users.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-medium tracking-tight">Interests</h2>
        <div className="flex gap-3">
          {interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-border px-4 py-1.5 text-sm text-muted"
            >
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-xl font-medium tracking-tight">
          Featured Project — Pixel Vault
        </h2>
        <p className="font-mono text-sm leading-relaxed text-muted">
          Pixel Vault is a storage solution I solo-founded for teams to
          share and store work — a resource base for sharing and
          collaboration, built for a new world of abundant AI-generated
          syntax.
        </p>
        <Link
          href="/work/pixelvault"
          className="text-sm font-medium text-accent transition-opacity hover:opacity-70"
        >
          Read the case study &rarr;
        </Link>
      </section>

      <section className="flex flex-col items-start gap-6 rounded-2xl border border-border p-8">
        <p className="font-display text-lg italic">
          Code, Craft, and Collaboration.
        </p>
        <ToolStack />
      </section>
    </div>
  );
}
