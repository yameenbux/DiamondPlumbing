/**
 * Renders public/icon.svg to the PNG sizes iOS and Android need.
 * Run after changing the badge: `node scripts/generate-icons.mjs`
 */
import { readFileSync } from "node:fs"
import sharp from "sharp"

const svg = readFileSync(new URL("../public/icon.svg", import.meta.url))

await Promise.all([
  sharp(svg).resize(180, 180).png().toFile("public/apple-touch-icon.png"),
  sharp(svg).resize(512, 512).png().toFile("public/icon-512.png"),
])

console.log("Wrote apple-touch-icon.png and icon-512.png")
