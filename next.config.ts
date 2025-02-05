import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This completely disables ESLint during builds
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
