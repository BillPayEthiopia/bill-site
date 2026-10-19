"use client";

import { AnimatePresence, motion } from "motion/react";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { METHOD_LABELS, type CheckoutStage, type DemoOrder, type PaymentMethod } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

const METHOD_ICONS = { mobile: Smartphone, card: CreditCard, bank: Landmark } as const;
const METHOD_ORDER: PaymentMethod[] = ["mobile", "card", "bank"];

export function PhoneCheckout({ stage, order }: { stage: CheckoutStage; order: DemoOrder }) {
  const { amount, method, orderId, reference } = order;

  return (
    <div className="flex h-full flex-col px-[16px]">
      <div className="flex justify-center pb-[12px] pt-[4px]">
        <Logo className="w-16" />
      </div>

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {stage === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: EASE_BRAND }}
              className="flex h-full flex-col items-center pt-[14px] text-center"
            >
              <div className="relative flex size-16 items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full bg-aqua/40"
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <span className="relative flex size-16 items-center justify-center rounded-full bg-aqua text-navy">
                  <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <motion.path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: EASE_BRAND }}
                    />
                  </svg>
                </span>
              </div>

              <p className="mt-[14px] font-display text-[15px] font-bold text-navy">Payment successful</p>
              <p className="mt-[2px] font-display text-[22px] font-bold tabular-nums text-navy">ETB {formatETB(amount)}</p>

              <dl className="mt-[14px] w-full space-y-[7px] rounded-[14px] bg-white p-[12px] text-left text-[11px] ring-1 ring-line">
                {[
                  ["Order", orderId],
                  ["Paid with", METHOD_LABELS[method]],
                  ["Reference", reference],
                ].map(([term, value]) => (
                  <div key={term} className="flex justify-between gap-[8px]">
                    <dt>{term}</dt>
                    <dd className="font-semibold text-navy">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mb-[14px] mt-auto flex h-[38px] w-full items-center justify-center rounded-full border border-line bg-white text-[12px] font-semibold text-navy">
                View receipt
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_BRAND }}
              className="flex h-full flex-col pt-2"
            >
              <p className="text-center text-[11px] uppercase tracking-wider">Complete your payment</p>
              <p className="mt-1 text-center font-display text-[1.65rem] font-bold tabular-nums text-navy">
                ETB {formatETB(amount)}
              </p>
              <p className="text-center text-[11px]">Order {orderId}</p>

              <ul className="mt-4 space-y-2">
                {METHOD_ORDER.map((id) => {
                  const Icon = METHOD_ICONS[id];
                  const selected = id === method;
                  return (
                    <li
                      key={id}
                      className="relative flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 text-xs font-medium text-navy"
                    >
                      <motion.span
                        className="absolute inset-0 rounded-xl border-2 border-blue bg-blue-50"
                        initial={false}
                        animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.97 }}
                        transition={{ duration: 0.35, ease: EASE_BRAND }}
                      />
                      <Icon className="relative size-4 text-blue" />
                      <span className="relative">{METHOD_LABELS[id]}</span>
                      <span
                        className={cn(
                          "relative ml-auto flex size-4 items-center justify-center rounded-full border",
                          selected ? "border-blue" : "border-line",
                        )}
                      >
                        {selected && <span className="size-2 rounded-full bg-blue" />}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mb-5 mt-auto flex h-10 items-center justify-center gap-2 rounded-full bg-navy text-xs font-semibold text-white">
                {stage === "processing" ? (
                  <>
                    <span className="size-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing…
                  </>
                ) : (
                  <>Pay ETB {formatETB(amount)}</>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}