import Image from 'next/image';
import Link from 'next/link';
import { localePath, type Locale } from '@/lib/i18n';
import type { Project } from '@/content/projects';
import type { PostMeta } from '@/lib/blog';

export function BrowserFrame({ p, locale, sizes, priority, bar = true, natural = false }: {
  p: Project; locale: Locale; sizes: string; priority?: boolean; bar?: boolean; natural?: boolean;
}) {
  return (
    <div className="browser" style={{ color: p.palette.fg, background: p.palette.bg }}>
      {bar && (
        <div className="browser-bar"><i /><i /><i /><span>{p.host}</span></div>
      )}
      <Image
        src={p.image.src} width={p.image.width} height={p.image.height} alt={p.image.alt[locale]}
        sizes={sizes} priority={priority}
        style={{ background: p.palette.bg, ...(natural ? { aspectRatio: `${p.image.width} / ${p.image.height}` } : {}) }}
      />
    </div>
  );
}

export function ProjectCard({ p, locale, viewCase, index = 0 }: { p: Project; locale: Locale; viewCase: string; index?: number }) {
  return (
    <div data-reveal style={{ '--d': `${index * 90}ms` } as React.CSSProperties}>
    <Link href={localePath(locale, `/portfolio/${p.slug}`)} className="proj-card" data-tilt data-cursor="↗" style={{ height: '100%' }}>
      <span className="glow" aria-hidden="true" />
      <BrowserFrame p={p} locale={locale} sizes="(max-width: 699px) 92vw, (max-width: 1099px) 46vw, 430px" />
      <div className="proj-body">
        <div className="proj-meta"><span>{p.cat[locale]}</span><span>{p.year}</span></div>
        <h3 style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{p.name}</h3>
        <p className="muted" style={{ fontSize: 14 }}>{p.segment[locale]}</p>
        <span className="mono accent" style={{ marginTop: 8, fontSize: 13 }}>{viewCase}</span>
      </div>
    </Link>
    </div>
  );
}

export function Cover({ post, size, style, priority, sizes = '(max-width: 699px) 92vw, 420px', alt = '' }: {
  post: Pick<PostMeta, 'cover' | 'glyph' | 'image'>; size?: string; style?: React.CSSProperties; priority?: boolean; sizes?: string; alt?: string;
}) {
  if (post.image) {
    return (
      <div className="cover cover-photo" aria-hidden={alt ? undefined : true} style={style}>
        <Image src={post.image.src} alt={alt} fill sizes={sizes} priority={priority} />
      </div>
    );
  }
  return (
    <div className={`cover cover-${post.cover}`} data-tilt="3d" aria-hidden="true" style={{ fontSize: size, ...style }}>
      {post.glyph}
    </div>
  );
}

export function PostCard({ post, locale, dateLabel, index = 0, showExcerpt = true, showDate = false }: {
  post: PostMeta; locale: Locale; dateLabel?: string; index?: number; showExcerpt?: boolean; showDate?: boolean;
}) {
  // artigos só existem em português; nas versões en/es o link leva ao original
  return (
    <Link
      href={localePath('pt', `/blog/${post.slug}`)} className="post-card" data-reveal hrefLang="pt-BR"
      style={{ '--d': `${index * 90}ms` } as React.CSSProperties}
    >
      <Cover post={post} />
      <div className="post-meta">
        <span className="c">{post.category}</span><span>·</span><span>{post.minutes} min</span>
        {locale !== 'pt' && <><span>·</span><span>PT-BR</span></>}
      </div>
      <h3 lang={locale !== 'pt' ? 'pt-BR' : undefined}>{post.title}</h3>
      {showExcerpt && <p className="muted" lang={locale !== 'pt' ? 'pt-BR' : undefined} style={{ fontSize: 15, lineHeight: 1.55 }}>{post.excerpt}</p>}
      {showDate && dateLabel && <p className="mono muted" style={{ fontSize: 12 }}>{dateLabel}</p>}
    </Link>
  );
}
