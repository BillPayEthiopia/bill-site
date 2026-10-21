import type { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/page/PageHero";
import { Container } from "@/components/ui/Container";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Billpay team about merchant accounts, government collections, partnerships, or developer access.",
};

export default function ContactPage() {
  const { hero } = contactPage;

  return (
    <main id="main">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section aria-label="Contact Billpay" className="bg-surface py-20 lg:py-28">
        <Container className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.12} className="lg:sticky lg:top-28">
            <ContactDetails />
          </Reveal>
        </Container>
      </section>
    </main>
  );
}