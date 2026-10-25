import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { PROJECTS, TESTIMONIALS } from '@/content/projects';
import SplitText from '@/components/SplitText';
import PortfolioBrowser, { type CardProject } from '@/components/PortfolioBrowser';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { Quote } from '@/components/Icons';

export async function generateMetadata({ params }: PageProps<'/[lang]/portfolio'>) {
  const { locale, dict } = await resolve(params);
  return buildMetadata({ locale, path: '/portfolio', ...dict.meta.portfolio });
}

export default async function Portfolio({ params }: PageProps<'/[lang]/portfolio'>) {
  const { locale, dict } = await resolve(params);
  const pp = dict.portfolioPage;
  const cards: CardProject[] = PROJECTS.map((p) => ({
    slug: p.slug, name: p.name, key: p.key, host: p.host, href: p.href,
    caseHref: localePath(locale, `/portfolio/${p.slug}`),
    image: { src: p.image.src, width: p.image.width, height: p.image.height, alt: p.image.alt[locale] },
    cat: p.cat[locale], segment: p.segment[locale], year: p.year, desc: p.desc[locale], tags: p.tags[locale],
    palette: p.palette, metrics: p.metrics[locale],
  }));

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PROJECTS.map((p, i) => ({
      '@type': 'ListItem', position: i + 1, name: p.name, url: `https://www.jbdev.com.br${localePath(locale, `/portfolio/${p.slug}`)}`,
    })),
  };

  return (
    <>
      <JsonLd data={listLd} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, localePath(locale, '/')], [dict.nav.portfolio, localePath(locale, '/portfolio')]])} />
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{pp.eyebrow}</p>
          <div className="head-row" style={{ gap: 40 }}>
            <div>
              <SplitText as="h1" className="h1-page" parts={[dict.nav.portfolio, { text: '.', className: 'accent' }]} />
              <p className="lead fade-up" style={{ margin: '28px 0 0', maxWidth: 560 }}>{pp.lead}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, auto))', gap: 32 }}>
              {pp.stats.map(([v, l]) => (
                <div key={l} data-reveal>
                  <p data-count style={{ fontSize: 'clamp(28px, 2.8vw, 40px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>{v}</p>
                  <p className="label-caps" style={{ marginTop: 8, fontSize: 11, textTransform: 'uppercase' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PortfolioBrowser projects={cards} labels={pp} />

      <section className="section-half bt">
        <div className="container">
          <p className="eyebrow">{dict.portfolioHome.eyebrow}</p>
          <SplitText className="h2" parts={[pp.testimonials]} />
          <div className="grid cols-3" style={{ marginTop: 48 }}>
            {TESTIMONIALS.map((t, i) => (
              <figure key={t.name} className="testi" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <Quote size={28} style={{ color: 'var(--accent)' }} />
                <blockquote>“{t.quote[locale]}”</blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                  <span className="avatar" style={{ width: 40, height: 40, fontSize: 12 }}>{t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
                  <span><b style={{ display: 'block', fontWeight: 600 }}>{t.name}</b><span className="muted" style={{ fontSize: 14 }}>{t.role[locale]}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 var(--sec-y)' }}>
        <div className="container">
          <div className="head-row bt" style={{ alignItems: 'center', paddingTop: 40, gap: '20px 40px' }}>
            <p className="label-caps" style={{ textTransform: 'uppercase' }}>{pp.logos}</p>
            <div className="logos">{Array.from({ length: 5 }, (_, i) => <span key={i}>{pp.logoPlaceholder}</span>)}</div>
          </div>
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
