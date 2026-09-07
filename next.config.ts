import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Static export: the whole site is a folder of files. No Node server, no
  // database, no running costs — it drops onto any static host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
