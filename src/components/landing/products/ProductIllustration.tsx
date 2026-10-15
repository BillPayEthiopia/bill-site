"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowDownLeft, Check, Copy, Landmark, Link2 } from "lucide-react";
import type { ProductKind } from "@/content/products";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

/** Cycles through 0…steps-1 while visible. Reduced motion shows the final step. */
function useLoop(steps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), intervalMs);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, steps, intervalMs]);

  return { ref, step: reduceMotion ? steps - 1 : step };
}

/** The dark stage every illustration sits on. */
function Frame(props: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="flex h-40 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-navy-950/70 p-5"
    />
  );
}

function CheckoutIllustration() {
  const { ref, step } = useLoop(4, 1100);
  const paid = step === 3;

  return (
    <Frame ref={ref}>
      <div className="w-44 rounded-xl bg-white p-3 shadow-float">
        <p className="text-[9px] font-semibold uppercase tracking-wider">Card number</p>
        <div className="mt-1 flex h-7 items-center rounded-md border border-line px-2 text-[11px] font-semibold tabular-nums text-navy">
          {step >= 1 ? "•••• •••• •••• 4242" : <span className="h-3 w-px animate-pulse bg-navy" />}
        </div>
        <motion.div
          animate={{ scale: step === 2 ? 0.96 : 1 }}
          transition={{ duration: 0.25, ease: EASE_BRAND }}
          className={cn(
            "mt-2.5 flex h-8 items-center justify-center gap-1.5 rounded-full text-[11px] font-semibold transition-colors duration-300",
            paid ? "bg-aqua text-navy" : step === 2 ? "bg-blue text-white" : "bg-navy text-white",
          )}
        >
          {paid ? (
            <>
              <Check className="size-3.5" /> Paid
            </>
          ) : (
            `Pay ETB ${formatETB(1200)}`
          )}
        </motion.div>
      </div>
    </Frame>
  );
}

function LinksIllustration() {
  const { ref, step } = useLoop(3, 1300);

  return (
    <Frame ref={ref}>
      <div className="relative w-48">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-medium text-navy shadow-float">
          <Link2 className="size-3.5 shrink-0 text-blue" />
          <span className="truncate">billpay.et/pay/4f9k2</span>
          <span
            className={cn(
              "ml-auto flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              step >= 1 ? "bg-aqua text-navy" : "bg-navy-50 text-blue",
            )}
          >
            {step >= 1 ? <Check className="size-3" /> : <Copy className="size-3" />}
          </span>
        </div>

        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="received"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE_BRAND }}
              className="absolute inset-x-3 top-12 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[11px] shadow-float"
            >
              <span className="flex size-6 items-center justify-center rounded-lg bg-aqua/20 text-blue">
                <ArrowDownLeft className="size-3.5" />
              </span>
              <span className="font-semibold text-navy">Payment received</span>
              <span className="ml-auto font-semibold tabular-nums text-blue">+ETB {formatETB(500)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

const SAMPLE_TX = [
  { label: "Payment received", amount: 2450 },
  { label: "Refund issued", amount: -580 },
  { label: "Payment received", amount: 1200 },
  { label: "Payment received", amount: 3875.5 },
];

function TransactionsIllustration() {
  const { ref, step } = useLoop(SAMPLE_TX.length, 1500);

  return (
    <Frame ref={ref}>
      <ul className="w-full max-w-52 space-y-1.5">
        <AnimatePresence initial={false} mode="popLayout">
          {[0, 1, 2].map((offset) => {
            // Newest row on top: step, step-1, step-2 (wrapping around)
            const id = (step - offset + SAMPLE_TX.length) % SAMPLE_TX.length;
            const tx = SAMPLE_TX[id];
            const refund = tx.amount < 0;
            return (
              <motion.li
                key={id}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_BRAND }}
                className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 text-[10px] shadow-card"
              >
                <span className="font-semibold text-navy">{tx.label}</span>
                <span className={cn("font-semibold tabular-nums", refund ? "text-mortar" : "text-blue")}>
                  {refund ? "−" : "+"}ETB {formatETB(Math.abs(tx.amount))}
                </span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </Frame>
  );
}

function SettlementsIllustration() {
  const { ref, step } = useLoop(3, 1500);
  const settled = step === 2;

  return (
    <Frame ref={ref}>
      <div className="w-48 rounded-xl bg-white p-3 shadow-float">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-semibold text-navy">{settled ? "Settled to bank" : "Next settlement"}</span>
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full transition-colors duration-300",
              settled ? "bg-aqua text-navy" : "bg-navy-50 text-blue",
            )}
          >
            {settled ? <Check className="size-3" /> : <Landmark className="size-3" />}
          </span>
        </div>
        <p className="mt-1 font-display text-base font-bold tabular-nums text-navy">ETB {formatETB(48250)}</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full rounded-full bg-linear-to-r from-blue to-aqua"
            animate={{ width: step === 0 ? "0%" : "100%" }}
            transition={{ duration: step === 0 ? 0 : 1.2, ease: EASE_BRAND }}
          />
        </div>
        <p className="mt-1.5 text-[9px]">
          {step === 0 ? "Scheduled for tomorrow" : step === 1 ? "Transferring…" : "Completed"}
        </p>
      </div>
    </Frame>
  );
}

const ILLUSTRATIONS: Record<ProductKind, () => React.JSX.Element> = {
  checkout: CheckoutIllustration,
  links: LinksIllustration,
  transactions: TransactionsIllustration,
  settlements: SettlementsIllustration,
};

/** Decorative, hidden from screen readers. The card's text carries the meaning. */
export function ProductIllustration({ kind }: { kind: ProductKind }) {
  const Illustration = ILLUSTRATIONS[kind];
  return (
    <div aria-hidden="true">
      <Illustration />
    </div>
  );
}