import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  /** The id the section's aria-labelledby points to. */
  id: string;
  /** Use "light" on navy backgrounds. */
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

/** Eyebrow pill, heading, and optional description. Same rhythm in every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  tone = "dark",
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <div className={cn("max-w-xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em]",
          light ? "border-white/15 bg-white/10 text-aqua" : "border-blue/15 bg-white/70 text-blue shadow-sm",
        )}
      >
        <span className="size-1.5 rounded-full bg-aqua" aria-hidden="true" />
        {eyebrow}
      </p>

      <h2 id={id} className={cn("mt-5 text-heading font-bold", light && "text-white")}>
        {title}
      </h2>

      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", light && "text-white/70")}>{description}</p>
      )}

      {children}
    </div>
  );
}