import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The app lives in a sub-folder of the repo, so point tracing and Turbopack
  // at the repo root. Without this Next warns that the lockfile is "outside
  // the git repository" and falls back to the wrong workspace root.
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
      ],
    },
  ],
};

export default nextConfig;
