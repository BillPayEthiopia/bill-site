import type { Metadata } from "next";
import {
  Environments,
  PaymentFlow,
  Quickstart,
} from "@/components/developers/DeveloperSections";
import { CallToAction } from "@/components/landing/CallToAction";
import { CodeWindow } from "@/components/landing/developers/CodeWindow";
import { CardGrid } from "@/components/page/CardGrid";
import { JumpNav } from "@/components/page/JumpNav";
import { PageHero } from "@/components/page/PageHero";
import { Button } from "@/components/ui/Button";
import { developersPage } from "@/content/developersPage";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Integrate Billpay step by step: how a payment flows, a quickstart with copy-paste code, and a sandbox to test safely.",
};

export default function DevelopersPage() {
  const { hero, resources } = developersPage;

  return (
    <main id="main">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Developers" }]}
        actions={
          <>
            <Button href="#quickstart" size="lg" arrow>
              Start the quickstart
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Request sandbox access
            </Button>
          </>
        }
      >
        <div className="min-w-0">
          <CodeWindow />
        </div>
      </PageHero>

      <JumpNav
        label="On this page"
        links={[
          { label: "How it works", href: "#flow" },
          { label: "Quickstart", href: "#quickstart" },
          { label: "Environments", href: "#environments" },
          { label: "Resources", href: "#resources" },
        ]}
      />

      <PaymentFlow />
      <Quickstart />
      <Environments />

      <CardGrid
        id="resources"
        eyebrow={resources.eyebrow}
        title={resources.title}
        description={resources.description}
        items={resources.items}
      />

      <CallToAction />
    </main>
  );
}
