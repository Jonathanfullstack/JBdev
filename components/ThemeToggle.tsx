'use client';

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from './Icons';
import { prefersReduced } from '@/lib/motion';

type Doc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };

/**
 * Alterna claro/escuro. Com View Transitions, o novo tema se abre num círculo
 * a partir do botão; sem suporte, as cores fazem uma transição suave.
 */
export default function ThemeToggle({ label }: { label: string }) {
  const [dark, setDark] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onSys = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try { saved = localStorage.getItem('jb-theme'); } catch {}
      if (saved) return;
      apply(e.matches ? 'dark' : 'light');
      setDark(e.matches);
    };
    mq.addEventListener('change', onSys);
    return () => mq.removeEventListener('change', onSys);
  }, []);

  const apply = (theme: 'dark' | 'light') => {
    document.documentElement.dataset.theme = theme;
    window.dispatchEvent(new Event('jb:theme'));
  };

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    try { localStorage.setItem('jb-theme', next); } catch {}
    setDark(!dark);
    const doc = document as Doc;
    if (prefersReduced()) { apply(next); return; }
    if (!doc.startViewTransition) {
      const html = document.documentElement;
      html.classList.add('theme-anim');
      apply(next);
      window.setTimeout(() => html.classList.remove('theme-anim'), 500);
      return;
    }
    const r = btn.current?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : window.innerWidth - 60;
    const y = r ? r.top + r.height / 2 : 36;
    const end = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(() => apply(next));
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  };

  return (
    <button ref={btn} type="button" className="icon-btn" aria-label={label} aria-pressed={dark} onClick={toggle}>
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
