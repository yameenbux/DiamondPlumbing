import type * as React from "react"

import { Reveal } from "@/components/reveal"
import { business, coverage, yearsTrading } from "@/lib/business"

/**
 * The plates on the van, in the same order they sit on the tailgate:
 * Gas Safe top right, City & Guilds either side, the promise across the
 * bottom. Gas Safe yellow appears here and nowhere else on the page.
 */
export function Credentials() {
  return (
    <section
      id="credentials"
      className="border-ink-line border-y bg-black/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-chrome text-[clamp(1.6rem,5.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">
            Registered, qualified, insured
          </h2>
          <p className="text-slate mt-4 max-w-lg leading-relaxed">
            Every gas engineer working legally in the UK carries a Gas Safe ID
            card. Ask to see mine at the door — the number below should match.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Reveal>
            <div className="bg-gas flex h-full flex-col justify-between rounded-2xl p-5 text-black">
              <p className="font-display text-lg leading-none tracking-tight uppercase">
                Gas Safe
                <br />
                Register
              </p>
              <div className="mt-6 sm:mt-10">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                  Registration
                </p>
                <p className="font-mono mt-0.5 text-2xl font-semibold tabular-nums">
                  {business.gasSafeNumber}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <Plate label="Qualified" value={<>City &amp; Guilds</>}>
              Time-served and certificated across heating, gas and plumbing,
              including G3 for unvented cylinders.
            </Plate>
          </Reveal>

          <Reveal delay={0.12}>
            <Plate label="Trading since" value={`${business.tradingSince}`}>
              {yearsTrading} years working Bolton houses — and a lot of repeat
              customers who have had the same boiler the whole time.
            </Plate>
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <div className="border-flame/40 bg-flame/5 mt-4 rounded-2xl border p-5 sm:p-6">
            <p className="livery text-chrome text-lg sm:text-xl">
              No fix&hellip; no fee&hellip;
            </p>
            <p className="text-slate mt-2 text-sm leading-relaxed sm:max-w-2xl">
              If I can&rsquo;t sort the fault, you don&rsquo;t pay for the
              visit. Parts and agreed work are charged as quoted, and the quote
              comes before the spanners.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <h3 className="text-slate font-mono text-[11px] tracking-[0.18em] uppercase">
              Where I cover
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
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
              Further out is usually fine — ask.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Plate({
  label,
  value,
  children,
}: {
  label: string
  value: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="border-ink-line bg-ink-raised flex h-full flex-col justify-between rounded-2xl border p-5">
      <p className="text-chrome font-display text-lg leading-tight uppercase">
        {value}
      </p>
      <div className="mt-6 sm:mt-10">
        <p className="text-slate font-mono text-[10px] tracking-[0.18em] uppercase">
          {label}
        </p>
        <p className="text-slate mt-2 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  )
}
