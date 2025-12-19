import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // MUST match your GitHub repo name exactly
  basePath: "/My-Portfolio",
  assetPrefix: "/My-Portfolio/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
