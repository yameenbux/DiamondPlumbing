/**
 * End-to-end checks for the things that would fail silently: the WhatsApp
 * handoff on both routes, the form guards, reduced motion, and layout at four
 * widths.
 *
 *   npm run build
 *   npx serve out -l 4321          (or any static server on port 4321)
 *   npx playwright install chromium
 *   node scripts/qa.mjs
 *
 * Playwright and sharp are not project dependencies — install them ad hoc:
 *   npm install --no-save playwright sharp
 */
import { chromium, devices } from 'playwright'
import sharp from 'sharp'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' })
const mk = (r, g, bl) => sharp({ create: { width: 2400, height: 1800, channels: 3, background: { r, g, b: bl } } }).jpeg().toBuffer()
const fail = []
const ok = (c, m) => { console.log((c ? '  PASS  ' : '  FAIL  ') + m); if (!c) fail.push(m) }

/* --- iOS: share sheet path --- */
const p1 = await (await b.newContext({ ...devices['iPhone 14 Pro'] })).newPage()
const errs = []
p1.on('pageerror', e => errs.push(e.message))
await p1.addInitScript(() => {
  window.__shared = null
  navigator.canShare = d => !!d?.files?.length
  navigator.share = async d => { window.__shared = { text: d.text, n: d.files.length } }
})
await p1.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
await p1.addStyleTag({ content: 'html{scroll-behavior:auto!important}' })
await p1.evaluate(() => document.querySelector('#job').scrollIntoView())
await p1.fill('#job-name', 'Jane Whittaker'); await p1.fill('#job-phone', '07700 900123'); await p1.fill('#job-postcode', 'bl1 4ab')
await p1.getByRole('button', { name: 'No hot water' }).click()
await p1.getByRole('button', { name: 'Today', exact: true }).click()
await p1.fill('#job-notes', 'Worcester combi showing EA.')
await p1.setInputFiles('input[type=file]', [
  { name: 'a.jpg', mimeType: 'image/jpeg', buffer: await mk(180, 60, 20) },
  { name: 'b.jpg', mimeType: 'image/jpeg', buffer: await mk(40, 90, 160) }])
await p1.waitForTimeout(1500)
await p1.getByRole('button', { name: /Send on WhatsApp/ }).click()
await p1.waitForTimeout(600)
const sh = await p1.evaluate(() => window.__shared)
ok(sh?.n === 2, 'iOS share carries both photos')
ok(sh?.text.includes('2 photos attached.'), 'iOS message says photos attached')
ok(sh?.text.includes('BL1 4AB') && sh.text.includes('No hot water'), 'iOS message carries the job details')
ok(errs.length === 0, 'no page errors (' + errs.join('; ') + ')')

/* --- Desktop: wa.me fallback --- */
const p2 = await (await b.newContext({ ...devices['Desktop Chrome'] })).newPage()
await p2.addInitScript(() => { navigator.canShare = () => false; window.open = u => { window.__o = u } })
await p2.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
await p2.evaluate(() => document.querySelector('#job').scrollIntoView())
await p2.fill('#job-name', 'Sam Ali'); await p2.fill('#job-phone', '01204 123456')
await p2.setInputFiles('input[type=file]', [{ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await mk(10, 10, 10) }])
await p2.waitForTimeout(1200)
await p2.getByRole('button', { name: /Send on WhatsApp/ }).click()
await p2.waitForTimeout(500)
const url = new URL(await p2.evaluate(() => window.__o))
ok(url.origin + url.pathname === 'https://wa.me/447000000000', 'fallback opens the right wa.me number')
ok(url.searchParams.get('text').includes('1 photo to follow.'), 'fallback does not claim photos are attached')

/* --- Guards --- */
const p3 = await (await b.newContext({ ...devices['iPhone 14 Pro'] })).newPage()
await p3.addInitScript(() => { window.open = () => { window.__o = true }; navigator.canShare = () => false })
await p3.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
await p3.evaluate(() => document.querySelector('#job').scrollIntoView())
await p3.getByRole('button', { name: /Send on WhatsApp/ }).click()
await p3.waitForTimeout(400)
ok(!(await p3.evaluate(() => !!window.__o)), 'empty form does not open WhatsApp')
ok((await p3.locator('#job .text-destructive').count()) === 2, 'empty form explains what is missing')

/* --- Reduced motion --- */
const p4 = await (await b.newContext({ ...devices['iPhone 14 Pro'], reducedMotion: 'reduce' })).newPage()
await p4.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
await p4.evaluate(() => document.querySelector('#work').scrollIntoView())
await p4.waitForTimeout(700)
ok(0 === await p4.evaluate(() => [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity !== '1').length),
  'reduced motion leaves nothing invisible')

/* --- Layout --- */
for (const [w, h, label] of [[320, 640, '320px'], [393, 852, 'iPhone'], [1280, 800, 'desktop'], [1920, 1080, 'wide']]) {
  const pg = await (await b.newContext({ viewport: { width: w, height: h } })).newPage()
  await pg.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
  await pg.waitForTimeout(500)
  ok(0 === await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `no sideways scroll at ${label}`)
}

/* --- Sticky bar --- */
const p5 = await (await b.newContext({ ...devices['iPhone 14 Pro'] })).newPage()
await p5.goto('http://localhost:4321/', { waitUntil: 'networkidle' })
await p5.waitForTimeout(500)
const vh = p5.viewportSize().height
const top = await p5.locator('a[href^="tel:"]').filter({ hasText: 'Call' }).boundingBox()
ok(top.y > vh, 'bar is off screen at the top of the page')
await p5.evaluate(() => window.scrollTo(0, 1500)); await p5.waitForTimeout(800)
const down = await p5.locator('a[href^="tel:"]').filter({ hasText: 'Call' }).boundingBox()
ok(down.y + down.height <= vh, 'bar is fully on screen once scrolled')

console.log(fail.length ? `\n${fail.length} FAILURES` : '\nAll checks passed')
await b.close()
process.exit(fail.length ? 1 : 0)
