// Final assets for the iron-throne profile. All drawn, nothing copied.
import { F, T, svg, caps, sword, place, throne, esc, r1, roman } from './lib.mjs';
const W = 1200, c = { ...T.dark, body: '#B9B2A2' };
export const LIGHT = { bg: '#F4F1EA', ink: '#1E1A15', muted: '#7A7366', line: '#D9D3C6', steel1: '#CFC9BC', steel2: '#948D80', steel3: '#4A463F' };
const theme = (t) => t === 'light' ? LIGHT : c;
const EYEBROW = 'THE HOLDINGS OF RETROCODES · 26 PIECES · MMXXVI';
const rule = (x1, x2, y, col, sw = 1) => `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${col}" stroke-width="${sw}"/>`;
const tones = [c.steel1, c.steel2, c.steel3];

export function hero(style = 'fan', seed = 11) {
  const H = 620;
  let art;
  if (style === 'fan') art = `<g transform="translate(930 432)">${throne({ seed, style: 'fan', tones, bg: c.bg })}</g>`;
  else if (style === 'tall') art = `<g transform="translate(940 486) scale(1.12)">${throne({ seed, style: 'spire', tones, bg: c.bg, seatW: 190, backH: 540 })}</g>`;
  else if (style === 'moon') art = `<circle cx="930" cy="322" r="232" fill="${c.ink}"/><g transform="translate(930 432)">${throne({ seed, style: 'fan', tones: [c.bg, c.s1, c.s2], bg: c.steel2, sw: 1.1 })}</g>`;
  else if (style === 'close') art = `<g transform="translate(1160 1010) scale(2.6)">${throne({ seed, style: 'fan', tones, bg: c.bg, sw: 0.5 })}</g>`;
  return svg({ w: W, h: H, title: 'RETROCODES', desc: 'The holdings of retrocodes, 26 pieces. Words of the house: shipped whole. A throne of swords.', css: F.cinzel(), body: `
<rect width="${W}" height="${H}" fill="${c.bg}"/>
${rule(56, 1144, 52, c.line)}
${art}
${caps(56, 96, EYEBROW, { size: 15, tracking: 0.22, fill: c.muted })}
<text font-family="Cinzel" font-weight="800" font-size="150" fill="${c.ink}" letter-spacing="-3"><tspan x="52" y="300">RETRO</tspan><tspan x="52" y="440">CODES</tspan></text>
${caps(58, 500, 'SHIPPED WHOLE', { size: 16, tracking: 0.34, fill: c.ink })}
${caps(58, 526, 'WORDS OF THE HOUSE', { size: 11, tracking: 0.24, fill: c.muted })}
${caps(58, 550, 'ARMS · SABLE, A THRONE OF SWORDS ARGENT', { size: 11, tracking: 0.24, fill: c.muted })}
${rule(56, 1144, 570, c.line)}
` });
}

export function section(n, title, sub = '', t = 'dark') {
  const num = roman(n), c = theme(t);
  return svg({ w: W, h: 100, title: `${num} · ${title}`, desc: sub || `Section ${num}`, css: F.cinzel(), body: `
<rect width="${W}" height="100" fill="${c.bg}"/>
<text x="0" y="66" font-family="Cinzel" font-weight="700" font-size="44" fill="${c.steel2}">${num}</text>
<text x="${num.length * 30 + 22}" y="62" font-family="Cinzel" font-weight="700" font-size="26" letter-spacing="5" fill="${c.ink}">${esc(title)}</text>
${rule(560, 1040, 56, c.line)}
${sub ? caps(1040, 60, sub, { size: 13, tracking: 0.22, fill: c.muted, anchor: 'end' }) : ''}
${place(1110, 56, 90, sword({ L: 60, w: 7, grip: 14, fill: c.steel3 }))}` });
}

