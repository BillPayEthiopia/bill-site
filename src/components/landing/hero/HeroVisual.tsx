"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Float } from "@/components/animations/Float";
import {
  heroDemo,
  METHOD_LABELS,
  type CheckoutStage,
  type DemoTransaction,
} from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PhoneCheckout } from "./PhoneCheckout";
import { TransactionsCard } from "./TransactionsCard";
import { VolumeCard } from "./VolumeCard";

/** How long each checkout screen stays visible, in milliseconds. */
const STAGE_MS: Record<CheckoutStage, number> = {
  select: 2800,
  processing: 1400,
  success: 3200,
};

/** One mockup element: rises in on load, floats, and sits at a 3D depth. */
function Layer({
  className,
  depth,
  delay,
  floatDelay,
  children,
}: {
  className: string;
  depth: number;
  delay: number;
  floatDelay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      style={{ z: depth }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: EASE_BRAND }}
    >
      <Float delay={floatDelay}>{children}</Float>
    </motion.div>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();

  // ---- The payment story: select → processing → success → next order ----
  const [stage, setStage] = useState<CheckoutStage>("select");
  const [cycle, setCycle] = useState(0);
  const [transactions, setTransactions] = useState<DemoTransaction[]>(heroDemo.initialTransactions);
  const [total, setTotal] = useState(heroDemo.baseVolume);
  const nextId = useRef(heroDemo.initialTransactions.length);

  const order = heroDemo.orders[cycle % heroDemo.orders.length];

  useEffect(() => {
    // Pause when off-screen or when the visitor prefers reduced motion.
    if (reduceMotion || !inView) return;

    const timer = window.setTimeout(() => {
      if (stage === "select") {
        setStage("processing");
      } else if (stage === "processing") {
        setStage("success");
        // The payment lands in the dashboard at the moment it succeeds.
        const id = nextId.current++;
        setTransactions((previous) =>
          [{ id, kind: "received" as const, amount: order.amount, method: METHOD_LABELS[order.method] }, ...previous].slice(0, 3),
        );
        setTotal((current) => current + order.amount);
      } else {
        setStage("select");
        setCycle((current) => current + 1);
      }
    }, STAGE_MS[stage]);

    return () => window.clearTimeout(timer);
  }, [stage, order, reduceMotion, inView]);

  // ---- 3D tilt toward the mouse ----
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), spring);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    // Decorative: hidden from screen readers so sample data is never read as real.
    <div ref={ref} aria-hidden="true" className="relative flex justify-center lg:justify-end">
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        className="relative h-[31rem] w-[34rem] shrink-0 [perspective:1400px] [zoom:0.58] min-[420px]:[zoom:0.7] sm:[zoom:1] lg:[zoom:0.85] xl:[zoom:1]"
      >
        {/* Glows behind the mockups */}
        <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/30 blur-3xl" />
        <div className="absolute right-0 top-0 size-64 rounded-full bg-blue/15 blur-3xl" />

        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative size-full"
        >
          <Layer className="right-0 top-0" depth={0} delay={0.35} floatDelay={0}>
            <TransactionsCard items={transactions} />
          </Layer>
          <Layer className="right-4 top-[17rem]" depth={40} delay={0.55} floatDelay={1.2}>
            <VolumeCard total={total} />
          </Layer>
          <Layer className="left-2 top-12" depth={80} delay={0.2} floatDelay={0.6}>
            <PhoneCheckout
              stage={stage}
              amount={order.amount}
              method={order.method}
              orderId={order.orderId}
            />
          </Layer>
        </motion.div>
      </div>
    </div>
  );
}