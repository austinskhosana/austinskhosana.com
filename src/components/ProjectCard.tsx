import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const ratio =
    project.imageWidth && project.imageHeight
      ? project.imageWidth / project.imageHeight
      : 1.6;

  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col gap-6">
      <div className="flex justify-center rounded-[28px] bg-[#f5f5f5] p-4 sm:p-8">
        <div
          className="relative h-[320px] max-w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm sm:h-[420px] lg:h-[480px]"
          style={{ aspectRatio: ratio }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 900px, 100vw"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e1e1e1]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e1e1e1]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e1e1e1]" />
              </div>
              <span className="font-mono text-sm text-muted">
                {project.title}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 px-2 sm:grid-cols-[1fr_1.4fr_1.2fr] sm:gap-8 sm:px-4">
        <h3 className="font-display text-lg font-semibold">
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
