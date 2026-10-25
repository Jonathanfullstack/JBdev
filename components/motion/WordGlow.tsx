'use client';

import { useEffect, useRef } from 'react';
import { clamp, onFrame, prefersReduced } from '@/lib/motion';

/** Frase que acende palavra por palavra ao entrar na tela; a segunda frase acende em azul. */
export default function WordGlow({ words, split }: { words: string[]; split: number }) {
  const box = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const spans = Array.from(el.children) as HTMLElement[];
    const set = (count: number) => spans.forEach((s, i) => s.classList.toggle('on', i < count));
    if (prefersReduced()) { set(spans.length); return; }
    let last = -1;
    const off = onFrame(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top > vh || r.bottom < 0) return;
      const p = clamp((vh * 0.9 - r.top) / (vh * 0.45), 0, 1);
      const count = Math.round(p * spans.length);
      if (count !== last) { last = count; set(count); }
    });
    return off;
  }, []);

  return (
    <p ref={box} className="glow-words">
      {words.map((w, i) => <span key={i} className={i >= split ? 'hl' : undefined}>{w}</span>)}
    </p>
  );
}
