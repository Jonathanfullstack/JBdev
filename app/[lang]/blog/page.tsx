import { HTML_LANG, localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';
import { formatDate, getPosts, toMeta } from '@/lib/blog';
import SplitText from '@/components/SplitText';
import BlogBrowser from '@/components/BlogBrowser';
import NewsletterForm from '@/components/forms/NewsletterForm';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({ params }: PageProps<'/[lang]/blog'>) {
  const { locale, dict } = await resolve(params);
  return buildMetadata({ locale, path: '/blog', ...dict.meta.blog });
}

export default async function Blog({ params }: PageProps<'/[lang]/blog'>) {
  const { locale, dict } = await resolve(params);
  const b = dict.blogPage;
  const cats: Record<string, string> = Object.fromEntries(b.filters);
  const posts = getPosts().map((p) => ({
    ...toMeta(p),
    category: locale === 'pt' ? p.category : cats[p.key] ?? p.category,
    href: localePath('pt', `/blog/${p.slug}`),
    dateLabel: formatDate(p.date, HTML_LANG[locale]),
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema([[dict.nav.home, localePath(locale, '/')], [dict.nav.blog, localePath(locale, '/blog')]])} />
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 24 }}>{b.eyebrow}</p>
          <div className="head-row" style={{ gap: 32 }}>
            <SplitText as="h1" className="h1-page" parts={[b.title1, { text: b.title2, className: 'accent' }]} />
            <p className="muted fade-up" style={{ maxWidth: 420, fontSize: 18, lineHeight: 1.55 }}>{b.lead}</p>
          </div>
          {b.ptOnly && <p className="notice" style={{ marginTop: 32 }} lang={HTML_LANG[locale]}>{b.ptOnly}</p>}
        </div>
      </section>

      <BlogBrowser posts={posts} labels={b} showLang={locale !== 'pt'} />

      <section style={{ padding: '0 0 var(--sec-y)' }}>
        <div className="container">
          <div className="news" data-reveal>
            <div>
              <p className="eyebrow" style={{ marginBottom: 14 }}>{b.newsEyebrow}</p>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.035em', fontWeight: 600 }}>{b.newsTitle}</h2>
            </div>
            <NewsletterForm locale={locale} labels={{ label: b.newsLabel, placeholder: b.newsPlaceholder, button: b.newsButton, doneStrong: b.newsDoneStrong, done: b.newsDone, error: b.newsError }} />
          </div>
        </div>
      </section>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
