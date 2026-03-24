import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Handle Turbopack (using @ts-ignore if TS doesn't recognize the key)
  // @ts-ignore
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
    },
  },

  // 2. Handle Webpack engine & Ignore ONNX Warnings
  webpack: (config, { isServer }) => {
    // Fix for 'fs' and 'path'
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    // Move ignoreWarnings here to satisfy TypeScript
    config.ignoreWarnings = [
      { module: /node_modules\/onnxruntime-web/ },
      { message: /Critical dependency: the request of a dependency is an expression/ }
    ];

    return config;
  },

  // 3. Essential for Piper TTS Multi-threading
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;