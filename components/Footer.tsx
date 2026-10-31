import Link from 'next/link';
import { siWhatsapp } from 'simple-icons';
import { localePath, type Locale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { Dict } from '@/content/dictionaries/types';
import Logo from './Logo';
import { Github, Instagram, Linkedin, Mail } from './Icons';

const WhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={siWhatsapp.path} /></svg>
);

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const [hq, ...cities] = SITE.areaServed;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link href={localePath(locale, '/')} aria-label={SITE.name}><Logo /></Link>
            <p className="foot-desc">{f.description}</p>
            <div className="foot-contact">
              <a href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"><WhatsApp />WhatsApp</a>
              <a href={`mailto:${SITE.contact.email}`}><Mail size={20} />E-mail</a>
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
              {cities.map((c) => <li key={c}>{c}</li>)}
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
          <span className="mono">{f.made} · <a href="/cartao">{f.card}</a></span>
        </div>
      </div>
    </footer>
  );
}
