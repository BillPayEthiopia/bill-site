import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { solutionsContent, type Solution } from "@/content/solutions";

function SolutionCard({ title, description, href, icon: Icon, image, alt }: Solution) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
      <div className="relative aspect-4/3 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 85vw"
            className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
          />
        ) : (
          // Placeholder until the photo exists: brand gradient with a faint icon
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-blue-50 via-aqua-50 to-white">
            <Icon className="size-20 text-blue/15" aria-hidden="true" />
          </div>
        )}

        {/* Navy tint rising on hover, so the white icon chip and photo stay readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-navy/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="absolute left-4 top-4 flex size-10 items-center justify-center rounded-xl bg-white/90 text-blue shadow-sm backdrop-blur">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed">{description}</p>
        <Link
          href={href}
          className="group/link mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-blue"
        >
          Learn more
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}

export function Solutions() {
  const { eyebrow, title, description, cta, items } = solutionsContent;

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="bg-surface py-24 lg:py-32">
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

        {/* Swipeable row on phones, grid from sm up */}
        <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
          {items.map((solution, index) => (
            <Reveal
              as="li"
              key={solution.title}
              delay={index * 0.1}
              className="w-[85%] shrink-0 snap-start sm:w-auto"
            >
              <SolutionCard {...solution} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}