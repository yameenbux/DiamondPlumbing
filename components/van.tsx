import { cn } from "@/lib/utils"

/**
 * Diamond's van — a Mercedes Vito, drawn as a side elevation in the same
 * orange keyline the rest of the site is built from.
 *
 * The shapes that make it read as a Vito rather than a generic box van: a
 * rounded nose that leans forward and drops away, a steeply raked screen, the
 * tall tail lamp climbing the rear corner, a shoulder crease rising towards
 * the back, and flattened rather than semicircular arches.
 *
 * A photograph of the real van would still be better and should replace this
 * the moment there is one worth using. Stock photography would not — trades
 * customers recognise it, and it works against a page that asks them to check
 * a Gas Safe card at the door.
 */
export function Van({ className }: { className?: string }) {
  return (
    <svg
      viewBox="52 92 890 284"
      className={cn("block w-full", className)}
      role="img"
      aria-label="The Diamond Heating and Plumbing Mercedes Vito"
    >
      <defs>
        <linearGradient id="van-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-chrome)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--color-chrome)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="van-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#161b25" />
          <stop offset="100%" stopColor="#0a0c11" />
        </linearGradient>
      </defs>

      <line
        x1="60"
        y1="346"
        x2="920"
        y2="346"
        stroke="var(--color-ink-line)"
        strokeWidth="2"
      />

      <g
        fill="none"
        stroke="var(--color-flame)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Bodywork. The nose is the tell: it curves forward off the screen
            and drops away, where a Transit would be a flat blunt face. */}
        <path
          d="M250 112 L158 204
             C140 212 116 218 102 232
             C92 242 88 252 90 266
             L94 290
             L918 290 Q930 290 930 280
             L930 132 Q930 112 912 112 Z"
          fill="url(#van-body)"
        />

        {/* Windscreen running back into the cab door glass */}
        <path
          d="M176 198 L258 128 L404 128 L404 196 L176 198 Z"
          fill="url(#van-glass)"
          strokeWidth="2.5"
        />
        <path d="M266 128 L258 197" strokeWidth="1.5" opacity="0.55" />

        {/* Door shuts: cab, sliding door, rear */}
        <path d="M416 120 L416 288" strokeWidth="2" opacity="0.65" />
        <path d="M656 120 L656 288" strokeWidth="2" opacity="0.65" />

        {/* Handles, sitting just under the crease */}
        <path d="M384 266 L404 265" strokeWidth="5" strokeLinecap="round" />
        <path d="M624 262 L644 261" strokeWidth="5" strokeLinecap="round" />

        {/* Flattened arches — a Vito's are squarer than a semicircle */}
        <path d="M138 292 A 66 56 0 0 1 270 292" strokeWidth="2.5" />
        <path d="M716 292 A 66 56 0 0 1 848 292" strokeWidth="2.5" />
      </g>

      {/* Headlamp, swept back along the nose */}
      <path
        d="M100 230 L132 222 L136 240 L104 248 Z"
        fill="var(--color-chrome)"
        fillOpacity="0.18"
        stroke="var(--color-flame)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Tail lamp climbing the rear corner — the other Vito giveaway */}
      <rect
        x="906"
        y="134"
        width="18"
        height="94"
        rx="6"
        fill="var(--color-flame)"
        fillOpacity="0.28"
        stroke="var(--color-flame)"
        strokeWidth="2"
      />

      {/* Wheels */}
      {[204, 782].map((cx) => (
        <g key={cx}>
          <circle
            cx={cx}
            cy="296"
            r="50"
            fill="#0a0c11"
            stroke="var(--color-flame)"
            strokeWidth="3"
          />
          <circle
            cx={cx}
            cy="296"
            r="23"
            fill="none"
            stroke="var(--color-flame)"
            strokeWidth="2.5"
            opacity="0.65"
          />
        </g>
      ))}

      {/* The livery, as it is painted on the flank */}
      <g transform="translate(438 142) skewX(-7)">
        <text
          x="0"
          y="44"
          className="font-display"
          fontSize="54"
          fill="var(--color-chrome)"
          stroke="var(--color-flame)"
          strokeWidth="1.7"
          paintOrder="stroke fill"
          letterSpacing="-1"
        >
          Diamond
        </text>
        <text
          x="2"
          y="69"
          className="font-display"
          fontSize="15.5"
          fill="var(--color-flame)"
          letterSpacing="0.15"
        >
          HEATING &amp; PLUMBING ENGINEER
        </text>
        <text
          x="2"
          y="96"
          className="font-mono"
          fontSize="12.5"
          fill="var(--color-flame)"
          opacity="0.8"
          letterSpacing="0.4"
        >
          BOILERS · BATHROOMS · CERTIFICATES
        </text>
      </g>

      {/* Gas Safe plate on the rear panel — the only yellow on the van */}
      <g transform="translate(800 150)">
        <rect width="70" height="28" rx="5" fill="var(--color-gas)" opacity="0.92" />
        <text
          x="35"
          y="19"
          textAnchor="middle"
          className="font-display"
          fontSize="11.5"
          fill="#000"
        >
          GAS SAFE
        </text>
      </g>
    </svg>
  )
}
