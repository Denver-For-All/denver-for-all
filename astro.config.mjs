import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
// import sitemap from '@astrojs/sitemap'; // disabled until i18n locale pages exist

export default defineConfig({
  site: 'https://denverforall.org',
  output: 'static',
  integrations: [
    react(),
    icon(),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
