// Shared primitives for the retrocodes "realm" README assets. Zero deps.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const FONTS = resolve(import.meta.dirname, 'fonts');
const b64 = (f) => readFileSync(resolve(FONTS, f)).toString('base64');
const cache = new Map();
export function face(name, file, weight, style = 'normal') {
  const k = name + file;
  if (!cache.has(k)) cache.set(k, `@font-face{font-family:'${name}';font-weight:${weight};font-style:${style};font-display:block;src:url(data:font/woff2;base64,${b64(file)}) format('woff2')}`);
  return cache.get(k);
}
export const F = {
  cinzel: () => face('Cinzel', 'Cinzel-normal-400.woff2', '400 900'),
  cinzelDeco: () => face('CinzelDeco', 'CinzelDecorative-normal-700.woff2', '700'),
  fell: () => face('Fell', 'IMFellEnglish-normal-400.woff2', '400'),
  fellI: () => face('Fell', 'IMFellEnglish-italic-400.woff2', '400', 'italic'),
  corm: () => face('Cormorant', 'CormorantGaramond-normal-500.woff2', '500'),
  cormI: () => face('Cormorant', 'CormorantGaramond-italic-500.woff2', '500', 'italic'),
  ebg: () => face('EBG', 'EBGaramond-normal-400.woff2', '400'),
  ebgI: () => face('EBG', 'EBGaramond-italic-400.woff2', '400', 'italic'),
};

// Tokens. Dark ground is a warm iron black; light ground is parchment. One accent.
export const T = {
  dark: { bg: '#0E0D0B', ink: '#E7DFCC', muted: '#857E70', line: '#2A2824', s1: '#161513', s2: '#1F1E1B', s3: '#2B2926', steel1: '#2A2825', steel2: '#4A4741', steel3: '#7A756C' },
  cool: { bg: '#0B0C0F', ink: '#E4E2DB', muted: '#7C7D80', line: '#24262B', ghost: '#131519' },
  parch: { bg: '#E7DBBF', ink: '#221B12', muted: '#7B6E57', line: '#B9AB8C', deep: '#D9CBA9' },
  accent: '#A8121E',
  ember: '#FF4D00',
};

