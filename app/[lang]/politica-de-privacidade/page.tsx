import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { PRIVACY } from '@/content/pages';
import JsonLd from '@/components/JsonLd';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await resolve(params);
  const p = PRIVACY[locale];
  return buildMetadata({ locale, path: '/politica-de-privacidade', title: p.metaTitle, description: p.metaDesc });
}

export default async function Privacidade({ params }: Props) {
  const { locale, dict } = await resolve(params);
  const p = PRIVACY[locale];
  const L = (x: string) => localePath(locale, x);

  return (
    <>
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [p.h1, L('/politica-de-privacidade')]])} />
      <section className="page-head bb dotted" style={{ paddingBottom: 'var(--sec-y-half)' }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{p.eyebrow}</p>
          <h1 className="h1-page" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>{p.h1}</h1>
          <p className="lead" style={{ margin: '28px 0 0', maxWidth: 720 }}>{p.lead}</p>
          <p className="mono muted" style={{ marginTop: 20, fontSize: 13 }}>{p.updated}</p>
        </div>
      </section>

      <section className="section-half">
        <div className="container local-body" style={{ gap: 40 }}>
          {p.sections.map((s) => (
            <div key={s.title} className="local-block">
              <h2 style={{ fontSize: 'clamp(22px, 2vw, 28px)' }}>{s.title}</h2>
              {s.paras.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}
              {s.list && (
                <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 17, lineHeight: 1.6, color: 'var(--ink2)' }}>
                  {s.list.map((it) => <li key={it}>{it}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
