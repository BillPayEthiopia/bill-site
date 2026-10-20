export type ProductKind =
  | "checkout"
  | "links"
  | "qr"
  | "pos"
  | "transactions"
  | "settlements"
  | "disputes"
  | "app";

export type Product = {
  kind: ProductKind;
  title: string;
  description: string;
  href: string;
};

export const productsContent = {
  eyebrow: "Our products",
  title: ["Everything you need", "to get paid."],
  description:
    "A complete set of payment tools that fit how you sell, whether that's online, in person, or through a platform.",
  cta: { label: "Explore all products", href: "#get-started" },

  items: [
    {
      kind: "checkout",
      title: "Checkout",
      description: "A secure, hosted payment page your customers trust, with every method in one place.",
      href: "#get-started",
    },
    {
      kind: "links",
      title: "Payment Links",
      description: "Create a link in seconds and share it anywhere. No website or code required.",
      href: "#get-started",
    },
    {
      kind: "qr",
      title: "QR Payments",
      description: "Show a code at your counter or on an invoice. Customers scan it with their bank or wallet app and pay in seconds.",
      href: "#get-started",
    },
    {
      kind: "pos",
      title: "POS Payments",
      description: "Accept in-person payments with POS, alongside your digital channels, and see every sale in one place.",
      href: "#get-started",
    },
    {
      kind: "transactions",
      title: "Transaction Management",
      description: "Monitor every payment, refund, and dispute as it happens, from one dashboard.",
      href: "#get-started",
    },
    {
      kind: "settlements",
      title: "Settlements",
      description: "Get paid out to your bank on a schedule you choose, with clear records of every payout.",
      href: "#get-started",
    },
    {
      kind: "disputes",
      title: "Disputes & Refunds",
      description: "Resolve contested payments with a clear process: evidence, timelines, and settlement adjustments, all tracked.",
      href: "#get-started",
    },
    {
      kind: "app",
      title: "Merchant App",
      description: "Get paid, track sales, and follow settlements from your phone, secured with biometric login.",
      href: "#get-started",
    },
  ] satisfies Product[],
};