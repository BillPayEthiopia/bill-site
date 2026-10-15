import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/content/howItWorks";
import { StepsTimeline } from "./StepsTimeline";

export function HowItWorks() {
  const { eyebrow, title, description, primaryCta, secondaryCta } = howItWorksContent;

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="how-it-works-title"
            eyebrow={eyebrow}
            title={
              <>
                {title[0]}
                <br />
                <span className="text-blue">{title[1]}</span>
              </>
            }
            description={description}
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-16 max-w-5xl">
          <StepsTimeline />
        </div>

        <Reveal className="mt-16 flex flex-wrap justify-center gap-3">
          <Button href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </Button>
          <Button href={secondaryCta.href} variant="outline" size="lg">
            {secondaryCta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}