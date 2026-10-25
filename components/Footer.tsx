import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Dict } from '@/content/dictionaries/types';
import { Github, Instagram, Linkedin } from './Icons';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const n = dict.nav;
  const pages: [string, string][] = [['/', n.home], ['/servicos', n.services], ['/portfolio', n.portfolio], ['/blog', n.blog], ['/contato', n.contact]];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <p className="foot-title">{f.studio}</p>
            <p className="foot-text">{SITE.name}<br />{SITE.legalName}<br />CNPJ {SITE.cnpj}</p>
            <p className="foot-text" style={{ marginTop: 12 }}>
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{SITE.contact.phoneDisplay}</a><br />
              <a href={`mailto:${SITE.contact.email}`} style={{ textDecoration: 'none' }}>{SITE.contact.email}</a>
            </p>
          </div>
          <div>
            <p className="foot-title">{f.base}</p>
            <address className="foot-text">{f.baseLines.map((l, i) => <span key={i}>{l}<br /></span>)}</address>
          </div>
          <div>
            <p className="foot-title">{f.solutions}</p>
            <div className="foot-links">
              {f.solutionLinks.map(([label, href]) => <Link key={href} href={localePath(locale, href)}>{label}</Link>)}
            </div>
          </div>
          <div>
            <p className="foot-title">{f.pages}</p>
            <div className="foot-links">
              {pages.map(([href, label]) => <Link key={href} href={localePath(locale, href)}>{label}</Link>)}
              <a href="/cartao">{f.card}</a>
            </div>
          </div>
          <div>
            <p className="foot-title">{f.social}</p>
            <div className="social">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
            </div>
            <a href="#top" className="label-caps" style={{ display: 'inline-block', marginTop: 20, textDecoration: 'none' }} data-no-transition>{f.toTop}</a>
          </div>
        </div>
        <div className="wordmark" aria-hidden="true" data-word="jb.dev" />
        <div className="foot-bottom">
          <span>© 2026 {SITE.name}. {f.rights}</span>
          <span className="mono">{f.made}</span>
        </div>
      </div>
    </footer>
  );
}
