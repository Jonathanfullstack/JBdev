'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { scrollToEl } from '@/lib/lenis';

/** Índice lateral fixo ("Nesta página") com a seção atual destacada. */
export function Toc({ items, title }: { items: { id: string; label: string }[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="label-caps" style={{ marginBottom: 14 }}>{title}</p>
      <div className="toc">
        {items.map((i) => (
          <a
            key={i.id} href={`#${i.id}`} className={active === i.id ? 'active' : undefined} data-no-transition
            aria-current={active === i.id ? 'location' : undefined}
            onClick={(e) => {
              const el = document.getElementById(i.id);
              if (!el) return;
              e.preventDefault();
              scrollToEl(el);
              history.replaceState(null, '', `#${i.id}`);
            }}
          >{i.label}</a>
        ))}
      </div>
    </nav>
  );
}

export function Share({ url, title, labels }: { url: string; title: string; labels: { share: string; copy: string; copied: string } }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  return (
    <div className="share">
      <span className="label-caps" style={{ marginRight: 6 }}>{labels.share}</span>
      <button type="button" className="btn btn-ghost btn-sm" onClick={async () => {
        try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      }}>{copied ? labels.copied : labels.copy}</button>
      <a className="btn btn-ghost btn-sm" href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <a className="btn btn-ghost btn-sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <span role="status" className="sr-only">{copied ? labels.copied : ''}</span>
    </div>
  );
}

export function AsideCta({ title, button, href }: { title: string; button: string; href: string }) {
  return (
    <div className="aside-cta">
      <p style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.3 }}>{title}</p>
      <Link href={href} className="btn btn-accent btn-sm" style={{ marginTop: 18, fontSize: 14 }}>{button}</Link>
    </div>
  );
}
