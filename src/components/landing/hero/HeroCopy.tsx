import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function HeroCopy() {
  const { eyebrow, headline, description, primaryCta, secondaryCta, paymentMethods } = heroContent;

  return (
    <div className="max-w-xl">
      {/* Eyebrow with a softly pulsing "live" dot */}
      <p
        className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-blue/15 bg-white/70 px-3.5 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-blue shadow-sm backdrop-blur"
        style={delay(0)}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-aqua" />
          <span className="relative size-2 rounded-full bg-aqua" />
        </span>
        {eyebrow}
      </p>


      {/* Each line slides up from behind its own mask */}
      <h1 id="hero-title" className="mt-6 text-display font-bold short:mt-5">
        {headline.map((line, index) => (
          <span
            key={line.text}
            className={cn("block overflow-hidden", line.underline ? "pb-[0.22em]" : "pb-[0.06em]")}
          >
            <span className={cn("block animate-rise", line.highlight && "text-blue")} style={delay(120 + index * 110)}>
              {line.underline ? (
                <span className="relative inline-block whitespace-nowrap">
                  {line.text}
                  {/* Aqua wave underline that draws itself */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-[0.14em] left-0 h-[0.28em] w-full"
                    fill="none"
                  >
                    <path
                      d="M3 9 C 40 3, 80 3, 120 7 S 200 13, 237 5"
                      pathLength={1}
                      strokeDasharray={1}
                      className="animate-draw stroke-aqua"
                      strokeWidth="4"
                      strokeLinecap="round"
                      style={delay(730)}
                    />
                  </svg>
                </span>
              ) : (
                line.text
              )}
            </span>
          </span>
        ))}
      </h1>

      <p className="mt-6 max-w-lg animate-fade-up text-lg leading-relaxed" style={delay(480)}>
        {description}
      </p>

      <div className="mt-9 flex animate-fade-up flex-wrap gap-3" style={delay(580)}>
        <Button href={primaryCta.href} size="lg" arrow>
          {primaryCta.label}
        </Button>
        <Button href={secondaryCta.href} variant="outline" size="lg">
          {secondaryCta.label}
        </Button>
      </div>

      <ul className="mt-10 flex animate-fade-up flex-wrap gap-x-5 gap-y-3" style={delay(700)}>
        {paymentMethods.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2 text-sm">
            <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-white text-blue shadow-sm">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}