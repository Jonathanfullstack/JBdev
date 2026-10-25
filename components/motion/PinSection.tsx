'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { clamp, onFrame, prefersReduced } from '@/lib/motion';

type Props = { eyebrow: string; prefix: string; words: string[]; text: string; cta: string; ctaHref: string };

/**
 * "Construímos para…": seção alta com o card preso na tela.
 * 0 → 0,68 do progresso: a roda de palavras gira (a do centro acesa).
 * 0,68 → 1: o card cresce até a largura total, perde o raio e o fundo
 * escuro (azul no modo escuro) se abre do centro, terminando em "você.".
 */
export default function PinSection({ eyebrow, prefix, words, text, cta, ctaHref }: Props) {
  const sec = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const wheel = useRef<HTMLSpanElement>(null);
  const track = useRef<HTMLSpanElement>(null);
  const [isStatic, setStatic] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const s = sec.current, st = sticky.current, c = card.current, wh = wheel.current, tr = track.current;
    if (!s || !st || !c || !wh || !tr) return;
    const spans = Array.from(tr.children) as HTMLElement[];
    const n = spans.length;
    let lineH = 0, last = -1, darkNow = false;

    const measure = () => {
      wh.style.width = '';
      const w = Math.max(...spans.map((sp) => sp.scrollWidth), 0);
      wh.style.width = w ? `${w + 4}px` : '';
      lineH = spans[0]?.getBoundingClientRect().height || 0;
      last = -1;
    };
    const tooShort = () => window.innerHeight < 520;

    if (prefersReduced() || tooShort()) {
      setStatic(true);
      measure();
      tr.style.transform = `translate3d(0, ${(lineH - (n - 1) * lineH).toFixed(1)}px, 0)`;
      spans.forEach((sp, i) => { sp.style.opacity = i === n - 1 ? '1' : '0.2'; });
      return;
    }

    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure, { passive: true });
    const mobile = () => window.innerWidth < 900;

    const off = onFrame(() => {
      const r = s.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const navH = 72;
      const total = r.height - st.offsetHeight;
      const p = clamp((navH - r.top) / Math.max(1, total), 0, 1);
      if (Math.abs(p - last) < 0.0004) return;
      last = p;

      const SPIN = 0.68;
      const idx = clamp(p / SPIN, 0, 1) * (n - 1);
      tr.style.transform = `translate3d(0, ${(lineH - idx * lineH).toFixed(2)}px, 0)`;
      spans.forEach((sp, i) => {
        const d = Math.abs(i - idx);
        sp.style.opacity = (d < 1 ? 1 - d * 0.75 : Math.max(0, 0.25 - (d - 1) * 0.25)).toFixed(3);
      });

      const a = clamp((p - SPIN) / 0.24, 0, 1);
      const ex = a * a * (3 - 2 * a);
      const inset = (mobile() ? 16 : 40) * (1 - ex);
      c.style.left = `${inset.toFixed(1)}px`;
      c.style.right = `${inset.toFixed(1)}px`;
      c.style.top = `${(24 * (1 - ex)).toFixed(1)}px`;
      c.style.bottom = `${(24 * (1 - ex)).toFixed(1)}px`;
      c.style.borderRadius = `${(28 * (1 - ex)).toFixed(1)}px`;
      const f = clamp((p - SPIN - 0.04) / 0.2, 0, 1);
      s.style.setProperty('--wf', (1 - Math.pow(1 - f, 3)).toFixed(4));
      const dk = f > 0.45;
      if (dk !== darkNow) { darkNow = dk; setDark(dk); }
    });

    return () => { off(); window.removeEventListener('resize', measure); };
  }, []);

  const sentence = `${prefix} ${words.slice(0, -1).join(' ')} ${words[words.length - 1]}`;

  return (
    <section ref={sec} className={`pin${isStatic ? ' static' : ''}${dark || isStatic ? ' is-dark' : ''}`} aria-labelledby="pin-title">
      <div ref={sticky} className="pin-sticky">
        <div ref={card} className="pin-card">
          <div className="pin-fill" aria-hidden="true" style={isStatic ? ({ '--wf': 1 } as React.CSSProperties) : undefined} />
          <div className="pin-content">
            <p className="p-eyebrow">{eyebrow}</p>
            <h2 id="pin-title" className="sr-only">{sentence}</h2>
            <div className="pin-line" aria-hidden="true">
              <span>{prefix}</span>
              <span ref={wheel} className="wheel">
                <span ref={track} className="wheel-track">
                  {words.map((w, i) => (
                    <span key={w} data-w={w} className={i === words.length - 1 ? 'last' : undefined} />
                  ))}
                </span>
              </span>
            </div>
            <p className="p-text">{text}</p>
            <Link href={ctaHref} className="btn btn-accent p-cta" data-magnetic>{cta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
