import { Container } from "@/components/ui/Container";
import { Hero } from "@/components/landing/hero/Hero";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { Products } from "@/components/landing/products/Products";
import { Solutions } from "@/components/landing/Solutions";

// Placeholder sections. Each will be replaced by its real component.
const sections = [
  { id: "developers", label: "Developers" },
  { id: "security", label: "Security" },
  { id: "about", label: "About" },
  { id: "get-started", label: "Get started" },
];

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <ValueProposition />
      <Products />
      <Solutions />

      {sections.map((section, index) => (
        <section key={section.id} id={section.id} className={index % 2 === 0 ? "bg-white" : "bg-surface"}>
          <Container className="flex min-h-[70vh] items-center">
            <h2 className="text-heading font-bold">{section.label}</h2>
          </Container>
        </section>
      ))}
    </main>
  );
}