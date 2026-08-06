import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Austin Skhosana`,
    description: project.description,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-20">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        &larr; Back to work
      </Link>

      <header className="flex flex-col gap-6">
        <span className="text-sm text-muted">{project.title}</span>
        <h1 className="font-display text-3xl font-medium">
          {project.description}
        </h1>
        <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted">
              Role
            </span>
            <span>{project.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted">
              Tools
            </span>
            <span>{project.tools}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-muted">
              Skills
            </span>
            <span>{project.tags.join(", ")}</span>
          </div>
        </div>
      </header>

      {project.image && (
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-[#f5f5f5]">
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className="object-cover object-top"
            sizes="640px"
            priority
          />
        </div>
      )}

      <div className="flex flex-col gap-12">
        {project.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-4">
            <h2 className="font-display text-xl font-medium">
              {section.heading}
            </h2>
            {section.body.length > 1 ? (
              <ul className="flex flex-col gap-3">
                {section.body.map((line) => (
                  <li
                    key={line}
                    className="text-base leading-relaxed text-muted"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base leading-relaxed text-muted">
                {section.body[0]}
              </p>
            )}
          </section>
        ))}
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {project.gallery.map((image) => (
            <div
              key={image.src}
              className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-[#f5f5f5]"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
