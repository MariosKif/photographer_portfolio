#!/usr/bin/env node
import sharp from 'sharp';
import { execSync } from 'node:child_process';
import { readFileSync, statSync, mkdirSync, copyFileSync, renameSync, existsSync } from 'node:fs';
import { dirname, relative, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const IMG_DIR = join(ROOT, 'public/img');
const BACKUP = join(ROOT, '_backups/img');
const MIN_BYTES = 200 * 1024;
const MAX_WIDTH = 2560;
const JPEG_Q = 88;

const files = execSync(
  `find "${IMG_DIR}" -type f \\( -iname '*.jpg' -o -iname '*.jpeg' \\) -size +${MIN_BYTES}c`,
  { encoding: 'utf8' }
).trim().split('\n').filter(Boolean);

let savedBytes = 0;
let processed = 0;

for (const file of files) {
  const rel = relative(IMG_DIR, file);
  const backupPath = join(BACKUP, rel);
  mkdirSync(dirname(backupPath), { recursive: true });
  if (!existsSync(backupPath)) copyFileSync(file, backupPath);

  const origSize = statSync(file).size;
  const tmp = file + '.tmp';
  try {
    const meta = await sharp(file).metadata();
    const targetW = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);
    await sharp(file)
      .rotate()
      .resize({ width: targetW, withoutEnlargement: true })
      .jpeg({ quality: JPEG_Q, mozjpeg: true, progressive: true })
      .toFile(tmp);
    const newSize = statSync(tmp).size;
    if (newSize < origSize) {
      renameSync(tmp, file);
      savedBytes += origSize - newSize;
      processed++;
      console.log(`OK ${rel}  ${(origSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`);
    } else {
      execSync(`rm -f "${tmp}"`);
      console.log(`skip ${rel}  already small (${(origSize/1024).toFixed(0)}KB)`);
    }
  } catch (err) {
    console.error(`FAIL ${rel}: ${err.message}`);
    try { execSync(`rm -f "${tmp}"`); } catch {}
  }
}

console.log(`\nDone. Re-encoded ${processed}/${files.length} files. Saved ${(savedBytes/1024/1024).toFixed(1)} MB.`);
