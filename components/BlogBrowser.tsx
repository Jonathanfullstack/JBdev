'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

type Labels = { filtersLabel: string; filters: [string, string][]; featured: string; author: string };
type Item = PostMeta & { href: string; dateLabel: string };

function Cover({ p, size, sizes = '(max-width: 699px) 92vw, 420px' }: { p: Item; size?: string; sizes?: string }) {
  if (p.image) {
    return <div className="cover cover-photo"><Image src={p.image.src} alt={p.image.alt} fill sizes={sizes} /></div>;
  }
  return <div className={`cover cover-${p.cover}`} data-tilt="3d" aria-hidden="true" style={{ fontSize: size }}>{p.glyph}</div>;
}

export default function BlogBrowser({ posts, labels, showLang }: { posts: Item[]; labels: Labels; showLang: boolean }) {
  const [filter, setFilter] = useState('all');
  const featured = posts[0];
  const list = filter === 'all' ? posts.slice(1) : posts.filter((p) => p.key === filter);
  const ptLang = showLang ? 'pt-BR' : undefined;
  const lang = showLang ? <><span>·</span><span>PT-BR</span></> : null;

  return (
    <>
      <div className="container">
        <div role="group" aria-label={labels.filtersLabel} className="filters">
          {labels.filters.map(([key, label]) => (
            <button key={key} type="button" className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
          ))}
        </div>
      </div>

      {filter === 'all' && featured && (
        <section style={{ padding: '48px 0 64px' }}>
          <div className="container">
            <Link href={featured.href} hrefLang="pt-BR" className="feat" data-reveal style={{ gap: 40, alignItems: 'center', padding: 'clamp(16px, 1.7vw, 24px)' }}>
              <Cover p={featured} size="clamp(44px, 5vw, 72px)" sizes="(max-width: 899px) 92vw, 640px" />
              <div style={{ padding: 'clamp(8px, 2vw, 24px)' }}>
                <p className="mono muted" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12 }}>
                  <span className="soft-badge">{labels.featured}</span><span style={{ paddingTop: 4 }}>{featured.category} · {featured.minutes} min</span>
                  {showLang && <span style={{ paddingTop: 4 }}>· PT-BR</span>}
                </p>
                <h2 lang={ptLang} style={{ margin: '20px 0 0', fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.035em', fontWeight: 600 }}>{featured.title}</h2>
                <p className="muted" lang={ptLang} style={{ margin: '18px 0 0', fontSize: 17, lineHeight: 1.55 }}>{featured.excerpt}</p>
                <p className="muted" style={{ margin: '28px 0 0', display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                  <span className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>jb</span>{labels.author} · {featured.dateLabel}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section style={{ padding: filter === 'all' ? '0 0 var(--sec-y-half)' : '48px 0 var(--sec-y-half)' }}>
        <div className="container grid cols-3" style={{ gap: '48px 24px' }}>
          {list.map((p, i) => (
            <Link key={p.slug} href={p.href} hrefLang="pt-BR" className="post-card" data-reveal style={{ '--d': `${(i % 3) * 90}ms` } as React.CSSProperties}>
              <Cover p={p} />
              <div className="post-meta"><span className="c">{p.category}</span><span>·</span><span>{p.minutes} min</span>{lang}</div>
              <h3 lang={ptLang}>{p.title}</h3>
              <p className="muted" lang={ptLang} style={{ fontSize: 15, lineHeight: 1.55 }}>{p.excerpt}</p>
              <p className="mono muted" style={{ fontSize: 12 }}>{p.dateLabel}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
