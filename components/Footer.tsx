import Link from 'next/link';
import { siWhatsapp } from 'simple-icons';
import { localePath, type Locale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Dict } from '@/content/dictionaries/types';
import { cityPath } from '@/content/local-pages';
import Logo from './Logo';
import { Github, Instagram, Linkedin, Mail } from './Icons';

const Pin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);

const WhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={siWhatsapp.path} /></svg>
);

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const [hq, ...cities] = SITE.areaServed;
  // páginas de cidade só existem em português
  const cityHref = (c: string) => (locale === 'pt' ? cityPath(c) : undefined);
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${SITE.name}, ${SITE.address.display}`)}`;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href={localePath(locale, '/')} aria-label={SITE.name}><Logo /></Link>
            <p className="foot-desc">{f.description}</p>
            <div className="foot-contact">
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${SITE.contact.phoneDisplay}`}><WhatsApp />{SITE.contact.phoneDisplay}</a>
              <a href={`mailto:${SITE.contact.email}`}><Mail size={20} />{SITE.contact.email}</a>
              <address><Pin /><a href={maps} target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 400, color: 'inherit' }}>{SITE.address.display}</a></address>
            </div>
            <div className="social">
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href={SITE.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
            </div>
          </div>
          <nav aria-label={f.solutions}>
            <p className="foot-title">{f.solutions}</p>
            <ul className="foot-links">
              {f.solutionLinks.map(([label, href]) => <li key={label}><Link href={localePath(locale, href)}>{label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <p className="foot-title">{f.service}</p>
            <ul className="foot-links">
              <li>{hq}/{SITE.address.region}<span className="foot-badge">{f.hq}</span></li>
              {cities.map((c) => {
                const href = cityHref(c);
                return <li key={c}>{href ? <Link href={href}>{c}</Link> : c}</li>;
              })}
              <li>{f.online}</li>
            </ul>
          </div>
          <nav aria-label={f.specialties}>
            <p className="foot-title">{f.specialties}</p>
            <ul className="foot-links soft">
              {f.specialtyLinks.map(([label, href]) => <li key={label}><Link href={localePath(locale, href)}>{label}</Link></li>)}
            </ul>
          </nav>
        </div>
        <div className="foot-bottom">
          <span>© 2026 {SITE.name}. {f.rights}</span>
          <span className="mono foot-legal">
            <Link href={localePath(locale, '/sobre')}>{f.about}</Link>
            <Link href={localePath(locale, '/politica-de-privacidade')}>{f.privacy}</Link>
            <a href="/cartao">{f.card}</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
