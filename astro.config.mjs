import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'https://pabloamion.is-a.dev',
  output: 'static',
  devToolbar: { enabled: false },
});
