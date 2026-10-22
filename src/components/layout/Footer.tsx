import Link from "next/link";
import { ArrowUp, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FlowingRibbons } from "@/components/ui/FlowingRibbons";
import { Logo } from "@/components/ui/Logo";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { footerContent } from "@/content/footer";
import { navGroups } from "@/content/navigation";
import { Waves } from "@/components/ui/Waves";


/** Underline that grows from the left on hover. */
const linkClass =
  "bg-linear-to-r from-aqua to-aqua bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 " +
  "transition-[background-size,color] duration-300 ease-brand hover:bg-[length:100%_1px] hover:text-white";

export async function Footer() {
  "use cache";
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 text-white/60">
      {/* Wave edge flowing out of the grey CTA section above */}
      <WaveDivider position="top" fill="fill-surface" />

      <Waves tone="dark" className="absolute inset-x-0 bottom-0 h-44 sm:h-56" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-aqua to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_50%_60%_at_100%_100%,black,transparent)]" />
        <div className="absolute -bottom-48 -right-32 size-[34rem] rounded-full bg-blue/20 blur-3xl" />
        <Waves tone="dark" className="absolute inset-x-0 bottom-0 h-44 sm:h-56" />
      </div>
   
      <Container className="grid gap-14 pb-20 pt-24 lg:grid-cols-[1.3fr_2fr] lg:gap-20 lg:pb-24 lg:pt-32">
        {/* Brand column */}
        <div className="max-w-sm">
          <Link href="/" aria-label="Billpay home" className="inline-block rounded-md">
            <Logo variant="reversed" className="w-36" />
          </Link>
          <p className="mt-5 font-display text-lg font-semibold text-white">{footerContent.tagline}</p>
          <p className="mt-3 leading-relaxed">{footerContent.description}</p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs">
            <MapPin className="size-3.5 text-aqua" aria-hidden="true" />
            {footerContent.location}
          </p>

          {footerContent.social.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {footerContent.social.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-[background-color,border-color,color,translate] duration-300 ease-brand hover:-translate-y-0.5 hover:border-aqua hover:bg-aqua hover:text-navy focus-visible:outline-aqua"
                  >
                    <span
                      aria-hidden="true"
                      className="size-4 bg-current"
                      style={{
                        maskImage: `url(${icon})`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-aqua">
                {group.label}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col-reverse gap-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Billpay. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {footerContent.legal.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}

            <a href="#main" className="group inline-flex items-center gap-2 font-display font-medium text-white">
              Back to top
              <span className="flex size-8 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 ease-brand group-hover:border-aqua group-hover:bg-aqua group-hover:text-navy">
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