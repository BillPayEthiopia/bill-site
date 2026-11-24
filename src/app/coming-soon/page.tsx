import type { Metadata } from "next";
import { PageHero } from "@/components/page/PageHero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "Self-serve merchant sign-up is coming soon. Contact the Billpay team to get started in the meantime.",
};

export default function ComingSoonPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Coming soon"
        title={["Get started with Billpay", "is on its way."]}
        description="Self-serve merchant sign-up isn't open yet. Reach out to our team and we'll help you get set up as soon as it launches."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Coming soon" }]}
        actions={
          <>
            <Button href="/contact" size="lg" arrow>
              Contact us
            </Button>
            <Button href="/" size="lg" variant="outline">
              Back to home
            </Button>
          </>
        }
      />
    </main>
  );
}
