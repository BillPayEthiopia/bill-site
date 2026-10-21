import type { LucideIcon } from "lucide-react";
import { BadgeCheck, BellRing, BookOpen, Code2, FlaskConical, LifeBuoy, Link2, Smartphone, Terminal } from "lucide-react";
import type { CardItem } from "@/components/page/CardGrid";

/*
 * ⚠️ TO CONFIRM WITH THE BILLPAY TECH TEAM:
 * the API URL, endpoints, field names (reference, callback_url, checkout_url, status),
 * key format, and how sandbox access is granted. Update the code strings below.
 */

export type FlowStep = {
  actor: "you" | "billpay" | "customer";
  title: string;
  description: string;
  icon: LucideIcon;
};

export type QuickstartStep = {
  title: string;
  description: string;
  /** A short tip shown under the description. */
  note?: string;
  file: string;
  code: string;
};

export type Environment = {
  mode: "test" | "live";
  name: string;
  tag: string;
  description: string;
  points: string[];
  key: string;
};

export const developersPage = {
  hero: {
    eyebrow: "Developers",
    title: ["Build with Billpay,", "step by step."] as [string, string],
    description:
      "Everything you need to accept payments in your website or app: how a payment flows, a quickstart with copy-paste code, and a sandbox to test it all safely.",
  },

  flow: {
    eyebrow: "How it works",
    title: ["How a payment flows", "through Billpay."] as [string, string],
    description: "Five steps from your server to a confirmed payment. Your code handles two of them.",
    steps: [
      { actor: "you", title: "Create a payment", description: "Your server sends the amount and order details to the Billpay API.", icon: Code2 },
      { actor: "billpay", title: "Get a checkout link", description: "Billpay returns a secure checkout URL for that payment.", icon: Link2 },
      { actor: "customer", title: "Customer pays", description: "They pick their bank or wallet and confirm on Billpay's checkout page.", icon: Smartphone },
      { actor: "billpay", title: "You're notified", description: "Billpay notifies your server as soon as the payment status changes.", icon: BellRing },
      { actor: "you", title: "Verify and deliver", description: "Confirm the status with the API, then fulfil the order.", icon: BadgeCheck },
    ] satisfies FlowStep[],
  },

  quickstart: {
    eyebrow: "Quickstart",
    title: ["Your first payment", "in six steps."] as [string, string],
    description: "Follow along in the sandbox. The examples use Node.js, but any language that can send an HTTP request works.",
    steps: [
      {
        title: "Get your sandbox keys",
        description:
          "Create your Billpay account and request sandbox access. You'll get a secret key for test mode. Store it as an environment variable.",
        note: "Keep your secret key on your server. Never put it in browser or mobile app code.",
        file: ".env",
        code: `# Sandbox: test mode, no real money moves
BILLPAY_API_URL=https://api.billpay.et/v1
BILLPAY_SECRET_KEY=your_sandbox_secret_key`,
      },
      {
        title: "Create a payment",
        description:
          "When a customer checks out, your server creates a payment with the amount, your own order reference, and where Billpay should send notifications.",
        file: "create-payment.js",
        code: `const response = await fetch(process.env.BILLPAY_API_URL + "/payments", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.BILLPAY_SECRET_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 2450,
    currency: "ETB",
    reference: "order_1042",
    description: "Order #BP-1042",
    callback_url: "https://yourapp.com/billpay/notify",
    return_url: "https://yourapp.com/orders/1042",
  }),
});

const payment = await response.json();`,
      },
      {
        title: "Send the customer to checkout",
        description:
          "Redirect the customer to the checkout URL in the response. Billpay's page handles choosing a bank or wallet and confirming the payment.",
        file: "create-payment.js",
        code: `// Billpay hosts the checkout page, so no card or wallet details touch your server
res.redirect(payment.checkout_url);`,
      },
      {
        title: "Handle the notification",
        description:
          "When the payment status changes, Billpay calls your callback URL. Look up the payment, then update your order.",
        note: "Reply quickly with 200 OK, and make your handler safe to run twice for the same payment.",
        file: "notify.js",
        code: `app.post("/billpay/notify", express.json(), async (req, res) => {
  const { reference } = req.body;

  // Don't trust the notification alone: confirm it with the API
  const payment = await verifyPayment(reference);

  if (payment.status === "completed") {
    await markOrderPaid(reference);
  }

  res.sendStatus(200);
});`,
      },
      {
        title: "Verify the payment",
        description:
          "Before you deliver anything, ask the API for the payment's current status. This is the source of truth.",
        file: "verify.js",
        code: `async function verifyPayment(reference) {
  const response = await fetch(
    process.env.BILLPAY_API_URL + "/payments/" + reference,
    { headers: { Authorization: "Bearer " + process.env.BILLPAY_SECRET_KEY } },
  );

  return response.json(); // { reference, status, amount, currency, ... }
}`,
      },
      {
        title: "Go live",
        description:
          "Once your business is verified and your tests pass, swap your sandbox key for your live key. Your code stays exactly the same.",
        note: "Before switching, test a successful payment, a failed one, and a refund in the sandbox.",
        file: ".env",
        code: `# Production: live mode, real payments
BILLPAY_API_URL=https://api.billpay.et/v1
BILLPAY_SECRET_KEY=your_live_secret_key`,
      },
    ] satisfies QuickstartStep[],
  },

  environments: {
    eyebrow: "Environments",
    title: ["Test safely,", "then go live."] as [string, string],
    description: "Two separate environments with separate keys, so nothing you test can touch real money.",
    items: [
      {
        mode: "test",
        name: "Sandbox",
        tag: "Test mode",
        description: "A safe copy of Billpay for building and testing. Payments are simulated, so no real money moves.",
        points: [
          "Simulated bank and wallet payments",
          "Test successes, failures, and refunds",
          "Separate test keys",
          "Safe to experiment",
        ],
        key: "BILLPAY_SECRET_KEY=your_sandbox_secret_key",
      },
      {
        mode: "live",
        name: "Production",
        tag: "Live",
        description: "Real payments from real customers, available once your business is verified.",
        points: [
          "Real bank and wallet payments",
          "Settlements to your bank account",
          "Enterprise security controls",
          "High-availability infrastructure",
        ],
        key: "BILLPAY_SECRET_KEY=your_live_secret_key",
      },
    ] satisfies Environment[],
  },

  resources: {
    eyebrow: "Resources",
    title: ["Everything else", "you need."] as [string, string],
    description: "Reach out and we'll get you set up.",
    items: [
      { title: "Documentation", description: "Guides for every integration, from checkout to settlements.", icon: BookOpen, href: "/#get-started" },
      { title: "API reference", description: "Every endpoint, parameter, and response.", icon: Terminal, href: "/#get-started" },
      { title: "Sandbox access", description: "Request test keys and start building today.", icon: FlaskConical, href: "/#get-started" },
      { title: "Developer support", description: "Talk to our engineers when you get stuck.", icon: LifeBuoy, href: "/#get-started" },
    ] satisfies CardItem[],
  },
};