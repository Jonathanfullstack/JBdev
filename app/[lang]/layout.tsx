import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import { HTML_LANG, LOCALES, isLocale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import { organizationSchema } from '@/lib/seo';
import { getDict } from '@/content/dictionaries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import SmoothScroll from '@/components/motion/SmoothScroll';
import PageTransition from '@/components/motion/PageTransition';
import Cursor from '@/components/motion/Cursor';
import Effects from '@/components/motion/Effects';

const inter = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-inter-tight' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap', variable: '--font-jetbrains' });

export const dynamicParams = false;
export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  authors: [{ name: SITE.founder.shortName, url: `${SITE.url}/cartao` }],
  icons: { icon: [{ url: '/assets/img/favicon-jbdev.png', type: 'image/png' }, { url: '/assets/img/favicon.ico' }] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F3F5F9' },
    { media: '(prefers-color-scheme: dark)', color: '#060A13' },
  ],
};

// Antes do primeiro paint: aplica o tema salvo (ou o do sistema) para não "piscar".
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('jb-theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t}catch(e){d.dataset.theme='light'}})();`;

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);
  return (
    <html lang={HTML_LANG[lang]} className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top">
        <a href="#conteudo" className="skip-link" data-no-transition>{dict.nav.skip}</a>
        <JsonLd data={organizationSchema()} />
        <Header locale={lang} nav={dict.nav} />
        <main id="conteudo" tabIndex={-1} style={{ outline: 'none' }}>{children}</main>
        <Suspense><Footer locale={lang} dict={dict} /></Suspense>
        <PageTransition labels={dict.curtain} />
        <Cursor />
        <Effects />
        <SmoothScroll />
      </body>
    </html>
  );
}
