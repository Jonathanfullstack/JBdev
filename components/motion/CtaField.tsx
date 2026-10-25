'use client';

import { useEffect, useRef } from 'react';
import { motion, onFrame, prefersReduced, prepCanvas } from '@/lib/motion';

/** Malha de pontos brancos que ondula e cresce/afasta perto do mouse (CTA final). */
export default function CtaField() {
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const reduced = prefersReduced();
    const gap = window.innerWidth < 900 ? 20 : 24;

    const draw = (now: number) => {
      const prep = prepCanvas(canvas);
      if (!prep) return;
      const { ctx, r } = prep;
      const mx = motion.mouse.x - r.left, my = motion.mouse.y - r.top, R = 170;
      const t = now / 1000;
      ctx.fillStyle = '#FFFFFF';
      for (let y = gap / 2; y < r.height; y += gap) {
        for (let x = gap / 2; x < r.width; x += gap) {
          const dx = x - mx, dy = y - my, d = Math.sqrt(dx * dx + dy * dy);
          let k = d < R ? 1 - d / R : 0; k *= k;
          const wave = Math.sin(x * 0.018 + t * 1.1) * Math.cos(y * 0.024 + t * 0.9) * 0.5 + 0.5;
          const ox = d > 0 ? (dx / d) * k * 16 : 0, oy = d > 0 ? (dy / d) * k * 16 : 0;
          ctx.globalAlpha = 0.06 + wave * 0.07 + k * 0.6;
          const s = 1.3 + k * 2.6;
          ctx.fillRect(x + ox - s / 2, y + oy - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      draw(0);
      return;
    }
    let visible = false;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(canvas);
    const off = onFrame((now) => { if (visible) draw(now); });
    return () => { off(); io.disconnect(); };
  }, []);

  return <canvas ref={cv} aria-hidden="true" />;
}
