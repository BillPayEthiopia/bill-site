import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { productsContent } from "@/content/products";
import { ProductIllustration } from "./ProductIllustration";
import { NavyBackground } from "@/components/landing/NavyBackground";


export function Products() {
  const { eyebrow, title, description, cta, items } = productsContent;

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="relative isolate overflow-hidden py-24 text-white/70 lg:py-32"
    >
      <NavyBackground />

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

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((product, index) => (
                <Reveal as="li" key={product.kind} delay={(index % 4) * 0.1} className="h-full">
                <SpotlightCard className="flex h-full flex-col rounded-card border border-white/10 bg-white/4 p-5 backdrop-blur transition-[translate,border-color,background-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-aqua/40 hover:bg-white/7">
                  <ProductIllustration kind={product.kind} />
                  <h3 className="mt-6 font-display text-lg font-bold text-white">{product.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed">{product.description}</p>
                  <Link
                    href={product.href}
                    className="group/link mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-aqua"
                  >
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}