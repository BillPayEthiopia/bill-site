import { highlight } from "@/lib/highlight";
import { CopyButton } from "./CopyButton";

/** A static, highlighted code block with a file name and copy button. */
export function CodeBlock({ file, code }: { file: string; code: string }) {
  const lines = code.split("\n");

  return (
    <div className="min-w-0 overflow-hidden rounded-card border border-navy/10 bg-navy-950 shadow-card">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-aqua/70" />
        </div>
        <span className="font-mono text-[11px] text-white/50">{file}</span>
        <CopyButton text={code} />
      </div>

      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
        <code>
          {lines.map((line, index) => (
            <div key={index} className="grid grid-cols-[2rem_1fr]">
              <span className="select-none text-white/25">{index + 1}</span>
              <span>{highlight(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}