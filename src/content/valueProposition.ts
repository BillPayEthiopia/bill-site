import type { LucideIcon } from "lucide-react";
import { Activity, Code2, CreditCard, Globe2, Landmark, ShieldCheck, Smartphone } from "lucide-react";



export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Method = {
  label: string;
  icon: LucideIcon;
  /** Official logo under /public/partners, e.g. "/partners/visa.svg". Never redrawn. */
  logo?: string;
  /** Visual balance: wide wordmarks "sm", most logos "md", compact marks "lg". Default "md". */
  size?: "sm" | "md" | "lg";
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

  /* ⚠️ Only list integrations Billpay has confirmed. Logos imply a live partnership. */
  methods: [
    { label: "telebirr", icon: Smartphone, logo: "/partners/telebirr.svg" },
    { label: "CBE Birr", icon: Smartphone, logo: "/partners/cbe-birr.svg" },
    { label: "M-Pesa", icon: Smartphone, logo: "/partners/mpesa.svg" },
    { label: "Commercial bank of Ethiopiia", icon: Landmark, logo: "/partners/Commercial-Bank-of-Ethiopia.svg" },
    { label: "Visa", icon: CreditCard, logo: "/partners/visa.svg" },
    { label: "Mastercard", icon: CreditCard, logo: "/partners/mastercard.svg" ,size: "sm"},
    { label: "Bank of Abyssinia", icon: Landmark, logo: "/partners/abyssinia.svg", size: "lg" },
    { label: "Dashen Bank", icon: Landmark, logo: "/partners/dashen.svg", size: "lg"  },
    { label: "Awash Bank", icon: Landmark, logo: "/partners/awash.svg", size: "sm" },
    { label: "Zemen Bank", icon: Landmark, logo: "/partners/zemen.svg", size: "lg" },

  ] satisfies Method[],
};