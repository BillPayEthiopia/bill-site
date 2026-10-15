
export type ProductKind = "checkout" | "links" | "transactions" | "settlements";

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
  ] satisfies Product[],
};