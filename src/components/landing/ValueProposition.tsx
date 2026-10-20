import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { valueProposition } from "@/content/valueProposition";
import { cn } from "@/lib/utils";

export function ValueProposition() {
  const { eyebrow, title, description, cta, features, methods } = valueProposition;

  return (
    <section
      id="why-billpay"
      aria-labelledby="why-billpay-title"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Faint glow in the corner, so the white section isn't flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 -z-10 size-[30rem] rounded-full bg-blue-50 blur-3xl"
      />

           <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="why-billpay-title"
              eyebrow={eyebrow}
              title={
                <>
                  {title[0]}
                  <br />
                  <span className="text-blue">{title[1]}</span>
                </>
              }
              description={description}
            />
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <Button href={cta.href} variant="outline" size="lg" arrow>
              {cta.label}
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={(index % 3) * 0.1} className="h-full">
              <SpotlightCard className="h-full rounded-card border border-line bg-white p-7 shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
                {/* Blue-to-aqua line that draws across the top on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-blue to-aqua transition-transform duration-500 ease-brand group-hover:scale-x-100"
                />

                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue ring-1 ring-blue/10 transition-[background-color,color,box-shadow,rotate] duration-500 ease-brand group-hover:-rotate-6 group-hover:bg-aqua group-hover:text-navy group-hover:shadow-glow">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-semibold tabular-nums text-navy/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed">{description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>

        
        {methods.length > 0 && (
          <Reveal className="mt-24 border-t border-line pt-12">
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
        )}
      </Container>
    </section>
  );
}