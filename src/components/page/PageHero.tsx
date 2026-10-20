import type { CSSProperties, ReactNode } from "react";
import { HeroBackground } from "@/components/landing/hero/HeroBackground";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

type PageHeroProps = {
  eyebrow: string;
  /** Two lines; the second is highlighted in blue. */
  title: [string, string];
  description: string;
  breadcrumbs: Crumb[];
  /** Buttons under the description. */
  actions?: ReactNode;
  /** Optional visual on the right. Without it, the text sits in a single column. */
  children?: ReactNode;
};

/** The top section of every inner page, on the same background as the home hero. */
export function PageHero({ eyebrow, title, description, breadcrumbs, actions, children }: PageHeroProps) {
  const hasVisual = Boolean(children);

  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <HeroBackground />

      <Container
        className={cn(
          "grid grid-cols-1 items-center gap-14",
          hasVisual && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16",
        )}
      >
        <div className={cn(!hasVisual && "max-w-3xl")}>
          <div className="animate-fade-up" style={delay(0)}>
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <p
            className="mt-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-blue/15 bg-white/70 px-3.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-blue shadow-sm backdrop-blur"
            style={delay(80)}
          >
            <span className="size-1.5 rounded-full bg-aqua" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 id="page-title" className="mt-6 animate-fade-up text-display font-bold" style={delay(160)}>
            {title[0]}
            <br />
            <span className="text-blue">{title[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed" style={delay(260)}>
            {description}
          </p>

          {actions && (
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3" style={delay(360)}>
              {actions}
            </div>
          )}
        </div>

        {hasVisual && (
          <div className="animate-fade-up" style={delay(300)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}