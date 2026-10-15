import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { valueProposition } from "@/content/valueProposition";

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
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
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
              className="lg:sticky lg:top-32"
            >
              <div className="mt-8">
                <Button href={cta.href} variant="outline" size="lg" arrow>
                  {cta.label}
                </Button>
              </div>
            </SectionHeading>
          </Reveal>

          <ul className="grid gap-5 sm:grid-cols-2">
            {features.map(({ title, description, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <li className="h-full">
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
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {methods.length > 0 && (
          <Reveal className="mt-20 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 font-display text-xs font-semibold uppercase tracking-[0.12em] text-navy">
              Works with
            </p>

            <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <ul className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
                {[...methods, ...methods].map(({ label, icon: Icon }, index) => (
                  <li
                    key={`${label}-${index}`}
                    aria-hidden={index >= methods.length}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-navy"
                  >
                    <Icon className="size-4 text-blue" aria-hidden="true" />
                    {label}
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