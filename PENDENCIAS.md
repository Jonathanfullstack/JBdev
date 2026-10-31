# Pendências — dados que faltam no site novo

Tudo aqui aparece no site como placeholder visível entre colchetes. Nada foi inventado.
Quando tiver o dado, edite o arquivo indicado (ou me passe que eu aplico).

## 1. Empresa e contato (NAP)

| Placeholder | Onde aparece | Onde editar |
|---|---|---|
| `[Endereço, número]` | Não aparece no site (o rodapé mostra só a cidade) | `lib/site.ts` → `address.street` |
| CEP | Não aparece ainda | Adicionar ao `organizationSchema()` em `lib/seo.ts` junto com o endereço |
| Horário de atendimento | Não aparece ainda | Adicionar ao schema (`openingHours`) e ao rodapé |

> O endereço e o CEP ficaram **fora** dos dados estruturados de propósito, para não publicar placeholder para o Google. Ao preencher, adicione `streetAddress` e `postalCode` em `organizationSchema()` (`lib/seo.ts`).
>
> O NAP (nome, endereço, telefone) do site precisa ficar **idêntico** ao do Perfil da Empresa no Google.

## 2. Números (home, portfólio, manifesto)

Arquivo: `content/dictionaries/{pt,en,es}.ts`

| Placeholder | Onde |
|---|---|
| `[24h]` prazo de resposta | FAQ, CTA final, contato (vários textos) |

O "08 projetos no ar" do portfólio é real (conta os 8 projetos publicados) e anima como contador.
Os contadores animam sozinhos assim que o valor for um número sem colchetes.

## 3. Preços e prazos

| Placeholder | Onde |
|---|---|
| `[R$ 0.000]` "Projetos a partir de" | FAQ da home e FAQs das 4 páginas de serviço |
| `[R$ 0.000]`, `[R$ 00.000]` | Contato → faixas de investimento |
| `[R$ 0.000]`, `[R$ 00.000]` | Artigo "Quanto custa um site profissional" (tabela) e "Vale a pena ter um app" |
| `[X] semanas` | FAQ da home e FAQ de criação de sites |

## 4. Cases do portfólio

Arquivo: `content/projects.ts`. Os 8 projetos reais já estão no ar com nome, categoria, descrição, link e print.
Faltam, para **todos**:

| Campo | Placeholder |
|---|---|
| Ano | `[Ano]` |
| Desafio | `[Desafio do projeto — a preencher]` |
| Resultado | `[Resultado do projeto — a preencher]` |
| Métricas (3 por case) | Ocultas até ter dados reais: preencher `metrics` do projeto em `content/projects.ts` |
| Cidade do cliente | não exibida |
| Prints extras (desktop + celular separados) | hoje cada case usa o print composto que já existia |

Cliente ainda não identificado (aparece `[Cliente]`): **JB CRM**, **JB Barber**, **finance.ai**, **Menu Online**.
Se forem produtos próprios da JB DEV, troque por "Produto JB DEV".

Depoimentos por case: só a **Valarine Beauty** tem depoimento real (Carla Valarine). Os outros 6 cases mostram
`[Depoimento do cliente…]`, `[Nome do cliente]`, `[Cargo]`.

Categorias sem case publicado: **Automação & IA** e **Apps** (os filtros mostram `00` e um aviso).
Projetos em desenvolvimento citados no `/cartao` (CRM SaaS e Plataforma de Atendimento com IA) podem virar cases quando forem ao ar.

## 5. Logos de clientes

Portfólio → faixa "Marcas que confiam na JB DEV": 5× `[Logo cliente]`. Precisa dos arquivos (SVG ou PNG) e autorização de uso.

## 6. Blog

- **6 artigos completos** publicados (pt-BR). Revise antes de publicar o site.
- **6 rascunhos** em `content/blog/*.md` com `draft: true` (não aparecem no site nem no sitemap): estrutura pronta, texto a escrever.
  - Por que meu site não gera clientes · Chatbot com IA no WhatsApp funciona? · Quanto custa um sistema sob medida · Quanto custa criar um aplicativo · Sistema de agendamento online · Loja virtual própria ou marketplace
- Para publicar um rascunho: escreva o texto e troque `draft: true` por `draft: false`.
- Os artigos existem só em português. As versões `/en/blog` e `/es/blog` listam os artigos com o selo PT-BR. Se quiser tradução, é só pedir.
- Imagem de capa por artigo: hoje é a capa tipográfica do mockup; para Open Graph usa a imagem padrão do site.

## 7. Envio real do formulário e da newsletter

Hoje o envio é **simulado**: os dados vão para `.data/briefing.jsonl` e `.data/newsletter.jsonl` e aparecem no terminal.
Para ligar o envio real, copie `.env.example` para `.env.local` e defina:

```
FORM_DELIVERY=webhook
BRIEFING_WEBHOOK_URL=https://…   # n8n, Make, Zapier, serviço de e-mail…
NEWSLETTER_WEBHOOK_URL=https://…
```

Falta escolher a ferramenta da newsletter (Brevo, Mailchimp, ConvertKit…) e o destino dos briefings.

## 8. Decisões que você pode querer rever

- **E-mail público:** `jonathantotini@gmail.com` (decidido). Se criar `contato@jbdev.com.br`, troque em `lib/site.ts` e em `public/js/site-config.js`.
- **Slugs em en/es:** as URLs em inglês e espanhol usam os mesmos caminhos em português (`/en/servicos/criacao-de-sites`). Funciona e tem `hreflang` correto; traduzir os caminhos é possível depois.
- **Páginas de serviço em en/es:** versões condensadas. O texto completo (600+ palavras) está em português, que é o foco de SEO.
- **Cartão digital (`/cartao`):** mantido como página estática antiga, na mesma URL. Ele ainda lê `public/js/site-config.js`; se mudar contato em `lib/site.ts`, atualize lá também.
- **Victoria Films:** o print continua em `public/assents/img/`, mas não é usado.

## SEO & Google Meu Negócio (`/servicos/seo-google-meu-negocio`)

Arquivo: `content/seo-service.ts` (pt, en, es).

| Item | Situação |
|---|---|
| Preços dos 3 planos | Sem preço: o card mostra "Solicitar orçamento" (WhatsApp). Para exibir, preencher `price` em cada plano |
| Entregas dos planos | Redigidas a partir da lista de entregas da página — revisar se batem com o que será vendido |
| Selo do plano do meio | "Recomendado" (não "mais escolhido", que é um dado que ainda não temos) |
| FAQ "Meu site não foi feito pela JB DEV…" | Resposta provisória: atende, começando pelo diagnóstico — confirmar |
