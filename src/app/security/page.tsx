import type { Metadata } from "next";
import { CallToAction } from "@/components/landing/CallToAction";
import { CardGrid } from "@/components/page/CardGrid";
import { JumpNav } from "@/components/page/JumpNav";
import { PageHero } from "@/components/page/PageHero";
import { ComplianceFramework, SecurityLifecycle } from "@/components/security/SecuritySections";
import { SecurityVisual } from "@/components/security/SecurityVisual";
import { Button } from "@/components/ui/Button";
import { securityContent } from "@/content/security";
import { securityPage } from "@/content/securityPage";

export const metadata: Metadata = {
  title: "Security & compliance",
  description:
    "How Billpay protects every payment: verified merchants, AML monitoring, maker-checker settlements, audit trails, and enterprise security controls.",
};

export default function SecurityPage() {
  const { hero, protection } = securityPage;

  return (
    <main id="main">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Security & compliance" }]}
        actions={
          <>
            <Button href="#compliance" size="lg" arrow>
              See our framework
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Talk to our team
            </Button>
          </>
        }
      >
        <SecurityVisual />
      </PageHero>

      <JumpNav
        label="On this page"
        links={[
          { label: "Protection", href: "#protection" },
          { label: "Controls", href: "#controls" },
          { label: "Compliance", href: "#compliance" },
        ]}
      />

      <CardGrid
        id="protection"
        eyebrow={protection.eyebrow}
        title={protection.title}
        description={protection.description}
        items={securityContent.points}
      />
      <SecurityLifecycle />
      <ComplianceFramework />
      <CallToAction />
    </main>
  );
}