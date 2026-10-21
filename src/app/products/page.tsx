import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { CallToAction } from "@/components/landing/CallToAction";
import { CardGrid } from "@/components/page/CardGrid";
import { FeatureRow } from "@/components/page/FeatureRow";
import { JumpNav } from "@/components/page/JumpNav";
import { PageHero } from "@/components/page/PageHero";
import { TwoLineTitle } from "@/components/page/TwoLineTitle";
import { VisualPanel } from "@/components/page/VisualPanel";
import { LiveIllustration } from "@/components/products/LiveIllustration"
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SIGN_UP_URL } from "@/content/navigation";
import { productsPage } from "@/content/productsPage";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Checkout, payment links, QR, POS, settlements, disputes, and a merchant app: every way to get paid and manage your money with Billpay.",
};

export default function ProductsPage() {
  const { hero, groups, platform } = productsPage;
  const allProducts = groups.flatMap((group) => group.items);

  return (
    <main id="main">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        actions={
          <>
            <Button href={SIGN_UP_URL} size="lg" arrow>
              Get started
            </Button>
            <Button href="#platform" variant="outline" size="lg">
              See the platform
            </Button>
          </>
        }
      >
        <VisualPanel>
          <LiveIllustration kind="checkout" />
        </VisualPanel>
      </PageHero>

      <JumpNav
        label="Products on this page"
        links={allProducts.map((product) => ({ label: product.title, href: `#${product.id}` }))}
      />

      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`${group.id}-title`}
          className={cn("scroll-mt-20 py-24 lg:py-32", groupIndex % 2 === 0 ? "bg-white" : "bg-surface")}
        >
          <Container>
            <Reveal>
              <SectionHeading
                id={`${group.id}-title`}
                eyebrow={group.eyebrow}
                title={<TwoLineTitle title={group.title} />}
                description={group.description}
              />
            </Reveal>

            <div className="mt-16 space-y-24 lg:mt-20 lg:space-y-32">
              {group.items.map((product, index) => (
                <FeatureRow
                  key={product.id}
                  id={product.id}
                  eyebrow={product.eyebrow}
                  title={product.title}
                  description={product.description}
                  points={product.points}
                  reverse={index % 2 === 1}
                  visual={
                    <VisualPanel>
                      <LiveIllustration kind={product.kind} />
                    </VisualPanel>
                  }
                />
              ))}
            </div>
          </Container>
        </section>
      ))}

      <CardGrid
        id="platform"
        eyebrow={platform.eyebrow}
        title={platform.title}
        description={platform.description}
        items={platform.items}
      />

      <CallToAction />
    </main>
  );
}