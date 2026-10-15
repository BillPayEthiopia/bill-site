import type { LucideIcon } from "lucide-react";
import { BookOpen, LifeBuoy, Package } from "lucide-react";


export type Benefit = { title: string; description: string; icon: LucideIcon };

export const developersContent = {
  eyebrow: "For developers",
  title: ["Developer friendly.", "Built for what's next."],
  description:
    "Powerful APIs, comprehensive documentation, and SDKs for the languages you already use. Your first payment is a few lines away.",
  primaryCta: { label: "View documentation", href: "#get-started" },
  secondaryCta: { label: "API reference", href: "#get-started" },

  benefits: [
    { title: "Clear documentation", description: "Step-by-step guides and copy-paste examples.", icon: BookOpen },
    { title: "Multiple SDKs", description: "Node.js, Python, PHP, and plugins for popular stores.", icon: Package },
    { title: "Dedicated support", description: "Real engineers on the other end when you need help.", icon: LifeBuoy },
  ] satisfies Benefit[],
};

export type Language = "node" | "python" | "curl";

export const codeSamples: Record<Language, { label: string; file: string; code: string }> = {
  node: {
    label: "Node.js",
    file: "checkout.js",
    code: `import Billpay from "@billpay/node";

const billpay = new Billpay(process.env.BILLPAY_SECRET_KEY);

// Create a payment and send the customer to checkout
const payment = await billpay.payments.create({
  amount: 2450,
  currency: "ETB",
  description: "Order #BP-1042",
  returnUrl: "https://yourapp.com/success",
});

console.log(payment.checkoutUrl);`,
  },
  python: {
    label: "Python",
    file: "checkout.py",
    code: `import billpay

client = billpay.Client(api_key="sk_test_...")

# Create a payment and send the customer to checkout
payment = client.payments.create(
    amount=2450,
    currency="ETB",
    description="Order #BP-1042",
    return_url="https://yourapp.com/success",
)

print(payment.checkout_url)`,
  },
  curl: {
    label: "cURL",
    file: "terminal",
    code: `curl https://api.billpay.et/v1/payments \\
  -H "Authorization: Bearer sk_test_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2450,
    "currency": "ETB",
    "description": "Order #BP-1042",
    "return_url": "https://yourapp.com/success"
  }'`,
  },
};