import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsContent } from "@/content/solutions";
import { SolutionsCarousel } from "./SolutionsCarousel";

export function Solutions() {
  const { eyebrow, title, description, cta } = solutionsContent;

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="overflow-hidden bg-surface py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="solutions-title"
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

        <Reveal delay={0.1} className="mt-14">
          <SolutionsCarousel />
        </Reveal>
      </Container>
    </section>
  );
}