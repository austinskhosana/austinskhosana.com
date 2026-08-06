"use client";

import { useState } from "react";

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
      className="rounded-full border border-border px-6 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-foreground/40"
    >
      {copied ? "Copied!" : "Copy Email"}
    </button>
  );
}
