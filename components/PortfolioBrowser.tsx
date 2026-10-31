'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type CardProject = {
  slug: string; name: string; key: string; host: string; href: string; caseHref: string;
  image: { src: string; width: number; height: number; alt: string };
  cat: string; segment: string; year: string; desc: string; tags: string[];
  palette: { bg: string; fg: string; acc: string }; metrics: [string, string][];
};

type Labels = {
  filtersLabel: string; filters: [string, string][]; featured: string; viewFull: string;
  visit: string; viewCase: string; empty: string;
};

function Frame({ p, sizes, priority }: { p: CardProject; sizes: string; priority?: boolean }) {
  return (
    <div className="browser" style={{ color: p.palette.fg, background: p.palette.bg }}>
      <div className="browser-bar"><i /><i /><i /><span>{p.host}</span></div>
      <Image src={p.image.src} width={p.image.width} height={p.image.height} alt={p.image.alt} sizes={sizes} priority={priority} style={{ background: p.palette.bg }} />
    </div>
  );
}

export default function PortfolioBrowser({ projects, labels }: { projects: CardProject[]; labels: Labels }) {
  const [filter, setFilter] = useState('all');
  const featured = projects[0];
  const list = filter === 'all' ? projects.slice(1) : projects.filter((p) => p.key === filter);

  return (
    <>
      <div className="container">
        <div role="group" aria-label={labels.filtersLabel} className="filters">
          {labels.filters.map(([key, label]) => {
            const count = key === 'all' ? projects.length : projects.filter((p) => p.key === key).length;
            return (
              <button key={key} type="button" className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>
                {label}<span className="count">{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {filter === 'all' && featured && (
        <section style={{ padding: '48px 0 24px' }}>
          <div className="container">
            <Link href={featured.caseHref} className="feat" data-reveal>
              <div className="feat-art">
                <div data-tilt="3d" style={{ width: '100%', borderRadius: 12, overflow: 'hidden', boxShadow: '0 40px 70px -35px rgba(0,0,0,0.6)' }}>
                  <Frame p={featured} sizes="(max-width: 899px) 92vw, 720px" priority />
                </div>
              </div>
              <div className="feat-body">
                <p className="mono muted" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, fontSize: 12 }}>
                  <span className="soft-badge">{labels.featured}</span><span>{featured.cat} · {featured.year}</span>
                </p>
                <h2 style={{ margin: '6px 0 0', fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.035em', fontWeight: 600 }}>{featured.name}</h2>
                <p className="muted" style={{ fontSize: 14 }}>{featured.segment}</p>
                <p style={{ margin: '6px 0 0', fontSize: 17, lineHeight: 1.55, color: 'var(--ink2)' }}>{featured.desc}</p>
                {featured.metrics.length > 0 && (
                  <div className="metrics3">
                    {featured.metrics.map(([v, l]) => <div key={l}><p className="v">{v}</p><p className="l">{l}</p></div>)}
                  </div>
                )}
                <span className="btn btn-ink btn-md" style={{ alignSelf: 'flex-start', marginTop: 12 }}>{labels.viewFull}</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section style={{ padding: '24px 0 72px' }}>
        <div className="container">
          {list.length === 0 ? (
            <p className="notice">{labels.empty}</p>
          ) : (
            <div className="grid cols-2">
              {list.map((p, i) => (
                <div key={p.slug} data-reveal style={{ '--d': `${(i % 2) * 90}ms` } as React.CSSProperties}>
                  <article className="proj-card" data-tilt style={{ height: '100%', borderRadius: 24 }}>
                    <span className="glow" aria-hidden="true" />
                    <Frame p={p} sizes="(max-width: 699px) 92vw, 640px" />
                    <div className="proj-body" style={{ padding: '26px 28px 28px', gap: 10 }}>
                      <div className="proj-meta"><span>{p.cat}</span><span>{p.year}</span></div>
                      <h2 style={{ margin: '4px 0 0', fontSize: 28, fontWeight: 600, letterSpacing: '-0.025em' }}>{p.name}</h2>
                      <p className="muted" style={{ fontSize: 14 }}>{p.segment}</p>
                      <p style={{ margin: '6px 0 0', fontSize: 16, lineHeight: 1.55, color: 'var(--ink2)' }}>{p.desc}</p>
                      <div className="tags" style={{ marginTop: 6 }}>{p.tags.map((t) => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, marginTop: 'auto', paddingTop: 18 }}>
                        <Link href={p.caseHref} className="btn btn-ink btn-sm" style={{ fontSize: 14 }}>{labels.viewCase}<span className="sr-only"> {p.name}</span></Link>
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="mono accent" style={{ fontSize: 13, textDecoration: 'none' }}>{labels.visit}<span className="sr-only"> {p.name}</span></a>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
