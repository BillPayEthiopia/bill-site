"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { navActions } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { MobileMenuButton, MobileMenuPanel } from "./MobileMenu";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    // Only hide after the visitor has scrolled past the top area.
    setScrollingDown(y > previous && y > 160);
  });

  // Never hide while a menu is open.
  const hidden = scrollingDown && !openMenu && !mobileOpen;
  const compact = scrolled || mobileOpen;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: DURATION.base, ease: EASE_BRAND }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,box-shadow] duration-300 ease-brand",
            mobileOpen
              ? "border-line bg-white"
              : scrolled
                ? "border-line bg-white/80 shadow-card backdrop-blur-lg"
                : "border-transparent bg-transparent",
          )}
        >
          <Container
            className={cn(
              "flex items-center justify-between transition-[height] duration-300 ease-brand",
              compact ? "h-16" : "h-20",
            )}
          >
            <Link href="/" aria-label="Billpay home" className="shrink-0 rounded-md">
              <Logo className="w-28 sm:w-32" priority />
            </Link>

            <DesktopNav openMenu={openMenu} onOpenMenuChange={setOpenMenu} />

            <div className="hidden items-center gap-2 lg:flex">
              {navActions.signIn && (
                <Link
                  href={navActions.signIn}
                  className="rounded-full px-4 py-2 font-display text-[15px] font-medium text-navy/80 transition-colors hover:text-navy"
                >
                  Sign in
                </Link>
              )}
              <Button href={navActions.getStarted} arrow>
                Get started
              </Button>
            </div>

            <MobileMenuButton open={mobileOpen} onOpenChange={setMobileOpen} />
          </Container>
        </div>
      </motion.header>

      <MobileMenuPanel open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}