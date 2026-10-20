import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { developersContent } from "@/content/developers";
import { CodeWindow } from "./CodeWindow";
import { WaveDivider } from "@/components/ui/WaveDivider";

export function Developers() {
  const { eyebrow, title, description, primaryCta, secondaryCta, benefits } = developersContent;

  return (
    <section
      id="developers"
      aria-labelledby="developers-title"
      className="relative isolate overflow-hidden py-24 text-white/70 lg:py-32"
    >
      <NavyBackground />
      <WaveDivider position="top" fill="fill-white" />
      <WaveDivider position="bottom" fill="fill-white" />

      <Container>
        {/* minmax(0, …) lets the code column shrink, so long code lines scroll inside the window instead of widening the page */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="developers-title"
              tone="light"
              eyebrow={eyebrow}
              title={
                <>
                  {title[0]}
                  <br />
                  <span className="text-aqua">{title[1]}</span>
                </>
              }
              description={description}
            >
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={primaryCta.href} variant="accent" size="lg" arrow>
                  {primaryCta.label}
                </Button>
                <Button href={secondaryCta.href} variant="outline-inverse" size="lg">
                  {secondaryCta.label}
                </Button>
              </div>
            </SectionHeading>
          </Reveal>

          <Reveal delay={0.15} className="min-w-0">
            <CodeWindow />
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 4) * 0.1}
              className="group flex h-full items-start gap-4 rounded-xl border border-white/10 bg-white/4 p-5 backdrop-blur transition-[translate,border-color] duration-500 ease-brand hover:-translate-y-1 hover:border-aqua/40"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-aqua/15 text-aqua transition-colors duration-500 group-hover:bg-aqua group-hover:text-navy">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}