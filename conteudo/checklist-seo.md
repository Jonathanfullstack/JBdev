# Checklist de SEO — JB DEV

## O que já está feito no site

### Estrutura e conteúdo
- [x] Uma palavra-chave principal por página, sem canibalização (ver `palavras-chave.md`)
- [x] 4 páginas de serviço com H1 da palavra-chave, texto original (pt: 600+ palavras), "O que inclui", processo, FAQ, cases relacionados e CTA
  - `/servicos/criacao-de-sites` · `/servicos/sistemas-sob-medida` · `/servicos/automacao-e-ia` · `/servicos/aplicativos`
- [x] 6 artigos completos (1.200–1.800 palavras), cada um mirando uma busca de cauda longa e linkando para o serviço certo
- [x] 6 rascunhos planejados (fora do sitemap até serem publicados)
- [x] Links internos: artigos → serviços, cases e outros artigos; serviços → cases; rodapé → serviços
- [x] Coluna "Soluções" no rodapé com âncoras de palavra-chave (visíveis, sem listas de cidades)
- [x] Um H1 por página e hierarquia de títulos correta
- [x] Nenhuma estatística inventada; números sem fonte ficam como `[FONTE NECESSÁRIA]` ou placeholder

### Técnico
- [x] Todo o conteúdo no HTML gerado no servidor (60 páginas estáticas/SSG)
- [x] Metadata única por página: title, description, canonical, Open Graph, Twitter card
- [x] `hreflang` pt-BR / en / es + `x-default` em todas as páginas multilíngues
- [x] `sitemap.xml` automático (com alternates de idioma) e `robots.txt`
- [x] Dados estruturados:
  - `Organization` + `ProfessionalService` (NAP, área atendida, redes, contato) e `Person` (fundador) em todas as páginas
  - `Service` nas páginas de serviço
  - `BlogPosting` nos artigos, `FAQPage` nos FAQs, `BreadcrumbList` nas páginas internas, `ItemList` no portfólio, `CreativeWork` nos cases
- [x] Imagens com `next/image` (AVIF/WebP, tamanhos responsivos, lazy loading) e `alt` descritivo
- [x] Fontes self-hosted com `display: swap`
- [x] O idioma nunca muda sozinho pelo navegador (o Google rastreia em en-US e indexaria a versão errada)
- [x] Redirecionamentos: `/index.html → /`, `/cartao/index.html → /cartao`, `/pt/* → /*`
- [x] URLs antigas preservadas: `/` e `/cartao` (o site antigo não tinha outras páginas nem blog)
- [x] 404 próprio, com `noindex`

### Desempenho e acessibilidade (Lighthouse, build de produção local)

Medido em 25/10/2026 com Lighthouse 12 no build de produção rodando localmente (`next start`).
Valores de performance variam alguns pontos entre execuções.

| Página | Mobile (perf / a11y / boas práticas / SEO) | Desktop |
|---|---|---|
| Home | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Serviços | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Criação de sites | 94 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Portfólio | 92 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Case (BALLI) | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Blog | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Artigo | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Contato | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Home em inglês | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Serviços em espanhol | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

- [x] CLS 0 em todas as páginas medidas
- [x] O canvas do hero começa depois do primeiro paint (não atrasa o LCP) e pausa fora da tela
- [x] Hidratação dividida em blocos (`Suspense`) para não travar o celular
- [x] Animações respeitam `prefers-reduced-motion`; cursor, tilt e efeito magnético desligados em telas de toque

## O que você precisa fazer ao publicar

### Antes de publicar
- [ ] Preencher as pendências de NAP em `PENDENCIAS.md` (razão social, CNPJ, endereço, CEP) e adicionar ao schema
- [ ] Revisar os 6 artigos e os textos das páginas de serviço
- [ ] Preencher preços e prazos (`[R$ 0.000]`, `[X] semanas`) ou reescrever as frases sem eles
- [ ] Ligar o envio real do formulário (`.env.local`)

### Google Search Console
- [ ] Verificar a propriedade `https://www.jbdev.com.br` (de preferência por DNS, propriedade de domínio)
- [ ] Enviar o sitemap: `https://www.jbdev.com.br/sitemap.xml`
- [ ] Usar "Inspeção de URL" na home, nas 4 páginas de serviço e nos 6 artigos e pedir indexação
- [ ] Acompanhar em 2–4 semanas: páginas indexadas, consultas e erros de dados estruturados
- [ ] Testar algumas páginas no Teste de Pesquisa Aprimorada (FAQ, artigo, breadcrumb)

### Perfil da Empresa no Google
- [ ] Criar ou reivindicar o perfil "JB DEV" e concluir a verificação
- [ ] Categoria principal coerente (ex.: "Desenvolvedor de sites" / "Empresa de software") e secundárias reais
- [ ] Nome, endereço e telefone **idênticos** aos do rodapé do site
- [ ] Área de atendimento: Indaiatuba e região (sem exagerar na lista)
- [ ] Site: `https://www.jbdev.com.br` · serviços cadastrados · horário · fotos reais
- [ ] Publicar novidades e fotos com frequência

### Avaliações
- [ ] Pedir avaliação no Google para cada cliente atendido (Carla Valarine, Julia Rosa e Gabriel Silva são bons primeiros pedidos)
- [ ] Enviar o link direto de avaliação por WhatsApp após cada entrega
- [ ] Responder todas as avaliações, inclusive as negativas
- [ ] Nunca comprar avaliações nem oferecer benefício em troca de nota

### Contínuo
- [ ] Publicar 1–2 artigos por mês (começando pelos 6 rascunhos)
- [ ] Transformar cada novo projeto em case com desafio, solução e resultado reais
- [ ] Validar as palavras-chave no Google Keyword Planner e ajustar títulos conforme o Search Console mostrar as buscas reais
- [ ] Manter NAP igual em Instagram, LinkedIn, GitHub e diretórios
