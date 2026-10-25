import { Suspense } from 'react';
import Link from 'next/link';
import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { getPosts, toMeta } from '@/lib/blog';
import { PROJECTS } from '@/content/projects';
import RibbonCanvas from '@/components/motion/RibbonCanvas';
import PinSection from '@/components/motion/PinSection';
import Marquee from '@/components/motion/Marquee';
import WordGlow from '@/components/motion/WordGlow';
import SplitText from '@/components/SplitText';
import FaqList from '@/components/FaqList';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { PostCard, ProjectCard } from '@/components/Cards';
import { Arrow, Chat } from '@/components/Icons';
import { SITE, whatsappUrl } from '@/lib/site';

export async function generateMetadata({ params }: PageProps<'/[lang]'>) {
  const { locale, dict } = await resolve(params);
  return buildMetadata({ locale, path: '/', ...dict.meta.home });
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { locale, dict } = await resolve(params);
  const L = (p: string) => localePath(locale, p);
  const home = ['balli-acessorios', 'jb-crm', 'jb-barber'].map((s) => PROJECTS.find((p) => p.slug === s)!);
  const posts = getPosts().slice(0, 3).map(toMeta);
  const h = dict.hero;

  return (
    <>
      <JsonLd data={faqSchema(dict.faq.items)} />

      {/* HERO */}
      <section className="hero grain">
        <div className="container hero-grid">
          <div>
            <p className="badge fade-up" style={{ '--d': '0s' } as React.CSSProperties}><span className="pulse" />{h.badge}</p>
            <h1 className="h1-hero">
              <span className="line-mask"><span className="muted">{h.l1}</span></span>{' '}
              <span className="line-mask"><span>{h.l2}</span></span>{' '}
              <span className="line-mask"><span className="accent">{h.l3}</span></span>
            </h1>
            <p className="lead fade-up" style={{ margin: '32px 0 0', maxWidth: 500, '--d': '0.35s' } as React.CSSProperties}>{h.lead}</p>
            <div className="hero-actions fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 40, '--d': '0.5s' } as React.CSSProperties}>
              <Link href={L('/contato')} className="btn btn-accent btn-arrow" data-magnetic>{h.primary} <Arrow /></Link>
              <Link href={L('/portfolio')} className="btn btn-ghost" data-magnetic>{h.secondary}</Link>
            </div>
          </div>
          <div className="hero-art"><RibbonCanvas label={h.canvasLabel} /></div>
        </div>
        <div className="scroll-cue desktop-only" aria-hidden="true">{h.scroll}<i /></div>
      </section>

      <Suspense>
      {/* CONSTRUÍMOS PARA… */}
      <PinSection {...dict.pin} ctaHref={L('/contato')} />

      <Marquee items={dict.marquee} />

      </Suspense>

      <Suspense>
      {/* DIAGNÓSTICO */}
      <section className="section">
        <div className="container">
          <div className="head-row" style={{ marginBottom: 56 }}>
            <div>
              <p className="eyebrow">{dict.diag.eyebrow}</p>
              <SplitText className="h2" parts={[dict.diag.title]} />
            </div>
            <p className="muted" style={{ maxWidth: 360, fontSize: 17, lineHeight: 1.55 }} data-reveal>{dict.diag.aside}</p>
          </div>
          {dict.diag.items.map(([n, problem, fix], i) => (
            <div key={n}>
              <div className="draw-line" style={{ '--d': `${i * 80}ms` } as React.CSSProperties} />
              <div className="diag-row" data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
                  <span className="mono accent" style={{ fontSize: 13 }}>{n}</span>
                  <p className="diag-problem">{problem}</p>
                </div>
                <div className="diag-fix"><Arrow size={20} /><span>{fix}</span></div>
              </div>
            </div>
          ))}
          <div className="draw-line" />
          <WordGlow words={dict.diag.reveal} split={dict.diag.revealSplit} />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 40 }}>
            <Link href={L('/contato')} className="btn btn-accent btn-md" data-magnetic>{dict.diag.cta1}</Link>
            <Link href={L('/servicos')} className="btn btn-ghost btn-md" data-magnetic>{dict.diag.cta2}</Link>
          </div>
        </div>
      </section>

      </Suspense>

      <Suspense>
      {/* SERVIÇOS */}
      <section className="section surface">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{dict.servicesHome.eyebrow}</p>
              <SplitText className="h2" style={{ maxWidth: 820 }} parts={[dict.servicesHome.title]} />
            </div>
            <Link href={L('/servicos')} className="link-under">{dict.servicesHome.link}</Link>
          </div>
          <div className="grid cols-4" style={{ gap: 16, marginTop: 56 }}>
            {dict.services.map((s, i) => (
              <div key={s.slug} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                <Link href={L(`/servicos/${s.slug}`)} className="svc-card" data-tilt style={{ height: '100%' }}>
                  <span className="glow" aria-hidden="true" />
                  <div className="z40" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="svc-icon">{s.icon}</span>
                    <span className="mono muted" style={{ fontSize: 13 }}>{s.n}</span>
                  </div>
                  <h3 className="h3 z28" style={{ marginTop: 12 }}>{s.title}</h3>
                  <p className="muted" style={{ fontSize: 16, lineHeight: 1.55 }}>{s.short}</p>
                  <div className="tags" style={{ marginTop: 'auto' }}>{s.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section className="section">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{dict.portfolioHome.eyebrow}</p>
              <SplitText className="h2" parts={[dict.portfolioHome.title]} />
            </div>
            <Link href={L('/portfolio')} className="link-under">{dict.portfolioHome.link}</Link>
          </div>
          <div className="grid cols-3" style={{ marginTop: 56 }}>
            {home.map((p, i) => <ProjectCard key={p.slug} p={p} locale={locale} viewCase={dict.portfolioHome.viewCase} index={i} />)}
          </div>
        </div>
      </section>

      </Suspense>

      <Suspense>
      {/* PROCESSO */}
      <section className="section bt">
        <div className="container">
          <p className="eyebrow">{dict.process.eyebrow}</p>
          <SplitText className="h2" style={{ maxWidth: 820 }} parts={[dict.process.title]} />
          <ol className="steps" style={{ listStyle: 'none', padding: 0 }}>
            {dict.process.steps.map(([title, text], i) => (
              <li key={title} className="step draw-top" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <p className="n">0{i + 1}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="section surface">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: 28 }}>{dict.manifesto.eyebrow}</p>
          <h2 className="manifesto-h split" data-split="">
            <span className="w"><i>{dict.manifesto.l1}</i></span>
            <span className="w" style={{ display: 'block' }}><i className="accent" style={{ '--i': 3 } as React.CSSProperties}>{dict.manifesto.l2}</i></span>
          </h2>
          <p className="lead" style={{ margin: '32px auto 0', maxWidth: 560 }} data-reveal>{dict.manifesto.text}</p>
          <div className="stats">
            {dict.manifesto.stats.map(([v, l], i) => (
              <div key={l} className="stat draw-top" style={{ '--d': `${i * 120}ms` } as React.CSSProperties}>
                <p className="stat-v" data-count>{v}</p>
                <p className="stat-l">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </Suspense>

      <Suspense>
      {/* BLOG */}
      <section className="section">
        <div className="container">
          <div className="head-row">
            <div>
              <p className="eyebrow">{dict.blogHome.eyebrow}</p>
              <SplitText className="h2" style={{ maxWidth: 760 }} parts={[dict.blogHome.title]} />
            </div>
            <Link href={L('/blog')} className="link-under">{dict.blogHome.link}</Link>
          </div>
          <div className="grid cols-3" style={{ gap: '32px 24px', marginTop: 56 }}>
            {posts.map((p, i) => <PostCard key={p.slug} post={p} locale={locale} index={i} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bt">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">{dict.faq.eyebrow}</p>
            <SplitText className="h2" parts={[dict.faq.title]} />
            <p className="muted" style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.55 }}>{dict.faq.text}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Link href={L('/contato')} className="btn btn-accent btn-md" data-magnetic>{dict.faq.cta}</Link>
              <a href={whatsappUrl(dict.common.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-md" data-magnetic>
                <Chat /> {dict.faq.whatsapp}
              </a>
            </div>
            <p className="sr-only">{SITE.contact.phoneDisplay}</p>
          </div>
          <FaqList items={dict.faq.items} />
        </div>
      </section>

      </Suspense>

      <Suspense>
        <CtaSection locale={locale} dict={dict} />
      </Suspense>
    </>
  );
}
