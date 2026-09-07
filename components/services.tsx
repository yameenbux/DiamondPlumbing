import { Reveal } from "@/components/reveal"

/**
 * Grouped the way a customer describes the problem on the phone, not the way
 * a trade body categorises it.
 */
const work = [
  {
    group: "Heating & hot water",
    items: [
      ["Boiler repair", "Fault finding, error codes, parts, same visit where I can"],
      ["Boiler installs", "Swaps and full system changes, quoted before I start"],
      ["Annual servicing", "Keeps the warranty valid and catches the small stuff"],
      ["Radiators & power flushing", "Cold at the top, cold at the bottom, or cold full stop"],
      ["Underfloor heating", "New loops, manifolds and thermostats"],
      ["Unvented systems", "G3 registered for pressurised cylinders"],
    ],
  },
  {
    group: "Plumbing",
    items: [
      ["Leaks", "Traced and fixed, from a dripping joint to a soaked ceiling"],
      ["Bathrooms", "Full fits, or just the bits you can't get to"],
      ["Water heaters", "Repairs, replacements and pressure problems"],
      ["Blockages", "Sinks, toilets, waste pipes and outside gullies"],
    ],
  },
  {
    group: "Gas appliances",
    items: [
      ["Cookers & hobs", "Disconnects, installs and safety checks"],
      ["Gas fires", "Servicing, repairs and removals"],
    ],
  },
  {
    group: "Landlords",
    items: [
      ["Gas safety certificates", "CP12 issued the same day, portfolios welcome"],
      ["Void property checks", "Between tenancies, keys collected if you prefer"],
    ],
  },
] as const

export function Services() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <Reveal>
        <h2 className="text-chrome text-[clamp(1.6rem,5.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">
          What I get called out for
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        {work.map((section, i) => (
          <Reveal key={section.group} delay={i * 0.06}>
            <h3 className="text-flame font-mono text-[11px] tracking-[0.18em] uppercase">
              {section.group}
            </h3>
            <ul className="mt-4">
              {section.items.map(([title, detail]) => (
                <li key={title} className="hairline py-2.5">
                  <p className="text-chrome font-medium">{title}</p>
                  <p className="text-slate mt-0.5 text-[13px] leading-snug">{detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
