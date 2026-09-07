import type { ReactNode } from "react"
import { Award, ShieldCheck, Wrench } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import { business, coverage, yearsTrading } from "@/lib/business"

/**
 * The three things a customer checks before letting someone near their gas.
 *
 * Gas Safe yellow appears on this card's mark and its registration number and
 * nowhere else on the site, mirroring the one sticker on the van.
 */
export function Credentials() {
  return (
    <section
      id="credentials"
      className="border-ink-line border-y bg-black/40 py-16 sm:py-24"
    >
      <div className="@container mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-chrome text-balance text-[clamp(1.6rem,5.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">
              Registered, qualified, insured
            </h2>
            <p className="text-slate mx-auto mt-4 max-w-lg leading-relaxed">
              Every gas engineer working legally in the UK carries a Gas Safe ID
              card. Ask to see mine at the door &mdash; the number below should
              match.
            </p>
          </div>
        </Reveal>

        <div className="@min-2xl:max-w-full @min-2xl:grid-cols-3 mx-auto mt-10 grid max-w-sm gap-6 *:text-center md:mt-14">
          <Reveal>
            <Plate
              icon={<ShieldCheck className="size-6" aria-hidden />}
              title="Gas Safe Register"
              value={business.gasSafeNumber}
              valueLabel="Registration"
              accent
            >
              Legally required to work on gas. Check the number against the card
              at the door &mdash; or on the Gas Safe Register itself.
            </Plate>
          </Reveal>

          <Reveal delay={0.06}>
            <Plate
              icon={<Award className="size-6" aria-hidden />}
              title="City &amp; Guilds"
              value="G3"
              valueLabel="Includes"
            >
              Time-served and certificated across heating, gas and plumbing,
              including G3 for unvented cylinders.
            </Plate>
          </Reveal>

          <Reveal delay={0.12}>
            <Plate
              icon={<Wrench className="size-6" aria-hidden />}
              title="On the tools"
              value={`${yearsTrading}`}
              valueLabel={`Years, since ${business.tradingSince}`}
            >
              {yearsTrading} years working Bolton houses &mdash; and a lot of
              repeat customers who have had the same boiler the whole time.
            </Plate>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="border-flame/40 bg-flame/5 mt-6 rounded-2xl border p-5 text-center sm:p-6">
            <p className="livery text-chrome text-lg sm:text-xl">
              No fix&hellip; no fee&hellip;
            </p>
            <p className="text-slate mx-auto mt-2 max-w-2xl text-sm leading-relaxed">
              If I can&rsquo;t sort the fault, you don&rsquo;t pay for the
              visit. Parts and agreed work are charged as quoted, and the quote
              comes before the spanners.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <h3 className="text-slate font-mono text-[11px] tracking-[0.18em] uppercase">
              Where I cover
            </h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {coverage.map((place) => (
                <li
                  key={place}
                  className="border-ink-line text-slate rounded-full border px-3 py-1.5 text-sm"
                >
                  {place}
                </li>
              ))}
            </ul>
            <p className="text-slate mt-4 text-sm">
              Further out is usually fine &mdash; ask.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Plate({
  icon,
  title,
  value,
  valueLabel,
  accent = false,
  children,
}: {
  icon: ReactNode
  title: string
  value: string
  valueLabel: string
  accent?: boolean
  children: ReactNode
}) {
  return (
    <Card className="group bg-muted h-full border-0 shadow-none">
      <CardHeader className="p-5 pb-3 sm:p-6 sm:pb-3">
        <CardDecorator accent={accent}>{icon}</CardDecorator>
        <h3 className="text-chrome mt-4 font-medium sm:mt-6">{title}</h3>
      </CardHeader>

      <CardContent className="p-5 pt-0 sm:p-6 sm:pt-0">
        <p className="text-slate font-mono text-[10px] tracking-[0.18em] uppercase">
          {valueLabel}
        </p>
        <p
          className={cn(
            "font-mono mt-1 text-2xl font-semibold tabular-nums",
            accent ? "text-gas" : "text-chrome"
          )}
        >
          {value}
        </p>
        <p className="text-slate mt-3 text-sm leading-relaxed">{children}</p>
      </CardContent>
    </Card>
  )
}

/**
 * The graph-paper square from the source block.
 *
 * The original sets `[--border:black] dark:[--border:white]`, which assumes
 * Tailwind's `dark` variant is switched on by a class. This site is dark by
 * declaration rather than by class, so that variant never fires and the grid
 * would draw black on near-black. The line colour is set outright instead.
 */
const CardDecorator = ({
  children,
  accent = false,
}: {
  children: ReactNode
  accent?: boolean
}) => (
  <div
    aria-hidden
    className="relative mx-auto size-20 sm:size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
  >
    <div
      className={cn(
        "absolute inset-0 bg-[size:24px_24px] opacity-25",
        "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]",
        accent
          ? "[--border:var(--color-gas)]"
          : "[--border:var(--color-flame)]"
      )}
    />
    <div
      className={cn(
        "bg-ink absolute inset-0 m-auto flex size-10 sm:size-12 items-center justify-center border-t border-l",
        accent
          ? "border-gas/70 text-gas"
          : "border-flame/70 text-flame"
      )}
    >
      {children}
    </div>
  </div>
)
