// The profile README over the iron assets. `node tools/build.mjs` regenerates assets/ and README.md.
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { great, council, storage, storageSub, raven, ravenSub, TERMINUS } from './data.mjs';
import { hero, section, strip } from './assets.mjs';

const OUT = resolve(import.meta.dirname, '..'); mkdirSync(`${OUT}/assets`, { recursive: true });
const write = (f, s) => writeFileSync(`${OUT}/${f}`, s);

// Markdown bodies (after the bold name). Links live here so the SVG cards stay plain.
const MD = {
  'machine-room': "a Game Boy emulator: SM83, scanline PPU, four-voice sound, in 1,164 lines with no dependencies. Passes Blargg's CPU tests and renders dmg-acid2 pixel-perfect. [Insert a cartridge](https://retrocodes12.github.io/machine-room/).",
  'sculpture-hall': 'a 3D renderer with no GPU: matrices, near-plane clipping, z-buffer, perspective-correct texturing, written longhand. [Walk the hall](https://retrocodes12.github.io/sculpture-hall/), or drop your own .obj onto the plinth.',
  nebulastreams: 'hybrid streaming server: torrent streaming, HTTP proxying, and a disk-backed cache.',
  'nebula-player': 'one streaming player, four rooms: [web](https://retrocodes12.github.io/nebula-player/), [Android](https://github.com/retrocodes12/nebula-android), [desktop](https://github.com/retrocodes12/nebula-desktop), and a shared [watch-party](https://github.com/retrocodes12/nebula-party).',
  trustpacket: 'three-way trust reconciliation for law-firm client accounts. Two exports in, a signed packet out.',
  flowwatch: 'cross-client monitoring for n8n and Make automations, with white-label monthly reports ([site](https://retrocodes12.github.io/flowwatch-site/)).',
  'last-samurai': 'a wordless cinematic scroll film in six movements. No dialogue, no chrome; the scrollbar is the projector.',
  monochrome: 'a Spotify-style Monochrome client packaged as an Android app.',
  'graph-graffiti': 'draw text and sprites on a contribution graph in backdated empty commits. The studio behind the arcade wing, cleaned up and handed to visitors.',
  'arcade-cabinet': "Space Invaders in the terminal. The invaders on [the graph](https://github.com/retrocodes12/arcade-wing) don't move; these do.",
  'print-room': "a poster press. Every [visit](https://retrocodes12.github.io/print-room/) prints a numbered edition from the collection's identity; the number in the URL is the poster.",
  'the-vault': 'the storage basement, navigable entirely in markdown. The receiving books run to 27. This page says 26. Someone should look into that.',
};
const entry = (it) => `**[${it.name}](${it.url})** — ${MD[it.key]}<br>\n<sub>${it.meta}</sub>`;
const img = (f, alt) => `<img src="assets/${f}" width="100%" alt="${alt}">`;
const cardMd = (it) => `[![${it.name} — ${it.desc}](assets/card-${it.key}.svg)](${it.url})`;
const stripMd = (it) => `<a href="${it.url}">${pic(`strip-${it.key}`, it.name)}</a><br>\n${MD[it.key].replace(/^./, m => m.toUpperCase())}<br>\n<sub>${it.meta}</sub>`;
const row = (it) => `<tr><td width="72" valign="middle"><img src="assets/d-${it.key}.svg" width="56" alt=""></td><td>${entry(it)}</td></tr>`;

const HERO = img('hero.svg', 'RETROCODES — the holdings of retrocodes, 26 pieces. Words of the house: shipped whole.');
const pic = (base, alt) => `<picture><source media="(prefers-color-scheme: dark)" srcset="assets/${base}-dark.svg"><img src="assets/${base}-light.svg" width="100%" alt="${alt}"></picture>`;
const S = (n, f) => pic(`s${n}`, f);
const tail = `${S(3, 'III — Beyond the Wall')}

${storage}

<sub>${storageSub}</sub>

${S(4, 'IV — Send a raven')}

${raven}

<sub>${ravenSub}</sub>

${S(5, 'V — The long night')}

<a href="https://github.com/retrocodes12/terminus"><img src="${TERMINUS}" width="100%" alt="terminus — a countdown to 2030 that redraws itself daily; one light goes out every week"></a>

<p align="right"><sub>CATALOGUE REV. 2026-09 · THE GATES ARE ALWAYS OPEN</sub></p>
`;

export const structures = {
  s4: { label: 'S4 · sigil strips — a heraldic name-band above each entry; description stays selectable text', md: `${HERO}

${S(1, 'I — The Great Houses')}

${great.map(stripMd).join('\n\n')}

${S(2, 'II — The Small Council')}

${council.map(stripMd).join('\n\n')}

${tail}` },
};

export function buildAssets(style = 'fan') {
  write('assets/hero.svg', hero(style));
  const secs = [[1, 'THE GREAT HOUSES', 'FLAGSHIPS, EACH WITH A LIVE KEEP'], [2, 'THE SMALL COUNCIL', 'TOOLS AND INSTRUMENTS'], [3, 'BEYOND THE WALL', 'IN STORAGE'], [4, 'SEND A RAVEN', 'ISSUES AND PULL REQUESTS'], [5, 'THE LONG NIGHT', 'ONE LIGHT GOES OUT EVERY WEEK']];
  for (const [n, t, s] of secs) { write(`assets/s${n}-dark.svg`, section(n, t, s, 'dark')); write(`assets/s${n}-light.svg`, section(n, t, s, 'light')); }
  for (const it of [...great, ...council]) { write(`assets/strip-${it.key}-dark.svg`, strip(it, 'dark')); write(`assets/strip-${it.key}-light.svg`, strip(it, 'light')); }
}

export const writeReadme = () => write('README.md', structures.s4.md);
