import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCALES, localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { SITE } from '@/lib/site';
import { ORG_ID, absolute, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import { SERVICE_PAGES, SERVICE_SLUGS } from '@/content/service-pages';
import { PROJECTS } from '@/content/projects';
import SplitText from '@/components/SplitText';
import ServiceArt from '@/components/ServiceArt';
import ProcessSteps from '@/components/ProcessSteps';
import FaqList from '@/components/FaqList';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { ProjectCard } from '@/components/Cards';
import { Check } from '@/components/Icons';

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((lang) => SERVICE_SLUGS.map((slug) => ({ lang, slug })));

type Props = PageProps<'/[lang]/servicos/[slug]'>;
type PageSlug = (typeof SERVICE_SLUGS)[number];

async function load(params: Props['params']) {
  const { slug } = await params;
  const { locale, dict } = await resolve(params);
  const summary = dict.services.find((s) => s.slug === slug);
  const page = SERVICE_PAGES[slug as PageSlug]?.[locale];
  if (!summary || !page) notFound();
  return { locale, dict, summary, page, slug: slug as PageSlug };
}

export async function generateMetadata({ params }: Props) {
  const { locale, page, slug } = await load(params);
  return buildMetadata({ locale, path: `/servicos/${slug}`, title: page.metaTitle, description: page.metaDesc });
}

export default async function ServicePage({ params }: Props) {
  const { locale, dict, summary, page, slug } = await load(params);
  const L = (p: string) => localePath(locale, p);
  const sp = dict.servicePage;
  const related = PROJECTS.filter((p) => p.key === summary.key).slice(0, 3);
  const index = dict.services.findIndex((s) => s.slug === slug);
  const img = summary.image;
  // a arte da introdução some quando repetiria a foto do topo (o chat da automação é outra peça)
  const showArt = !img || summary.key === 'auto';

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: summary.title,
    serviceType: summary.title,
    description: page.metaDesc,
    url: absolute(L(`/servicos/${slug}`)),
    provider: { '@id': ORG_ID },
    areaServed: [...SITE.areaServed.map((name) => ({ '@type': 'City', name })), { '@type': 'Country', name: 'Brasil' }],
    inLanguage: locale === 'pt' ? 'pt-BR' : locale,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqSchema(page.faq)} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [sp.breadcrumbServices, L('/servicos')], [summary.title, L(`/servicos/${slug}`)]])} />

      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className={`container${img ? ' seo-hero' : ''}`}>
          <div>
          <nav aria-label="breadcrumb" className="mono muted" style={{ fontSize: 13, marginBottom: 24 }}>
            <Link href={L('/servicos')} style={{ textDecoration: 'none' }}>{sp.breadcrumbServices}</Link>
            <span aria-hidden="true"> / </span>
            <span className="accent" aria-current="page">{summary.n}</span>
          </nav>
          <SplitText as="h1" className="h1-page" style={{ maxWidth: 1150, fontSize: img ? 'clamp(40px, 5vw, 76px)' : 'clamp(44px, 6.4vw, 92px)' }} parts={[page.h1]} />
          <p className="lead fade-up" style={{ margin: '32px 0 0', maxWidth: 680 }}>{page.lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40 }} className="fade-up">
            <Link href={L('/contato')} className="btn btn-accent" data-magnetic>{sp.cta}</Link>
            <a href="#inclui" className="btn btn-ghost" data-no-transition>{sp.includes}</a>
          </div>
          </div>
          {img && (
            <div className="seo-hero-media fade-up">
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="(max-width: 899px) 92vw, 620px" />
            </div>
          )}
        </div>
      </section>

      <section className="section-half">
        <div className={showArt ? 'container svc-block' : 'container'} style={showArt ? undefined : { maxWidth: 1100 }}>
          <div className="prose" data-reveal style={{ maxWidth: showArt ? 640 : undefined }}>
            {page.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {showArt && (
            <div data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              <ServiceArt s={summary} index={index} locale={locale} />
            </div>
          )}
        </div>
      </section>

      <section id="inclui" className="section-half surface">
        <div className="container svc-block" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">{sp.eyebrow}</p>
            <SplitText className="h2" parts={[sp.includes]} />
            <p className="muted" style={{ marginTop: 20, fontSize: 17, lineHeight: 1.55 }}>
              <strong style={{ color: 'var(--ink)' }}>{sp.idealFor}:</strong> {summary.ideal}
            </p>
          </div>
          <ul className="check-list" data-reveal style={{ fontSize: 18 }}>
            {summary.includes.map((it) => <li key={it} style={{ fontSize: 18 }}><Check />{it}</li>)}
          </ul>
        </div>
      </section>

      <section className="section-half">
        <div className="container" style={{ maxWidth: 1100 }}>
          <div className="prose">
            {page.sections.map((s) => (
              <div key={s.h2} data-reveal>
                <h2>{s.h2}</h2>
                {s.body.map((b, i) => <p key={i}>{b}</p>)}
                {s.list && <ul>{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps process={dict.process} />

      <section className="section-half bt">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{dict.portfolioHome.eyebrow}</p>
              <SplitText className="h2" parts={[sp.related]} />
            </div>
            <Link href={L('/portfolio')} className="link-under">{dict.portfolioHome.link}</Link>
          </div>
          {related.length ? (
            <div className="grid cols-3" style={{ marginTop: 48 }}>
              {related.map((p, i) => <ProjectCard key={p.slug} p={p} locale={locale} viewCase={dict.portfolioHome.viewCase} index={i} />)}
            </div>
          ) : (
            <p className="notice" style={{ marginTop: 40 }}>{sp.relatedEmpty}</p>
          )}
        </div>
      </section>

      <section className="section bt">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <SplitText className="h2" parts={[sp.faq]} />
            <Link href={L('/contato')} className="btn btn-accent btn-md" style={{ marginTop: 32 }} data-magnetic>{sp.cta}</Link>
          </div>
          <FaqList items={page.faq} />
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
