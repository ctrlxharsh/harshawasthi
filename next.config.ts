import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      "projects",
      "research",
      "experience",
      "achievements",
      "activities",
      "journey",
    ].map((section) => ({
      source: `/${section}`,
      destination: `/#${section}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
