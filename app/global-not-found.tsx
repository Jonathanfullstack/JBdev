import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { getDict } from '@/content/dictionaries';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap', variable: '--font-inter-tight' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Página não encontrada | JB DEV',
  description: 'Esta página não existe ou mudou de endereço.',
  robots: { index: false, follow: true },
};

const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('jb-theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){}})();`;

/** 404 para endereços que não existem em nenhum idioma. */
export default function GlobalNotFound() {
  const d = getDict('pt').common;
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <header className="site-header">
          <div className="nav-inner">
            <a href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">jb</span><span className="brand-word">JB DEV</span>
            </a>
          </div>
        </header>
        <main className="hero grain" style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', borderBottom: 0 }}>
          <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <p className="eyebrow">// 404</p>
            <h1 className="h1-page">{d.notFoundTitle}</h1>
            <p className="lead" style={{ marginTop: 28, maxWidth: 520 }}>{d.notFoundText}</p>
            <a href="/" className="btn btn-accent" style={{ marginTop: 36 }}>{d.notFoundCta}</a>
            <div className="wordmark" aria-hidden="true" data-word="404" style={{ marginTop: 48 }} />
          </div>
        </main>
      </body>
    </html>
  );
}
