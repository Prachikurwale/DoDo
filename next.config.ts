import type { NextConfig } from "next";

const config = {
   
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
    },
  },

  // 2. For Vercel Production Build (Webpack) - DO NOT DELETE THIS
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },

  // 3. For Piper TTS Voice Multi-threading
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

export default config as NextConfig;