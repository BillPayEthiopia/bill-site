import type { LucideIcon } from "lucide-react";
import { Code2, Rocket, SlidersHorizontal } from "lucide-react";


export type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const howItWorksContent = {
  eyebrow: "How it works",
  title: ["Get started in", "three simple steps."],
  description:
    "Integrate, customize, and start accepting payments. Most teams go live within days, not months.",
  primaryCta: { label: "Get started", href: "#get-started" },
  secondaryCta: { label: "Read the docs", href: "#developers" },

  steps: [
    {
      title: "Integrate",
      description: "Connect with our API or SDKs, or install a plugin for your store. A few lines of code is all it takes.",
      icon: Code2,
    },
    {
      title: "Configure",
      description: "Choose your payment methods, add your branding, and set a settlement schedule from the dashboard.",
      icon: SlidersHorizontal,
    },
    {
      title: "Go live",
      description: "Switch from test keys to live keys and start accepting payments, with every transaction tracked in real time.",
      icon: Rocket,
    },
  ] satisfies Step[],
}