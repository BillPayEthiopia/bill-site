export type ProductKind =
  | "checkout"
  | "links"
  | "qr"
  | "pos"
  | "transactions"
  | "settlements"
  | "disputes"
  | "app";

  export type ProductGroup= "accept" | "manage";

export type Product = {
  kind: ProductKind;
  group: ProductGroup;
  title: string;
  description: string;
  href: string;
};


export const productsContent = {
  eyebrow: "Our products",
  title: ["Everything you need", "to get paid."],
  description:
    "A complete set of payment tools that fit how you sell, whether that's online, in person, or through a platform.",
  cta: { label: "Explore all products", href: "/products" },

    groups: [
    { id: "accept", label: "Accept payments", description: "Online, in person, or with a link." },
    { id: "manage", label: "Manage your money", description: "Track, settle, and resolve every payment." },
  ] satisfies { id: ProductGroup; label: string; description: string }[],

  items: [
    {
      kind: "checkout",
      group: "accept",
      title: "Checkout",
      description: "A secure, hosted payment page your customers trust, with every method in one place.",
      href: "/products#checkout",
    },
    {
      kind: "links",
      group: "accept",
      title: "Payment Links",
      description: "Create a link in seconds and share it anywhere. No website or code required.",
      href: "/products#payment-links",
    },
    {
      kind: "qr",
      group: "accept",
      title: "QR Payments",
      description: "Show a code at your counter or on an invoice. Customers scan it with their bank or wallet app and pay in seconds.",
      href: "/products#qr",
    },
    {
      kind: "pos",
      group: "accept",
      title: "POS Payments",
      description: "Accept in-person payments with POS, alongside your digital channels, and see every sale in one place.",
      href: "/products#pos",
    },
    {
      kind: "transactions",
      group: "manage",
      title: "Transaction Management",
      description: "Monitor every payment, refund, and dispute as it happens, from one dashboard.",
      href: 	"/products#transactions",
    },
    {
      kind: "settlements",
      group: "manage",
      title: "Settlements",
      description: "Get paid out to your bank on a schedule you choose, with clear records of every payout.",
      href: "/products#settlements",
    },
    {
      kind: "disputes",
      group: "manage",
      title: "Disputes & Refunds",
      description: "Resolve contested payments with a clear process: evidence, timelines, and settlement adjustments, all tracked.",
      href: "/products#disputes",
    },
    {
      kind: "app",
      group: "manage",
      title: "Merchant App",
      description: "Get paid, track sales, and follow settlements from your phone, secured with biometric login.",
      href: "/products#merchant-app",
    },
  ] satisfies Product[],
};