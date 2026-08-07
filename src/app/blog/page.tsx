import type { Metadata } from "next";
import { BlogWindowContent } from "@/components/windows/BlogWindowContent";

export const metadata: Metadata = {
  title: "Blog — Austin Skhosana",
  description: "Works by Austin Skhosana",
};

export default function BlogDirectory() {
  return <BlogWindowContent />;
}
