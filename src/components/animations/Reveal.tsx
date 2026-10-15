"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_BRAND } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait once in view. Stagger siblings with index * 0.1. */
  delay?: number;
  className?: string;
  /** Render as a list item when used directly inside a <ul>. */
  as?: "div" | "li";
};

/** Fades and rises its content into place the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_BRAND }}
    >
      {children}
    </Component>
  );
}