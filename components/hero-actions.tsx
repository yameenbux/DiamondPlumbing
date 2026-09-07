"use client"

import { Phone } from "lucide-react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import { WhatsAppGlyph } from "@/components/icons"
import { business } from "@/lib/business"

export function HeroActions() {
  const goToForm = () => {
    document
      .getElementById("job")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <LiquidButton
        onClick={goToForm}
        size="xxl"
        className="text-chrome w-full rounded-full text-base font-semibold sm:w-auto"
      >
        <span className="flex items-center justify-center gap-2.5">
          <WhatsAppGlyph className="text-flame size-5" />
          Send photos of the problem
        </span>
      </LiquidButton>

      <a
        href={`tel:+${business.phoneE164}`}
        className="border-ink-line text-chrome hover:border-flame/60 hover:text-flame inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border px-8 text-base font-semibold transition-colors sm:w-auto"
      >
        <Phone className="size-5" />
        {business.phoneDisplay}
      </a>
    </div>
  )
}
