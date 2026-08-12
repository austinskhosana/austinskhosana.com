import Image from "next/image";
import { playgroundItems } from "@/lib/data";

export function PlaygroundItemWindowContent({ slug }: { slug: string }) {
  const item = playgroundItems.find((i) => i.slug === slug);
  if (!item) return null;

  // Visual pieces read best as a plain image preview — no terminal chrome
  // or copy competing with the artwork.
  if (item.image && item.imageWidth && item.imageHeight) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={item.image}
          alt={item.imageAlt ?? item.name}
          width={item.imageWidth}
          height={item.imageHeight}
          quality={100}
          className="h-full w-full object-cover"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2 bg-white p-5 font-mono text-sm leading-relaxed">
        <p className="text-foreground">
          <span className="text-accent">austin@portfolio</span>
          <span className="text-muted">:</span>
          <span className="text-muted">~/playground/{item.category}</span>
          <span className="text-muted">$</span> open readme.md
        </p>
        <p className="text-foreground">{item.name}</p>
        <p className="text-muted">{item.description}</p>
        <p className="text-muted">Category: {item.category}</p>

        {item.image && item.imageWidth && item.imageHeight && (
          <Image
            src={item.image}
            alt={item.imageAlt ?? item.name}
            width={item.imageWidth}
            height={item.imageHeight}
            quality={100}
            className="mt-2 h-auto w-full"
            sizes="(min-width: 672px) 592px, 100vw"
          />
        )}
      </div>
    </div>
  );
}
