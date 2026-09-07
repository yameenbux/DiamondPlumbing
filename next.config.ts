import type { NextConfig } from "next"

// Set by the deploy workflow for GitHub Pages project sites. Empty locally.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const nextConfig: NextConfig = {
  // Static export: the whole site is a folder of files. No Node server, no
  // database, no running costs — it drops onto any static host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
}

export default nextConfig
