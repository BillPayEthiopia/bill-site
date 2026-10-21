"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="ml-auto flex size-7 items-center justify-center rounded-md text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
    >
      {copied ? <Check className="size-3.5 text-aqua" /> : <Copy className="size-3.5" />}
    </button>
  );
}