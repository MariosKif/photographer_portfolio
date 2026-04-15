// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.prophotogr.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    // Inline all stylesheets into the HTML — eliminates render-blocking CSS
    // requests at the cost of slightly larger HTML. Worth it for a 7-page static site.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
