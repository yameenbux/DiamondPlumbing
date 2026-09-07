# Diamond Heating & Plumbing — Bolton

A single-page site for Diamond Heating & Plumbing, built to do one thing: get a
customer's details **and photos of the fault** into Diamond's WhatsApp in under
a minute, from a phone.

Static export — a folder of files, no server, no database, no running costs.

---

## Before it goes live

Four values in `lib/business.ts` are placeholders and **must be replaced**. They
are deliberately invalid so the site cannot dial or message a stranger.

| Field | What it is |
| --- | --- |
| `phoneDisplay` | The number as customers should read it, e.g. `01204 123456` |
| `phoneE164` | The same number, international, digits only, e.g. `447700900123` — used by `tel:` and WhatsApp |
| `gasSafeNumber` | The registration number from the Gas Safe ID card |
| `email` | A real inbox |

Also check in the same file: `tradingSince`, opening `hours`, the `coverage`
list, and the `faultTypes` chips.

`phoneE164` must be the number that WhatsApp Business is registered to. UK
mobiles drop the leading `0` and gain `44`: `07700 900123` → `447700900123`.

## How the photo handoff actually works

**WhatsApp links cannot carry images.** `wa.me/...?text=` prefills text and
nothing else — there is no link, parameter or trick that attaches a photo. So
the form takes the only route that exists from a web page to a WhatsApp message
with images:

1. **Share sheet (`navigator.share` with files)** — the path on iOS and
   Android. The customer taps *Send on WhatsApp*, the OS share sheet opens with
   the message text and the photos already in it, they pick WhatsApp, and both
   travel together. Nothing sends until they press send in WhatsApp.
2. **`wa.me` fallback** — most desktop browsers cannot share files. There the
   text opens in WhatsApp Web and the confirmation screen tells the customer
   their photos did not come along and to add them with the paperclip. The
   message body says "2 photos to follow" rather than "attached", so Diamond is
   never told about photos that are not there.

Photos never touch a server. They are resized in the browser (longest edge
1600px, JPEG q72) the moment they are chosen — before the send tap, because iOS
only permits `navigator.share()` while the tap that triggered it is still live,
and an image encode in between is enough to lose it.

If Diamond later wants photos to arrive without the share sheet, that needs a
backend: upload to storage, put the URLs in the message text. That means hosting
costs and a GDPR position on storing customers' photos of their homes. The
current design avoids both.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npm run typecheck
```

Deploy `out/` to any static host — Netlify, Vercel, Cloudflare Pages, GitHub
Pages, or a folder on existing hosting.

## Checking it still works

`scripts/qa.mjs` drives a real browser through both WhatsApp routes, the form
guards, reduced motion and four viewport widths. It needs Playwright and sharp,
which are deliberately not project dependencies:

```bash
npm run build
npx serve out -l 4321
npm install --no-save playwright sharp
npx playwright install chromium
node scripts/qa.mjs
```

Run it after touching `lib/whatsapp.ts`, `lib/images.ts` or the form.

## Structure

```
app/
  layout.tsx      fonts, metadata, iOS home-screen setup
  globals.css     design tokens taken off the van livery
  page.tsx        section order
components/
  hero.tsx            the van's rear door
  service-ticker.tsx  the livery service list, scrolling
  credentials.tsx     Gas Safe, City & Guilds, coverage
  job-form.tsx        the form
  action-bar.tsx      sticky Call / WhatsApp bar
  diamond-mark.tsx    the badge, redrawn as vector
  ui/                 shadcn components
scripts/
  generate-icons.mjs  re-renders the PNG icons from public/icon.svg
  qa.mjs              end-to-end checks
lib/
  business.ts     ← every value Diamond needs to change
  whatsapp.ts     message builder and the share handoff
  images.ts       in-browser photo resizing
```

## Design

Colours, type and layout come from the van: black bodywork, orange keyline
lettering, chrome-white fills, and the dot-separated service list along the
doors. Gas Safe yellow appears on the registration plate and nowhere else,
because that is where it appears on the vehicle.

Fonts: Archivo Black for the livery lettering, IBM Plex Sans for reading, IBM
Plex Mono for registration numbers and field labels.

## Notes for whoever picks this up next

- Content is present in the served HTML and visible without JavaScript; the
  scroll reveals only hide things once a `js` class is on `<html>`.
- `prefers-reduced-motion` is honoured — reveals resolve instantly rather than
  never.
- The SVG `backdrop-filter` on the liquid-glass buttons is unsupported in
  Safari, so `components/ui/liquid-glass-button.tsx` carries a
  `-webkit-backdrop-filter` blur alongside it. That is the only change made to
  the supplied component.
