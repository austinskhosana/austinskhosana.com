"use client";

import { useState } from "react";
import { CheckCircleIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

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
      className="group flex items-center rounded-full border border-border bg-background px-6 py-2.5 font-mono text-sm text-foreground transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out)] hover:border-foreground hover:bg-foreground hover:text-background active:scale-[0.97] motion-reduce:active:scale-100"
    >
      <span
        className={`relative h-4 shrink-0 overflow-hidden transition-[width,margin-right] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none group-hover:mr-2 group-hover:w-4 ${
          copied ? "mr-2 w-4" : "w-0"
        }`}
      >
        <EnvelopeIcon
          className={`absolute inset-0 h-4 w-4 scale-90 opacity-0 transition-[transform,opacity] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none ${
            copied ? "" : "group-hover:scale-100 group-hover:opacity-100"
          }`}
        />
        <CheckCircleIcon
          className={`absolute inset-0 h-4 w-4 scale-90 opacity-0 transition-[transform,opacity] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none ${
            copied ? "scale-100 opacity-100" : ""
          }`}
        />
      </span>
      {copied ? "Copied!" : "Copy Email"}
    </button>
  );
}
