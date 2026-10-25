import Link from 'next/link';
import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import SplitText from '@/components/SplitText';
import ServiceArt from '@/components/ServiceArt';
import ProcessSteps from '@/components/ProcessSteps';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { Check } from '@/components/Icons';

export async function generateMetadata({ params }: PageProps<'/[lang]/servicos'>) {
  const { locale, dict } = await resolve(params);
  return buildMetadata({ locale, path: '/servicos', ...dict.meta.services });
}

export default async function Servicos({ params }: PageProps<'/[lang]/servicos'>) {
  const { locale, dict } = await resolve(params);
  const L = (p: string) => localePath(locale, p);
  const sp = dict.servicesPage;

  return (
    <>
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [dict.nav.services, L('/servicos')]])} />
      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{sp.eyebrow}</p>
          <SplitText as="h1" className="h1-page" style={{ maxWidth: 1100 }} parts={[sp.title1, { text: sp.title2, className: 'accent' }]} />
          <p className="lead fade-up" style={{ margin: '32px 0 0', maxWidth: 600 }}>{sp.lead}</p>
          <div className="pill-row">
            {dict.services.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="pill" data-no-transition><span className="mono">{s.n}</span>{s.title}</a>
            ))}
          </div>
        </div>
      </section>

      {dict.services.map((s, i) => (
        <section key={s.slug} id={s.slug} className="section-half bb">
          <div className={`container svc-block${i % 2 === 1 ? ' flip' : ''}`}>
            <div className="svc-text" data-reveal>
              <p className="mono accent" style={{ fontSize: 13 }}>{s.n} / {sp.of}</p>
              <h2 className="h2" style={{ marginTop: 16 }}>{s.title}</h2>
              <p style={{ margin: '20px 0 0', fontSize: 18, lineHeight: 1.6 }} className="muted">{s.long}</p>
              <p className="label-caps" style={{ margin: '32px 0 14px' }}>{sp.includes}</p>
              <ul className="check-list">
                {s.includes.map((it) => <li key={it}><Check />{it}</li>)}
              </ul>
              <p className="muted" style={{ margin: '28px 0 0', fontSize: 15 }}>
                <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{sp.idealFor}</strong> {s.ideal}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <Link href={L('/contato')} className="btn btn-accent btn-md" data-magnetic>{sp.want}</Link>
                <Link href={L(`/servicos/${s.slug}`)} className="btn btn-ghost btn-md" data-magnetic>{sp.details}</Link>
              </div>
            </div>
            <div className="svc-art-wrap" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              <ServiceArt s={s} index={i} locale={locale} />
            </div>
          </div>
        </section>
      ))}

      <ProcessSteps process={dict.process} />
      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
