import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { cn } from "@/lib/utils";
import { TwoLineTitle } from "./TwoLineTitle";

export type CardItem = { title: string; description: string; icon: LucideIcon; href?: string };

type CardGridProps = {
  id: string;
  eyebrow: string;
  title: [string, string];
  description?: string;
  items: CardItem[];
  background?: "white" | "surface";
  columns?: 3 | 4;
};

const COLUMNS = { 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/** A heading followed by a grid of icon cards. */
export function CardGrid({ id, eyebrow, title, description, items, background = "white", columns = 4 }: CardGridProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-20 py-24 lg:py-32", background === "white" ? "bg-white" : "bg-surface")}
    >
      <Container>
        <Reveal>
          <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={<TwoLineTitle title={title} />} description={description} />
        </Reveal>

        <ul className={cn("mt-14 grid gap-5 sm:grid-cols-2", COLUMNS[columns])}>
          {items.map(({ title, description, icon: Icon, href }, index) => (
            <Reveal as="li" key={title} delay={(index % columns) * 0.1} className="h-full">
              <SpotlightCard className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card transition-[translate,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-float">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-7 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-linear-to-r from-blue to-aqua transition-transform duration-500 ease-brand group-hover:scale-x-100"
                />
                <span className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue ring-1 ring-blue/10 transition-[background-color,color,box-shadow,rotate] duration-500 ease-brand group-hover:-rotate-6 group-hover:bg-aqua group-hover:text-navy group-hover:shadow-glow">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed">{description}</p>
                {href && (
                  <Link
                    href={href}
                    className="group/link mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-blue"
                  >
                    Learn more
                    <ArrowRight className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}