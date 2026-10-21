import type { LucideIcon } from "lucide-react";
import { Activity, ClipboardCheck, Cloud, Landmark, Layers, Server, ShieldCheck, UserCheck } from "lucide-react";

export type LifecycleStage = { stage: string; title: string; icon: LucideIcon; points: string[] };

/* Based on the compliance, settlement, and technology sections of the company profile. */
export const securityPage = {
  hero: {
    eyebrow: "Security & compliance",
    title: ["Security built into", "every payment."] as [string, string],
    description:
      "Compliance, risk, and security controls run through every layer of Billpay, from the moment a merchant signs up to the moment funds reach their bank.",
  },

  protection: {
    eyebrow: "Protection",
    title: ["Layers of protection,", "on every payment."] as [string, string],
    description: "Security isn't a feature we added. It's how the platform is built.",
  },

  lifecycle: {
    eyebrow: "Controls at every step",
    title: ["From sign-up", "to settlement."] as [string, string],
    description: "Every stage of a payment's life has its own checks, approvals, and records.",
    stages: [
      {
        stage: "Before onboarding",
        title: "Every merchant is verified",
        icon: UserCheck,
        points: ["KYC and KYB verification", "Merchant verification workflows", "Approval before going live", "Consent management"],
      },
      {
        stage: "Every transaction",
        title: "Every payment is monitored",
        icon: Activity,
        points: ["Data protection controls", "Real-time transaction monitoring", "Anti-money laundering controls", "Payment status verification"],
      },
      {
        stage: "Every settlement",
        title: "Every payout is authorized",
        icon: Landmark,
        points: ["Maker-checker authorization", "Batch creation and processing", "Automated reconciliation", "Settlement notifications"],
      },
      {
        stage: "Every action",
        title: "Every action is recorded",
        icon: ClipboardCheck,
        points: ["Audit trail management", "Role-based access control", "Regulatory reporting", "Reconciliation reports"],
      },
    ] satisfies LifecycleStage[],
  },

  compliance: {
    eyebrow: "Compliance framework",
    title: ["Built around", "regulatory standards."] as [string, string],
    description:
      "Our framework is designed around Ethiopia's regulatory requirements and international best practices.",
    items: [
      "KYC and KYB verification",
      "Merchant verification workflows",
      "Anti-money laundering (AML) controls",
      "Transaction monitoring",
      "Regulatory reporting",
      "Role-based access control",
      "Audit trail management",
      "Data protection controls",
      "Consent management",
    ],
    infrastructure: [
      { title: "Cloud-native microservices", icon: Cloud },
      { title: "High-availability services", icon: Server },
      { title: "Separate test, sandbox, and production", icon: Layers },
      { title: "Enterprise security controls", icon: ShieldCheck },
    ] satisfies { title: string; icon: LucideIcon }[],
  },
};