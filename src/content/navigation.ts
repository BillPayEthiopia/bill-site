import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BookOpen,
  Briefcase,
  Building,
  CreditCard,
  FlaskConical,
  Info,
  Landmark,
  LayoutDashboard,
  Link as LinkIcon,
  Mail,
  Package,
  QrCode,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Store,
  Terminal,
  Wallet,
} from "lucide-react";

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
      { label: "QR Payments", href: "#products", icon: QrCode, description: "Let customers pay by scanning a code." },
      { label: "POS Payments", href: "#products", icon: Store, description: "Accept in-person payments alongside your digital channels." },
      { label: "Transactions", href: "#products", icon: LayoutDashboard, description: "Monitor and manage every payment." },
      { label: "Settlements", href: "#products", icon: Wallet, description: "Track when and how you get paid out." },
      { label: "Disputes & Refunds", href: "#products", icon: Scale, description: "Resolve contested payments fairly and on time." },
      { label: "Merchant App", href: "#products", icon: Smartphone, description: "Run your business and get paid from your phone." },
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
      { label: "Government", href: "#solutions", icon: Landmark, description: "Digital collection of taxes, fees, and public service charges." },
      { label: "Financial institutions", href: "#solutions", icon: Banknote, description: "Connect your bank or wallet to a wider payment network." },
    ],
  },
  {
    label: "Developers",
    href: "#developers",
    items: [
      { label: "Documentation", href: "#developers", icon: BookOpen, description: "Guides for integrating Billpay." },
      { label: "API reference", href: "#developers", icon: Terminal, description: "Endpoints, parameters, and responses." },
      { label: "SDKs", href: "#developers", icon: Package, description: "Libraries for popular languages." },
      { label: "Sandbox", href: "#developers", icon: FlaskConical, description: "Test your integration safely before going live." },
    ],
  },
  {
    label: "Company",
    href: "#why-billpay",
    items: [
      { label: "About Billpay", href: "#why-billpay", icon: Info, description: "Who we are, and our place in the TAK Tech family." },
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