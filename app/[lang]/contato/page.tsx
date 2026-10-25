import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { SITE, whatsappUrl } from '@/lib/site';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import SplitText from '@/components/SplitText';
import BriefingForm from '@/components/forms/BriefingForm';
import JsonLd from '@/components/JsonLd';
import { Chat, Mail } from '@/components/Icons';

export async function generateMetadata({ params }: PageProps<'/[lang]/contato'>) {
  const { locale, dict } = await resolve(params);
  return buildMetadata({ locale, path: '/contato', ...dict.meta.contact });
}

export default async function Contato({ params }: PageProps<'/[lang]/contato'>) {
  const { locale, dict } = await resolve(params);
  const c = dict.contact;
  return (
    <>
      <JsonLd data={breadcrumbSchema([[dict.nav.home, localePath(locale, '/')], [dict.nav.contact, localePath(locale, '/contato')]])} />
      <section className="page-head" style={{ paddingBottom: 'var(--sec-y)' }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{c.eyebrow}</p>
          <SplitText as="h1" className="h1-page" style={{ maxWidth: 1000 }} parts={[c.title1, { text: c.title2, className: 'accent' }]} />
          <p className="lead fade-up" style={{ margin: '32px 0 0', maxWidth: 560 }}>{c.lead}</p>

          <div className="contact-grid">
            <div className="form-card" data-reveal>
              <BriefingForm c={c} locale={locale} />
            </div>
            <aside style={{ display: 'flex', flexDirection: 'column', gap: 16 }} data-reveal>
              <a href={whatsappUrl(dict.common.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="contact-card">
                <span className="ic"><Chat size={22} /></span>
                <span><span style={{ display: 'block', fontWeight: 600, fontSize: 17 }}>{c.whatsappCard}</span><span className="muted" style={{ display: 'block', fontSize: 14 }}>{SITE.contact.phoneDisplay}</span></span>
              </a>
              <a href={`mailto:${SITE.contact.email}`} className="contact-card">
                <span className="ic"><Mail /></span>
                <span><span style={{ display: 'block', fontWeight: 600, fontSize: 17 }}>{c.emailCard}</span><span className="muted" style={{ display: 'block', fontSize: 14, wordBreak: 'break-all' }}>{SITE.contact.email}</span></span>
              </a>
              <div style={{ padding: 24, borderRadius: 20, background: 'var(--ink)', color: 'var(--bg)' }}>
                <p className="mono" style={{ margin: '0 0 14px', fontSize: 12, letterSpacing: '0.14em', opacity: 0.7 }}>{c.nextTitle}</p>
                <ol style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, lineHeight: 1.5 }}>
                  {c.nextSteps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
