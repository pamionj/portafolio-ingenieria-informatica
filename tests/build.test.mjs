import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');

test('generated page has no broken local anchors or asset references', async () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'HTML ids must be unique');
  const refs = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(match => match[1]);
  for (const ref of refs) {
    if (ref.startsWith('#')) assert.ok(ids.includes(ref.slice(1)), `Missing anchor ${ref}`);
    if (ref.startsWith('/') && !ref.startsWith('//')) {
      const path = resolve(root, '.' + ref.split(/[?#]/)[0]);
      assert.ok(path.startsWith(root));
      await access(path);
    }
  }
  for (const match of html.matchAll(/<[^>]+aria-(?:controls|labelledby)="([^"]+)"/g)) {
    for (const id of match[1].split(' ')) assert.ok(ids.includes(id), `Missing ARIA target ${id}`);
  }
});

test('search and social metadata are consistent and point to real output files', async () => {
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(canonical);
  assert.equal(new URL(canonical).protocol, 'https:');
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(json, 'Structured data is required');
  assert.equal(JSON.parse(json).url, canonical);
  const robots = await readFile(resolve(root, 'robots.txt'), 'utf8');
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8');
  assert.ok(robots.includes(new URL('/sitemap.xml', canonical).href));
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(image);
  await access(resolve(root, '.' + new URL(image).pathname));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  await access(resolve(root, '404.html'));
});

test('static output stays within small client-side performance budgets', async () => {
  let javascriptBytes = 0;
  for (const filename of await readdir(resolve(root, '_astro'))) {
    if (filename.endsWith('.js')) javascriptBytes += gzipSync(await readFile(resolve(root, '_astro', filename))).byteLength;
  }
  assert.ok(javascriptBytes < 20_000, `JavaScript exceeds 20KB gzip: ${javascriptBytes}`);
  assert.ok(gzipSync(html).byteLength < 30_000, 'HTML exceeds 30KB gzip');
  assert.ok(!/https?:\/\/(?:fonts\.googleapis|fonts\.gstatic|unpkg|cdn\.jsdelivr)/.test(html), 'Fonts and scripts must be self-hosted');
});
