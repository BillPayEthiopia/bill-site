import { Check } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { TwoLineTitle } from "@/components/page/TwoLineTitle";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { securityPage } from "@/content/securityPage";

/** Four stages, joined by a line on desktop. */
export function SecurityLifecycle() {
  const { eyebrow, title, description, stages } = securityPage.lifecycle;

  return (
    <section id="controls" aria-labelledby="controls-title" className="scroll-mt-20 bg-surface py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="controls-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={description} />
        </Reveal>

        <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute inset-x-[12%] top-5 hidden h-px bg-linear-to-r from-blue/40 via-aqua/60 to-blue/40 lg:block" />

          {stages.map(({ stage, title, icon: Icon, points }, index) => (
            <Reveal as="li" key={stage} delay={index * 0.1} className="relative flex flex-col">
              <span className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full bg-navy font-display text-sm font-bold text-white ring-4 ring-surface">
                {index + 1}
              </span>

              <div className="group mt-5 flex flex-1 flex-col rounded-card border border-line bg-white p-6 shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue transition-colors duration-500 group-hover:bg-aqua group-hover:text-navy">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-blue">{stage}</p>
                <h3 className="mt-1.5 font-display text-lg font-bold">{title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-navy">
                      <Check className="mt-0.5 size-4 shrink-0 text-aqua" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** The full compliance framework and the infrastructure behind it, on navy. */
export function ComplianceFramework() {
  const { eyebrow, title, description, items, infrastructure } = securityPage.compliance;

  return (
    <section id="compliance" aria-labelledby="compliance-title" className="relative isolate scroll-mt-20 overflow-hidden py-28 text-white/70 lg:py-36">
      <NavyBackground />
      <WaveDivider position="top" fill="fill-surface" />
      <WaveDivider position="bottom" fill="fill-white" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="compliance-title"
              tone="light"
              eyebrow={eyebrow}
              title={<TwoLineTitle title={title} accent="text-aqua" />}
              description={description}
            />
          </Reveal>

          <ul className="grid gap-3 sm:grid-cols-2 lg:self-end">
            {items.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={(index % 2) * 0.08}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-4 py-3.5 font-medium text-white backdrop-blur transition-colors duration-300 hover:border-aqua/40"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-aqua/20 text-aqua">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {item}
              </Reveal>
            ))}
          </ul>
        </div>

        <ul className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.map(({ title, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={index * 0.08} className="flex items-center gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-sm font-semibold text-white">{title}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}