import type { LucideIcon } from "lucide-react";
import { Banknote, Briefcase, Building2, Landmark, ShoppingBag, Smartphone } from "lucide-react";

export type Solution = {
  /** Anchor on /solutions, e.g. "government" → /solutions#government */
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Path under /public. Leave undefined until the photo exists; a gradient shows instead. */
  image?: string;
  /** What the photo shows, for screen readers. */
  alt: string;
  /** Shown on the Solutions page. */
  points: string[];
};

export const solutionsContent = {
  eyebrow: "Solutions",
  title: ["Built for every", "kind of business."],
  description:
    "No matter your size or industry, Billpay helps you accept payments and create better experiences for your customers.",
  cta: { label: "View all solutions", href: "/solutions" },

  items: [
    {
      id: "e-commerce",
      eyebrow: "Online stores",
      title: "E-commerce",
      description: "Power your online store with secure, flexible checkout across every payment method.",
      href: "/solutions#e-commerce",
      icon: ShoppingBag,
      image: "/solutions/e-commerce.jpg",
      alt: "A customer paying for an online order on their phone",
      points: ["Hosted checkout pages", "Banks and wallets in one integration", "Payment status verification", "Refund management"],
    },
    {
      id: "service-businesses",
      eyebrow: "In person and on the go",
      title: "Service businesses",
      description: "Get paid for your services quickly, in person with POS and QR, or with a link.",
      href: "/solutions#service-businesses",
      icon: Briefcase,
      image: "/solutions/service-businesses.jpg",
      alt: "A business owner at their counter taking a payment",
      points: ["POS and QR at the counter", "Payment links for invoices", "Instant payment notifications", "Merchant app on your phone"],
    },
    {
      id: "digital-platforms",
      eyebrow: "Apps and marketplaces",
      title: "Digital platforms",
      description: "Build payments into your app or marketplace for your users and creators.",
      href: "/solutions#digital-platforms",
      icon: Smartphone,
      image: "/solutions/digital-platforms.jpg",
      alt: "A developer integrating payments into an app",
      points: ["API-first design", "Sandbox environment", "Real-time payment processing", "Automated notifications"],
    },
    {
      id: "enterprises",
      eyebrow: "Large operations",
      title: "Enterprises",
      description: "Scale with reliable infrastructure, reporting, and support built for larger operations.",
      href: "/solutions#enterprises",
      icon: Building2,
      image: "/solutions/enterprises.jpg",
      alt: "The Addis Ababa skyline",
      points: ["Multi-bank settlements", "Maker-checker approvals", "Role-based access", "Audit-ready reports"],
    },
    {
      id: "government",
      eyebrow: "Digital government",
      title: "Government",
      description:
        "Digitize tax, license, permit, and public service payments, with real-time reconciliation and reporting.",
      href: "/solutions#government",
      icon: Landmark,
      image: "/solutions/government.jpg",
      alt: "A citizen paying a public service fee on their phone",
      points: [
        "Tax collection",
        "License and permit payments",
        "Administrative fees",
        "Municipal revenue collection",
        "Educational payments",
        "Utility service payments",
      ],
    },
    {
      id: "financial-institutions",
      eyebrow: "Banks and wallets",
      title: "Financial institutions",
      description:
        "Connect your bank or wallet to Billpay's multi-bank network and reach more merchants and citizens.",
      href: "/solutions#financial-institutions",
      icon: Banknote,
      image: "/solutions/financial-institutions.jpg",
      alt: "A bank branch in Addis Ababa",
      points: [
        "Banking and wallet integrations",
        "Status verification services",
        "Automated reconciliation",
        "Channel availability management",
      ],
    },
  ] satisfies Solution[],
};

/* The Solutions page hero. Government leads the page, as in the company profile. */
export const solutionsPage = {
  eyebrow: "Solutions",
  title: ["Payments for every", "side of Ethiopia."] as [string, string],
  description:
    "From public institutions collecting fees to shops taking payments at the counter, Billpay brings collections, settlements, and reporting onto one platform.",
  leadId: "government",
};