import Image from "next/image";
import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { valueProposition } from "@/content/valueProposition";
import { cn } from "@/lib/utils";

type PartnerStripProps = {
  className?: string;
  style?: CSSProperties;
};

/** The moving "Works with" logo strip. Sits at the bottom of the hero, just above the waves. */
export function PartnerStrip({ className, style }: PartnerStripProps) {
  const { methods } = valueProposition;
  if (methods.length === 0) return null;

  return (
    <Container
      className={cn("flex animate-fade-up flex-col items-center gap-6 sm:flex-row sm:gap-0", className)}
      style={style}
    >
      {/* Label, with a thin divider on wider screens */}
      <p className="shrink-0 text-center font-display text-sm font-medium leading-snug text-navy/55 sm:border-r sm:border-navy/10 sm:pr-8 sm:text-left">
        Works with
        <span className="hidden font-semibold text-navy sm:block">your favorite ways to pay</span>
      </p>

      {/* Logos gliding past, fading in and out at the edges */}
      <div className="group relative w-full min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul
          aria-label="Payment partners"
          className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]"
        >
          {[...methods, ...methods].map(({ label, icon: Icon, logo, size = "md" }, index) => (
            <li
              key={`${label}-${index}`}
              aria-hidden={index >= methods.length}
              className={cn(
                "flex shrink-0 items-center px-8 lg:px-11",
                logo
                  ? "opacity-80 transition-opacity duration-300 hover:opacity-100"
                  : "text-sm font-medium text-navy",
              )}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={label}
                  width={200}
                  height={60}
                  className={cn(
                    "w-auto object-contain",
                    size === "sm" && "h-6 max-w-32",
                    size === "md" && "h-9 max-w-36",
                    size === "lg" && "h-12 max-w-40",
                  )}
                />
              ) : (
                <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2">
                  <Icon className="size-4 text-blue" aria-hidden="true" />
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}