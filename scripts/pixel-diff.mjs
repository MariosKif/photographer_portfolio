#!/usr/bin/env node
// Compare two images pixel-by-pixel using sharp. Outputs % of differing pixels.
import sharp from 'sharp';

const [a, b] = process.argv.slice(2);
if (!a || !b) {
  console.error('usage: pixel-diff.mjs <imageA> <imageB>');
  process.exit(2);
}

const fuzz = 12; // 0-255 per channel — tolerate JPEG noise / anti-alias
const { data: rawA, info } = await sharp(a).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const rawB = await sharp(b).resize(info.width, info.height).raw().ensureAlpha().toBuffer();
const len = Math.min(rawA.length, rawB.length);

let diff = 0;
for (let i = 0; i < len; i += 4) {
  const dr = Math.abs(rawA[i] - rawB[i]);
  const dg = Math.abs(rawA[i+1] - rawB[i+1]);
  const db = Math.abs(rawA[i+2] - rawB[i+2]);
  if (dr > fuzz || dg > fuzz || db > fuzz) diff++;
}
const total = len / 4;
const pct = (diff / total * 100).toFixed(3);
console.log(JSON.stringify({ a, b, dimensions: `${info.width}x${info.height}`, fuzz, diffPixels: diff, totalPixels: total, percent: Number(pct) }));
