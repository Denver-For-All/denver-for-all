import { useState, useEffect } from 'react';

export function useLocale(): 'en' | 'es' {
  const [locale, setLocale] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('dfa-locale');
    if (saved === 'es') setLocale('es');

    const observer = new MutationObserver(() => {
      const lang = document.documentElement.lang;
      setLocale(lang === 'es' ? 'es' : 'en');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  return locale;
}
