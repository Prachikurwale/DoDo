import type { NextConfig } from "next";

const nextConfig = {
  // 1. Tell Turbopack to ignore Node modules
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
      crypto: false,
    },
  },
  // 2. Tell Webpack (Vercel Build) to ignore Node modules
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
        ],
      },
    ];
  },
};

export default nextConfig as any as NextConfig;
