import Link from "next/link";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ToolStack } from "@/components/ToolStack";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-24 px-6 pt-20 pb-32">
      <section className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-[#f5f5f5] text-2xl text-muted">
          AS
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-balance font-display text-2xl leading-snug font-semibold tracking-tight">
              Hi! My name is Austin Skhosana
              <br />
              I&apos;m a Designer and Developer
            </h1>
            <p className="max-w-[520px] text-balance font-mono text-base leading-snug text-muted">
              I love making things so I just built{" "}
              <Link
                href="/work/pixelvault"
                className="text-foreground underline underline-offset-2"
              >
                Pixel Vault↗
              </Link>
              , a code storage and sharing solution for teams! Sometimes I
              draw, Sometimes I code, Sometimes I centre divs, sometimes with
              CSS and sometimes with{" "}English.
            </p>
          </div>

          <div className="flex flex-col items-center gap-14">
            <CopyEmailButton />
            <ToolStack />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1057px] flex-col gap-[100px]">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
