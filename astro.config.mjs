import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import sitemap from '@astrojs/sitemap'; // disabled until i18n locale pages exist

export default defineConfig({
  site: 'https://denverforall.org',
  output: 'static',
  integrations: [
    react(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
