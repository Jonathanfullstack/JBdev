import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, OG_LOCALE, localePath, type Locale } from './i18n';
import { SITE } from './site';

type MetaInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** Idiomas em que esta página existe (padrão: todos). */
  locales?: readonly Locale[];
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
};

export const absolute = (p: string) => `${SITE.url}${p === '/' ? '' : p}` || SITE.url;

export function buildMetadata(m: MetaInput): Metadata {
  const locales = m.locales ?? LOCALES;
  const canonical = absolute(localePath(m.locale, m.path));
  const languages: Record<string, string> = {};
  locales.forEach((l) => { languages[HTML_LANG[l]] = absolute(localePath(l, m.path)); });
  if (locales.includes('pt')) languages['x-default'] = absolute(localePath('pt', m.path));
  const image = m.image ?? '/assents/img/og-jbdev.png';
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical, languages },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: m.type ?? 'website',
      url: canonical,
      siteName: SITE.name,
      title: m.title,
      description: m.description,
      locale: OG_LOCALE[m.locale],
      alternateLocale: locales.filter((l) => l !== m.locale).map((l) => OG_LOCALE[l]),
      images: [{ url: image, width: 1200, height: 630, alt: SITE.name }],
      ...(m.type === 'article' ? { publishedTime: m.publishedTime, modifiedTime: m.modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: m.title, description: m.description, images: [image] },
  };
}

export const ORG_ID = `${SITE.url}/#business`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': ORG_ID,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/assents/img/logo.png`,
        image: `${SITE.url}/assents/img/og-jbdev.png`,
        description: 'Criação de sites, sistemas sob medida, automação com IA e aplicativos para empresas.',
        telephone: SITE.contact.phoneE164,
        email: SITE.contact.email,
        // streetAddress e CNPJ entram quando os dados reais forem informados (ver PENDENCIAS.md)
        address: {
          '@type': 'PostalAddress',
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          addressCountry: SITE.address.country,
        },
        areaServed: [
          ...SITE.areaServed.map((name) => ({ '@type': 'City', name })),
          { '@type': 'Country', name: 'Brasil' },
        ],
        founder: { '@id': `${SITE.url}/#founder` },
        sameAs: Object.values(SITE.social),
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: SITE.contact.phoneE164,
          email: SITE.contact.email,
          availableLanguage: ['pt-BR', 'en', 'es'],
          url: `https://wa.me/${SITE.contact.whatsapp}`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#founder`,
        name: SITE.founder.name,
        jobTitle: SITE.founder.jobTitle,
        image: `${SITE.url}${SITE.founder.image}`,
        url: `${SITE.url}/cartao`,
        worksFor: { '@id': ORG_ID },
        sameAs: Object.values(SITE.social),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: ['pt-BR', 'en', 'es'],
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

export function breadcrumbSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem', position: i + 1, name, item: absolute(path),
    })),
  };
}

export function faqSchema(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
