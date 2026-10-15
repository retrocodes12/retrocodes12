// Renders the hero cinemagraph frames from a sibling checkout of retrocodes12/ultracraft.
//   PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs node tools/capture/hero.mjs [frames] [out-dir]
// Needs a real GPU for sane speed (ANGLE/GL flags below are for Linux + Mesa).
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const here = dirname(fileURLToPath(import.meta.url));
const game = resolve(here, '../../../ultracraft/dist/index-offline.html');
const N = +(process.argv[2] || 72), out = resolve(process.argv[3] || join(here, '../.frames/hero'));
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--use-gl=angle', '--use-angle=gl', '--ignore-gpu-blocklist', '--enable-gpu', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 720 } });
page.on('pageerror', (e) => console.error('pageerror', e.message));
await page.goto('file://' + game + '?quality=high');
await page.waitForFunction(() => window.UC && window.UC.ready, null, { timeout: 120000, polling: 500 });
await page.evaluate(async () => {
  const UC = window.UC;
  UC.begin(); UC.ui.showHud(false);
  UC.teleport(-6.5, 70.5, 0.5, -1.45, -0.06); UC.player.state.flying = true;
  UC.settings.freeze = true; UC.setTime(6.85);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let i = 0; i < 300; i++) { await wait(100); if (UC.world.isReady(-6.5, 0.5, 6)) break; }
  await wait(1500);
  UC.stop(); UC.step(120, 1 / 30); // settle exposure + streaming
});
for (let i = 0; i < N; i++) {
  await page.evaluate(() => window.UC.step(1, 1 / 15));
  await page.screenshot({ path: join(out, `f${String(i).padStart(3, '0')}.png`) });
}
await browser.close();
console.log('frames', N, out);
