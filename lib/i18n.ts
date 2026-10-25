export const LOCALES = ['pt', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'pt';

export const HTML_LANG: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
export const OG_LOCALE: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };
export const LOCALE_LABEL: Record<Locale, string> = { pt: 'Português', en: 'English', es: 'Español' };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Caminho público de uma rota num idioma. `path` sempre começa com "/". */
export function localePath(locale: Locale, path: string) {
  const clean = path === '/' ? '' : path;
  return locale === DEFAULT_LOCALE ? clean || '/' : `/${locale}${clean}`;
}

/** Remove o prefixo de idioma de um pathname do navegador. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const seg = pathname.split('/')[1];
  if (seg === 'en' || seg === 'es') {
    return { locale: seg, path: pathname.slice(3) || '/' };
  }
  return { locale: 'pt', path: pathname || '/' };
}
