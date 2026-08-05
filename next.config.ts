import type { NextConfig } from "next";

// Only prefix paths when building on GitHub Actions (i.e. for the Pages
// deploy) so local dev/build stays served from the root.
const basePath = process.env.GITHUB_ACTIONS ? "/scaling-up" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
