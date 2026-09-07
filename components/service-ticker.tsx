import { liveryServices } from "@/lib/business"

/**
 * The service list runs across the van doors as one dot-separated line.
 * Reproduced here as a moving band so the page reads as the vehicle does.
 *
 * Solid orange, like the doors — not outlined. The outline is for the
 * wordmark, and on a moving strip it ghosts.
 */
export function ServiceTicker() {
  const run = (
    <span className="flex shrink-0 items-center">
      {liveryServices.map((service) => (
        <span key={service} className="flex items-center">
          <span className="livery-solid px-4 text-[12px] leading-none sm:text-[15px]">
            {service}
          </span>
          <span aria-hidden className="text-flame/70 text-lg leading-none">
            &bull;
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <div className="border-ink-line relative overflow-hidden border-y bg-black py-3">
      <div className="animate-ticker flex w-max">
        {run}
        <span aria-hidden>{run}</span>
      </div>
      {/* Fade the band into the bodywork at both ends */}
      <div className="from-ink pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r to-transparent" />
      <div className="from-ink pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent" />
    </div>
  )
}
