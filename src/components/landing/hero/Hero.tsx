import { Container } from "@/components/ui/Container";
import { HeroBackground } from "./HeroBackground";
import { HeroCopy } from "./HeroCopy";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36"
    >
      <HeroBackground />
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <HeroCopy />
        <HeroVisual />
      </Container>
    </section>
  );
}