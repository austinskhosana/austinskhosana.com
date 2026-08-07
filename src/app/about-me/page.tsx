import type { Metadata } from "next";
import { AboutMeWindowContent } from "@/components/windows/AboutMeWindowContent";

export const metadata: Metadata = {
  title: "About — Austin Skhosana",
  description: "Works by Austin Skhosana",
};

export default function AboutMe() {
  return <AboutMeWindowContent />;
}
