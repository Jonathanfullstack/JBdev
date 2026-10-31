import Image from 'next/image';
import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { SITE, whatsappUrl } from '@/lib/site';
import { absolute, breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { ABOUT } from '@/content/pages';
import SplitText from '@/components/SplitText';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { Arrow, Check } from '@/components/Icons';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await resolve(params);
  const a = ABOUT[locale];
  return buildMetadata({ locale, path: '/sobre', title: a.metaTitle, description: a.metaDesc });
}

// TODO: trocar pela foto profissional do Jonathan quando houver (manter proporção retrato ~4:5)
const PHOTO = { src: '/assets/img/about-jonathan-workspace.webp', width: 1045, height: 1280 };

export default async function Sobre({ params }: Props) {
  const { locale, dict } = await resolve(params);
  const a = ABOUT[locale];
  const L = (p: string) => localePath(locale, p);

  const aboutLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: a.metaTitle,
    description: a.metaDesc,
    url: absolute(L('/sobre')),
    mainEntity: { '@id': `${SITE.url}/#founder` },
  };

  return (
    <>
      <JsonLd data={aboutLd} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [dict.nav.about, L('/sobre')]])} />

      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className="container about-grid">
          <div>
            <p className="eyebrow" style={{ marginBottom: 24 }}>{a.eyebrow}</p>
            <SplitText as="h1" className="h1-page" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }} parts={[a.h1]} />
            <p className="lead fade-up" style={{ margin: '28px 0 0', maxWidth: 600 }}>{a.lead}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }} className="fade-up">
              <a href={whatsappUrl(dict.common.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-arrow" data-magnetic>
                {a.ctaButton} <Arrow />
              </a>
            </div>
          </div>
          <figure className="about-photo fade-up" style={{ margin: 0 }}>
            <Image src={PHOTO.src} width={PHOTO.width} height={PHOTO.height} alt={a.photoAlt} priority sizes="(max-width: 899px) 92vw, 520px" />
          </figure>
        </div>
      </section>

      <section className="section-half">
        <div className="container local-body">
          {a.sections.map((s) => (
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
          <div className="local-block" data-reveal>
            <h2>{a.stackTitle}</h2>
            <div className="tags">{a.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
