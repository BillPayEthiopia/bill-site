"use client";

import { AnimatePresence, motion } from "motion/react";
import { CreditCard, Landmark, Smartphone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { METHOD_LABELS, type CheckoutStage, type PaymentMethod } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

const METHOD_ICONS = { mobile: Smartphone, card: CreditCard, bank: Landmark } as const;
const METHOD_ORDER: PaymentMethod[] = ["mobile", "card", "bank"];

type PhoneCheckoutProps = {
  stage: CheckoutStage;
  amount: number;
  method: PaymentMethod;
  orderId: string;
};

export function PhoneCheckout({ stage, amount, method, orderId }: PhoneCheckoutProps) {
  return (
    <div className="w-[15.5rem] rounded-[2.4rem] bg-white p-2 shadow-float ring-1 ring-navy/8">
      <div className="relative overflow-hidden rounded-[2rem] bg-linear-to-b from-surface to-white">
        {/* Notch */}
        <div className="mx-auto mt-2.5 h-5 w-20 rounded-full bg-navy" />
        <div className="flex justify-center pb-2 pt-4">
          <Logo className="w-16" />
        </div>

        {/* Fixed height so the phone never changes size between screens */}
        <div className="relative h-[19.5rem] px-4">
          <AnimatePresence mode="wait" initial={false}>
            {stage === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE_BRAND }}
                className="flex h-full flex-col items-center justify-center pb-6 text-center"
              >
                <div className="relative flex size-16 items-center justify-center">
                  {/* Burst ring */}
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
                <p className="mt-5 font-display text-base font-bold text-navy">Payment successful</p>
                <p className="mt-1 text-xs">
                  ETB {formatETB(amount)} · {orderId}
                </p>
                <div className="mt-6 rounded-full border border-line px-4 py-2 text-xs font-semibold text-navy">
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
                        {selected && (
                          <motion.span
                            layoutId="checkout-method"
                            className="absolute inset-0 rounded-xl border-2 border-blue bg-blue-50"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                          />
                        )}
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
    </div>
  );
}