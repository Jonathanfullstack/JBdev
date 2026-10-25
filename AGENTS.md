# JB DEV — site do estúdio

Site da **JB DEV** (https://www.jbdev.com.br): sites, sistemas, automações/IA e apps.
Construído a partir dos mockups aprovados (`jbdev-site-handoff.zip`) e dos briefings `PROMPT-CLAUDE-CODE.md` e `PROMPT-2-CONTEUDO-SEO-ANIMACOES.md`.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- CSS próprio em `app/globals.css` (tokens do mockup; sem Tailwind)
- Lenis (scroll suave); animações e canvas em código próprio (sem GSAP/Framer)
- Blog em Markdown (`content/blog/*.md`, gray-matter + marked)
- Idiomas: pt-BR (padrão, sem prefixo), `/en`, `/es`
- Deploy pensado para Vercel (`vercel.json` → `framework: nextjs`) — **nada é publicado sem pedido explícito**

## Estrutura

| Caminho | Função |
|---|---|
| `app/[lang]/` | Rotas: home, `servicos`, `servicos/[slug]`, `portfolio`, `portfolio/[slug]`, `blog`, `blog/[slug]` (só pt), `contato` |
| `app/[lang]/layout.tsx` | Root layout: fontes, tema sem "piscar", header, footer, efeitos globais |
| `app/global-not-found.tsx` | 404 de URLs que não existem |
| `app/api/briefing`, `app/api/newsletter` | Envio dos formulários (local por padrão, webhook opcional via `.env`) |
| `app/sitemap.ts`, `app/robots.ts` | SEO técnico |
| `proxy.ts` | Reescreve `/x` → `/pt/x` e redireciona `/pt/x` → `/x` |
| `lib/site.ts` | **Fonte única** de contato, NAP e redes |
| `lib/seo.ts` | Metadata, hreflang e dados estruturados |
| `lib/motion.ts` | Loop único de `requestAnimationFrame` (scroll, mouse) |
| `content/dictionaries/{pt,en,es}.ts` | Todos os textos da interface |
| `content/service-pages.ts` | Texto longo das páginas de serviço |
| `content/projects.ts` | Portfólio real (7 projetos) e depoimentos |
| `content/blog/*.md` | Artigos (`draft: true` = rascunho fora do site) |
| `components/motion/` | Fita de partículas, seção fixada, marquee, cursor, transição, efeitos por atributo |
| `public/assents/` | Imagens e fontes antigas (grafia `assents` mantida: o cartão usa) |
| `public/cartao/` | Cartão digital antigo, servido em `/cartao` |
| `conteudo/` | Inventário do site antigo, palavras-chave, plano do blog, checklist de SEO |
| `PENDENCIAS.md` | Placeholders que faltam preencher |

## Convenções

- Idioma principal e da copy: **pt-BR**. en/es seguem o mesmo dicionário tipado (`content/dictionaries/types.ts`)
- **Não inventar dados**: números, clientes, depoimentos e preços sem fonte ficam entre colchetes e entram em `PENDENCIAS.md`
- Contato/NAP: editar só em `lib/site.ts` (e espelhar em `public/js/site-config.js`, usado pelo `/cartao`)
- Visual do mockup: Inter Tight + JetBrains Mono, azul royal `#1F5FE0` / `#4C8DFF`, navy `#060A13`, off-white `#F3F5F9`
- Animações: só `transform`/`opacity`, respeitar `prefers-reduced-motion`; cursor, tilt e magnético só com mouse
- Efeitos por atributo (sem client component): `data-reveal`, `data-split` (via `SplitText`), `.draw-line`, `.draw-top`, `data-count`, `data-tilt`, `data-magnetic`, `data-scramble`, `data-cursor`
- Texto sempre no HTML do servidor (SSG); nada de conteúdo só via JS
- Não commitar secrets; `.env.local` fica fora do git

## Como rodar e validar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start   # produção local
npm run lint       # checagem de tipos (tsc)
```

- Conferir as páginas em claro/escuro, desktop e 390px, e nos três idiomas
- Formulários: os envios aparecem no terminal e em `.data/*.jsonl`
- Lighthouse no build de produção (meta: > 90 em todas as categorias)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
