import Image from 'next/image';
import Link from 'next/link';
import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { SITE, whatsappUrl } from '@/lib/site';
import { ORG_ID, absolute, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import { SEO_PAGE, SEO_SLUG } from '@/content/seo-service';
import SplitText from '@/components/SplitText';
import ProcessSteps from '@/components/ProcessSteps';
import FaqList from '@/components/FaqList';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { Arrow, Check } from '@/components/Icons';

type Props = { params: Promise<{ lang: string }> };
const PATH = `/servicos/${SEO_SLUG}`;

// ícones dos três problemas: busca, pino do mapa e perfil
const PROBLEM_ICONS = [
  <svg key="s" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5M8.5 11h5" /></svg>,
  <svg key="m" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>,
  <svg key="p" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2.5" /><circle cx="12" cy="10" r="3" /><path d="M8 17c.8-1.6 2.2-2.4 4-2.4s3.2.8 4 2.4" /></svg>,
];

export async function generateMetadata({ params }: Props) {
  const { locale } = await resolve(params);
  const c = SEO_PAGE[locale];
  return buildMetadata({ locale, path: PATH, title: c.metaTitle, description: c.metaDesc });
}

export default async function SeoServicePage({ params }: Props) {
  const { locale, dict } = await resolve(params);
  const c = SEO_PAGE[locale];
  const L = (p: string) => localePath(locale, p);
  const summary = dict.services.find((s) => s.slug === SEO_SLUG)!;
  const sp = dict.servicePage;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: summary.title,
    serviceType: ['SEO', 'SEO local', 'Google Business Profile'],
    description: c.metaDesc,
    url: absolute(L(PATH)),
    image: absolute(summary.image!.src),
    provider: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, url: SITE.url },
    areaServed: [...SITE.areaServed.map((name) => ({ '@type': 'City', name })), { '@type': 'Country', name: 'Brasil' }],
    inLanguage: locale === 'pt' ? 'pt-BR' : locale,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqSchema(c.faq)} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [sp.breadcrumbServices, L('/servicos')], [summary.title, L(PATH)]])} />

      {/* HERO */}
      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className="container seo-hero">
          <div>
            <nav aria-label="breadcrumb" className="mono muted" style={{ fontSize: 13, marginBottom: 24 }}>
              <Link href={L('/servicos')} style={{ textDecoration: 'none' }}>{sp.breadcrumbServices}</Link>
              <span aria-hidden="true"> / </span>
              <span className="accent" aria-current="page">{summary.n}</span>
            </nav>
            <SplitText as="h1" className="h1-page" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }} parts={[c.h1]} />
            <p className="lead fade-up" style={{ margin: '28px 0 0', maxWidth: 600 }}>{c.lead}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }} className="fade-up">
              <a href={whatsappUrl(c.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-arrow" data-magnetic>
                {c.ctaPrimary} <Arrow />
              </a>
              <a href="#inclui" className="btn btn-ghost" data-no-transition>{c.ctaSecondary}</a>
            </div>
          </div>
          <div className="seo-hero-media fade-up">
            <Image src={summary.image!.src} alt={summary.image!.alt} width={summary.image!.width} height={summary.image!.height} priority sizes="(max-width: 899px) 92vw, 620px" />
          </div>
        </div>
      </section>

      {/* O PROBLEMA */}
      <section className="section-half">
        <div className="container">
          <p className="eyebrow">{c.problemEyebrow}</p>
          <SplitText className="h2" style={{ maxWidth: 860 }} parts={[c.problemTitle]} />
          <div className="grid cols-3" style={{ gap: 16, marginTop: 48 }}>
            {c.problems.map(([t, text], i) => (
              <div key={t} className="seo-card" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <span className="svc-icon">{PROBLEM_ICONS[i]}</span>
                <h3>{t}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE ESTÁ INCLUSO */}
      <section id="inclui" className="section-half surface">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{c.includesEyebrow}</p>
              <SplitText className="h2" style={{ maxWidth: 760 }} parts={[c.includesTitle]} />
            </div>
            <p className="muted fade-up" style={{ maxWidth: 440, fontSize: 17, lineHeight: 1.55 }}>{c.includesLead}</p>
          </div>
          <div className="grid cols-3" style={{ gap: 16, marginTop: 48 }}>
            {c.blocks.map((b, i) => (
              <div key={b.title} className="seo-card seo-block draw-top" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <p className="mono accent" style={{ fontSize: 13 }}>0{i + 1} / {b.tag}</p>
                <h3>{b.title}</h3>
                <ul className="check-list">
                  {b.items.map((it) => <li key={it}><Check />{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <ProcessSteps process={{ ...dict.process, ...c.process }} />

      {/* PLANOS */}
      <section className="section-half bt">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{c.plansEyebrow}</p>
              <SplitText className="h2" parts={[c.plansTitle]} />
            </div>
            <p className="muted fade-up" style={{ maxWidth: 440, fontSize: 17, lineHeight: 1.55 }}>{c.plansLead}</p>
          </div>
          <div className="grid cols-3 seo-plans" style={{ marginTop: 48 }}>
            {c.plans.map((p, i) => (
              <div key={p.name} className={`seo-plan${p.featured ? ' is-featured' : ''}`} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                {p.featured && <span className="soft-badge seo-plan-badge">{c.featuredLabel}</span>}
                <h3>{p.name}</h3>
                <p className="seo-plan-desc">{p.desc}</p>
                {p.price && <p className="seo-plan-price">{p.price}</p>}
                <ul className="check-list">
                  {p.items.map((it) => <li key={it}><Check />{it}</li>)}
                </ul>
                <a
                  href={whatsappUrl(p.msg)} target="_blank" rel="noopener noreferrer"
                  className={`btn btn-md ${p.featured ? 'btn-accent' : 'btn-ghost'}`} style={{ marginTop: 'auto' }}
                >
                  {c.quote}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bt">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">{c.faqEyebrow}</p>
            <SplitText as="h2" className="h2" parts={[c.faqTitle]} />
            <a href={whatsappUrl(c.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-md" style={{ marginTop: 32 }} data-magnetic>
              {c.ctaPrimary}
            </a>
          </div>
          <FaqList items={c.faq} />
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} override={{ ...c.cta, href: whatsappUrl(c.cta.message) }} />
    </>
  );
}
