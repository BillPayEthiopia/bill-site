import { CallToAction } from "@/components/landing/CallToAction";
import { Developers } from "@/components/landing/developers/Developers";
import { Hero } from "@/components/landing/hero/Hero";
import { HowItWorks } from "@/components/landing/how-it-works/HowItWorks";
import { Products } from "@/components/landing/products/Products";
import { Security } from "@/components/landing/security/Security";
import { Solutions } from "@/components/landing/Solutions";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { PartnerStrip } from "@/components/landing/PartnerStrip";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <PartnerStrip />
      <ValueProposition />
      <Products />
      <Solutions />
      <HowItWorks />
      <Developers />
      <Security />
      <CallToAction />
    </main>
  );
}