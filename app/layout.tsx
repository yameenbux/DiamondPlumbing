import type { Metadata, Viewport } from "next"
import { Archivo_Black, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { asset } from "@/lib/base-path"
import { business, yearsTrading } from "@/lib/business"

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
})

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: `${business.name} — Gas Safe engineer in ${business.town}`,
  description: `Boilers, bathrooms, leaks and landlord certificates across ${business.town}. ${yearsTrading} years on the tools. Send photos of the problem on WhatsApp and get a straight answer.`,
  applicationName: business.name,
  appleWebApp: {
    capable: true,
    title: business.shortName,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: true },
  manifest: asset("/manifest.webmanifest"),
  icons: {
    icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
    apple: [{ url: asset("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  openGraph: {
    title: `${business.name}, ${business.town}`,
    description: `Gas Safe registered. ${yearsTrading} years on the tools. No fix, no fee.`,
    type: "website",
    locale: "en_GB",
  },
}

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // The page is a form on a phone; let people zoom it.
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must land on :root, not <body>. Tailwind's @theme
    // resolves --font-display against them at :root, and a var() chain that
    // cannot resolve there computes to empty and inherits down empty —
    // silently falling the whole page back to the system stack.
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        {/* Runs before first paint: reveals stay hidden only where there is
            script to reveal them again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
