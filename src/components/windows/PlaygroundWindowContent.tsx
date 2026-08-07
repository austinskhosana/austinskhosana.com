import Image from "next/image";

const experiments = [
  {
    src: "/images/nY6XqWc8DMpg12a5A6B3b9XzNak.png",
    alt: "Visual aesthetic selector exploration",
  },
  {
    src: "/images/onivFblOwHUTrzdIRuz3LzJKVEc.png",
    alt: "Series and movies concept screen",
  },
  {
    src: "/images/M8XX2ZLG9C9EhZF3Q7StOiShESE.png",
    alt: "Generated movie playback screen",
  },
];

export function PlaygroundWindowContent() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12 px-6 py-20">
      <section className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs uppercase tracking-wide text-muted">
          Welcome To
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          The Playground
        </h1>
        <p className="max-w-md font-mono text-sm leading-relaxed text-muted">
          A collection of my design explorations across illustration,
          design and code.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {experiments.map((experiment) => (
          <div
            key={experiment.src}
            className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-[#f5f5f5] transition-transform hover:-translate-y-1"
          >
            <Image
              src={experiment.src}
              alt={experiment.alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 33vw, 100vw"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
