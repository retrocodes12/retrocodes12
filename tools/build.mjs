import { buildAssets, writeReadme } from './readme.mjs';
buildAssets('moon');
writeReadme();
console.log('assets/ and README.md regenerated');
