import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { valueProposition } from "@/content/valueProposition";
import { cn } from "@/lib/utils";

/** The moving "Works with" logo strip, shown right under the hero. */
export function PartnerStrip() {
  const { methods } = valueProposition;
  if (methods.length === 0) return null;

  return (
    <section aria-label="Payment partners" className="bg-white pb-16 pt-6 lg:pb-20">
      <Container>
        <Reveal>
          <p className="text-center font-display text-xs font-semibold uppercase tracking-[0.16em] text-navy/60">
            Works with
          </p>

          <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
              {[...methods, ...methods].map(({ label, icon: Icon, logo, size = "md" }, index) => (
                <li
                  key={`${label}-${index}`}
                  aria-hidden={index >= methods.length}
                  className={cn(
                    "flex shrink-0 items-center px-10 lg:px-14",
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
                        size === "sm" && "h-7 max-w-36",
                        size === "md" && "h-10 max-w-40",
                        size === "lg" && "h-14 max-w-44",
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
        </Reveal>
      </Container>
    </section>
  );
}