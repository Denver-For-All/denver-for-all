import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import remarkSmartypants from 'remark-smartypants';

// When forking for another city, update the site URL here AND in src/config/site.ts
export default defineConfig({
  site: 'https://denverforall.org',
  output: 'static',
  integrations: [react(), icon(), sitemap()],
  markdown: {
    // Keep smartypants' curly quotes and ellipses, but disable its dash
    // conversion so prose hyphens never render as en/em dashes.
    smartypants: false,
    remarkPlugins: [[remarkSmartypants, { dashes: false }]],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'vi', 'zh', 'ar', 'am'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
