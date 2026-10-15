import type { LucideIcon } from "lucide-react";
import { Briefcase, Building2, ShoppingBag, Smartphone } from "lucide-react";


export type Solution = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Path under /public. Leave undefined until the photo exists; a gradient shows instead. */
  image?: string;
  /** What the photo shows, for screen readers. */
  alt: string;
};

export const solutionsContent = {
  eyebrow: "Solutions",
  title: ["Built for every", "kind of business."],
  description:
    "No matter your size or industry, Billpay helps you accept payments and create better experiences for your customers.",
  cta: { label: "View all solutions", href: "#get-started" },

  items: [
    {
      title: "E-commerce",
      description: "Power your online store with secure, flexible checkout across every payment method.",
      href: "#get-started",
      icon: ShoppingBag,
      image: "/solutions/e-commerce.jpg",
      alt: "A customer paying for an online order on their phone",
    },
    {
      title: "Service businesses",
      description: "Get paid for your services quickly, in person or with a link, without extra hardware.",
      href: "#get-started",
      icon: Briefcase,
      image: "/solutions/service-businesses.jpg",
      alt: "A business owner at their counter taking a payment",
    },
    {
      title: "Digital platforms",
      description: "Build payments into your app or marketplace for your users and creators.",
      href: "#get-started",
      icon: Smartphone,
      image: "/solutions/digital-platforms.jpg",
      alt: "A developer integrating payments into an app",
    },
    {
      title: "Enterprises",
      description: "Scale with reliable infrastructure, reporting, and support built for larger operations.",
      href: "#get-started",
      icon: Building2,
      image: "/solutions/enterprises.jpg",
      alt: "The Addis Ababa skyline",
    },
  ] satisfies Solution[],
};