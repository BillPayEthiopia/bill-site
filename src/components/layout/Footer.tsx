import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerContent } from "@/content/footer";
import { navGroups } from "@/content/navigation";

/** Underline that grows from the left on hover. */
const linkClass =
  "bg-linear-to-r from-blue to-blue bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 " +
  "transition-[background-size,color] duration-300 ease-brand " +
  "hover:bg-[length:100%_1px] hover:text-navy";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white">
      {/* Brand-colored hairline along the top edge */}
      <div aria-hidden="true" className="h-px bg-linear-to-r from-navy via-blue to-aqua" />

      <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-20">
        <div className="max-w-xs space-y-5">
          <Link href="/" aria-label="Billpay home" className="inline-block rounded-md">
            <Logo className="w-32" />
          </Link>
          <p className="leading-relaxed">{footerContent.description}</p>

          {footerContent.social.length > 0 && (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {footerContent.social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-wider">
                {group.label}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col-reverse gap-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Billpay. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footerContent.legal.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}

            <a href="#main" className="group inline-flex items-center gap-2 font-display font-medium text-navy">
              Back to top
              <span className="flex size-8 items-center justify-center rounded-full border border-line transition-colors duration-300 ease-brand group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                <ArrowUp
                  className="size-4 transition-transform duration-300 ease-brand group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}