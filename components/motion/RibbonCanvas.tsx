'use client';

import { useEffect, useRef } from 'react';
import { motion, onFrame, prefersReduced, prepCanvas } from '@/lib/motion';
import { useThemeColors } from './useThemeColors';

type Pt = { u: number; v: number; jx: number; jy: number; jz: number; seed: number; sz: number; acc: boolean };

/**
 * Fita de partículas 3D do hero: ~5.200 pontos (2.600 no celular) numa fita
 * em S que ondula e torce. Gira com o mouse, partículas fogem do cursor e,
 * no scroll, a fita torce e desbota. Só começa depois do primeiro paint.
 */
export default function RibbonCanvas({ label }: { label: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const colors = useThemeColors();

  useEffect(() => {
    const canvas = cv.current;
    if (!canvas) return;
    const mobile = window.innerWidth < 900;
    const reduced = prefersReduced();
    const N = mobile ? 2600 : 5200;
    const g = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
      const dust = Math.random() < 0.14;
      const spread = dust ? 0.55 : 0.07;
      pts.push({
        u: Math.random() * 2.3 - 1.15, v: Math.random() * 2 - 1,
        jx: g() * spread, jy: g() * spread, jz: g() * spread,
        seed: Math.random() * 6.283, sz: 0.7 + Math.random() * 0.9, acc: Math.random() < 0.06,
      });
    }
    const stars = Array.from({ length: 9 }, () => ({ x: Math.random(), y: Math.random(), s: 3 + Math.random() * 3 }));
    const sxA = new Float32Array(N), syA = new Float32Array(N), saA = new Float32Array(N), ssA = new Float32Array(N);

    const draw = (now: number) => {
      const prep = prepCanvas(canvas);
      if (!prep) return;
      const { ctx, r } = prep;
      const w = r.width, h = r.height;
      const t = reduced ? 8 : now / 1000;
      const e = motion.ease;
      const heroP = Math.min(1, Math.max(0, (72 - r.top) / Math.max(1, h)));
      const H = h * 0.5, W = Math.min(w, h) * 0.2, A = w * 0.17;
      const yaw = e.nx * 0.9 + Math.sin(t * 0.25) * 0.15 + heroP * 1.4;
      const pitch = e.ny * 0.5;
      const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const f = 900;
      const mx = motion.mouse.x - r.left, my = motion.mouse.y - r.top, R = 110;
      const { ink, accent } = colors.current;
      const fade = 1 - heroP * 0.55;
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        const phase = p.u * 2.6 + t * 0.55;
        const cx = Math.sin(phase) * A * (0.85 + 0.15 * Math.sin(t * 0.3));
        const cz = Math.cos(phase * 0.8) * A * 0.35;
        const th = p.u * 2.3 + t * 0.4 + heroP * 2.2;
        const drift = Math.sin(t * 0.8 + p.seed) * 0.04;
        const X = cx + p.v * W * Math.cos(th) + (p.jx + drift) * W;
        const Y = p.u * H + p.jy * W;
        const Z = cz + p.v * W * Math.sin(th) + (p.jz - drift) * W;
        const x1 = X * cyw - Z * syw, z1 = X * syw + Z * cyw;
        const y1 = Y * cp - z1 * sp, z2 = Y * sp + z1 * cp;
        const persp = f / (f + z2);
        let sx = w / 2 + x1 * persp, sy = h / 2 + y1 * persp;
        const dx = sx - mx, dy = sy - my, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { const d = Math.sqrt(d2) || 1; const push = (1 - d / R) * 38; sx += (dx / d) * push; sy += (dy / d) * push; }
        sxA[i] = sx; syA[i] = sy;
        saA[i] = Math.max(0.12, Math.min(0.95, 0.55 - z2 / (A * 2.4))) * fade;
        ssA[i] = p.sz * persp;
      }
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? ink : accent;
        for (let i = 0; i < N; i++) {
          if (pts[i].acc !== (pass === 1)) continue;
          ctx.globalAlpha = saA[i];
          const s = ssA[i] * (pass === 1 ? 1.6 : 1);
          ctx.fillRect(sxA[i] - s / 2, syA[i] - s / 2, s, s);
        }
      }
      ctx.globalAlpha = 0.45; ctx.strokeStyle = ink; ctx.lineWidth = 1;
      for (const st of stars) {
        const sx = st.x * w, sy = st.y * h, s = st.s;
        ctx.beginPath(); ctx.moveTo(sx - s, sy); ctx.lineTo(sx + s, sy); ctx.moveTo(sx, sy - s); ctx.lineTo(sx, sy + s); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let off: (() => void) | null = null;
    let visible = true;
    let dead = false;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '100px' });
    io.observe(canvas);
    // começa depois do primeiro paint e do conteúdo principal, para não pesar no LCP
    const begin = () => {
      if (dead) return;
      if (reduced) { draw(0); return; }
      off = onFrame((now) => { if (visible) draw(now); });
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const handle = idle ? idle(begin, { timeout: 900 }) : window.setTimeout(begin, 400);
    const redraw = () => { if (reduced) draw(0); };
    window.addEventListener('jb:theme', redraw);

    return () => {
      dead = true;
      off?.();
      io.disconnect();
      window.removeEventListener('jb:theme', redraw);
      if (!idle) clearTimeout(handle);
    };
  }, [colors]);

  return <canvas ref={cv} role="img" aria-label={label} />;
}
