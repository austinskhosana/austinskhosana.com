"use client";

import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

const EMAIL = "austinskhosana.design@gmail.com";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center rounded-full border border-border bg-background px-6 py-2.5 font-mono text-sm text-foreground transition-colors duration-150 ease-[var(--ease-out)] hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <EnvelopeIcon className="h-4 w-0 shrink-0 scale-90 opacity-0 transition-[width,margin-right,transform,opacity] duration-150 ease-[var(--ease-out)] group-hover:mr-2 group-hover:w-4 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none" />
      {copied ? "Copied!" : "Copy Email"}
    </button>
  );
}
