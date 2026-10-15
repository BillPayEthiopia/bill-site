"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { codeSamples, type Language } from "@/content/developers";
import { EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LANGUAGES = Object.keys(codeSamples) as Language[];

/* ---- A tiny highlighter: strings, comments, numbers, keywords, function calls ---- */
const TOKEN =
  /("[^"]*"|'[^']*')|(\/\/.*|#.*)|(\b\d+(?:\.\d+)?\b)|(\b(?:import|from|const|new|await|return|export|def|print|async|curl)\b)|([A-Za-z_][\w.]*)(?=\()|(\s+|\S+)/g;

const TOKEN_CLASS = ["text-aqua", "text-white/40 italic", "text-amber-200", "text-sky-300", "text-blue-200", "text-white/85"];

function highlight(line: string) {
  return Array.from(line.matchAll(TOKEN), (match, index) => {
    const group = match.slice(1).findIndex((part) => part !== undefined);
    return (
      <span key={index} className={TOKEN_CLASS[group]}>
        {match[0]}
      </span>
    );
  });
}

export function CodeWindow() {
  const [language, setLanguage] = useState<Language>("node");
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduceMotion = useReducedMotion();

  const sample = codeSamples[language];
  const lines = sample.code.split("\n");

  // Type the code in line by line the first time it's seen. Later tabs show instantly.
  const [typed, setTyped] = useState(0);
  const hasTyped = useRef(false);
  useEffect(() => {
    if (hasTyped.current || reduceMotion) {
      setTyped(Infinity);
      return;
    }
    if (!inView) return;
    if (typed >= lines.length) {
      hasTyped.current = true;
      return;
    }
    const id = window.setTimeout(() => setTyped((n) => n + 1), 90);
    return () => window.clearTimeout(id);
  }, [inView, reduceMotion, typed, lines.length]);

  async function copy() {
    await navigator.clipboard.writeText(sample.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-card border border-white/10 bg-navy-950 shadow-float">
      {/* Title bar */}
      <div className="flex items-center gap-4 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-aqua/70" />
        </div>

        <div role="tablist" aria-label="Language" className="flex gap-1">
          {LANGUAGES.map((id) => {
            const selected = id === language;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={selected}
                onClick={() => setLanguage(id)}
                className={cn(
                  "relative rounded-full px-3 py-1 font-display text-xs font-semibold transition-colors duration-300",
                  selected ? "text-navy" : "text-white/60 hover:text-white",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="code-tab"
                    className="absolute inset-0 rounded-full bg-aqua"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{codeSamples[id].label}</span>
              </button>
            );
          })}
        </div>

        <span className="ml-auto hidden font-mono text-[11px] text-white/40 sm:block">{sample.file}</span>

        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="flex size-8 items-center justify-center rounded-lg text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-4 text-aqua" /> : <Copy className="size-4" />}
        </button>
      </div>

      {/* Code */}
      <div className="relative min-h-[21rem] overflow-x-auto p-5 font-mono text-[13px] leading-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={language}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE_BRAND }}
          >
            <code>
              {lines.map((line, index) => {
                const visible = index < typed;
                const isCursorLine = index === typed - 1 && typed < lines.length;
                return (
                  <div key={index} className={cn("grid grid-cols-[2rem_1fr]", !visible && "invisible")}>
                    <span className="select-none text-white/25">{index + 1}</span>
                    <span>
                      {highlight(line)}
                      {isCursorLine && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-aqua align-middle" />}
                    </span>
                  </div>
                );
              })}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}