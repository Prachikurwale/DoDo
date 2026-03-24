import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Force Turbopack to ignore node modules in the browser
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
      crypto: false,
    },
  },

  // 2. Force Webpack (Vercel Build) to ignore node modules
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

  // 3. Essential for Piper TTS to actually talk
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