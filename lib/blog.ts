import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked, type Tokens } from 'marked';

export type PostKey = 'sites' | 'sistemas' | 'auto' | 'apps';

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  keyword: string;
  category: string;
  key: PostKey;
  service: string;
  date: string;
  updated?: string;
  glyph: string;
  cover: 'accent' | 'ink' | 'soft';
  draft: boolean;
  minutes: number;
  words: number;
};

export type Post = PostMeta & {
  html: string;
  toc: { id: string; label: string }[];
  faq: [string, string][];
};

const DIR = path.join(process.cwd(), 'content', 'blog');

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/[*_`]/g, '').trim();

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const toc: Post['toc'] = [];
  const faq: [string, string][] = [];

  // FAQ: cada "### pergunta" dentro de "## Perguntas frequentes" + o parágrafo seguinte
  const faqMatch = content.match(/^## Perguntas frequentes\s*$([\s\S]*)/m);
  if (faqMatch) {
    const re = /^### (.+)\n+([\s\S]+?)(?=\n### |\n## |$)/gm;
    let m: RegExpExecArray | null;
    while ((m = re.exec(faqMatch[1]))) faq.push([plain(m[1]), plain(m[2].replace(/\n+/g, ' '))]);
  }

  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        const id = slugify(plain(text));
        if (depth === 2) toc.push({ id, label: plain(text) });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
      table(this: unknown, token: Tokens.Table) {
        const cell = (c: Tokens.TableCell, tag: string) => `<${tag}>${md.parseInline(c.text)}</${tag}>`;
        const head = `<tr>${token.header.map((c) => cell(c, 'th')).join('')}</tr>`;
        const body = token.rows.map((r) => `<tr>${r.map((c) => cell(c, 'td')).join('')}</tr>`).join('');
        return `<div class="prose-table"><table><thead>${head}</thead><tbody>${body}</tbody></table></div>`;
      },
      link({ href, text }: Tokens.Link) {
        const ext = /^https?:/.test(href);
        return `<a href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
    },
  });
  const html = md.parse(content, { async: false }) as string;
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug: data.slug,
    title: data.title,
    seoTitle: data.seoTitle ?? data.title,
    description: data.description,
    excerpt: data.excerpt ?? data.description,
    keyword: data.keyword ?? '',
    category: data.category,
    key: data.key,
    service: data.service,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date),
    updated: data.updated ? (data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated)) : undefined,
    glyph: data.glyph ?? '//',
    cover: data.cover ?? 'accent',
    draft: Boolean(data.draft),
    minutes: Math.max(1, Math.round(words / 200)),
    words,
    html,
    toc,
    faq,
  };
}

let cache: Post[] | null = null;

/** Todos os artigos publicados (rascunhos ficam de fora), do mais novo ao mais antigo. */
export function getPosts(): Post[] {
  if (!cache || process.env.NODE_ENV === 'development') {
    cache = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map(parse)
      .filter((p) => !p.draft)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  return cache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const toMeta = ({ html: _h, toc: _t, faq: _f, ...meta }: Post): PostMeta => meta;

export function formatDate(iso: string, locale: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
}
