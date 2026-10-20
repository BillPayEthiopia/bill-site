import type { Metadata } from "next";
import {
  AboutCommitment,
  AboutFocus,
  AboutOverview,
  AboutPurpose,
  AboutTakTech,
} from "@/components/about/AboutSections";
import { EcosystemDiagram } from "@/components/about/EcosystemDiagram";
import { CallToAction } from "@/components/landing/CallToAction";
import { PageHero } from "@/components/page/PageHero";
import { Button } from "@/components/ui/Button";
import { aboutContent } from "@/content/about";
import { SIGN_UP_URL } from "@/content/navigation";

export const metadata: Metadata = {
  title: "About",
  description:
    "Billpay Financial Technologies S.C., a TAK Tech venture, builds secure digital payment infrastructure for Ethiopia's governments, businesses, and citizens.",
};

export default function AboutPage() {
  const { hero } = aboutContent;

  return (
    <main id="main">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        actions={
          <>
            <Button href={SIGN_UP_URL} size="lg" arrow>
              Get started
            </Button>
            <Button href="/#products" variant="outline" size="lg">
              Explore products
            </Button>
          </>
        }
      >
        <EcosystemDiagram />
      </PageHero>
      
      <AboutOverview />
      <AboutPurpose />
      <AboutFocus />
      <AboutTakTech />
      <AboutCommitment />
      <CallToAction />
    </main>
  );
}