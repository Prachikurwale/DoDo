import type { NextConfig } from "next";

// We define the object without the strict 'NextConfig' type first 
// to allow the 'turbo' key which TS is currently rejecting.
const config = {
  turbo: {
    resolveAlias: {
      fs: false,
      path: false,
    },
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

// Now we export it while telling TS it's okay.
export default config as NextConfig;