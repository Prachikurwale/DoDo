// import type { NextConfig } from "next";

 
// const nextConfig: NextConfig = {
   
//   transpilePackages: ["speech-to-speech"],
  
 
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         path: false,
//         crypto: false,
//       };
//     }
//     return config;
//   },
 
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
//           { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;









import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Isse Turbopack ka error silent ho jayega
  experimental: {
    turbo: {}, 
  },

  // 2. Aapka existing webpack config (Jo Vercel build ke liye zaroori hai)
  webpack: (config, { isServer }) => {
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

  // 3. Piper TTS ke liye headers
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

export default nextConfig;