// Seeded RNG (mulberry32) so every build is byte-identical.
export function rng(seed) {
  let a = seed >>> 0;
  return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const r1 = (n) => Math.round(n * 10) / 10;

export function svg({ w, h, title, desc, css = '', body, attrs = '' }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d" ${attrs}>
<title id="t">${esc(title)}</title>
<desc id="d">${esc(desc)}</desc>
<style>${css}</style>
${body}
</svg>`;
}

// Micro-caps label. size in viewBox px, tracking in em.
export function caps(x, y, text, { size = 12, tracking = 0.18, fill, anchor = 'start', font = 'Cinzel', weight = 400, extra = '' } = {}) {
  return `<text x="${x}" y="${y}" font-family="${font}" font-weight="${weight}" font-size="${size}" letter-spacing="${r1(size * tracking)}" fill="${fill}" text-anchor="${anchor}" ${extra}>${esc(text)}</text>`;
}

// A sword, point up, origin at the crossguard centre. L = blade length, w = blade width.
export function sword({ L = 200, w = 14, grip = 30, tip = 0.22, fill, stroke = 'none', sw = 0 } = {}) {
  const t = L * tip, hw = w / 2, cg = w * 2.6, gw = w * 0.34, pr = w * 0.55;
  return `<g fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round">
<path d="M${-hw} 0 L${-hw} ${-(L - t)} L0 ${-L} L${hw} ${-(L - t)} L${hw} 0 Z"/>
<rect x="${-cg / 2}" y="-3" width="${cg}" height="6" rx="1.5"/>
<rect x="${-gw}" y="3" width="${gw * 2}" height="${grip}"/>
<circle cx="0" cy="${3 + grip + pr}" r="${pr}"/>
</g>`;
}
export const place = (x, y, rot, inner, scale = 1) => `<g transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${scale})">${inner}</g>`;

// A throne built of swords. Origin = centre of the seat line; the back rises to -y, the plinth to +y.
// style: fan | spire | seat | heap
export function throne({ seed = 11, style = 'fan', tones, bg, sw = 0.9, seatW: sw0, backH: bh0 }) {
  const R = rng(seed);
  const S = (o) => sword({ stroke: bg, sw, ...o });
  const out = [];
  const seatW = sw0 || (style === 'seat' ? 300 : 260);
  const backH = bh0 || { fan: 400, spire: 470, seat: 300, heap: 380 }[style];
  const profile = (u) => style === 'spire' ? 1 - Math.pow(Math.abs((u + 0.38) / 1.38), 2.2) * 0.62
    : style === 'seat' ? 1 - Math.pow(Math.abs(u), 1.4) * 0.3
    : style === 'heap' ? 1 - Math.pow(Math.abs(u), 1.5) * 0.5
    : 1 - Math.pow(Math.abs(u), 1.8) * 0.45;
  const rows = [{ n: 26, t: 0, h: 1, sp: 1.18, ang: 24, dy: 0 }, { n: 20, t: 1, h: 0.82, sp: 0.98, ang: 16, dy: 6 }, { n: 15, t: 2, h: 0.62, sp: 0.8, ang: 9, dy: 12 }];
  if (style === 'heap') {
    for (let i = 0; i < 70; i++) {
      const a = R() * Math.PI, rr = 60 + R() * 200;
      out.push(place(Math.cos(a) * rr * 1.1, 30 + Math.sin(a) * rr * 0.4, (R() - 0.5) * 140, S({ L: 90 + R() * 160, w: 8 + R() * 6, grip: 16, fill: tones[i % 3] })));
    }
  }
  for (const row of rows) for (let i = 0; i < row.n; i++) {
    const u = (i / (row.n - 1)) * 2 - 1, x = u * seatW / 2 * row.sp;
    const L = backH * row.h * profile(u) * (0.9 + R() * 0.2);
    const lean = style === 'spire' ? -5 : 0;
    out.push(place(x, row.dy, u * row.ang + lean + (R() - 0.5) * 6, S({ L, w: 9 + R() * 6, grip: 18 + R() * 10, fill: tones[row.t] })));
  }
  for (const side of [-1, 1]) {
    const armN = style === 'seat' ? 8 : 6;
    for (let i = 0; i < armN; i++) {
      out.push(place(side * (seatW / 2 + 12 + i * 10), 18 + i * 2, side * (28 + i * 8 + R() * 6), S({ L: 140 + R() * 80, w: 8 + R() * 5, grip: 16, fill: tones[1 + (i % 2)] })));
    }
    for (let i = 0; i < 4; i++) {
      out.push(place(side * (seatW / 2 - 24), 22 + i * 9, side * 90 + (R() - 0.5) * 6, S({ L: 120 + R() * 30, w: 9, grip: 18, fill: tones[2] })));
    }
  }
  for (let i = 0; i < 3; i++) {
    const L = seatW / 2 + 10;
    out.push(place(L * 0.5, i * 8, -90 + (R() - 0.5) * 3, S({ L, w: 10, grip: 20, fill: tones[2] })));
    out.push(place(-L * 0.5, i * 8 + 4, 90 + (R() - 0.5) * 3, S({ L, w: 10, grip: 20, fill: tones[2] })));
  }
  for (let i = 0; i < 9; i++) {
    const y = 28 + i * 10, L = seatW * 0.55 + i * 12;
    out.push(place(L * 0.45 + (R() - 0.5) * 24, y, -90 + (R() - 0.5) * 5, S({ L, w: 10, grip: 20, fill: tones[(i % 2) + 1] })));
    out.push(place(-L * 0.45 + (R() - 0.5) * 24, y + 5, 90 + (R() - 0.5) * 5, S({ L, w: 10, grip: 20, fill: tones[((i + 1) % 2) + 1] })));
  }
  out.push(`<rect x="${-seatW * 0.9}" y="122" width="${seatW * 1.8}" height="20" fill="${tones[0]}"/>`);
  out.push(`<rect x="${-seatW * 1.1}" y="142" width="${seatW * 2.2}" height="20" fill="${tones[0]}"/>`);
  return `<g>${out.join('\n')}</g>`;
}

// Grain: a very quiet monochrome noise overlay.
export const grainDefs = (id = 'grain', freq = 0.9, op = 0.07) => `<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" stitchTiles="stitch" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 ${op} 0"/></filter>`;
export const grainRect = (w, h, id = 'grain') => `<rect width="${w}" height="${h}" filter="url(#${id})"/>`;

// Roman numerals for section numbers.
export const roman = (n) => ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n];

// Compass rose, centred at 0,0, radius r.
export function compass(r, ink, muted) {
  const pts = [];
  for (let i = 0; i < 4; i++) {
    const a = (i * 90 - 90) * Math.PI / 180, b = a + Math.PI / 2;
    pts.push(`<path d="M0 0 L${r1(Math.cos(a - 0.12) * r * 0.22)} ${r1(Math.sin(a - 0.12) * r * 0.22)} L${r1(Math.cos(a) * r)} ${r1(Math.sin(a) * r)} L${r1(Math.cos(a + 0.12) * r * 0.22)} ${r1(Math.sin(a + 0.12) * r * 0.22)} Z" fill="${ink}"/>`);
    const c = a + Math.PI / 4;
    pts.push(`<path d="M0 0 L${r1(Math.cos(c - 0.16) * r * 0.16)} ${r1(Math.sin(c - 0.16) * r * 0.16)} L${r1(Math.cos(c) * r * 0.55)} ${r1(Math.sin(c) * r * 0.55)} L${r1(Math.cos(c + 0.16) * r * 0.16)} ${r1(Math.sin(c + 0.16) * r * 0.16)} Z" fill="${muted}"/>`);
  }
  return `<g><circle r="${r * 0.62}" fill="none" stroke="${muted}" stroke-width="0.8"/><circle r="${r * 0.1}" fill="none" stroke="${ink}" stroke-width="1"/>${pts.join('')}<text x="0" y="${-r - 8}" font-family="Cinzel" font-size="14" fill="${ink}" text-anchor="middle">N</text></g>`;
}
