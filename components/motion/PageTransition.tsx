'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { stripLocale } from '@/lib/i18n';
import { prefersReduced } from '@/lib/motion';
import { scrollToTop } from '@/lib/lenis';
import type { Dict } from '@/content/dictionaries/types';

type Labels = Dict['curtain'];

function labelFor(pathname: string, labels: Labels) {
  const { path } = stripLocale(pathname);
  const [first, second] = path.split('/').filter(Boolean);
  if (!first) return labels.home;
  if (first === 'servicos') return second ? labels.servico : labels.servicos;
  if (first === 'portfolio') return second ? labels.case : labels.portfolio;
  if (first === 'blog') return second ? labels.artigo : labels.blog;
  if (first === 'contato') return labels.contato;
  if (first === 'sobre') return labels.sobre;
  return '';
}

/**
 * Cortina na cor de destaque entre páginas. Intercepta cliques em links
 * internos, cobre a tela (~620ms), navega e sai por cima com a nova página no topo.
 */
export default function PageTransition({ labels }: { labels: Labels }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'idle' | 'in' | 'out'>('idle');
  const [label, setLabel] = useState('');
  const [fade, setFade] = useState(false);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const go = useCallback((href: string, targetPath: string) => {
    if (pending.current) return;
    const reduced = prefersReduced();
    // outro idioma = outro <html lang>: carrega a página inteira em vez de navegar no cliente
    const crossLocale = stripLocale(targetPath).locale !== stripLocale(window.location.pathname).locale;
    setFade(reduced);
    setLabel(labelFor(targetPath, labels));
    setPhase('in');
    pending.current = targetPath;
    timers.current.push(window.setTimeout(() => {
      if (crossLocale) window.location.assign(href);
      else router.push(href, { scroll: false });
    }, reduced ? 280 : 640));
  }, [labels, router]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest('a');
      if (!a || !a.href) return;
      if ((a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (/^\/(cartao|api|assets|js)(\/|$)/.test(url.pathname)) return;
      if (url.pathname === window.location.pathname) {
        if (url.hash) return;
        e.preventDefault();
        scrollToTop(false);
        return;
      }
      e.preventDefault();
      go(url.pathname + url.search + url.hash, url.pathname);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [go]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = null;
    scrollToTop(true);
    // dois frames: garante que a página nova já pintou antes de a cortina sair
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setPhase('out');
      timers.current.push(window.setTimeout(() => setPhase('idle'), 700));
    }));
  }, [pathname]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const cls = ['curtain', fade ? 'fade' : '', phase === 'in' ? 'is-in' : '', phase === 'out' ? 'is-out' : ''].join(' ');
  return (
    <div className={cls} aria-hidden="true">
      <p className="c-path">jb.dev /</p>
      <p className="c-label"><span>{label}</span></p>
    </div>
  );
}
