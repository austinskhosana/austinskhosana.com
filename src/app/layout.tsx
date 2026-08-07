import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/FloatingDock";
import { LatestPostWidget } from "@/components/LatestPostWidget";
import { blogPosts } from "@/lib/data";
import { WindowManagerProvider } from "@/components/windows/WindowManagerContext";
import { WindowLayer } from "@/components/windows/WindowLayer";

const widgetPosts = [
  blogPosts.find((post) => post.slug === "tailwind-the-last-css-framework-3")!,
  blogPosts.find((post) => post.slug === "vibe-coding-101-and-figma-make-2")!,
];

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Austin Skhosana's Portfolio",
  description: "Works by Austin Skhosana",
  openGraph: {
    title: "Austin Skhosana's Portfolio",
    description: "Works by Austin Skhosana",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-[15px] text-foreground">
        <WindowManagerProvider>
          <Nav />
          <LatestPostWidget posts={widgetPosts} />
          <main className="flex-1 pb-28">{children}</main>
          <Footer />
          <FloatingDock />
          <WindowLayer />
        </WindowManagerProvider>
      </body>
    </html>
  );
}
