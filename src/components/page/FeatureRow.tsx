import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type FeatureRowProps = {
  /** Anchor for jump links, e.g. "checkout" → /products#checkout */
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  visual: ReactNode;
  /** Put the visual on the left. Alternate rows for rhythm. */
  reverse?: boolean;
  action?: ReactNode;
};

/** Text with a checklist on one side, a visual on the other. */
export function FeatureRow({ id, eyebrow, title, description, points, visual, reverse, action }: FeatureRowProps) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
    >
      <Reveal className={cn(reverse && "lg:order-2")}>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-blue">{eyebrow}</p>
        <h3 id={`${id}-title`} className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h3>
        <p className="mt-4 text-lg leading-relaxed">{description}</p>

        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[15px] font-medium text-navy">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-aqua/20 text-blue">
                <Check className="size-3" aria-hidden="true" />
              </span>
              {point}
            </li>
          ))}
        </ul>

        {action && <div className="mt-8">{action}</div>}
      </Reveal>

      <Reveal delay={0.12} className={cn(reverse && "lg:order-1")}>
        {visual}
      </Reveal>
    </article>
  );
}