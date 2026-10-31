import { NextResponse, type NextRequest } from 'next/server';

// Português é o idioma padrão e fica sem prefixo (/servicos).
// Inglês e espanhol ficam em /en/... e /es/...
// O idioma nunca é trocado pelo navegador: o Google rastreia em en-US e
// indexaria a versão errada. A pessoa escolhe no seletor do menu.
const PREFIXED = ['en', 'es'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/pt' || pathname.startsWith('/pt/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (PREFIXED.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/pt${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next|api|assets|assents|cartao|js|favicon|sitemap.xml|robots.txt|.*\\..*).*)'],
};
