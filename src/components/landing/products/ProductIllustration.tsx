"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDownLeft, Check, Copy, Fingerprint, Landmark, Link2 } from "lucide-react";
import type { ProductKind } from "@/content/products";
import { PosTerminal } from "@/components/landing/hero/devices/PosTerminal";
import { EASE_BRAND } from "@/lib/motion";
import { cn, formatETB } from "@/lib/utils";

type IllustrationProps = { active: boolean };

/**
 * Steps through 0…steps-1 while active. When inactive (or with reduced motion),
 * shows the last step: the finished state, like "Paid" or "Settled".
 * The grid remounts the illustration each time it becomes active, so it starts at step 0.
 */
function useLoop(steps: number, intervalMs: number, active: boolean) {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [active, reduceMotion, intervalMs]);

  return { step: active && !reduceMotion ? tick % steps : steps - 1 };
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

/* ---------- Checkout ---------- */

function CheckoutIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(4, 1100, active);
  const paid = step === 3;

  return (
    <Frame>
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

/* ---------- Payment links ---------- */

function LinksIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(3, 1300, active);

  return (
    <Frame>
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
              className="absolute inset-x-3 top-12 flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-[11px] shadow-float"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-aqua/20 text-blue">
                <ArrowDownLeft className="size-3.5" />
              </span>
              <span className="font-semibold text-navy">Received</span>
              <span className="ml-auto font-semibold tabular-nums text-blue">+ETB {formatETB(500)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

/* ---------- Transactions ---------- */

const SAMPLE_TX = [
  { label: "Payment received", amount: 2450 },
  { label: "Refund issued", amount: -580 },
  { label: "Payment received", amount: 1200 },
  { label: "Payment received", amount: 3875.5 },
];

function TransactionsIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(SAMPLE_TX.length, 1500, active);

  return (
    <Frame>
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

/* ---------- Settlements ---------- */

function SettlementsIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(3, 1500, active);
  const settled = step === 2;

  return (
    <Frame>
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

/* ---------- QR ---------- */

const FINDERS: [number, number][] = [
  [0, 0],
  [14, 0],
  [0, 14],
];

/** A fixed, made-up QR-style pattern: three corner squares plus random modules. Not scannable. */
const QR_CELLS = (() => {
  const cells: [number, number][] = [];
  const nearFinder = (x: number, y: number) =>
    [[0, 0], [13, 0], [0, 13]].some(([fx, fy]) => x >= fx && x < fx + 8 && y >= fy && y < fy + 8);
  let seed = 7;
  for (let y = 0; y < 21; y++) {
    for (let x = 0; x < 21; x++) {
      if (nearFinder(x, y)) continue;
      seed = (seed * 9301 + 49297) % 233280;
      if (seed / 233280 > 0.52) cells.push([x, y]);
    }
  }
  return cells;
})();

function QrIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(3, 1400, active);
  const reduceMotion = useReducedMotion();
  const paid = step === 2;

  return (
    <Frame>
      <div className="flex w-48 items-center gap-3 rounded-xl bg-white p-3 shadow-float">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
          <svg
            viewBox="0 0 21 21"
            shapeRendering="crispEdges"
            className={cn("size-full transition-opacity duration-300", paid && "opacity-20")}
          >
            {QR_CELLS.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className="fill-navy" />
            ))}
            {FINDERS.map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <rect x={x} y={y} width={7} height={7} className="fill-navy" />
                <rect x={x + 1} y={y + 1} width={5} height={5} className="fill-white" />
                <rect x={x + 2} y={y + 2} width={3} height={3} className="fill-navy" />
              </g>
            ))}
          </svg>

          {/* Scan line */}
          {step === 0 && !reduceMotion && (
            <motion.span
              className="absolute inset-x-0 h-0.5 bg-aqua shadow-[0_0_8px_2px_rgb(55_216_219/0.6)]"
              initial={{ top: "0%" }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.7, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
          )}

          <AnimatePresence>
            {paid && (
              <motion.span
                key="check"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_BRAND }}
                className="absolute inset-0 m-auto flex size-9 items-center justify-center rounded-full bg-aqua text-navy"
              >
                <Check className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-wider">
            {paid ? "Paid" : step === 1 ? "Confirming…" : "Scan to pay"}
          </p>
          <p className="mt-0.5 font-display text-sm font-bold tabular-nums text-navy">ETB {formatETB(350)}</p>
          <p className="mt-0.5 text-[9px]">Table 4 · Café order</p>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- POS ---------- */

function PosIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(2, 2000, active);

  return (
    <Frame>
      {/* The hero's terminal at about a third of its size */}
      <div className="h-[118px] w-[52px]">
        <div className="w-[148px] origin-top-left scale-[0.34]">
          <PosTerminal stage={step === 1 ? "approved" : "ready"} amount={850} />
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Disputes ---------- */

const DISPUTE_STAGES = ["Opened", "Reviewing", "Resolved"];
const DISPUTE_NOTES = ["Evidence requested", "Evidence received", "Settlement adjusted"];

function DisputesIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(3, 1500, active);
  const resolved = step === 2;

  return (
    <Frame>
      <div className="w-48 rounded-xl bg-white p-3 shadow-float">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-semibold text-navy">Case #DS-208</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[9px] font-semibold transition-colors duration-300",
              resolved ? "bg-aqua/20 text-navy" : "bg-navy-50 text-blue",
            )}
          >
            {DISPUTE_STAGES[step]}
          </span>
        </div>
        <p className="mt-1 font-display text-base font-bold tabular-nums text-navy">ETB {formatETB(580)}</p>

        {/* Progress tracker */}
        <div className="mt-3 flex items-center">
          {DISPUTE_STAGES.map((stage, index) => (
            <div key={stage} className={cn("flex items-center", index > 0 && "flex-1")}>
              {index > 0 && (
                <div className="relative mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className="absolute inset-0 origin-left bg-blue"
                    initial={false}
                    animate={{ scaleX: step >= index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE_BRAND }}
                  />
                </div>
              )}
              <span
                className={cn(
                  "size-2.5 shrink-0 rounded-full transition-colors duration-300",
                  step >= index ? (index === 2 ? "bg-aqua" : "bg-blue") : "bg-line",
                )}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[8px]">
          {DISPUTE_STAGES.map((stage) => (
            <span key={stage}>{stage}</span>
          ))}
        </div>

        <p className="mt-2 text-[9px] font-medium text-navy">{DISPUTE_NOTES[step]}</p>
      </div>
    </Frame>
  );
}

/* ---------- Merchant app ---------- */

function AppIllustration({ active }: IllustrationProps) {
  const { step } = useLoop(4, 1400, active);
  const unlocked = step >= 1;
  const balance = step === 3 ? 13680 : 12480;

  return (
    <Frame>
      <div className="relative h-[118px] w-[70px] rounded-[16px] bg-navy-950 p-[4px] shadow-float ring-1 ring-white/15">
        <div className="relative h-full overflow-hidden rounded-[12px] bg-white">
          <span className="absolute left-1/2 top-[4px] z-10 h-[5px] w-[22px] -translate-x-1/2 rounded-full bg-navy-950" />

          <AnimatePresence mode="wait" initial={false}>
            {unlocked ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col px-[6px] pt-[14px]"
              >
                <p className="text-[6px] font-semibold uppercase tracking-wider">Balance</p>
                <p className="font-display text-[10px] font-bold tabular-nums text-navy">ETB {formatETB(balance)}</p>
                <div className="mb-[6px] mt-auto flex h-[36px] items-end gap-[3px]">
                  {[40, 65, 50, 80, 60, 95].map((height, index) => (
                    <span
                      key={index}
                      className={cn("flex-1 rounded-t-[2px]", index === 5 ? "bg-aqua" : "bg-blue/70")}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="lock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col items-center justify-center gap-[4px]"
              >
                <Fingerprint className="size-5 text-blue" />
                <p className="text-[6px] font-semibold text-navy">Touch to unlock</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Payment notification, wider than the phone like a real banner */}
        <AnimatePresence>
          {step === 2 && (
            <motion.div
              key="notice"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE_BRAND }}
              className="absolute -inset-x-12 top-5 flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 text-[10px] shadow-float ring-1 ring-line"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-aqua/20 text-blue">
                <ArrowDownLeft className="size-3" />
              </span>
              <span className="font-semibold text-navy">Payment received</span>
              <span className="ml-auto font-semibold tabular-nums text-blue">+{formatETB(1200)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}

/* ---------- Registry ---------- */

const ILLUSTRATIONS: Record<ProductKind, (props: IllustrationProps) => React.JSX.Element> = {
  checkout: CheckoutIllustration,
  links: LinksIllustration,
  qr: QrIllustration,
  pos: PosIllustration,
  transactions: TransactionsIllustration,
  settlements: SettlementsIllustration,
  disputes: DisputesIllustration,
  app: AppIllustration,
};

/** Decorative, hidden from screen readers. The card's text carries the meaning. */
export function ProductIllustration({ kind, active }: { kind: ProductKind; active: boolean }) {
  const Illustration = ILLUSTRATIONS[kind];
  return (
    <div aria-hidden="true">
      <Illustration active={active} />
    </div>
  );
}