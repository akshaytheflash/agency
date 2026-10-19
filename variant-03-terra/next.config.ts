import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // A stray package-lock.json exists in Downloads/, which makes Next guess the
  // workspace root one level too high. Pin it to this project.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
