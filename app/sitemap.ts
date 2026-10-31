import type { MetadataRoute } from 'next';
import { HTML_LANG, LOCALES, localePath } from '@/lib/i18n';
import { absolute } from '@/lib/seo';
import { PROJECTS } from '@/content/projects';
import { SERVICE_SLUGS } from '@/content/service-pages';
import { SEO_SLUG } from '@/content/seo-service';
import { LOCAL_SLUGS } from '@/content/local-pages';
import { getPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const multi = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly') =>
    LOCALES.map((l) => ({
      url: absolute(localePath(l, path)),
      lastModified: now,
      changeFrequency,
      priority: l === 'pt' ? priority : priority * 0.6,
      alternates: { languages: Object.fromEntries(LOCALES.map((x) => [HTML_LANG[x], absolute(localePath(x, path))])) },
    }));

  return [
    ...multi('/', 1, 'weekly'),
    ...multi('/servicos', 0.9, 'monthly'),
    ...[...SERVICE_SLUGS, SEO_SLUG].flatMap((s) => multi(`/servicos/${s}`, 0.9, 'monthly')),
    ...multi('/portfolio', 0.8, 'monthly'),
    ...PROJECTS.flatMap((p) => multi(`/portfolio/${p.slug}`, 0.6, 'monthly')),
    ...multi('/blog', 0.7, 'weekly'),
    ...getPosts().map((p) => ({
      url: absolute(`/blog/${p.slug}`),
      lastModified: new Date(`${p.updated ?? p.date}T12:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...LOCAL_SLUGS.map((s) => ({ url: absolute(`/${s}`), lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...multi('/sobre', 0.6, 'monthly'),
    ...multi('/contato', 0.6, 'monthly'),
    ...multi('/politica-de-privacidade', 0.2, 'monthly'),
    { url: absolute('/cartao'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
