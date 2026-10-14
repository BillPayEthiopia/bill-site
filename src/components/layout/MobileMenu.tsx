"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { navActions, navGroups } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TOGGLE_ID = "mobile-menu-toggle";

/** The two-line icon that morphs into an X. Lives inside the header. */
export function MobileMenuButton({ open, onOpenChange }: MobileMenuProps) {
  const line = "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-brand";
  return (
    <button
      id={TOGGLE_ID}
      type="button"
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => onOpenChange(!open)}
      className="flex size-11 items-center justify-center rounded-full text-navy transition-colors duration-200 hover:bg-navy-50 lg:hidden"
    >
      <span className="relative block h-3.5 w-5" aria-hidden="true">
        <span className={cn(line, open ? "top-1.5 rotate-45" : "top-0")} />
        <span className={cn(line, open ? "top-1.5 -rotate-45" : "top-3")} />
      </span>
    </button>
  );
}

/** The full-screen menu. Rendered outside the header so it can cover the page. */
export function MobileMenuPanel({ open, onOpenChange }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => onOpenChange(false);

  useEffect(() => {
    if (!open) return;

    // Stop the page behind the menu from scrolling.
    const root = document.documentElement;
    root.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
        document.getElementById(TOGGLE_ID)?.focus();
      }
    }

    // If the screen grows to desktop size, the mobile menu no longer applies.
    const desktop = window.matchMedia("(min-width: 64rem)");
    function onBreakpointChange() {
      if (desktop.matches) onOpenChange(false);
    }

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.fast, ease: EASE_BRAND }}
          className="fixed inset-0 z-40 overflow-y-auto bg-white pt-16 lg:hidden"
        >
          <motion.nav
            aria-label="Mobile"
            initial={{ y: -12 }}
            animate={{ y: 0 }}
            exit={{ y: -12 }}
            transition={{ duration: DURATION.base, ease: EASE_BRAND }}
            className="flex min-h-full flex-col px-5 pb-8 pt-4 sm:px-8"
          >
            <ul className="divide-y divide-line">
              {navGroups.map((group, index) => {
                const isExpanded = expanded === group.label;
                const listId = `mobile-${group.label.toLowerCase()}`;

                return (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: DURATION.base, ease: EASE_BRAND }}
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={listId}
                      onClick={() => setExpanded(isExpanded ? null : group.label)}
                      className="flex w-full items-center justify-between py-4 font-display text-lg font-semibold text-navy"
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-5 text-navy/60 transition-transform duration-300 ease-brand",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={listId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: DURATION.base, ease: EASE_BRAND }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-3">
                            {group.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    onClick={close}
                                    className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-200 hover:bg-surface"
                                  >
                                    {Icon && (
                                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-aqua-50 text-blue">
                                        <Icon className="size-4.5" aria-hidden="true" />
                                      </span>
                                    )}
                                    <span className="font-display font-medium text-navy">{item.label}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-auto space-y-3 pt-8">
              {navActions.signIn && (
                <Button href={navActions.signIn} variant="outline" size="lg" className="w-full" onClick={close}>
                  Sign in
                </Button>
              )}
              <Button href={navActions.getStarted} size="lg" arrow className="w-full" onClick={close}>
                Get started
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}