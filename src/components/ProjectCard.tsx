import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { CoverVideo } from "@/components/CoverVideo";
import { OrbCover } from "@/components/OrbCover";

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <>
      <div
        data-cursor-label={
          project.comingSoon ? "Coming Soon" : "View Case Study"
        }
        style={
          project.coverVideoFitWidth && !project.gamingFrame
            ? {
                aspectRatio: `${project.coverVideoWidth ?? 1600} / ${project.coverVideoHeight ?? 1000}`,
              }
            : undefined
        }
        className={`relative w-full overflow-hidden bg-[#f5f5f5] ${
          project.coverVideoFitWidth && !project.gamingFrame
            ? ""
            : project.gamingFrame
              ? "aspect-[16/10]"
              : "h-[320px] sm:h-[420px] lg:h-[700px]"
        }`}
      >
        {project.coverOrb ? (
          <div className="flex h-full w-full items-center justify-center p-8 sm:p-12">
            <OrbCover />
          </div>
        ) : project.coverVideo ? (
          <div
            className={
              project.coverVideoFill
                ? project.gamingFrame
                  ? "flex h-full w-full items-center justify-center"
                  : "h-full w-full"
                : "flex h-full w-full items-center justify-center p-8 sm:p-12"
            }
          >
            <CoverVideo
              src={project.coverVideo}
              alt={project.coverVideoAlt ?? project.title}
              width={project.coverVideoWidth ?? 1600}
              height={project.coverVideoHeight ?? 1000}
              fill={project.coverVideoFill}
              fitWidth={project.coverVideoFitWidth}
              scale={project.coverVideoScale}
              bordered={project.coverVideoBordered}
              rounded={project.coverVideoRounded}
              darkBorder={project.coverVideoDarkBorder}
              gamingFrame={project.gamingFrame}
            />
          </div>
        ) : (
          project.image && (
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              quality={100}
              className={
                project.coverImageScale
                  ? "object-contain"
                  : "object-contain sm:object-cover sm:object-top"
              }
              style={
                project.coverImageScale
                  ? { transform: `scale(${project.coverImageScale})` }
                  : undefined
              }
              sizes="(min-width: 1024px) 1057px, 100vw"
            />
          )
        )}
      </div>
      <div className="grid grid-cols-1 items-start gap-4 px-2 sm:grid-cols-[max-content_minmax(320px,420px)_220px] sm:justify-between sm:px-4">
        <h3 className="font-display text-lg leading-snug font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="font-mono text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <p className="font-mono text-sm leading-relaxed text-muted">
          {project.tags.join(", ")}
        </p>
      </div>
    </>
  );

  if (project.comingSoon) {
    return (
      <article
        className="group flex flex-col gap-[28px]"
        aria-label={`${project.title}, coming soon`}
      >
        {card}
      </article>
    );
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-[28px]"
    >
      {card}
    </Link>
  );
}
