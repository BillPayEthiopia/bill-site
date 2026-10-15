import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { developersContent } from "@/content/developers";
import { CodeWindow } from "./CodeWindow";

export function Developers() {
  const { eyebrow, title, description, primaryCta, secondaryCta, benefits } = developersContent;

  return (
    <section
      id="developers"
      aria-labelledby="developers-title"
      className="relative isolate overflow-hidden py-24 text-white/70 lg:py-32"
    >
      <NavyBackground />

      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
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

            <ul className="mt-12 space-y-3">
              {benefits.map(({ title, description, icon: Icon }, index) => (
                <Reveal
                  as="li"
                  key={title}
                  delay={0.2 + index * 0.1}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/4 p-4 backdrop-blur transition-[translate,border-color] duration-500 ease-brand hover:translate-x-1.5 hover:border-aqua/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-aqua/15 text-aqua transition-colors duration-500 group-hover:bg-aqua group-hover:text-navy">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white">{title}</h3>
                    <p className="mt-0.5 text-sm">{description}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.15}>
          <CodeWindow />
        </Reveal>
      </Container>
    </section>
  );
}