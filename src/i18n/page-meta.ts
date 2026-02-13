/**
 * Page metadata for SEO — title and description in both languages.
 * Used by page files to avoid duplicating title/description strings
 * across en and es versions of each page.
 */

interface PageMeta {
  title: { en: string; es: string };
  description: { en: string; es: string };
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: { en: 'Denver For All', es: 'Denver Para Todos' },
    description: {
      en: 'A movement for economic justice in Denver. Building a city where everyone can afford to live, work, and thrive.',
      es: 'Un movimiento por la justicia económica en Denver. Construyendo una ciudad donde todos puedan vivir, trabajar y prosperar.',
    },
  },
  about: {
    title: { en: 'About', es: 'Acerca de' },
    description: {
      en: 'Denver For All is a grassroots movement building political power for working people in Denver.',
      es: 'Denver Para Todos es un movimiento popular construyendo poder político para las personas trabajadoras de Denver.',
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
      en: 'Free, open-source tools for holding power accountable in Denver.',
      es: 'Herramientas gratuitas y de código abierto para exigir rendición de cuentas en Denver.',
    },
  },
  takeAction: {
    title: { en: 'Take Action', es: 'Actúa' },
    description: {
      en: 'Join the movement. Volunteer, donate, run for office, or help build a Denver that works for everyone.',
      es: 'Únete al movimiento. Ofrécete como voluntario, dona, postúlate para un cargo o ayuda a construir un Denver que funcione para todos.',
    },
  },
  runForDenver: {
    title: { en: 'Run For Denver', es: 'Postularse para Denver' },
    description: {
      en: 'Denver For All is recruiting working-class candidates for the 2027 Denver City Council election.',
      es: 'Denver Para Todos está reclutando candidatos de la clase trabajadora para las elecciones del Concejo Municipal de Denver 2027.',
    },
  },
};

export function getPageMeta(page: string, locale: 'en' | 'es'): { title: string; description: string } {
  const meta = pageMeta[page];
  if (!meta) return { title: 'Denver For All', description: '' };
  return {
    title: meta.title[locale],
    description: meta.description[locale],
  };
}
