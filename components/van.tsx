import { cn } from "@/lib/utils"

/**
 * Diamond's van, drawn as a side elevation in the same orange keyline the
 * rest of the site is built from.
 *
 * A photograph of the real van would be better and should replace this the
 * moment there is one worth using. Until then this does the job a photo
 * would: it says "plumber" before a word is read, and it says *this*
 * plumber, because the livery on the flank is the same lockup as the header.
 * Stock photography would say neither, and trades customers recognise it.
 */
export function Van({ className }: { className?: string }) {
  return (
    <svg
      viewBox="45 96 890 268"
      className={cn("block w-full", className)}
      role="img"
      aria-label="The Diamond Heating and Plumbing van"
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
        y1="342"
        x2="920"
        y2="342"
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
        {/* Bodywork — short high nose, raked screen, long flank */}
        <path
          d="M86 290 L78 254 L80 208 L172 198 L238 114 Q242 112 250 112
             L910 112 Q928 112 928 130 L928 282 Q928 290 918 290 Z"
          fill="url(#van-body)"
        />

        {/* One glasshouse: windscreen running back into the cab door window */}
        <path
          d="M186 194 L246 124 L406 124 L406 196 L186 194 Z"
          fill="url(#van-glass)"
          strokeWidth="2.5"
        />
        {/* A-pillar, dividing screen from door glass */}
        <path d="M254 124 L246 194" strokeWidth="1.5" opacity="0.55" />

        {/* Door shuts: cab, sliding door, rear */}
        <path d="M416 118 L416 290" strokeWidth="2" opacity="0.65" />
        <path d="M656 118 L656 290" strokeWidth="2" opacity="0.65" />

        {/* Handles */}
        <path d="M384 250 L404 250" strokeWidth="5" strokeLinecap="round" />
        <path d="M624 250 L644 250" strokeWidth="5" strokeLinecap="round" />

        {/* Wing mirror on its arm */}
        <path d="M244 152 L226 146 L224 168 L242 172" strokeWidth="2.5" />
        <path d="M244 158 L253 162" strokeWidth="2" opacity="0.7" />

        {/* Wheel arches */}
        <path d="M132 290 A 64 64 0 0 1 260 290" strokeWidth="2.5" />
        <path d="M718 290 A 64 64 0 0 1 846 290" strokeWidth="2.5" />
      </g>

      {/* Lamps */}
      <path
        d="M86 222 L116 218 L118 236 L88 240 Z"
        fill="var(--color-chrome)"
        fillOpacity="0.18"
        stroke="var(--color-flame)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="912"
        y="180"
        width="10"
        height="42"
        rx="3"
        fill="var(--color-flame)"
        fillOpacity="0.3"
        stroke="var(--color-flame)"
        strokeWidth="2"
      />

      {/* Wheels */}
      {[196, 782].map((cx) => (
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
      <g transform="translate(438 148) skewX(-7)">
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

      {/* Gas Safe plate high on the rear panel — the only yellow on the van */}
      <g transform="translate(838 136)">
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
