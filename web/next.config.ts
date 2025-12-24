import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  // GitHub Pages: https://foot2002.github.io/vivrabo/
  basePath: "/vivrabo",
  assetPrefix: "/vivrabo/",
};

export default nextConfig;
