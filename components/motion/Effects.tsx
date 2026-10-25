'use client';

import { useEffect } from 'react';
import { finePointer, prefersReduced } from '@/lib/motion';

const REVEAL_SEL = '[data-reveal], [data-split], .draw-line, .draw-top, [data-count]';
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';

function scramble(el: HTMLElement) {
  const final = el.dataset.text || el.textContent || '';
  el.dataset.text = final;
  const start = performance.now();
  const dur = 420;
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const keep = Math.floor(p * final.length);
    let out = '';
    for (let i = 0; i < final.length; i++) {
      out += i < keep || final[i] === ' ' ? final[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = final;
  };
  requestAnimationFrame(frame);
}

function countUp(el: HTMLElement) {
  const raw = el.textContent || '';
  const m = raw.match(/^(\D*)(\d+)(.*)$/);
  if (!m || raw.includes('[')) return;
  const [, pre, num, suf] = m;
  const target = parseInt(num, 10);
  const pad = num.length;
  const start = performance.now();
  const dur = 1400;
  const frame = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + String(Math.round(target * eased)).padStart(pad, '0') + suf;
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/**
 * Efeitos globais por atributo, sem precisar de componentes de cliente:
 *  data-reveal / data-split / .draw-line / .draw-top → entram ao rolar
 *  data-count   → contador de 0 até o valor (só números reais, sem colchetes)
 *  data-tilt    → card inclina seguindo o mouse ("card" com brilho ou "3d")
 *  data-magnetic → botão acompanha o mouse e volta com mola
 *  data-scramble → texto embaralha no hover
 */
export default function Effects() {
  useEffect(() => {
    const reduced = prefersReduced();
    const fine = finePointer();
    document.documentElement.classList.add('fx');

    // ---------- reveal ----------
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        el.classList.add('in');
        if (el.hasAttribute('data-count') && !reduced) countUp(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    const seen = new WeakSet<Element>();
    const check = (el: HTMLElement) => {
      if (el.classList.contains('in') || seen.has(el)) return;
      seen.add(el);
      if (reduced) el.classList.add('in');
      else io.observe(el);
    };
    document.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach(check);
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return;
        const el = n as HTMLElement;
        if (el.matches(REVEAL_SEL)) check(el);
        el.querySelectorAll<HTMLElement>(REVEAL_SEL).forEach(check);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ---------- tilt / magnético / scramble (delegação) ----------
    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;

    const resetTilt = () => {
      if (!tiltEl) return;
      tiltEl.style.transform = '';
      tiltEl = null;
    };
    const resetMag = () => {
      if (!magEl) return;
      const el = magEl;
      el.style.transition = 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = '';
      window.setTimeout(() => { el.style.transition = ''; }, 500);
      magEl = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const t = e.target as Element;

      const tilt = t.closest<HTMLElement>('[data-tilt]');
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const rc = tilt.getBoundingClientRect();
        const x = (e.clientX - rc.left) / rc.width - 0.5;
        const y = (e.clientY - rc.top) / rc.height - 0.5;
        if (tilt.dataset.tilt === '3d') {
          tilt.style.transform = `perspective(1000px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.02)`;
        } else {
          tilt.style.transform = `perspective(900px) rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 11).toFixed(2)}deg) translateY(-4px)`;
          tilt.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`);
          tilt.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`);
        }
      }

      const mag = t.closest<HTMLElement>('[data-magnetic]');
      if (mag !== magEl) resetMag();
      if (mag) {
        magEl = mag;
        const r = mag.getBoundingClientRect();
        const k = mag.dataset.magnetic === 'strong' ? 0.4 : 0.26;
        mag.style.transform = `translate(${((e.clientX - (r.left + r.width / 2)) * k).toFixed(1)}px, ${((e.clientY - (r.top + r.height / 2)) * k).toFixed(1)}px)`;
      }
    };
    const onLeaveDoc = () => { resetTilt(); resetMag(); };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-scramble]');
      const from = (e.relatedTarget as Element | null)?.closest?.('[data-scramble]');
      if (el && el !== from) scramble(el);
    };

    if (fine && !reduced) {
      document.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeaveDoc);
      document.addEventListener('mouseover', onOver);
    }

    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return null;
}
