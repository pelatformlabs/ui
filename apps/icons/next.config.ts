import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // nextjs 16
  // cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  transpilePackages: [],
  reactStrictMode: true,
};

export default nextConfig;
