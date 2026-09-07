import { DiamondMark } from "@/components/diamond-mark";
import { Van } from "@/components/van";
import { HeroActions } from "@/components/hero-actions";
import { business, yearsTrading } from "@/lib/business";

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Bodywork: a black panel with the badge throwing a little heat. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 70% at 50% 0%, #16181f 0%, #08090c 62%)",
        }}
      />
      <div
        aria-hidden
        className="from-flame/12 absolute -top-24 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 pt-[calc(env(safe-area-inset-top,0px)+2.5rem)] pb-9 sm:px-8 sm:pt-[calc(env(safe-area-inset-top,0px)+4rem)] sm:pb-20">
        {/* The lockup, as painted on the door */}
        <div className="flex items-center gap-4">
          <DiamondMark
            uid="hero"
            lit
            className="size-[3.25rem] shrink-0 sm:size-20"
          />
          <div className="skew-livery origin-left">
            <div className="livery text-chrome text-[clamp(2.4rem,12vw,4.75rem)] leading-[0.85]">
              Diamond
            </div>
            <div className="text-flame font-display mt-0.5 text-[clamp(0.56rem,2.75vw,1.05rem)] leading-tight uppercase">
              Heating &amp; Plumbing Engineer
            </div>
          </div>
        </div>

        <div className="font-mono mt-9 text-[10px] leading-[1.8] tracking-[0.16em] uppercase sm:text-[11px]">
          <p className="text-slate">{business.town} &amp; surrounding towns</p>
          <p className="text-flame">{yearsTrading} years on the tools</p>
        </div>

        <h1 className="text-chrome mt-4 max-w-2xl text-[clamp(1.9rem,7.5vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.02em]">
          No heat, no hot water, or water where it
          <span className="text-flame"> shouldn&rsquo;t be</span>.
        </h1>

        <p className="text-slate mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
          Show me the problem before I set off. Send a few photos and the
          details in one message and you&rsquo;ll get a straight answer on what
          it is, what it takes, and when I can be there.
        </p>

        <div className="mt-8">
          <HeroActions />
        </div>
        {/* The first thing on the page that says "plumber". Full width at
            every size: halved into a column it shrinks to nothing and drags
            the headline to four lines. */}
        <div className="mt-10 sm:mt-12">
          <Van className="mx-auto max-w-4xl" />
        </div>
      </div>

      {/* The line along the bottom of the tailgate. */}
      <div className="border-ink-line border-t bg-black">
        <p className="livery-hollow mx-auto max-w-5xl px-5 py-4 text-center text-[clamp(0.9rem,4.5vw,1.6rem)] tracking-[0.08em] sm:px-8">
          No fix&hellip; no fee&hellip;
        </p>
      </div>
    </header>
  );
}
