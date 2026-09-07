import { ActionBar } from "@/components/action-bar"
import { Credentials } from "@/components/credentials"
import { DiamondMark } from "@/components/diamond-mark"
import { Hero } from "@/components/hero"
import { JobForm } from "@/components/job-form"
import { Reveal } from "@/components/reveal"
import { ServiceTicker } from "@/components/service-ticker"
import { Services } from "@/components/services"
import { business, yearsTrading } from "@/lib/business"
import { whatsappLink } from "@/lib/whatsapp"

export default function Page() {
  return (
    <>
      <Hero />
      <ServiceTicker />

      <main>
        <Credentials />
        <section
          id="job"
          className="mx-auto max-w-3xl scroll-mt-6 px-5 py-16 sm:px-8 sm:py-24"
        >
          <Reveal>
            <h2 className="text-chrome text-[clamp(1.6rem,5.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.02em]">
              Show me what&rsquo;s happened
            </h2>
            <p className="text-slate mt-4 max-w-xl leading-relaxed">
              Fill this in and it becomes one WhatsApp message with your photos
              attached. Takes about a minute, and it means I turn up with the
              right part in the van.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <JobForm />
          </Reveal>
        </section>
        <Services />

      </main>

      <footer className="border-ink-line border-t bg-black">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
          <div className="flex items-center gap-3">
            <DiamondMark uid="foot" className="size-9" />
            <div className="skew-livery">
              <p className="livery text-chrome text-2xl leading-none">Diamond</p>
              <p className="text-flame font-display text-[0.5rem] tracking-[0.02em] uppercase">
                Heating &amp; Plumbing Engineer
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 text-sm sm:grid-cols-3">
            <div>
              <h3 className="text-slate font-mono text-[11px] tracking-[0.18em] uppercase">
                Get hold of me
              </h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={`tel:+${business.phoneE164}`}
                    className="text-chrome hover:text-flame transition-colors"
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-chrome hover:text-flame transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="text-chrome hover:text-flame transition-colors"
                  >
                    {business.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate font-mono text-[11px] tracking-[0.18em] uppercase">
                Hours
              </h3>
              <ul className="text-slate mt-3 space-y-2">
                <li>{business.hours.weekday}</li>
                <li>{business.hours.weekend}</li>
                <li className="text-chrome">{business.hours.emergency}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate font-mono text-[11px] tracking-[0.18em] uppercase">
                Registration
              </h3>
              <p className="text-slate mt-3 leading-relaxed">
                Gas Safe Register no.{" "}
                <span className="text-chrome font-mono">
                  {business.gasSafeNumber}
                </span>
                <br />
                City &amp; Guilds qualified
                <br />
                Serving {business.town} since {business.tradingSince}
              </p>
            </div>
          </div>

          <p className="text-slate/70 hairline mt-10 pt-6 text-xs">
            &copy; {new Date().getFullYear()} {business.name}. {yearsTrading}{" "}
            years in {business.town}. Photos you attach are sent straight from
            your phone to WhatsApp — this site does not store them.
          </p>

          {/* Clears the fixed action bar. */}
          <div className="h-20" aria-hidden />
        </div>
      </footer>

      <ActionBar />
    </>
  )
}
