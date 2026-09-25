import type { ReactNode } from "react";

export function TerminalAsciiArt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const normalizedChildren =
    typeof children === "string" ? children.replace(/\u2800/g, " ") : children;

  return (
    <pre
      aria-hidden
      className={`mb-10 w-fit max-w-full overflow-hidden font-medium whitespace-pre text-foreground/70 select-none [font-variant-ligatures:none] ${className}`}
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      {normalizedChildren}
    </pre>
  );
}
