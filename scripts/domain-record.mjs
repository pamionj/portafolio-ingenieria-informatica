import { writeFile, mkdir } from 'node:fs/promises';

// Generate only after Cloudflare returns the actual production hostname.
const target = process.argv[2];
if (!target || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.pages\.dev$/.test(target)) {
  console.error('Uso: node scripts/domain-record.mjs <hostname-real>.pages.dev');
  console.error('Usa el hostname de producción devuelto por Cloudflare, sin https:// ni rutas.');
  process.exitCode = 1;
} else {
  const record = { owner: { username: 'pamionj' }, records: { CNAME: target } };
  await mkdir(new URL('../deployment/', import.meta.url), { recursive: true });
  await writeFile(new URL('../deployment/pabloamion.json', import.meta.url), JSON.stringify(record, null, 2) + '\n');
  console.log('Creado deployment/pabloamion.json. Destino en el PR de is-a-dev/register: domains/pabloamion.json.');
}
