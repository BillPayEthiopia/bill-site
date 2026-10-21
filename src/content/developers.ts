import type { LucideIcon } from "lucide-react";
import { BellRing, BookOpen, FlaskConical, LifeBuoy } from "lucide-react";

/*
 * ⚠️ TO CONFIRM WITH THE BILLPAY TECH TEAM:
 * the API URL, field names, and key format in the code samples below.
 * Only the content changes; no component needs editing.
 */

export type Benefit = { title: string; description: string; icon: LucideIcon };

export const developersContent = {
  eyebrow: "For developers",
  title: ["Developer friendly.", "Built for what's next."],
  description:
    "An API-first platform with a dedicated sandbox and clear guides. Create a payment, send your customer to checkout, and get notified the moment it lands.",
  primaryCta: { label: "Start the quickstart", href: "/developers#quickstart" },
  secondaryCta: { label: "Developer guide", href: "/developers" },

  benefits: [
    { title: "Clear documentation", description: "Step-by-step guides and copy-paste examples.", icon: BookOpen },
    { title: "Sandbox environment", description: "Test every flow safely before you go live.", icon: FlaskConical },
    { title: "Real-time status", description: "Verify payments and get notified the moment they land.", icon: BellRing },
    { title: "Dedicated support", description: "Real engineers on the other end when you need help.", icon: LifeBuoy },
  ] satisfies Benefit[],
};

export type Language = "node" | "python" | "curl";

export const codeSamples: Record<Language, { label: string; file: string; code: string }> = {
  node: {
    label: "Node.js",
    file: "checkout.js",
    code: `// Create a payment and send the customer to checkout
const response = await fetch("https://api.billpay.et/v1/payments", {
  method: "POST",
  headers: {
    Authorization: "Bearer " + process.env.BILLPAY_SECRET_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 2450,
    currency: "ETB",
    reference: "order_1042",
    return_url: "https://yourapp.com/success",
  }),
});

const payment = await response.json();
console.log(payment.checkout_url);`,
  },
  python: {
    label: "Python",
    file: "checkout.py",
    code: `import os
import requests

# Create a payment and send the customer to checkout
response = requests.post(
    "https://api.billpay.et/v1/payments",
    headers={"Authorization": "Bearer " + os.environ["BILLPAY_SECRET_KEY"]},
    json={
        "amount": 2450,
        "currency": "ETB",
        "reference": "order_1042",
        "return_url": "https://yourapp.com/success",
    },
)

print(response.json()["checkout_url"])`,
  },
  curl: {
    label: "cURL",
    file: "terminal",
    code: `curl https://api.billpay.et/v1/payments \\
  -H "Authorization: Bearer your_sandbox_secret_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 2450,
    "currency": "ETB",
    "reference": "order_1042",
    "return_url": "https://yourapp.com/success"
  }'`,
  },
};