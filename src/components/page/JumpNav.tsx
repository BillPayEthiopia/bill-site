import Link from "next/link";
import { Container } from "@/components/ui/Container";

export type JumpLink = { label: string; href: string };

/** A row of pills linking to sections further down the page. */
export function JumpNav({ label, links }: { label: string; links: JumpLink[] }) {
  return (
    <nav aria-label={label} className="border-y border-line bg-white">
      <Container className="flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-full border border-line bg-surface px-4 py-2 font-display text-sm font-medium text-navy transition-colors duration-300 ease-brand hover:border-blue/30 hover:bg-blue-50 hover:text-blue"
          >
            {link.label}
          </Link>
        ))}
      </Container>
    </nav>
  );
}