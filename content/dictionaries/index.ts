import type { Locale } from '@/lib/i18n';
import type { Dict } from './types';
import pt from './pt';
import en from './en';
import es from './es';

const DICTS: Record<Locale, Dict> = { pt, en, es };

export const getDict = (locale: Locale): Dict => DICTS[locale];
export type { Dict };
