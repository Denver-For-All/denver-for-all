import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// When forking for another city, update the site URL here AND in src/config/site.ts
export default defineConfig({
  site: 'https://denverforall.org',
  output: 'static',
  integrations: [react(), icon(), sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
