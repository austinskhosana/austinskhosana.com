import Link from "next/link";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-[28px]">
      <div className="h-[320px] w-full bg-[#f5f5f5] sm:h-[420px] lg:h-[700px]" />
      <div className="grid grid-cols-1 gap-3 px-2 sm:grid-cols-[1fr_1.6fr_1fr] sm:gap-8 sm:px-4">
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="font-mono text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <p className="font-mono text-sm leading-relaxed text-muted">
          {project.tags.join(", ")}
        </p>
      </div>
    </Link>
  );
}
