import type { Metadata } from "next";
import { PlaygroundWindowContent } from "@/components/windows/PlaygroundWindowContent";

export const metadata: Metadata = {
  title: "Playground — Austin Skhosana",
  description: "Works by Austin Skhosana",
};

export default function Playground() {
  return <PlaygroundWindowContent />;
}
