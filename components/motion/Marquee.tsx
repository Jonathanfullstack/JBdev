'use client';

import { useEffect, useRef } from 'react';
import { motion, onFrame, prefersReduced } from '@/lib/motion';

export type TechItem = { title: string; path: string };

/** Faixa de tecnologias que corre sozinha e acelera com a velocidade do scroll. */
export default function Marquee({ title, items }: { title: string; items: TechItem[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReduced()) return;
    let x = 0, visible = false;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(el);
    const off = onFrame(() => {
      if (!visible) return;
      x -= 0.5 + Math.min(Math.abs(motion.vel) * 0.3, 12);
      const half = el.scrollWidth / 2;
      if (half > 0 && -x >= half) x += half;
      el.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
    });
    return () => { off(); io.disconnect(); };
  }, []);

  const doubled = [...items, ...items, ...items, ...items];
  return (
    <section className="marquee" aria-label={title}>
      <p className="marquee-title">{title}</p>
      <ul className="sr-only">{items.map((t) => <li key={t.title}>{t.title}</li>)}</ul>
      <div className="marquee-clip" aria-hidden="true">
        <div ref={track} className="marquee-track">
          {doubled.map((t, i) => (
            <span key={i}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d={t.path} /></svg>
              {t.title}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
