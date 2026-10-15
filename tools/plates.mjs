// Renders assets/plate-*.jpg (frame window + name band) and tools/.frames/hero-overlay.png.
//   PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs node tools/plates.mjs
// Frames come from tools/capture/plates.mjs, except nebula-promo.png, which is one frame of the promo film:
//   ffmpeg -ss 24.9 -i ../nebula-player/docs/site/promo.mp4 -frames:v 1 tools/.frames/plates/nebula-promo.png
import { resolve, join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { flagships } from './data.mjs';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const T = resolve(import.meta.dirname, 'templates'), F = resolve(import.meta.dirname, '.frames'), A = resolve(import.meta.dirname, '../assets');
const W = 1600, H = 760, BAND = 170;

const plate = (it, i) => {
  const [x, y, w] = it.crop, s = W / w;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="fonts.css"><style>
  body { width: ${W}px; background: var(--iron); }
  .win { position: relative; width: ${W}px; height: ${H}px; overflow: hidden; background: ${it.bg || '#000'}; }
  .win img { position: absolute; left: ${-x * s}px; top: ${-y * s}px; transform-origin: 0 0; transform: scale(${s}); }
  .band { height: ${BAND}px; display: flex; align-items: center; padding: 0 56px; gap: 34px; border-top: 1px solid rgba(239,233,221,.14); }
  .no { font: 500 40px/1 "Plex", monospace; color: var(--amber); letter-spacing: .04em; }
  .name { font: 800 124px/1 "Shoulders", sans-serif; color: var(--bone); letter-spacing: -.005em; text-transform: uppercase; margin-top: 6px; }
  .kind { margin-left: auto; font: 500 34px/1 "Plex", monospace; color: var(--dim); letter-spacing: .12em; text-transform: uppercase; }
  </style></head><body><div class="win"><img src="${join(F, 'plates', it.frame)}"></div>
  <div class="band"><span class="no">${String(i + 1).padStart(2, '0')}</span><span class="name">${it.name}</span><span class="kind">${it.kind}</span></div></body></html>`;
};

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--allow-file-access-from-files'] });
const page = await browser.newPage({ viewport: { width: W, height: H + BAND } });
const shot = async (html, out, opts) => {
  const f = join(T, '.tmp.html'); writeFileSync(f, html);
  await page.goto('file://' + f); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(200);
  await page.screenshot({ path: out, ...opts });
};
for (const [i, it] of flagships.entries()) {
  await shot(plate(it, i), join(A, `plate-${it.key}.jpg`), { type: 'jpeg', quality: 84 });
  console.log('plate', it.key);
}
await page.setViewportSize({ width: 1600, height: 720 });
await page.goto('file://' + join(T, 'hero-overlay.html')); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(200);
await page.screenshot({ path: join(F, 'hero-overlay.png'), omitBackground: true });
await browser.close();
console.log('hero overlay');
