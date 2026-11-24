import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Merchant sign-up is live on the merchant portal; old "coming soon" links go there.
  async redirects() {
    return [
      {
        source: "/coming-soon",
        destination: "https://merchant.billpay.et/sign-up",
        permanent: false,
      },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
