"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  LayoutDashboard,
  RotateCcw,
  Settings,
  Store,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import type { DemoTransaction } from "@/content/hero";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";
import { CountUp } from "../CountUp";

const LINE = "M0 64 C 24 60, 36 50, 56 52 S 92 40, 112 42 S 148 24, 168 28 S 204 12, 240 8";
const AREA = `${LINE} L 240 88 L 0 88 Z`;
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const NAV = [LayoutDashboard, ArrowLeftRight, Wallet, Store, Settings];

const label = "text-[8px] font-semibold uppercase tracking-wider text-mortar";

function Stat({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[10px] bg-white p-[8px] ring-1 ring-line">
      <p className={label}>{title}</p>
      <p className="mt-[3px] truncate font-display text-[13px] font-bold tabular-nums">{children}</p>
    </div>
  );
}

type DashboardScreenProps = {
  total: number;
  count: number;
  transactions: DemoTransaction[];
};

/** Merchant web dashboard: sidebar, key stats, volume chart, and live payments. */
export function DashboardScreen({ total, count, transactions }: DashboardScreenProps) {
  return (
    <div className="flex h-full bg-surface text-navy">
      <aside className="flex w-[48px] shrink-0 flex-col items-center gap-[10px] border-r border-line bg-white py-[12px]">
        <Logo variant="monogram" className="mb-[6px] w-[20px]" />
        {NAV.map((Icon, index) => (
          <span
            key={index}
            className={cn(
              "flex size-[28px] items-center justify-center rounded-[8px]",
              index === 0 ? "bg-navy text-white" : "text-navy/35",
            )}
          >
            <Icon className="size-[14px]" />
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col p-[14px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-[14px] font-bold leading-tight">Overview</p>
            <p className="text-[10px] text-mortar">Merchant dashboard · This week</p>
          </div>
          <span className="rounded-full bg-white px-[8px] py-[3px] text-[8px] font-semibold uppercase tracking-wider text-mortar ring-1 ring-line">
            Sample data
          </span>
        </div>

        <div className="mt-[10px] grid grid-cols-3 gap-[8px]">
          <Stat title="Total volume">
            <CountUp kind="etb" value={total} />
          </Stat>
          <Stat title="Payments">
            <CountUp kind="count" value={count} />
          </Stat>
          <Stat title="Success rate">99.4%</Stat>
        </div>

        <div className="mt-[8px] grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-[8px]">
          {/* Volume chart */}
          <div className="flex min-h-0 flex-col rounded-[10px] bg-white p-[10px] ring-1 ring-line">
            <p className={label}>Payment volume</p>
            <svg viewBox="0 0 240 88" preserveAspectRatio="none" className="mt-[8px] min-h-0 w-full flex-1 overflow-visible" fill="none">
              <defs>
                <linearGradient id="dashboard-volume-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: "var(--color-aqua)", stopOpacity: 0.35 }} />
                  <stop offset="100%" style={{ stopColor: "var(--color-aqua)", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {[22, 44, 66].map((y) => (
                <line key={y} x1="0" x2="240" y1={y} y2={y} className="stroke-line" strokeWidth={1} vectorEffect="non-scaling-stroke" />
              ))}
              <motion.path
                d={AREA}
                fill="url(#dashboard-volume-fill)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
              />
              <motion.path
                d={LINE}
                className="stroke-blue"
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 1.1, ease: EASE_BRAND }}
              />
            </svg>
            <div className="mt-[6px] flex justify-between text-[8px] text-mortar">
              {DAYS.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          {/* Live payments */}
          <div className="min-w-0 overflow-hidden rounded-[10px] bg-white p-[10px] ring-1 ring-line">
            <p className={label}>Recent payments · ETB</p>
            <ul className="mt-[6px]">
              <AnimatePresence initial={false}>
                {transactions.map((tx, index) => {
                  const received = tx.kind === "received";
                  const Icon = received ? ArrowDownLeft : RotateCcw;
                  return (
                    <motion.li
                      key={tx.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: EASE_BRAND }}
                      className="overflow-hidden"
                    >
                      <div
                        className={cn(
                          "flex items-center gap-[7px] rounded-[7px] p-[5px] transition-colors duration-700",
                          index === 0 && received ? "bg-aqua-50" : "bg-transparent",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-[22px] shrink-0 items-center justify-center rounded-[6px]",
                            received ? "bg-aqua/15 text-blue" : "bg-navy-50 text-navy",
                          )}
                        >
                          <Icon className="size-[12px]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[10px] font-semibold">{tx.method}</p>
                          <p className="flex items-center gap-[4px] text-[8px] text-mortar">
                            <span className={cn("size-[5px] rounded-full", received ? "bg-success" : "bg-mortar/50")} />
                            {received ? "Completed" : "Refunded"}
                          </p>
                        </div>
                        <p className={cn("shrink-0 text-[10px] font-semibold tabular-nums", received ? "text-blue" : "text-mortar")}>
                          {received ? "+" : "−"}
                          {formatETB(tx.amount)}
                        </p>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}