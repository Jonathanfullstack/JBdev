'use client';

import { useEffect, useRef } from 'react';
import { finePointer, motion, onFrame, prefersReduced } from '@/lib/motion';

/** Ponto + anel que segue com atraso. Só em mouse; some em telas de toque. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer() || prefersReduced()) return;
    const html = document.documentElement;
    html.classList.add('has-cursor');
    let rx = -100, ry = -100, live = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || live) return;
      live = true;
      rx = e.clientX; ry = e.clientY;
      html.classList.add('cursor-live');
    };
    const onOver = (e: MouseEvent) => {
      const el = ring.current;
      if (!el) return;
      const t = e.target as Element;
      const labeled = t.closest<HTMLElement>('[data-cursor]');
      const text = t.closest('input:not([type=checkbox]):not([type=submit]), textarea, select');
      const interactive = t.closest('a, button, [role=button], label');
      el.classList.remove('is-hover', 'is-label', 'is-text');
      if (labeled && label.current) {
        label.current.textContent = labeled.dataset.cursor || '';
        el.classList.add('is-label');
      } else if (text) el.classList.add('is-text');
      else if (interactive) el.classList.add('is-hover');
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    const leave = () => html.classList.remove('cursor-live');
    const enter = () => { if (live) html.classList.add('cursor-live'); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    html.addEventListener('mouseleave', leave);
    html.addEventListener('mouseenter', enter);

    const off = onFrame(() => {
      const { x, y } = motion.mouse;
      if (x < -1000) return;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;
    });

    return () => {
      off();
      html.classList.remove('has-cursor', 'cursor-live');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      html.removeEventListener('mouseleave', leave);
      html.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span ref={label} /></div>
    </>
  );
}
