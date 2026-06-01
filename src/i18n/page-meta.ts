/**
 * Page metadata for SEO - title and description per supported locale.
 * Used by page files to avoid duplicating title/description strings across
 * the per-locale versions of each page. Any locale not listed for a given
 * field falls back to English.
 *
 * When forking for another city, update the city-specific descriptions below.
 * The site name and default description come from @config/site.
 */
import { siteConfig, siteName } from '@config/site';
import type { Locale } from './utils';
import { DEFAULT_LOCALE } from './utils';

/** A string with at least an English value; other locales are optional. */
type LocalizedString = Partial<Record<Locale, string>> & { en: string };

interface PageMeta {
  title: LocalizedString;
  description: LocalizedString;
}

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: { en: siteConfig.name.en, es: siteConfig.name.es },
    description: {
      en: siteConfig.description.en,
      es: siteConfig.description.es,
      vi: 'Một phong trào vì công bằng kinh tế ở Denver. Xây dựng một thành phố nơi mọi người đều có thể sống, làm việc và phát triển.',
      zh: '一场为 Denver 经济公正而生的运动。建设一个人人都能负担得起生活、工作与发展的城市。',
      ar: 'حركة من أجل العدالة الاقتصادية في دنفر. نبني مدينة يستطيع فيها الجميع تحمّل تكاليف العيش والعمل والازدهار.',
      am: 'በዴንቨር ለኢኮኖሚ ፍትህ የቆመ ንቅናቄ። ሁሉም ሰው መኖር፣ መሥራት እና መበልጸግ የሚችልባት ከተማ መገንባት።',
    },
  },
  about: {
    title: {
      en: 'About',
      es: 'Acerca de',
      vi: 'Giới thiệu',
      zh: '关于我们',
      ar: 'من نحن',
      am: 'ስለ እኛ',
    },
    description: {
      en: `${siteConfig.name.en} is a grassroots movement building political power for working people in ${siteConfig.city.en}.`,
      es: `${siteConfig.name.es} es un movimiento popular construyendo poder político para las personas trabajadoras de ${siteConfig.city.es}.`,
      vi: 'Denver For All là một phong trào cơ sở xây dựng sức mạnh chính trị cho người lao động ở Denver.',
      zh: 'Denver For All 是一个草根运动，为 Denver 的劳动者建立政治力量。',
      ar: 'Denver For All حركة شعبية تبني القوة السياسية للطبقة العاملة في دنفر.',
      am: 'Denver For All በዴንቨር ለሚሠሩ ሰዎች የፖለቲካ ኃይል የሚገነባ ሕዝባዊ ንቅናቄ ነው።',
    },
  },
  platform: {
    title: {
      en: 'Platform',
      es: 'Plataforma',
      vi: 'Cương lĩnh',
      zh: '政纲',
      ar: 'البرنامج',
      am: 'መድረክ',
    },
    description: {
      en: 'Comprehensive, data-driven policy proposals for housing, labor, health, climate, public safety, education, and more.',
      es: 'Propuestas políticas integrales basadas en datos para vivienda, trabajo, salud, clima, seguridad pública, educación y más.',
      vi: 'Các đề xuất chính sách toàn diện, dựa trên dữ liệu về nhà ở, lao động, y tế, khí hậu, an toàn công cộng, giáo dục và hơn thế nữa.',
      zh: '针对住房、劳工、医疗、气候、公共安全、教育等领域的全面、数据驱动的政策提案。',
      ar: 'مقترحات سياسات شاملة قائمة على البيانات حول الإسكان والعمل والصحة والمناخ والسلامة العامة والتعليم وغير ذلك.',
      am: 'ስለ መኖሪያ ቤት፣ ሠራተኛ፣ ጤና፣ የአየር ንብረት፣ የሕዝብ ደህንነት፣ ትምህርት እና ሌሎችም አጠቃላይ በመረጃ ላይ የተመሠረቱ የፖሊሲ ሀሳቦች።',
    },
  },
  tools: {
    title: {
      en: 'Tools',
      es: 'Herramientas',
      vi: 'Công cụ',
      zh: '工具',
      ar: 'الأدوات',
      am: 'መሣሪያዎች',
    },
    description: {
      en: `Free, open-source tools for holding power accountable in ${siteConfig.city.en}.`,
      es: `Herramientas gratuitas y de código abierto para exigir rendición de cuentas en ${siteConfig.city.es}.`,
      vi: 'Các công cụ miễn phí, mã nguồn mở để giám sát và buộc chính quyền chịu trách nhiệm ở Denver.',
      zh: '免费、开源的工具，用于监督权力、在 Denver 追究问责。',
      ar: 'أدوات مجانية ومفتوحة المصدر لمساءلة السلطة في دنفر.',
      am: 'በዴንቨር ሥልጣንን ተጠያቂ ለማድረግ ነፃ እና ክፍት ምንጭ መሣሪያዎች።',
    },
  },
  takeAction: {
    title: {
      en: 'Take Action',
      es: 'Actúa',
      vi: 'Hành động',
      zh: '立即行动',
      ar: 'اتخذ إجراءً',
      am: 'እርምጃ ይውሰዱ',
    },
    description: {
      en: `Join the movement. Volunteer, donate, run for office, or help build a ${siteConfig.city.en} that works for everyone.`,
      es: `Únete al movimiento. Ofrécete como voluntario, dona, postúlate para un cargo o ayuda a construir un ${siteConfig.city.es} que funcione para todos.`,
      vi: 'Tham gia phong trào. Tình nguyện, quyên góp, tranh cử hoặc giúp xây dựng một Denver phục vụ tất cả mọi người.',
      zh: '加入这场运动。做志愿者、捐款、竞选公职，或帮助建设一个服务于每个人的 Denver。',
      ar: 'انضم إلى الحركة. تطوّع، أو تبرّع، أو ترشّح لمنصب، أو ساعد في بناء دنفر تعمل للجميع.',
      am: 'ንቅናቄውን ይቀላቀሉ። በበጎ ፈቃደኝነት ያገልግሉ፣ ይለግሱ፣ ለሥልጣን ይወዳደሩ ወይም ለሁሉም የሚሠራ ዴንቨር ለመገንባት ይርዱ።',
    },
  },
  runForDenver: {
    title: {
      en: `Run For ${siteConfig.city.en}`,
      es: `Postularse para ${siteConfig.city.es}`,
      vi: 'Tranh cử cho Denver',
      zh: '竞选 Denver',
      ar: 'ترشّح عن دنفر',
      am: 'ለዴንቨር ይወዳደሩ',
    },
    description: {
      en: `${siteConfig.name.en} is recruiting working-class candidates for the 2027 ${siteConfig.city.en} City Council election.`,
      es: `${siteConfig.name.es} está reclutando candidatos de la clase trabajadora para las elecciones del Concejo Municipal de ${siteConfig.city.es} 2027.`,
      vi: 'Denver For All đang tuyển các ứng cử viên thuộc tầng lớp lao động cho cuộc bầu cử Hội đồng Thành phố Denver năm 2027.',
      zh: 'Denver For All 正在为 2027 年 Denver 市议会选举招募劳动阶层候选人。',
      ar: 'تقوم Denver For All بتجنيد مرشّحين من الطبقة العاملة لانتخابات مجلس مدينة دنفر لعام 2027.',
      am: 'Denver For All ለ2027 የዴንቨር ከተማ ምክር ቤት ምርጫ ከሠራተኛው መደብ እጩዎችን እየመለመለ ነው።',
    },
  },
};

export function getPageMeta(page: string, locale: Locale): { title: string; description: string } {
  const meta = pageMeta[page];
  if (!meta) return { title: siteName(locale), description: '' };
  return {
    title: meta.title[locale] ?? meta.title[DEFAULT_LOCALE],
    description: meta.description[locale] ?? meta.description[DEFAULT_LOCALE],
  };
}
