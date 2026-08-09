import Image from "next/image";
import type { Project } from "@/lib/data";
import { OSLink } from "@/components/windows/OSLink";
import { CoverVideo } from "@/components/CoverVideo";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <OSLink
      href={`/work/${project.slug}`}
      windowKey={`work:${project.slug}`}
      className="group flex flex-col gap-[28px]"
    >
      <div className="relative h-[320px] w-full overflow-hidden bg-[#f5f5f5] sm:h-[420px] lg:h-[700px]">
        {project.coverVideo ? (
          <div className="flex h-full w-full items-center justify-center p-8 sm:p-12">
            <CoverVideo
              src={project.coverVideo}
              alt={project.coverVideoAlt ?? project.title}
              width={project.coverVideoWidth ?? 1600}
              height={project.coverVideoHeight ?? 1000}
            />
          </div>
        ) : (
          project.image && (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              quality={100}
              className="object-cover object-top"
              sizes="(min-width: 1024px) 1057px, 100vw"
            />
          )
        )}
      </div>
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
    </OSLink>
  );
}