// Heraldic devices, each inside a 64×64 box. Stroke-drawn, three steel tones, no fills of colour.
const devicesFor = (c) => ({
  cartridge: `<path d="M16 10 H40 L48 18 V54 H16 Z" fill="${c.steel1}" stroke="${c.steel3}" stroke-width="1.5"/><rect x="22" y="22" width="20" height="16" fill="${c.steel2}"/><path d="M16 46 H48" stroke="${c.steel3}" stroke-width="1.5"/>`,
  cube: `<path d="M32 8 L54 20 L32 32 L10 20 Z" fill="${c.steel3}"/><path d="M10 20 L32 32 V56 L10 44 Z" fill="${c.steel1}"/><path d="M54 20 L32 32 V56 L54 44 Z" fill="${c.steel2}"/>`,
  play: `<circle cx="32" cy="32" r="22" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><path d="M26 21 L44 32 L26 43 Z" fill="${c.steel3}"/>`,
  rooms: `<rect x="12" y="12" width="18" height="18" fill="${c.steel3}"/><rect x="34" y="12" width="18" height="18" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><rect x="12" y="34" width="18" height="18" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><rect x="34" y="34" width="18" height="18" fill="none" stroke="${c.steel3}" stroke-width="1.5"/>`,
  scales: `<path d="M32 10 V54 M18 54 H46 M12 20 H52 M12 20 L6 36 H18 Z M52 20 L46 36 H58 Z" fill="none" stroke="${c.steel3}" stroke-width="1.5" stroke-linejoin="round"/>`,
  eye: `<path d="M8 32 C 20 14, 44 14, 56 32 C 44 50, 20 50, 8 32 Z" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><circle cx="32" cy="32" r="9" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><circle cx="32" cy="32" r="3.5" fill="${c.steel3}"/>`,
  blade: place(30, 32, 90, sword({ L: 34, w: 6, grip: 12, fill: c.steel3 })),
  half: `<circle cx="32" cy="32" r="22" fill="none" stroke="${c.steel3}" stroke-width="1.5"/><path d="M32 10 A22 22 0 0 0 32 54 Z" fill="${c.steel3}"/>`,
  grid: [0, 1, 2, 3, 4].map(x => [0, 1, 2].map(y => `<rect x="${12 + x * 9}" y="${21 + y * 9}" width="6" height="6" fill="${(x + y) % 3 === 0 ? c.steel3 : c.steel1}"/>`).join('')).join(''),
  invader: ['00100000100', '00010001000', '00111111100', '01101110110', '11111111111', '10111111101', '10100000101', '00011011000'].map((row, y) => [...row].map((b, x) => b === '1' ? `<rect x="${10 + x * 4}" y="${16 + y * 4}" width="4" height="4" fill="${c.steel3}"/>` : '').join('')).join(''),
  fold: `<path d="M16 8 H40 L50 18 V56 H16 Z" fill="none" stroke="${c.steel3}" stroke-width="1.5" stroke-linejoin="round"/><path d="M40 8 V18 H50" fill="${c.steel1}" stroke="${c.steel3}" stroke-width="1.5" stroke-linejoin="round"/>`,
  keyhole: `<circle cx="32" cy="26" r="11" fill="${c.steel3}"/><path d="M27 34 L37 34 L41 54 H23 Z" fill="${c.steel3}"/>`,
});
const D = devicesFor(c);
export const deviceInner = (k) => D[k] || '';
export const device = (k) => svg({ w: 64, h: 64, title: k, desc: `heraldic device: ${k}`, body: `<rect width="64" height="64" fill="${c.bg}"/>${D[k]}` });

function wrap(text, max) {
  const words = text.split(' '), lines = []; let cur = '';
  for (const w of words) { if ((cur + ' ' + w).trim().length > max) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}
export function card(it) {
  const lines = wrap(it.desc.replace(/^./, m => m.toUpperCase()), 84);
  const H = 132 + lines.length * 31;
  return svg({ w: W, h: H, title: it.name, desc: `${it.name} — ${it.desc} (${it.meta})`, css: F.cinzel() + F.ebg(), body: `
<rect width="${W}" height="${H}" fill="${c.bg}"/>
<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${c.line}"/>
<g transform="translate(36 ${H / 2 - 32})">${D[it.device]}</g>
<text x="136" y="60" font-family="Cinzel" font-weight="700" font-size="32" fill="${c.ink}" letter-spacing="1">${esc(it.name)}</text>
${lines.map((l, i) => `<text x="136" y="${100 + i * 31}" font-family="EBG" font-size="24" fill="${c.body}">${esc(l)}</text>`).join('')}
${caps(136, H - 26, it.meta, { size: 13, tracking: 0.2, fill: c.muted })}
${place(1140, H / 2, 90, sword({ L: 44, w: 6, grip: 12, fill: c.steel2 }))}
` });
}

// A sigil strip: device + name on one 1200×120 band. Description and meta stay as markdown text under it.
export function strip(it, t = 'dark') {
  const c = theme(t), Dv = devicesFor(c);
  return svg({ w: W, h: 120, title: it.name, desc: `${it.name} · ${it.meta}`, css: F.cinzel(), body: `
<rect width="${W}" height="120" fill="${c.bg}"/>
<g transform="translate(24 20) scale(1.25)">${Dv[it.device]}</g>
<text x="132" y="76" font-family="Cinzel" font-weight="700" font-size="46" fill="${c.ink}" letter-spacing="1">${esc(it.name)}</text>
${place(1150, 60, 90, sword({ L: 48, w: 7, grip: 13, fill: c.steel2 }))}
${rule(0, W, 119, c.line)}
` });
}
