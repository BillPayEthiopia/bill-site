"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { ProductIllustration } from "@/components/landing/products/ProductIllustration";
import type { ProductKind } from "@/content/products";

/** A product illustration that animates while it's on screen and rests otherwise. */
export function LiveIllustration({ kind }: { kind: ProductKind }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <div ref={ref} className="w-full max-w-xs sm:scale-125">
      <ProductIllustration key={inView ? "active" : "rest"} kind={kind} active={inView} />
    </div>
  );
}