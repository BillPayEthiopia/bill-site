"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { navGroups } from "@/content/navigation";
import { DURATION, EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";


type DesktopNavProps = {
  openMenu: string | null;
  onOpenMenuChange: (label: string | null) => void;
};


export function DesktopNav({ openMenu, onOpenMenuChange }: DesktopNavProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const open = (label: string) => {
    cancelClose();
    onOpenMenuChange(label);
  };

  // A short delay lets the pointer travel from a trigger to its panel without flicker.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => onOpenMenuChange(null), 150);
  };

  // While a menu is open: close it on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;

    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) onOpenMenuChange(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openMenu) {
        triggerRefs.current[openMenu]?.focus(); // return focus to its trigger
        onOpenMenuChange(null);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu, onOpenMenuChange]);

  // Clear any pending timer if the component unmounts.
  useEffect(() => cancelClose, []);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-1" onPointerLeave={() => setHovered(null)}>
        {navGroups.map((group) => {
          const isOpen = openMenu === group.label;
          const panelId = `nav-panel-${group.label.toLowerCase()}`;
          const showHighlight = (hovered ?? openMenu) === group.label;
          // Long menus (Products has 8 items) open as a wider two-column panel.
          const wide = group.items.length > 6;

          return (
            <li
              key={group.label}
              className="relative"
              onPointerEnter={(e) => e.pointerType === "mouse" && open(group.label)}
              onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
              onBlur={(e) => {
                // Close when keyboard focus moves outside this group.
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  if (isOpen) onOpenMenuChange(null);
                }
              }}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[group.label] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => (isOpen ? onOpenMenuChange(null) : open(group.label))}
                onPointerEnter={() => setHovered(group.label)}
                className="relative isolate flex items-center gap-1 rounded-full px-4 py-2 font-display text-[15px] font-medium text-navy/80 transition-colors duration-200 hover:text-navy"
              >
                {showHighlight && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 -z-10 rounded-full bg-navy-50"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                  />
                )}
                {group.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-300 ease-brand",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: DURATION.fast, ease: EASE_BRAND }}
                    className={cn(
                      "absolute top-full z-50 pt-3",
                      wide ? "left-0 w-[40rem] origin-top-left" : "left-1/2 w-[22rem] -translate-x-1/2 origin-top",
                    )}
                  >
                    <div className="rounded-card border border-line bg-white p-2 shadow-float">
                      <ul className={cn(wide && "grid grid-cols-2 gap-x-1")}>
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => onOpenMenuChange(null)}
                                className="group/item flex h-full items-start gap-3 rounded-xl p-3 transition-colors duration-200 hover:bg-surface"
                              >
                                {Icon && (
                                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-aqua-50 text-blue transition-colors duration-200 group-hover/item:bg-navy group-hover/item:text-aqua">
                                    <Icon className="size-5" aria-hidden="true" />
                                  </span>
                                )}
                                <span>
                                  <span className="block font-display font-semibold text-navy">
                                    {item.label}
                                  </span>
                                  {item.description && (
                                    <span className="mt-0.5 block text-sm leading-snug text-mortar">
                                      {item.description}
                                    </span>
                                  )}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}