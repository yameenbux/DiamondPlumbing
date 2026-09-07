import type { MetadataRoute } from "next"

import { asset, basePath } from "@/lib/base-path"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Diamond Heating & Plumbing",
    short_name: "Diamond",
    description:
      "Gas Safe registered heating and plumbing engineer in Bolton.",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#08090c",
    icons: [
      { src: asset("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
      { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  }
}
