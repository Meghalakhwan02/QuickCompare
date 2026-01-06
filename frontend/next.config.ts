import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensuring the root is set to the current directory (frontend)
    // to avoid confusion with the lockfile on the Desktop.
    root: __dirname,
  },
};

export default nextConfig;
