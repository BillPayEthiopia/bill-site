import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Banknote,
  Code2,
  CreditCard,
  Globe2,
  Landmark,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

/*
 * ⚠️ PLACEHOLDER CONTENT, adapted from the reference design and common
 * Ethiopian gateway offerings (telebirr, CBE Birr, M-Pesa, local and
 * international cards). Confirm every claim with the Billpay team.
 */

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Method = {
  label: string;
  icon: LucideIcon;
};

export const valueProposition = {
  eyebrow: "Why Billpay",
  title: ["Built for businesses", "that move forward."],
  description:
    "From startups to enterprises, Billpay gives you the tools, security, and flexibility to accept payments and manage your business, your way.",
  cta: { label: "Explore products", href: "#products" },

  features: [
    {
      title: "Secure by design",
      description:
        "Every transaction is encrypted and monitored, with fraud checks built in, so you and your customers are protected.",
      icon: ShieldCheck,
    },
    {
      title: "Fast integration",
      description:
        "Clean APIs, SDKs, and clear documentation. Go from sign-up to your first payment in days, not months.",
      icon: Code2,
    },
    {
      title: "Real-time insights",
      description:
        "Watch payments land as they happen. Track volume, refunds, and settlements from one dashboard.",
      icon: Activity,
    },
    {
      title: "Local and global",
      description:
        "Accept the methods Ethiopians already use, alongside international cards, from a single integration.",
      icon: Globe2,
    },
  ] satisfies Feature[],

  /* ⚠️ Only list methods Billpay actually supports. An empty list hides the strip. */
  methods: [
    { label: "telebirr", icon: Smartphone },
    { label: "CBE Birr", icon: Smartphone },
    { label: "M-Pesa", icon: Smartphone },
    { label: "Local bank cards", icon: CreditCard },
    { label: "Visa & Mastercard", icon: CreditCard },
    { label: "Bank transfers", icon: Landmark },
    { label: "Digital wallets", icon: Wallet },
    { label: "Cash on delivery", icon: Banknote },
  ] satisfies Method[],
};