import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/FloatingDock";

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
        <Nav />
        <main className="flex-1 pb-28">{children}</main>
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}
