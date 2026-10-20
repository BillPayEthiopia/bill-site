import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Brain,
  Building2,
  Cloud,
  Code2,
  Eye,
  HeartHandshake,
  Landmark,
  Network,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Users,
} from "lucide-react";

type Item = { title: string; description: string; icon: LucideIcon };

/* Based on the Billpay company profile. */
export const aboutContent = {
  hero: {
    eyebrow: "About Billpay",
    title: ["Powering Ethiopia's", "financial future."] as [string, string],
    description:
      "Billpay Financial Technologies S.C. builds secure, scalable digital payment infrastructure for Ethiopia's fast-growing digital economy.",
  },

  overview: {
    eyebrow: "Who we are",
    title: ["Built in Ethiopia,", "for Ethiopia."] as [string, string],
    paragraphs: [
      "Billpay is an Ethiopian financial technology company and a strategic venture of TAK Tech. We build modern payment solutions that simplify transactions, strengthen revenue collection, improve service delivery, and expand financial inclusion.",
      "Our platform connects merchants, government institutions, financial institutions, businesses, and citizens through one unified payment ecosystem, enabling seamless digital collections, settlements, reporting, and financial operations.",
    ],
    /** Shown around Billpay in the ecosystem diagram, clockwise from the top. */
    nodes: [
      { label: "Government", icon: Landmark },
      { label: "Banks", icon: Banknote },
      { label: "Businesses", icon: Building2 },
      { label: "Citizens", icon: Users },
      { label: "Merchants", icon: Store },
    ] satisfies { label: string; icon: LucideIcon }[],
  },

  purpose: {
    vision: {
      label: "Our vision",
      statement:
        "To become Ethiopia's most trusted digital payment infrastructure provider, enabling secure, inclusive, and efficient financial ecosystems for governments, businesses, and citizens.",
      icon: Eye,
    },
    mission: {
      label: "Our mission",
      statement:
        "To deliver secure, innovative, and scalable financial technology that transforms payment ecosystems, modernizes revenue collection, simplifies business operations, and accelerates Ethiopia's digital transformation.",
      icon: Target,
    },
  },

  focus: {
    eyebrow: "Strategic focus",
    title: ["Four areas,", "one direction."] as [string, string],
    description: "Everything we build serves Ethiopia's move to a secure, inclusive digital economy.",
    items: [
      {
        title: "Digital government",
        description: "Supporting public institutions through modern payment and revenue collection platforms.",
        icon: Landmark,
      },
      {
        title: "Merchant enablement",
        description: "Giving businesses the tools to accept payments, manage settlements, and monitor transactions.",
        icon: Store,
      },
      {
        title: "Financial inclusion",
        description: "Expanding access to secure digital financial services across Ethiopia.",
        icon: HeartHandshake,
      },
      {
        title: "Payment infrastructure",
        description: "Building reliable, interoperable platforms that connect financial institutions and payment channels.",
        icon: Network,
      },
    ] satisfies Item[],
  },

  takTech: {
    eyebrow: "Our foundation",
    title: ["A venture of", "TAK Tech."] as [string, string],
    paragraphs: [
      "TAK Tech is a leading technology company dedicated to transforming Ethiopia's digital landscape. Through collaborations with global technology partners, it develops solutions that enhance connectivity, operational efficiency, and digital resilience across critical sectors.",
      "As a TAK Tech venture, Billpay builds on that foundation:",
    ],
    benefits: [
      "Enterprise-grade technology capabilities",
      "International best practices",
      "A strong culture of innovation",
    ],
    capabilities: [
      { label: "Software engineering", icon: Code2 },
      { label: "Cybersecurity", icon: ShieldCheck },
      { label: "Telecom infrastructure", icon: RadioTower },
      { label: "Intelligent systems", icon: Brain },
      { label: "Cloud services", icon: Cloud },
      { label: "Digital transformation", icon: Sparkles },
    ] satisfies { label: string; icon: LucideIcon }[],
  },

  commitment: {
    eyebrow: "Our commitment",
    statement:
      "We are committed to becoming a trusted national partner in Ethiopia's digital transformation: modernizing public services, strengthening revenue collection, empowering businesses, and enhancing the experience of every citizen.",
  },
};