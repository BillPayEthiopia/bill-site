import type { LucideIcon } from "lucide-react";
import { CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";

/* ⚠️ PLACEHOLDER COPY, adapted from the reference design. Confirm with the Billpay team. */
export const heroContent = {
  eyebrow: "Payment gateway for modern businesses",
  headline: [
    { text: "Powering your" },
    { text: "business with" },
    { text: "seamless payments.", highlight: true },
  ],
  description:
    "Billpay is a payment gateway that helps businesses accept payments, manage transactions, and grow — all in one place.",
  primaryCta: { label: "Get started", href: "#get-started" },
  secondaryCta: { label: "Explore products", href: "#products" },

  /* ⚠️ PLACEHOLDER. Replace with the officially supported payment methods. */
  paymentMethods: [
    { label: "Cards", icon: CreditCard },
    { label: "Bank transfers", icon: Landmark },
    { label: "Mobile money", icon: Smartphone },
    { label: "Wallets", icon: Wallet },
  ] satisfies { label: string; icon: LucideIcon }[],
};

/* ----------------------------------------------------------------
 * Sample data for the illustrative hero mockup.
 * These are NOT real transactions or statistics.
 * ---------------------------------------------------------------- */

export type PaymentMethod = "mobile" | "card" | "bank";
export type CheckoutStage = "select" | "processing" | "success";

export type DemoOrder = {
  amount: number;
  method: PaymentMethod;
  orderId: string;
};

export type DemoTransaction = {
  id: number;
  kind: "received" | "refund";
  amount: number;
  method: string;
};

export const METHOD_LABELS: Record<PaymentMethod, string> = {
  mobile: "Mobile money",
  card: "Card",
  bank: "Bank transfer",
};

const orders: DemoOrder[] = [
  { amount: 2450, method: "mobile", orderId: "#BP-1042" },
  { amount: 1200, method: "card", orderId: "#BP-1043" },
  { amount: 3875.5, method: "bank", orderId: "#BP-1044" },
];

const initialTransactions: DemoTransaction[] = [
  { id: 0, kind: "received", amount: 980, method: "Mobile money" },
  { id: 1, kind: "refund", amount: 580, method: "Card" },
  { id: 2, kind: "received", amount: 1650, method: "Bank transfer" },
];

export const heroDemo = {
  baseVolume: 245800,
  orders,
  initialTransactions,
};