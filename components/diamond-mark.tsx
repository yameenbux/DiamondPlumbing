import { cn } from "@/lib/utils"

/**
 * The van's badge, redrawn as vector: a brilliant-cut stone inside a
 * hexagonal keyline. The stone carries a gas-flame gradient — the one
 * decorative liberty on the page, and the thing it should be remembered by.
 *
 * `uid` keeps the gradient ids unique when the mark appears more than once.
 */
export function DiamondMark({
  className,
  uid = "mark",
  lit = false,
}: {
  className?: string
  uid?: string
  lit?: boolean
}) {
  const flame = `${uid}-flame`
  const glow = `${uid}-glow`

  return (
    <svg
      viewBox="-60 -60 120 120"
      className={cn("block", className)}
      role="img"
      aria-label="Diamond Heating and Plumbing"
    >
      <defs>
        <linearGradient id={flame} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-flame-deep)" />
          <stop offset="45%" stopColor="var(--color-flame)" />
          <stop offset="100%" stopColor="var(--color-flame-lit)" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="var(--color-flame)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-flame)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pilot light behind the stone */}
      {lit && (
        <circle
          cx="0"
          cy="0"
          r="52"
          fill={`url(#${glow})`}
          className="animate-pilot origin-center"
        />
      )}

      {/* Hexagonal keyline, as painted on the door */}
      <path
        d="M0 -54 L46.8 -27 L46.8 27 L0 54 L-46.8 27 L-46.8 -27 Z"
        fill="none"
        stroke="var(--color-flame)"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Stone */}
      <g transform="translate(0 -2)">
        <path
          d="M-30 -10 L-17 -24 L17 -24 L30 -10 L0 28 Z"
          fill={lit ? `url(#${flame})` : "none"}
          fillOpacity={lit ? 0.18 : 0}
          stroke="var(--color-chrome)"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        <g
          stroke="var(--color-chrome)"
          strokeWidth="2.6"
          strokeLinecap="round"
          opacity="0.9"
        >
          <path d="M-30 -10 H30" />
          <path d="M-17 -24 V-10" />
          <path d="M17 -24 V-10" />
          <path d="M-17 -10 L0 28" />
          <path d="M17 -10 L0 28" />
        </g>
      </g>
    </svg>
  )
}
