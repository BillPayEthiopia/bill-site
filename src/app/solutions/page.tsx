import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { CallToAction } from "@/components/landing/CallToAction";
import { FeatureRow } from "@/components/page/FeatureRow";
import { JumpNav } from "@/components/page/JumpNav";
import { PageHero } from "@/components/page/PageHero";
import { PhotoPanel } from "@/components/page/PhotoPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SIGN_UP_URL } from "@/content/navigation";
import { solutionsContent, solutionsPage } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Billpay for government institutions, online stores, service businesses, digital platforms, enterprises, and financial institutions.",
};

export default function SolutionsPage() {
  const { items } = solutionsContent;
  // Government first, then the rest in their usual order.
  const ordered = [
    ...items.filter((item) => item.id === solutionsPage.leadId),
    ...items.filter((item) => item.id !== solutionsPage.leadId),
  ];

  return (
    <main id="main">
      <PageHero
        eyebrow={solutionsPage.eyebrow}
        title={solutionsPage.title}
        description={solutionsPage.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        actions={
          <>
            <Button href={SIGN_UP_URL} size="lg" arrow>
              Get started
            </Button>
            <Button href="/#get-started" variant="outline" size="lg">
              Talk to our team
            </Button>
          </>
        }
      >
        <PhotoPanel image="/solutions/enterprises.jpg" alt="The Addis Ababa skyline" icon={Building2} priority />
      </PageHero>

      <JumpNav
        label="Solutions on this page"
        links={ordered.map((item) => ({ label: item.title, href: `#${item.id}` }))}
      />

      <section aria-label="Solutions" className="bg-white py-24 lg:py-32">
        <Container className="space-y-24 lg:space-y-32">
          {ordered.map((item, index) => (
            <FeatureRow
              key={item.id}
              id={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.description}
              points={item.points}
              reverse={index % 2 === 1}
              visual={<PhotoPanel image={item.image} alt={item.alt} icon={item.icon} />}
            />
          ))}
        </Container>
      </section>

      <CallToAction />
    </main>
  );
}