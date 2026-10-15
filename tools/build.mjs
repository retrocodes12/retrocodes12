// Full rebuild: plates + hero overlay, the hero loop, then README.md.
//   PLAYWRIGHT_CORE=/path/to/playwright-core/index.mjs [PYTHON=python-with-pillow] node tools/build.mjs
// Frames are captured beforehand (tools/capture/*.mjs) into the gitignored tools/.frames/.
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
const t = (f) => resolve(import.meta.dirname, f);
execFileSync('node', [t('plates.mjs')], { stdio: 'inherit' });
execFileSync(process.env.PYTHON || 'python3', [t('assemble.py'), 'hero'], { stdio: 'inherit' });
await import('./readme.mjs');
console.log('assets/ and README.md regenerated');
