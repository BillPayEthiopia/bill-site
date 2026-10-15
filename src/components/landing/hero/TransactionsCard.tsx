"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDownLeft, RotateCcw } from "lucide-react";
import type { DemoTransaction } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

export function TransactionsCard({ items }: { items: DemoTransaction[] }) {
  return (
    <div className="w-[19rem] rounded-card border border-line/60 bg-white p-4 shadow-float">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-navy">Transactions</p>
        <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
          Sample data
        </span>
      </div>

      <ul className="relative mt-3 space-y-1">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((tx, index) => {
            const received = tx.kind === "received";
            const Icon = received ? ArrowDownLeft : RotateCcw;
            return (
              <motion.li
                key={tx.id}
                layout
                initial={{ opacity: 0, y: -14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE_BRAND }}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-700",
                  index === 0 && received ? "bg-aqua-50" : "bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg",
                    received ? "bg-aqua/15 text-blue" : "bg-navy-50 text-navy",
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-navy">
                    {received ? "Payment received" : "Refund"}
                  </p>
                  <p className="truncate text-[11px]">{tx.method}</p>
                </div>
                <p className={cn("text-xs font-semibold tabular-nums", received ? "text-blue" : "text-mortar")}>
                  {received ? "+" : "−"}ETB {formatETB(tx.amount)}
                </p>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}