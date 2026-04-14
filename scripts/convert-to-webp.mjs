import { readdirSync, statSync, unlinkSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/img/', import.meta.url).pathname;
const QUALITY = 82;
const ALSO_CONVERT_PNG = true;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const targets = [];
for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || (ALSO_CONVERT_PNG && ext === '.png')) {
    targets.push(file);
  }
}

console.log(`Converting ${targets.length} images → WebP @ q=${QUALITY}…`);

let savedBytes = 0;
let totalBefore = 0;
let totalAfter = 0;
let failed = 0;

for (const src of targets) {
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const before = statSync(src).size;
    totalBefore += before;
    await sharp(src).rotate().webp({ quality: QUALITY, effort: 5 }).toFile(out);
    const after = statSync(out).size;
    totalAfter += after;
    savedBytes += before - after;
    if (existsSync(out) && after > 0) {
      unlinkSync(src);
    }
  } catch (err) {
    failed++;
    console.error(`  ✗ ${src}: ${err.message}`);
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(`\nDone.`);
console.log(`  files converted: ${targets.length - failed}`);
console.log(`  failed:          ${failed}`);
console.log(`  before:          ${mb(totalBefore)} MB`);
console.log(`  after:           ${mb(totalAfter)} MB`);
console.log(`  saved:           ${mb(savedBytes)} MB (${((savedBytes / totalBefore) * 100).toFixed(1)}%)`);
