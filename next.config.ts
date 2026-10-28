import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // capas dos projetos vêm do Behance
    remotePatterns: [{ protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" }],
  },
  poweredByHeader: false,
};

export default nextConfig;
