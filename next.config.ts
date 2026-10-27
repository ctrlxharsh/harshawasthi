import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  agentRules: false,
  images: { unoptimized: true },
  async redirects() {
    return ['projects', 'research', 'experience', 'achievements', 'activities', 'journey'].map(section => ({ source: `/${section}`, destination: `/#${section}`, permanent: true }));
  },
};
export default nextConfig;
