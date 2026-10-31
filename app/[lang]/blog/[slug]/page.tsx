import Link from 'next/link';
import { notFound } from 'next/navigation';
import { localePath } from '@/lib/i18n';
import { resolve } from '@/lib/page';
import { SITE } from '@/lib/site';
import { ORG_ID, absolute, breadcrumbSchema, buildMetadata, faqSchema } from '@/lib/seo';
import { formatDate, getPost, getPosts } from '@/lib/blog';
import CtaSection from '@/components/CtaSection';
import JsonLd from '@/components/JsonLd';
import { Cover } from '@/components/Cards';
import { AsideCta, Share, Toc } from '@/components/PostAside';

// Artigos existem só em português: /blog/[slug]
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ lang: 'pt', slug: p.slug }));

type Props = PageProps<'/[lang]/blog/[slug]'>;

async function load(params: Props['params']) {
  const { slug } = await params;
  const r = await resolve(params);
  const post = getPost(slug);
  if (!post || r.locale !== 'pt') notFound();
  return { ...r, post };
}

export async function generateMetadata({ params }: Props) {
  const { post } = await load(params);
  return buildMetadata({
    locale: 'pt', locales: ['pt'], path: `/blog/${post.slug}`, type: 'article',
    title: `${post.seoTitle} | JB DEV`, description: post.description,
    publishedTime: post.date, modifiedTime: post.updated ?? post.date, image: post.image?.src,
  });
}

export default async function Article({ params }: Props) {
  const { locale, dict, post } = await load(params);
  const p = dict.post;
  const url = absolute(`/blog/${post.slug}`);
  const related = getPosts().filter((x) => x.slug !== post.slug)
    .sort((a, b) => Number(b.key === post.key) - Number(a.key === post.key)).slice(0, 3);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'pt-BR',
    mainEntityOfPage: url,
    url,
    image: absolute(post.image?.src ?? '/assets/img/og-jbdev.png'),
    keywords: post.keyword,
    wordCount: post.words,
    author: { '@type': 'Person', name: SITE.founder.shortName, url: absolute('/cartao') },
    publisher: { '@id': ORG_ID },
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbSchema([['Início', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]])} />
      {post.faq.length > 0 && <JsonLd data={faqSchema(post.faq)} />}

      <article>
        <header style={{ padding: 'clamp(40px, 5vw, 72px) 0 48px' }}>
          <div className="container" style={{ maxWidth: 1100 }}>
            <Link href="/blog" className="mono muted" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, fontSize: 13, textDecoration: 'none' }}>{p.back}</Link>
            <p className="mono muted" style={{ margin: '24px 0 0', display: 'flex', gap: 10, fontSize: 13 }}>
              <span className="accent">{post.category}</span><span>·</span><span>{post.minutes} min {p.reading}</span>
            </p>
            <h1 className="fade-up" style={{ margin: '20px 0 0', fontSize: 'clamp(38px, 5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.045em', fontWeight: 600, '--d': '0s' } as React.CSSProperties}>{post.title}</h1>
            <p className="lead fade-up" style={{ margin: '24px 0 0', maxWidth: 720, '--d': '0.15s' } as React.CSSProperties}>{post.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <span className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>jb</span>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600 }}>{SITE.founder.shortName}</p>
                <p className="muted" style={{ marginTop: 2, fontSize: 14 }}>
                  <time dateTime={post.date}>{formatDate(post.date, 'pt-BR')}</time>
                  {post.updated && <> · {p.updated} <time dateTime={post.updated}>{formatDate(post.updated, 'pt-BR')}</time></>}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <Cover post={post} priority sizes="(max-width: 1299px) 94vw, 1240px" alt={post.image?.alt} style={post.image ? { aspectRatio: '16 / 8', borderRadius: 28 } : { aspectRatio: 'auto', minHeight: 'clamp(200px, 30vw, 420px)', borderRadius: 28, fontSize: 'clamp(48px, 6.7vw, 96px)', backgroundSize: '22px 22px' }} />
        </div>

        <div className="container" style={{ maxWidth: 1100, padding: '64px var(--pad) var(--sec-y-half)' }}>
          <div className="post-layout">
            <div>
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              <Share url={url} title={post.title} labels={p} />
            </div>
            <aside className="post-aside">
              <Toc items={post.toc} title={p.onThisPage} />
              <AsideCta title={p.ctaTitle} button={p.ctaButton} href={localePath(locale, '/contato')} />
            </aside>
          </div>
        </div>

        <section className="bt" style={{ padding: 'var(--sec-y-half) 0 var(--sec-y)' }}>
          <div className="container">
            <h2 className="h3">{p.more}</h2>
            <div className="grid cols-3" style={{ gap: '40px 24px', marginTop: 32 }}>
              {related.map((r, i) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="post-card" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
                  <Cover post={r} />
                  <div className="post-meta"><span className="c">{r.category}</span><span>·</span><span>{r.minutes} min</span></div>
                  <h3 style={{ fontSize: 21 }}>{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CtaSection locale={locale} dict={dict} />
    </>
  );
}
