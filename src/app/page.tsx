import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const sections = [
  { id: "products", label: "Products" },
  { id: "solutions", label: "Solutions" },
  { id: "developers", label: "Developers" },
  { id: "security", label: "Security" },
  { id: "about", label: "About" },
  { id: "get-started", label: "Get started" },
];

export default function Home() {
  return (
    <main id="main">
      <section className="bg-linear-to-b from-blue-50 to-white pb-24 pt-36">
        <Container className="space-y-6">
          <h1 className="text-display font-bold">
            Move money <span className="text-blue">forward.</span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed">
            Navbar test page. Scroll down to watch the header change, then scroll back up.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#get-started" size="lg" arrow>
              Get started
            </Button>
            <Button href="#products" variant="outline" size="lg">
              Explore Billpay
            </Button>
          </div>
        </Container>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index % 2 === 0 ? "bg-white" : "bg-surface"}
        >
          <Container className="flex min-h-[70vh] items-center">
            <h2 className="text-heading font-bold">{section.label}</h2>
          </Container>
        </section>
      ))}
    </main>
  );
}