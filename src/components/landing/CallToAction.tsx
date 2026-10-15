import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ctaContent } from "@/content/cta";

export function CallToAction() {
  const { eyebrow, title, description, primaryCta, secondaryCta } = ctaContent;

  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden bg-navy py-24 text-white/70 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/15 blur-3xl" />
        {/* Ribbons sweeping in from both edges, echoing the dark design */}
        <svg className="absolute -left-20 bottom-0 h-full w-1/2 animate-drift" viewBox="0 0 600 400" preserveAspectRatio="none" fill="none">
          <path d="M-50 300 C 150 200, 250 450, 450 320 S 650 150, 700 220" className="stroke-blue/40" strokeWidth="40" strokeLinecap="round" />
          <path d="M-50 360 C 150 260, 250 510, 450 380 S 650 210, 700 280" className="stroke-aqua/20" strokeWidth="40" strokeLinecap="round" />
        </svg>
        <svg className="absolute -right-20 top-0 h-full w-1/2 -scale-x-100 animate-drift" viewBox="0 0 600 400" preserveAspectRatio="none" fill="none">
          <path d="M-50 100 C 150 0, 250 250, 450 120 S 650 -50, 700 20" className="stroke-blue/40" strokeWidth="40" strokeLinecap="round" />
          <path d="M-50 160 C 150 60, 250 310, 450 180 S 650 10, 700 80" className="stroke-aqua/20" strokeWidth="40" strokeLinecap="round" />
        </svg>
      </div>

      <Container>
        <Reveal>
          <SectionHeading
            id="cta-title"
            tone="light"
            align="center"
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="max-w-2xl"
          >
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href={primaryCta.href} variant="accent" size="lg" arrow>
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="outline-inverse" size="lg">
                {secondaryCta.label}
              </Button>
            </div>
          </SectionHeading>
        </Reveal>
      </Container>
    </section>
  );
}