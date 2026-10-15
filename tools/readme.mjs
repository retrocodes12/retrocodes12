// Writes README.md from tools/data.mjs. Plates and the hero are rendered separately (tools/plates.mjs, tools/assemble.py).
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { flagships, shelf } from './data.mjs';

const hero = `<a href="https://github.com/retrocodes12/ultracraft"><picture><source srcset="assets/hero.webp" type="image/webp"><img src="assets/hero.jpg" width="100%" alt="RETROCODES. 26 pieces. Worlds, players and simulations. A live frame from Ultracraft: sunrise over the sea."></picture></a>`;

const plate = (it) => `<a href="${it.url}"><img src="assets/plate-${it.key}.jpg" width="100%" alt="${it.name}: ${it.kind.toLowerCase()}"></a>

${it.md}<br>
<sub>${it.meta} · [SOURCE](${it.url})</sub>`;

const md = `${hero}

Software built end to end by one person: a game engine that renders in a browser tab, a streaming player on seven platforms, a simulation where species split on their own. Each one below runs; click a picture for the source.

${flagships.map(plate).join('\n\n<br>\n\n')}

<br>

### Also on the shelf

${shelf.map(([n, u, d]) => `- **[${n}](${u})** · ${d}`).join('\n')}

<br>

<sub>KEPT BY ONE PERSON · ISSUES AND PULL REQUESTS OPEN ON EVERY PUBLIC REPO · REV. 2026-10</sub>
`;

writeFileSync(resolve(import.meta.dirname, '../README.md'), md);
