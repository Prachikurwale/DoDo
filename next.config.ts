import type { NextConfig } from "next";

const nextConfig: any = {
  transpilePackages: ["speech-to-speech"],
  

  
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
      crypto: false,
    },
  },
  
 
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