import type { LucideIcon } from "lucide-react";
import { CreditCard, Landmark, Link as LinkIcon, QrCode, Smartphone, Store, Wallet } from "lucide-react";

export const heroContent = {
  eyebrow: "Payment gateway for modern businesses",
  headline: [
    { text: "Powering your" },
    { text: "business with" },
    { text: "seamless", highlight: true },
    { text: "payments.", highlight: true, underline: true },
  ] as { text: string; highlight?: boolean; underline?: boolean }[],
  description:
    "Billpay is a payment gateway that helps businesses accept payments, manage transactions, and grow — all in one place.",
  primaryCta: { label: "Get started", href: "#get-started" },
  secondaryCta: { label: "Explore products", href: "#products" },

  paymentMethods: [
    { label: "Cards", icon: CreditCard },
    { label: "Bank transfers", icon: Landmark },
    { label: "Mobile money", icon: Smartphone },
    { label: "Wallets", icon: Wallet },
    { label: "QR codes", icon: QrCode },
    { label: "Payment links", icon: LinkIcon },
    { label: "In-store POS", icon: Store },
  ] satisfies { label: string; icon: LucideIcon }[],
};

/* ----------------------------------------------------------------
 * Sample data for the illustrative device showcase.
 * These are NOT real transactions or statistics.
 * ---------------------------------------------------------------- */

export type PaymentMethod = "mobile" | "card" | "bank";
export type CheckoutStage = "select" | "processing" | "success";
export type PosStage = "ready" | "approved";

export type DemoOrder = {
  amount: number;
  method: PaymentMethod;
  orderId: string;
  reference: string;
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
  { amount: 2450, method: "mobile", orderId: "#BP-1042", reference: "TXN7Q2K4M" },
  { amount: 1200, method: "card", orderId: "#BP-1043", reference: "TXN3H8P1R" },
  { amount: 3875.5, method: "bank", orderId: "#BP-1044", reference: "TXN9D5L6W" },
];

const initialTransactions: DemoTransaction[] = [
  { id: 0, kind: "received", amount: 980, method: "Mobile money" },
  { id: 1, kind: "received", amount: 720, method: "POS · Card" },
  { id: 2, kind: "refund", amount: 580, method: "Card" },
  { id: 3, kind: "received", amount: 1650, method: "Bank transfer" },
];

export const heroDemo = {
  baseVolume: 245800,
  baseCount: 1284,
  todayBase: 18450,
  orders,
  /** Amounts paid at the POS terminal, in order. */
  posOrders: [1250, 640, 2180.75],
  initialTransactions,
  /** Tablet: relative sales per time slot, as bar heights in %. */
  hourly: [34, 52, 41, 68, 57, 84, 73],
  /** Tablet: share of today's sales by channel, in %. */
  channels: [
    { label: "Mobile money", share: 46 },
    { label: "Card", share: 24 },
    { label: "Bank transfer", share: 18 },
    { label: "POS", share: 12 },
  ],
};
