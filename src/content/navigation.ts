import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Briefcase,
  Building,
  CreditCard,
  Info,
  LayoutDashboard,
  Link as LinkIcon,
  Mail,
  Package,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Terminal,
  Wallet,
} from "lucide-react";

/*
 * ⚠️ PLACEHOLDER CONTENT
 * Based on the reference designs. These items have NOT been confirmed
 * by the Billpay product team. Update this file once official
 * product information is available. No component code needs to change.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type NavGroup = {
  label: string;
  /** The page section this group introduces. */
  href: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Products",
    href: "#products",
    items: [
      { label: "Checkout", href: "#products", icon: CreditCard, description: "A secure payment page for your customers." },
      { label: "Payment Links", href: "#products", icon: LinkIcon, description: "Create and share links to get paid." },
      { label: "Transactions", href: "#products", icon: LayoutDashboard, description: "Monitor and manage every payment." },
      { label: "Settlements", href: "#products", icon: Wallet, description: "Track when and how you get paid out." },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    items: [
      { label: "E-commerce", href: "#solutions", icon: ShoppingBag, description: "Accept payments in your online store." },
      { label: "Service businesses", href: "#solutions", icon: Briefcase, description: "Get paid for the services you provide." },
      { label: "Digital platforms", href: "#solutions", icon: Smartphone, description: "Build payments into your app or platform." },
      { label: "Enterprises", href: "#solutions", icon: Building, description: "Payment infrastructure for larger operations." },
    ],
  },
  {
    label: "Developers",
    href: "#developers",
    items: [
      { label: "Documentation", href: "#developers", icon: BookOpen, description: "Guides for integrating Billpay." },
      { label: "API reference", href: "#developers", icon: Terminal, description: "Endpoints, parameters, and responses." },
      { label: "SDKs", href: "#developers", icon: Package, description: "Libraries for popular languages." },
    ],
  },
  {
    label: "Company",
    href: "#about",
    items: [
      { label: "About Billpay", href: "#about", icon: Info, description: "Who we are and what we're building." },
      { label: "Security", href: "#security", icon: ShieldCheck, description: "How we keep payments safe." },
      { label: "Contact", href: "#get-started", icon: Mail, description: "Talk to our team." },
    ],
  },
];

export const navActions = {
  /** Set to the dashboard URL when it exists. The link stays hidden while this is null. */
  signIn: null as string | null,
  getStarted: "#get-started",
};