import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { securityContent } from "@/content/security";
import { ShieldBadge } from "./ShieldBadge";

export function Security() {
  const { eyebrow, title, description, cta, points, panel } = securityContent;

  return (
    <section id="security" aria-labelledby="security-title" className="overflow-hidden bg-white py-24 lg:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <SectionHeading
              id="security-title"
              eyebrow={eyebrow}
              title={
                <>
                  {title[0]} <span className="text-blue">{title[1]}</span>
                </>
              }
              description={description}
            >
              <div className="mt-8">
                <Button href={cta.href} variant="outline" size="lg" arrow>
                  {cta.label}
                </Button>
              </div>
            </SectionHeading>
          </Reveal>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2">
            {points.map(({ title, description, icon: Icon }, index) => (
              <Reveal
                as="li"
                key={title}
                delay={0.1 + index * 0.1}
                className="group border-l-2 border-line pl-5 transition-colors duration-500 hover:border-aqua"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue transition-colors duration-500 group-hover:bg-aqua group-hover:text-navy">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{description}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15} className="relative lg:pl-6 lg:pt-6">
          <div className="relative aspect-3/2 overflow-hidden rounded-panel shadow-float">
            {panel.image ? (
              <Image
                src={panel.image}
                alt={panel.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              // Placeholder until the photo exists
              <div className="absolute inset-0 bg-linear-to-br from-navy via-blue to-navy-950">
                <svg aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 w-full" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none">
                  <path d="M0 120 C 100 60, 200 180, 300 120 S 500 40, 600 100" className="stroke-aqua/30" strokeWidth="30" strokeLinecap="round" />
                  <path d="M0 160 C 100 100, 200 220, 300 160 S 500 80, 600 140" className="stroke-white/10" strokeWidth="30" strokeLinecap="round" />
                </svg>
              </div>
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/20 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-8 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              {panel.title[0]}
              <br />
              <span className="text-aqua">{panel.title[1]}</span>
            </p>
          </div>

          <div className="absolute left-0 top-0 hidden sm:block">
            <ShieldBadge />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}