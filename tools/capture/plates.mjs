// Captures the contact-sheet plates: real frames from each project (sibling checkouts or live Pages).
//   PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs node tools/capture/plates.mjs [name ...]
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const here = dirname(fileURLToPath(import.meta.url));
const sib = (p) => 'file://' + resolve(here, '../../..', p);
const pages = (p) => `https://retrocodes12.github.io/${p}/`;
const out = join(here, '../.frames/plates');
mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const SPECS = {
  ultracraft: {
    url: sib('ultracraft/dist/index-offline.html?quality=high'),
    ready: () => window.UC && window.UC.ready,
    run: async () => {
      const UC = window.UC; UC.begin(); UC.ui.showHud(false); UC.settings.freeze = true;
      UC.teleport(-38.5, 28.02, -12.5, 0.3, -0.1); UC.setTime(12);
      const w = (ms) => new Promise((r) => setTimeout(r, ms));
      for (let i = 0; i < 100; i++) { await w(100); if (UC.world.isReady(-38.5, -12.5, 3)) break; }
      const P = UC.player.state.pos, yw = UC.player.state.yaw, fx = -Math.sin(yw), fz = -Math.cos(yw);
      for (const [d, s] of [[4, -2], [8, 2], [12, -1]]) {
        const X = Math.floor(P.x + fx * d - fz * s), Z = Math.floor(P.z + fz * d + fx * s); let Y = Math.floor(P.y);
        while (Y > 2 && UC.world.getBlock(X, Y - 1, Z) === 0) Y--;
        while (UC.world.getBlock(X, Y, Z) !== 0 && Y < 60) Y++;
        UC.world.setBlock(X, Y, Z, 23);
      }
      await w(4000); UC.stop(); UC.step(150, 1 / 30);
    },
  },
  v12: {
    url: sib('v12-engine/dist/index-offline.html'),
    ready: () => window.V12 && window.V12.ready,
    run: async () => {
      const V12 = window.V12; V12.debug.stop();
      V12.sim.start(); V12.debug.advance(3);
      V12.settings.cut.axis = 'z'; V12.settings.cut.pos = 0.45; V12.applyCut();
      V12.ui.preset('section');
      for (let i = 0; i < 40; i++) V12.anim.update();
      V12.controls.update(); V12.render(); V12.ui.tick();
    },
  },
  'machine-room': { url: pages('machine-room'), run: async () => { await new Promise((r) => setTimeout(r, 7000)); } },
  'sculpture-hall': { url: pages('sculpture-hall'), run: async () => { await new Promise((r) => setTimeout(r, 4000)); } },
  'evolution-sim': { url: pages('evolution-sim'), run: async () => {
    const btn = (t) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === t);
    btn('5×')?.click(); btn('Start')?.click();
    await new Promise((r) => setTimeout(r, 40000));
  } },
  'nebula-player': { url: 'https://play.rifflehq.in/', run: async () => { await new Promise((r) => setTimeout(r, 6000)); } },
  sleeve: { url: pages('sleeve'), run: async () => { await new Promise((r) => setTimeout(r, 8000)); } },
  'last-samurai': { url: sib('the-last-samurai-film/film.html'), run: async () => { window.scrollTo(0, document.body.scrollHeight * 0.36); await new Promise((r) => setTimeout(r, 3000)); } },
  'print-room': { url: pages('print-room'), run: async () => { await new Promise((r) => setTimeout(r, 4000)); } },
  terminus: { url: pages('terminus'), run: async () => { await new Promise((r) => setTimeout(r, 4000)); } },
};

const only = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=gl', '--ignore-gpu-blocklist', '--enable-gpu', '--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
for (const [name, spec] of Object.entries(SPECS)) {
  if (only.length && !only.includes(name)) continue;
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  page.on('pageerror', (e) => console.error(name, 'pageerror', e.message));
  await page.goto(spec.url, { waitUntil: 'load', timeout: 60000 });
  if (spec.ready) await page.waitForFunction(spec.ready, null, { timeout: 180000, polling: 500 });
  await page.evaluate(spec.run);
  await sleep(300);
  await page.screenshot({ path: join(out, name + '.png'), timeout: 240000 });
  await page.close();
  console.log('captured', name);
}
await browser.close();
