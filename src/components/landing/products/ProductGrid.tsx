"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Product, ProductGroup } from "@/content/products";
import { cn } from "@/lib/utils";
import { ProductIllustration } from "./ProductIllustration";

/** How long each card stays highlighted, in ms. */
const DWELL = 4500;

type GroupInfo = { id: ProductGroup; label: string; description: string };

/**
 * Products in labelled groups. A highlight moves from card to card and only
 * that card animates; hovering or focusing a card takes over the highlight.
 */
export function ProductGrid({ groups, items }: { groups: GroupInfo[]; items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // Advance the highlight while visible and nobody is hovering.
  useEffect(() => {
    if (!inView || reduceMotion || hovered !== null) return;
    const id = window.setInterval(() => setAuto((i) => (i + 1) % items.length), DWELL);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, hovered, items.length]);

  const active = !inView || reduceMotion ? null : (hovered ?? auto);

  function enter(index: number) {
    setHovered(index);
  }

  function leave(index: number) {
    // Carry on from the card the visitor just left.
    setAuto(index);
    setHovered(null);
  }

  return (
    <div ref={ref}>
      {groups.map((group, groupIndex) => (
        <div key={group.id} className={groupIndex === 0 ? "mt-14" : "mt-12"}>
          <Reveal className="flex items-center gap-4">
            <h3 className="shrink-0 font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">
              {group.label}
            </h3>
            <p className="hidden shrink-0 text-sm text-white/50 sm:block">{group.description}</p>
            <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
          </Reveal>

          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {items
              .map((product, index) => ({ product, index }))
              .filter(({ product }) => product.group === group.id)
              .map(({ product, index }, position) => {
                const isActive = active === index;
                return (
                  <Reveal
                    as="li"
                    key={product.kind}
                    delay={position * 0.1}
                    className="h-full"
                  >
                    <div
                      className="h-full"
                      onPointerEnter={() => enter(index)}
                      onPointerLeave={() => leave(index)}
                      onFocus={() => enter(index)}
                      onBlur={() => leave(index)}
                    >
                      <SpotlightCard
                        className={cn(
                          "flex h-full flex-col rounded-card border p-5 backdrop-blur transition-[translate,border-color,background-color,box-shadow] duration-500 ease-brand hover:-translate-y-1.5",
                          isActive
                            ? "border-aqua/40 bg-white/7 shadow-[0_20px_50px_-20px_rgb(55_216_219/0.35)]"
                            : "border-white/10 bg-white/4",
                        )}
                      >
                        {/* Timer line: shows how long until the highlight moves on */}
                        {isActive && hovered === null && (
                          <motion.span
                            key={`timer-${auto}`}
                            aria-hidden="true"
                            className="absolute inset-x-5 top-0 h-0.5 origin-left rounded-full bg-linear-to-r from-blue to-aqua"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: DWELL / 1000, ease: "linear" }}
                          />
                        )}

                        {/* Remounted on activation so the animation starts from the beginning */}
                        <ProductIllustration
                          key={isActive ? "active" : "rest"}
                          kind={product.kind}
                          active={isActive}
                        />

                        <h4 className="mt-6 font-display text-lg font-bold text-white">{product.title}</h4>
                        <p className="mt-2 flex-1 text-sm leading-relaxed">{product.description}</p>
                        <Link
                          href={product.href}
                          className="group/link mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-aqua"
                        >
                          Learn more
                          <ArrowRight
                            className="size-4 transition-transform duration-300 ease-brand group-hover/link:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </SpotlightCard>
                    </div>
                  </Reveal>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}