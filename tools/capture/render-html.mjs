// Renders an HTML template to PNG (transparent where the page is). Usage:
//   node tools/capture/render-html.mjs <template.html> <out.png> <width> <height> [scale]
import { resolve } from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_CORE || 'playwright-core');
const [tpl, out, w, h, scale] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +(scale || 1) });
await page.goto('file://' + resolve(tpl));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(150);
await page.screenshot({ path: out, omitBackground: true });
await browser.close();
