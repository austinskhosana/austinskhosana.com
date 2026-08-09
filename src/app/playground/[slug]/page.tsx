import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { playgroundItems } from "@/lib/data";
import { PlaygroundItemWindowContent } from "@/components/windows/PlaygroundItemWindowContent";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = playgroundItems.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} — Austin Skhosana`,
    description: item.description,
  };
}

export default async function PlaygroundItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = playgroundItems.find((i) => i.slug === slug);
  if (!item) notFound();

  return <PlaygroundItemWindowContent slug={slug} />;
}
