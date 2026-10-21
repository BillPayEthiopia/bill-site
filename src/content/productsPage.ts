import { BarChart3, Landmark, Network, ShieldCheck } from "lucide-react";
import type { CardItem } from "@/components/page/CardGrid";
import type { ProductKind } from "./products";

export type ProductDetail = {
  id: string;
  kind: ProductKind;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

/* Based on the core solutions in the Billpay company profile. */
export const productsPage = {
  hero: {
    eyebrow: "Products",
    title: ["Every way to get paid,", "on one platform."] as [string, string],
    description:
      "Accept payments online, in person, or with a link, then settle, track, and resolve every transaction from one secure platform built for Ethiopia.",
  },

  groups: [
    {
      id: "accept",
      eyebrow: "Accept payments",
      title: ["Get paid wherever", "your customers are."] as [string, string],
      description:
        "One integration gives your customers a consistent experience, whichever bank or wallet they use.",
      items: [
        {
          id: "checkout",
          kind: "checkout",
          eyebrow: "Digital payment gateway",
          title: "Checkout",
          description:
            "A hosted checkout page that accepts banks and wallets in one place, with real-time processing and instant confirmation.",
          points: [
            "Real-time payment processing",
            "Multi-bank connectivity",
            "Wallet integration",
            "Customer checkout pages",
            "Payment status verification",
            "Automated notifications",
          ],
        },
        {
          id: "payment-links",
          kind: "links",
          eyebrow: "No website needed",
          title: "Payment Links",
          description:
            "Create a payment link in seconds and share it by SMS, email, or chat. Customers pay with their bank or wallet, and you see it land instantly.",
          points: [
            "Create links from the dashboard",
            "Or from the merchant app",
            "Share anywhere",
            "Bank and wallet payments",
            "Instant payment notifications",
            "Every payment tracked",
          ],
        },
        {
          id: "qr",
          kind: "qr",
          eyebrow: "Scan and pay",
          title: "QR Payments",
          description:
            "Show a code at your counter or on an invoice. Customers scan it with their bank or wallet app and pay in seconds.",
          points: [
            "Accept with the merchant app",
            "Works with bank and wallet apps",
            "Real-time confirmation",
            "Recorded in your dashboard",
          ],
        },
        {
          id: "pos",
          kind: "pos",
          eyebrow: "In person",
          title: "POS Payments",
          description:
            "Take payments at the counter alongside your digital channels, and see every in-store sale in the same dashboard as your online ones.",
          points: [
            "In-person card and wallet payments",
            "One view of in-store and online",
            "Instant approval",
            "Settled with your other channels",
          ],
        },
      ] satisfies ProductDetail[],
    },
    {
      id: "manage",
      eyebrow: "Manage your money",
      title: ["Run your business", "from one platform."] as [string, string],
      description:
        "Monitor transactions, settle funds, and resolve disputes with controls and records built in at every step.",
      items: [
        {
          id: "transactions",
          kind: "transactions",
          eyebrow: "Merchant payment platform",
          title: "Transaction Management",
          description:
            "Onboard, transact, and manage your operations digitally, with a live view of every payment, refund, and withdrawal.",
          points: [
            "Self-service onboarding",
            "Transaction monitoring",
            "Refund management",
            "Withdrawal requests",
            "Merchant balance management",
            "User and role management",
          ],
        },
        {
          id: "settlements",
          kind: "settlements",
          eyebrow: "Settlement engine",
          title: "Settlements",
          description:
            "A secure settlement engine moves your funds accurately and compliantly, with every step authorized, notified, and logged.",
          points: [
            "Automated ledger updates",
            "Settlement cycle management",
            "Batch creation and processing",
            "Maker-checker authorization",
            "Bank transfer execution",
            "Notifications and audit logs",
          ],
        },
        {
          id: "disputes",
          kind: "disputes",
          eyebrow: "Dispute management",
          title: "Disputes & Refunds",
          description:
            "A structured process for contested transactions that is fair, transparent, and traceable from the first report to the final adjustment.",
          points: [
            "Case management",
            "Evidence collection",
            "Automated workflows",
            "Escalation processes",
            "Timelines and notifications",
            "Settlement adjustments",
          ],
        },
        {
          id: "merchant-app",
          kind: "app",
          eyebrow: "Mobile",
          title: "Merchant App",
          description:
            "Run your business from anywhere. Get paid, follow your sales, and track settlements from your phone.",
          points: [
            "Biometric login",
            "QR payment acceptance",
            "Payment link generation",
            "Performance dashboards",
            "Transaction history",
            "Instant notifications",
          ],
        },
      ] satisfies ProductDetail[],
    },
  ],

  platform: {
    eyebrow: "Under the hood",
    title: ["One platform,", "built to connect."] as [string, string],
    description:
      "The infrastructure behind every Billpay product: cloud-native, API-first, and designed for Ethiopia's financial ecosystem.",
    items: [
      {
        title: "Multi-bank integration",
        description:
          "Bank and wallet integrations with channel prioritization, availability management, and automated reconciliation.",
        icon: Network,
      },
      {
        title: "Reporting & analytics",
        description:
          "Transaction, settlement, refund, withdrawal, reconciliation, and regulatory reports, with live dashboards.",
        icon: BarChart3,
      },
      {
        title: "Government collections",
        description:
          "Taxes, licenses, permits, municipal fees, and school and utility payments, with real-time reconciliation.",
        icon: Landmark,
        href: "/solutions#government",
      },
      {
        title: "Compliance & risk",
        description: "KYC and KYB, AML controls, transaction monitoring, and full audit trails.",
        icon: ShieldCheck,
        href: "/security",
      },
    ] satisfies CardItem[],
  },
};