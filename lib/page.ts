import { notFound } from 'next/navigation';
import { isLocale, type Locale } from './i18n';
import { getDict } from '@/content/dictionaries';

/** Valida o idioma da rota e devolve o dicionário. */
export async function resolve(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return { locale: lang as Locale, dict: getDict(lang) };
}
