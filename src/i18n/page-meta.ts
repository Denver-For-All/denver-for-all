/**
 * Page metadata for SEO - title and description in both languages.
 * Used by page files to avoid duplicating title/description strings
 * across en and es versions of each page.
 *
 * When forking for another city, update the city-specific descriptions below.
 * The site name and default description come from @config/site.
 */
import { siteConfig, siteName } from '@config/site';

interface PageMeta {
  title: { en: string; es: string };
  description: { en: string; es: string };
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: { en: siteConfig.name.en, es: siteConfig.name.es },
    description: {
      en: siteConfig.description.en,
      es: siteConfig.description.es,
    },
  },
  about: {
    title: { en: 'About', es: 'Acerca de' },
    description: {
      en: `${siteConfig.name.en} is a grassroots movement building political power for working people in ${siteConfig.city.en}.`,
      es: `${siteConfig.name.es} es un movimiento popular construyendo poder político para las personas trabajadoras de ${siteConfig.city.es}.`,
    },
  },
  platform: {
    title: { en: 'Platform', es: 'Plataforma' },
    description: {
      en: 'Comprehensive, data-driven policy proposals for housing, labor, health, climate, public safety, education, and more.',
      es: 'Propuestas políticas integrales basadas en datos para vivienda, trabajo, salud, clima, seguridad pública, educación y más.',
    },
  },
  tools: {
    title: { en: 'Tools', es: 'Herramientas' },
    description: {
      en: `Free, open-source tools for holding power accountable in ${siteConfig.city.en}.`,
      es: `Herramientas gratuitas y de código abierto para exigir rendición de cuentas en ${siteConfig.city.es}.`,
    },
  },
  takeAction: {
    title: { en: 'Take Action', es: 'Actúa' },
    description: {
      en: `Join the movement. Volunteer, donate, run for office, or help build a ${siteConfig.city.en} that works for everyone.`,
      es: `Únete al movimiento. Ofrécete como voluntario, dona, postúlate para un cargo o ayuda a construir un ${siteConfig.city.es} que funcione para todos.`,
    },
  },
  runForDenver: {
    title: { en: `Run For ${siteConfig.city.en}`, es: `Postularse para ${siteConfig.city.es}` },
    description: {
      en: `${siteConfig.name.en} is recruiting working-class candidates for the 2027 ${siteConfig.city.en} City Council election.`,
      es: `${siteConfig.name.es} está reclutando candidatos de la clase trabajadora para las elecciones del Concejo Municipal de ${siteConfig.city.es} 2027.`,
    },
  },
};

export function getPageMeta(
  page: string,
  locale: 'en' | 'es',
): { title: string; description: string } {
  const meta = pageMeta[page];
  if (!meta) return { title: siteName(locale), description: '' };
  return {
    title: meta.title[locale],
    description: meta.description[locale],
  };
}
