'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_LABEL, localePath, stripLocale, type Locale } from '@/lib/i18n';
import { onFrame } from '@/lib/motion';
import type { Dict } from '@/content/dictionaries/types';
import ThemeToggle from './ThemeToggle';
import { Burger, Close, Globe } from './Icons';

/** Caminho equivalente em outro idioma. Artigos do blog só existem em português. */
function switchPath(path: string, to: Locale) {
  if (to !== 'pt' && /^\/blog\/.+/.test(path)) return localePath(to, '/blog');
  return localePath(to, path);
}

export default function Header({ locale, nav }: { locale: Locale; nav: Dict['nav'] }) {
  const pathname = usePathname();
  const { path } = stripLocale(pathname);
  const [menu, setMenu] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const items: [string, string][] = [
    ['/', nav.home], ['/servicos', nav.services], ['/portfolio', nav.portfolio], ['/sobre', nav.about], ['/blog', nav.blog], ['/contato', nav.contact],
  ];
  const isActive = (href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

  useEffect(() => { setMenu(false); setLangOpen(false); }, [pathname]);

  useEffect(() => {
    let scrolled = false;
    return onFrame(() => {
      const y = window.scrollY;
      const s = y > 24;
      if (s !== scrolled) { scrolled = s; header.current?.classList.toggle('is-scrolled', s); }
      const se = document.documentElement;
      const max = se.scrollHeight - window.innerHeight;
      const p = max > 40 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    });
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent) => { if (!langRef.current?.contains(e.target as Node)) setLangOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [langOpen]);

  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false); };
    const desk = window.matchMedia('(min-width: 900px)');
    const onDesk = () => { if (desk.matches) setMenu(false); };
    document.addEventListener('keydown', esc);
    desk.addEventListener('change', onDesk);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', esc);
      desk.removeEventListener('change', onDesk);
      document.documentElement.style.overflow = '';
    };
  }, [menu]);

  return (
    <>
      <header ref={header} className={`site-header${menu ? ' menu-open' : ''}`}>
        <div className="nav-inner">
          <Link href={localePath(locale, '/')} className="brand">
            <Logo />
          </Link>

          <nav aria-label={nav.primary} className="nav-links desktop-only">
            {items.slice(1).map(([href, label]) => (
              <Link key={href} href={localePath(locale, href)} aria-current={isActive(href) ? 'page' : undefined} data-scramble>{label}</Link>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="lang desktop-only" ref={langRef}>
              <button type="button" className="lang-btn" aria-haspopup="true" aria-expanded={langOpen} onClick={() => setLangOpen(!langOpen)}>
                <Globe /> {locale.toUpperCase()}<span className="sr-only"> — {nav.language}: {LOCALE_LABEL[locale]}</span>
              </button>
              {langOpen && (
                <ul className="lang-menu">
                  {LOCALES.map((l) => (
                    <li key={l}>
                      <a href={switchPath(path, l)} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>
                        {LOCALE_LABEL[l]}<span className="mono">{l.toUpperCase()}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ThemeToggle label={nav.toggleTheme} />
            <Link href={localePath(locale, '/contato')} className="btn btn-ink btn-sm desktop-only" data-magnetic>{nav.start}</Link>
            <button
              type="button" className="icon-btn menu-btn mobile-only" aria-expanded={menu} aria-controls="mobile-menu"
              aria-label={menu ? nav.closeMenu : nav.openMenu} onClick={() => setMenu(!menu)}
            >
              {menu ? <Close /> : <Burger />}
            </button>
          </div>
        </div>
        <div ref={bar} className="progress" aria-hidden="true" />
      </header>

      {menu && (
        <div id="mobile-menu" className="mobile-menu">
          <p className="mono muted" style={{ margin: '0 0 12px', fontSize: 12 }}>{nav.menuEyebrow}</p>
          <nav aria-label={nav.primary}>
            {items.map(([href, label], i) => (
              <Link
                key={href} href={localePath(locale, href)} className="mm-link"
                aria-current={isActive(href) ? 'page' : undefined} style={{ animationDelay: `${60 + i * 50}ms` }}
              >
                {label}<span>0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <Link href={localePath(locale, '/contato')} className="btn btn-accent" style={{ marginTop: 32, height: 56, fontSize: 17 }}>{nav.start}</Link>
          <div className="mm-langs" aria-label={nav.language}>
            {LOCALES.map((l) => (
              <a key={l} href={switchPath(path, l)} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>{l.toUpperCase()}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
