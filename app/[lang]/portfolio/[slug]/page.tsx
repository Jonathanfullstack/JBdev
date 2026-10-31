import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LOCALES, localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { ORG_ID, absolute, breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { PROJECTS, getProject } from '@/content/projects';
import SplitText from '@/components/SplitText';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { BrowserFrame } from '@/components/Cards';
import { Arrow, Quote } from '@/components/Icons';

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.flatMap((lang) => PROJECTS.map((p) => ({ lang, slug: p.slug })));

type Props = PageProps<'/[lang]/portfolio/[slug]'>;

async function load(params: Props['params']) {
  const { slug } = await params;
  const r = await resolve(params);
  const p = getProject(slug);
  if (!p) notFound();
  return { ...r, p };
}

export async function generateMetadata({ params }: Props) {
  const { locale, p } = await load(params);
  return buildMetadata({
    locale, path: `/portfolio/${p.slug}`,
    title: `${p.name} — ${p.cat[locale].toLowerCase()} | JB DEV`,
    description: p.desc[locale].slice(0, 155),
    image: p.image.src,
  });
}

export default async function CasePage({ params }: Props) {
  const { locale, dict, p } = await load(params);
  const L = (x: string) => localePath(locale, x);
  const c = dict.casePage;
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const t = p.testimonial;

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.name,
    description: p.desc[locale],
    url: absolute(L(`/portfolio/${p.slug}`)),
    image: absolute(p.image.src),
    creator: { '@id': ORG_ID },
    sameAs: p.href,
  };

  return (
    <>
      <JsonLd data={workLd} />
      <JsonLd data={breadcrumbSchema([[dict.nav.home, L('/')], [dict.nav.portfolio, L('/portfolio')], [p.name, L(`/portfolio/${p.slug}`)]])} />

      <section style={{ padding: 'clamp(40px, 5vw, 72px) 0 48px' }}>
        <div className="container">
          <Link href={L('/portfolio')} className="mono muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, textDecoration: 'none' }}>{c.back}</Link>
          <div className="head-row" style={{ marginTop: 24, gap: 32 }}>
            <div style={{ maxWidth: 900 }}>
              <p className="mono muted" style={{ display: 'flex', gap: 10, fontSize: 13 }}><span className="accent">{p.cat[locale]}</span><span>·</span><span>{p.year}</span></p>
              <SplitText as="h1" className="h1-page" style={{ marginTop: 18 }} parts={[p.name]} />
              <p className="lead fade-up" style={{ margin: '24px 0 0', maxWidth: 680 }}>{p.desc[locale]}</p>
            </div>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-md" data-magnetic>{c.visit} {p.host} ↗</a>
          </div>
          <dl className="meta-dl">
            <div><dt>{c.client}</dt><dd>{p.client}</dd></div>
            <div><dt>{c.segment}</dt><dd>{p.segment[locale]}</dd></div>
            <div><dt>{c.deliveries}</dt><dd>{p.tags[locale].join(', ')}</dd></div>
            <div><dt>{c.year}</dt><dd>{p.year}</dd></div>
          </dl>
        </div>
      </section>

      <div className="container">
        <div className="case-hero" style={{ background: p.palette.bg }}>
          <div data-tilt="3d">
            <BrowserFrame p={p} locale={locale} sizes="(max-width: 1360px) 90vw, 1200px" priority natural />
          </div>
        </div>
      </div>

      <section className="section-half">
        <div className="container grid cols-3" style={{ gap: '40px 32px' }}>
          {[[c.challenge, p.challenge[locale]], [c.solution, p.desc[locale]], [c.result, p.result[locale]]].map(([h, text], i) => (
            <div key={h} className="draw-top" style={{ paddingTop: 24, '--bw': '2px', '--bc': i === 0 ? 'var(--accent)' : 'var(--line)', '--d': `${i * 120}ms` } as React.CSSProperties}>
              <p className={`mono ${i === 0 ? 'accent' : 'muted'}`} style={{ fontSize: 13 }}>0{i + 1}</p>
              <h2 style={{ margin: '14px 0 12px', fontSize: 26, fontWeight: 600, letterSpacing: '-0.025em' }}>{h}</h2>
              <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink2)' }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {p.metrics[locale].length > 0 && (
        <section className="surface" style={{ padding: '72px 0' }}>
          <div className="container stats" style={{ marginTop: 0, textAlign: 'center', gap: '40px 32px' }}>
            {p.metrics[locale].map(([v, l]) => (
              <div key={l} data-reveal>
                <p className="stat-v accent">{v}</p>
                <p className="stat-l">{l}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section-half">
        <div className="container">
          <figure className="quote-card" data-reveal>
            <Quote style={{ color: 'var(--accent)' }} />
            <blockquote>“{t ? t.quote[locale] : c.testimonialPlaceholder}”</blockquote>
            <figcaption>
              <span className="avatar">{t ? t.name.split(' ').map((w) => w[0]).join('') : '[AB]'}</span>
              <span>
                <span style={{ display: 'block', fontWeight: 600, fontSize: 16 }}>{t ? t.name : c.testimonialName}</span>
                <span style={{ display: 'block', fontSize: 14, opacity: 0.7 }}>{t ? t.role : `${c.testimonialRole} · ${p.name}`}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bt">
        <div className="container">
          <Link href={L(`/portfolio/${next.slug}`)} className="next-case" data-cursor="→">
            <span>
              <span className="mono muted" style={{ display: 'block', fontSize: 13 }}>{c.next} · {next.cat[locale]}</span>
              <span className="h2" style={{ display: 'block', marginTop: 12 }}>{next.name}</span>
            </span>
            <span className="arrow"><Arrow size={26} /></span>
          </Link>
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
