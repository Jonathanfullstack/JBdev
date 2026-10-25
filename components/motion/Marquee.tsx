'use client';

import { useEffect, useRef } from 'react';
import { motion, onFrame, prefersReduced } from '@/lib/motion';

/** Faixa de serviços que corre sozinha e acelera com a velocidade do scroll. */
export default function Marquee({ items }: { items: string[] }) {
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
    <div className="marquee" aria-hidden="true">
      <div ref={track} className="marquee-track">
        {doubled.map((label, i) => <span key={i}>{label}</span>)}
      </div>
    </div>
  );
}
