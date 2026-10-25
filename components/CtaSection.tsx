import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Dict } from '@/content/dictionaries/types';
import CtaField from './motion/CtaField';
import SplitText from './SplitText';
import { Arrow } from './Icons';

export default function CtaSection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const c = dict.cta;
  return (
    <section className="cta-wrap" aria-labelledby="cta-title">
      <div className="cta-box grain">
        <CtaField />
        <div className="inner">
          <p className="mono muted-c" style={{ margin: '0 0 24px', fontSize: 13 }}>{c.eyebrow}</p>
          <SplitText as="h2" className="cta-h" parts={[c.title]} id="cta-title" />
          <p className="muted-c" style={{ margin: '28px auto 0', maxWidth: 520, fontSize: 'clamp(17px, 1.4vw, 20px)', lineHeight: 1.55 }}>{c.text}</p>
          <Link href={localePath(locale, '/contato')} className="btn btn-lg cta-btn btn-arrow" style={{ marginTop: 40 }} data-magnetic="strong" data-cursor="→">
            {c.button} <Arrow size={20} />
          </Link>
          <p style={{ margin: '28px 0 0' }}>
            <a href={`mailto:${SITE.contact.email}`} className="mono" style={{ fontSize: 14, color: 'var(--cta-ink)', textUnderlineOffset: 5 }}>{SITE.contact.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
