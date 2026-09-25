import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ProjectCard } from "@/components/ProjectCard";
import { MemojiAvatar } from "@/components/MemojiAvatar";
import { projects } from "@/lib/data";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-24 px-6 pt-20 pb-32">
      <section className="mx-auto flex max-w-xl flex-col items-center gap-8 text-center">
        <MemojiAvatar />

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-balance font-display text-2xl leading-snug font-semibold tracking-tight">
              Hi, I&apos;m Austin Skhosana
              <br />
              Where strategy meets&nbsp;craft
            </h1>
            <p className="max-w-[720px] font-mono text-base leading-snug font-normal text-muted">
              I use design thinking to make sense of messy problems:
              <br />
              understanding people and business context, testing assumptions,
              <br />
              and turning complexity into something clear enough to build.
            </p>
          </div>

          <div className="flex flex-col items-center gap-14">
            <CopyEmailButton />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1057px] flex-col gap-[100px]">
        {projects
          .filter((project) => !project.hiddenFromHome)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
      </section>
    </div>
  );
}
