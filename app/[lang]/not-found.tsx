import Link from 'next/link';
import { getDict } from '@/content/dictionaries';

// O not-found não recebe params; usa o português (idioma padrão).
export default function NotFound() {
  const d = getDict('pt').common;
  return (
    <section className="page-head" style={{ minHeight: '60vh', paddingBottom: 'var(--sec-y)' }}>
      <div className="container">
        <p className="eyebrow">// 404</p>
        <h1 className="h1-page">{d.notFoundTitle}</h1>
        <p className="lead" style={{ marginTop: 28, maxWidth: 520 }}>{d.notFoundText}</p>
        <Link href="/" className="btn btn-accent" style={{ marginTop: 36 }}>{d.notFoundCta}</Link>
      </div>
    </section>
  );
}
