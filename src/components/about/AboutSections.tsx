import { Check } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { aboutContent } from "@/content/about";

function TwoLineTitle({ title }: { title: [string, string] }) {
  return (
    <>
      {title[0]}
      <br />
      <span className="text-blue">{title[1]}</span>
    </>
  );
}

/** Who we are: heading on the left, story on the right. */
export function AboutOverview() {
  const { eyebrow, title, paragraphs } = aboutContent.overview;

  return (
    <section aria-labelledby="overview-title" className="bg-white py-24 lg:py-32">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
        <Reveal>
          <SectionHeading id="overview-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} />
        </Reveal>
        <div className="space-y-6 text-lg leading-relaxed lg:pt-14">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Vision and mission, on navy between wave edges. */
export function AboutPurpose() {
  const { vision, mission } = aboutContent.purpose;

  return (
    <section aria-label="Vision and mission" className="relative isolate overflow-hidden py-28 text-white/70 lg:py-36">
      <NavyBackground />
      <WaveDivider position="top" fill="fill-white" />
      <WaveDivider position="bottom" fill="fill-white" />

      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {[vision, mission].map(({ label, statement, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 0.12} className="h-full">
            <SpotlightCard className="h-full rounded-panel border border-white/10 bg-white/4 p-8 backdrop-blur sm:p-10 lg:p-12">
              <span className="flex size-12 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.16em] text-aqua">{label}</h2>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{statement}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

/** The four strategic focus areas. */
export function AboutFocus() {
  const { eyebrow, title, description, items } = aboutContent.focus;

  return (
    <section aria-labelledby="focus-title" className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading id="focus-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={description} />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={(index % 4) * 0.1} className="h-full">
              <SpotlightCard className="h-full rounded-card border border-line bg-white p-7 shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-blue to-aqua transition-transform duration-500 ease-brand group-hover:scale-x-100"
                />
                <span className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue ring-1 ring-blue/10 transition-[background-color,color,box-shadow,rotate] duration-500 ease-brand group-hover:-rotate-6 group-hover:bg-aqua group-hover:text-navy group-hover:shadow-glow">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed">{description}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** TAK Tech: the story on the left, its capabilities on the right. */
export function AboutTakTech() {
  const { eyebrow, title, paragraphs, benefits, capabilities } = aboutContent.takTech;

  return (
    <section aria-labelledby="tak-title" className="bg-surface py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeading id="tak-title" eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={paragraphs[0]}>
            <p className="mt-4 text-lg leading-relaxed">{paragraphs[1]}</p>
            <ul className="mt-6 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 font-medium text-navy">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-aqua/20 text-blue">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </SectionHeading>
        </Reveal>

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {capabilities.map(({ label, icon: Icon }, index) => (
            <Reveal
              as="li"
              key={label}
              delay={(index % 3) * 0.1}
              className="group flex flex-col gap-4 rounded-card border border-line bg-white p-5 shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1 hover:shadow-float"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue transition-colors duration-500 group-hover:bg-navy group-hover:text-aqua">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-sm font-semibold text-navy">{label}</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The closing statement. */
export function AboutCommitment() {
  const { eyebrow, statement } = aboutContent.commitment;

  return (
    <section aria-labelledby="commitment-title" className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Logo variant="monogram" className="mx-auto w-12" />
          <h2 id="commitment-title" className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.16em] text-blue">
            {eyebrow}
          </h2>
          <p className="mt-6 text-balance font-display text-2xl font-bold leading-snug text-navy sm:text-3xl lg:text-4xl">
            {statement}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}