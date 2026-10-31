import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDict } from '@/content/dictionaries';
import { PROJECTS } from '@/content/projects';
import { LOCAL_PAGES, getLocalPage } from '@/content/local-pages';
import { SITE, whatsappUrl } from '@/lib/site';
import { ORG_ID, absolute, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import SplitText from '@/components/SplitText';
import FaqList from '@/components/FaqList';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { ProjectCard } from '@/components/Cards';
import { Arrow, Check } from '@/components/Icons';

// Páginas de SEO local (nicho e cidade): só em português.
type Props = { params: Promise<{ lang: string; landing: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_PAGES.map((p) => ({ lang: 'pt', landing: p.slug }));
}

async function load(params: Props['params']) {
  const { lang, landing } = await params;
  const page = getLocalPage(landing);
  if (lang !== 'pt' || !page) notFound();
  return page;
}

export async function generateMetadata({ params }: Props) {
  const page = await load(params);
  return buildMetadata({ locale: 'pt', locales: ['pt'], path: `/${page.slug}`, title: page.metaTitle, description: page.metaDesc });
}

export default async function LocalPage({ params }: Props) {
  const page = await load(params);
  const dict = getDict('pt');
  const path = `/${page.slug}`;
  const projects = (page.projects ?? []).map((s) => PROJECTS.find((p) => p.slug === s)).filter((p) => p !== undefined);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    serviceType: 'Criação de sites',
    description: page.metaDesc,
    url: absolute(path),
    provider: { '@type': 'LocalBusiness', '@id': ORG_ID, name: SITE.name, url: SITE.url },
    areaServed: page.city
      ? { '@type': 'City', name: page.city }
      : [...SITE.areaServed.map((name) => ({ '@type': 'City', name })), { '@type': 'Country', name: 'Brasil' }],
    inLanguage: 'pt-BR',
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqSchema(page.faq)} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, '/'], [dict.nav.services, '/servicos'], [page.metaTitle.split(' | ')[0], path]])} />

      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mono muted" style={{ fontSize: 13, marginBottom: 24 }}>
            <Link href="/servicos" style={{ textDecoration: 'none' }}>{dict.servicePage.breadcrumbServices}</Link>
            <span aria-hidden="true"> / </span>
            <span className="accent" aria-current="page">{page.eyebrow.replace('// ', '')}</span>
          </nav>
          <SplitText as="h1" className="h1-page" style={{ fontSize: 'clamp(36px, 4.6vw, 68px)', maxWidth: 1100 }} parts={[page.h1]} />
          <p className="lead fade-up" style={{ margin: '28px 0 0', maxWidth: 680 }}>{page.lead}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }} className="fade-up">
            <a href={whatsappUrl(page.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-arrow" data-magnetic>
              Chamar no WhatsApp <Arrow />
            </a>
            <Link href="/contato" className="btn btn-ghost">Enviar briefing</Link>
          </div>
        </div>
      </section>

      <section className="section-half">
        <div className="container local-body">
          {page.sections.map((s) => (
            <div key={s.title} className="local-block" data-reveal>
              <h2>{s.title}</h2>
              {s.paras.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
              {s.list && (
                <ul className="check-list">
                  {s.list.map((it) => <li key={it}><Check />{it}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section-half surface">
          <div className="container">
            <p className="eyebrow">// portfólio</p>
            <SplitText className="h2" parts={['Projetos que já estão no ar']} />
            <div className="grid cols-3" style={{ marginTop: 48 }}>
              {projects.map((p, i) => <ProjectCard key={p.slug} p={p} locale="pt" viewCase={dict.portfolioHome.viewCase} index={i} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section bt">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">// dúvidas</p>
            <SplitText as="h2" className="h2" parts={['Perguntas frequentes']} />
            <a href={whatsappUrl(page.waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-md" style={{ marginTop: 32 }} data-magnetic>
              Chamar no WhatsApp
            </a>
          </div>
          <FaqList items={page.faq} />
        </div>
      </section>

      <CtaSection
        locale="pt" dict={dict}
        override={{ eyebrow: '// próximo passo', title: page.cta.title, text: page.cta.text, button: 'Chamar no WhatsApp →', href: whatsappUrl(page.waMessage) }}
      />
    </>
  );
}
