import { Container } from "@/components/ui/Container";
import { HeroBackground } from "./HeroBackground";
import { HeroCopy } from "./HeroCopy";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-36 short:pb-16 short:pt-28"
    >
      <HeroBackground />
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10 xl:gap-16">
        <HeroCopy />
        <HeroVisual />
      </Container>
    </section>
  );
}