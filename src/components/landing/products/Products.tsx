import { Reveal } from "@/components/animations/Reveal";
import { NavyBackground } from "@/components/landing/NavyBackground";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { productsContent } from "@/content/products";
import { ProductGrid } from "./ProductGrid";
import { WaveDivider } from "@/components/ui/WaveDivider";


export function Products() {
  const { eyebrow, title, description, cta, groups, items } = productsContent;

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative isolate overflow-hidden py-24 text-white/70 lg:py-32"
    >
      <NavyBackground />
      <WaveDivider position="top" fill="fill-white" />
      <WaveDivider position="bottom" fill="fill-surface" />

      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="products-title"
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
            />
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <Button href={cta.href} variant="accent" size="lg" arrow>
              {cta.label}
            </Button>
          </Reveal>
        </div>

        <ProductGrid groups={groups} items={items} />
      </Container>
    </section>
  );
}