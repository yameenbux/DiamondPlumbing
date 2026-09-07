"use client"

import * as React from "react"
import { Phone } from "lucide-react"

import { WhatsAppGlyph } from "@/components/icons"
import { cn } from "@/lib/utils"
import { business } from "@/lib/business"
import { whatsappLink } from "@/lib/whatsapp"

/**
 * An iOS-style tab bar pinned to the thumb. It stays out of the way while the
 * hero (which already carries both actions) is on screen, then follows the
 * customer down the page.
 *
 * Slides on a CSS transform rather than an animation library: this is the only
 * moving thing on the page that needed one, and the library cost more than the
 * whole rest of the bundle. Reduced motion is handled by the global rule.
 */
export function ActionBar() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const link =
    "flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-colors"

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "pointer-events-none translate-y-[130%]"
      )}
    >
      <div
        className="border-ink-line flex gap-2 rounded-2xl border bg-black/70 p-2 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <a
          href={`tel:+${business.phoneE164}`}
          tabIndex={visible ? undefined : -1}
          className={cn(link, "border-ink-line text-chrome active:bg-ink-raised border")}
        >
          <Phone className="size-4" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          className={cn(link, "bg-flame text-primary-foreground active:bg-flame-lit")}
        >
          <WhatsAppGlyph className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
