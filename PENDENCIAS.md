# Pendências — dados que faltam no site

Nenhum placeholder entre colchetes aparece mais no site. O que falta foi **ocultado** ou trocado por um texto neutro,
sem inventar dado. Quando tiver a informação, edite o arquivo indicado (ou me passe que eu aplico).

## 1. Empresa e contato (NAP)

Fonte única: `lib/site.ts` (espelhar em `public/js/site-config.js`, usado pelo `/cartao`).

| Item | Situação |
|---|---|
| Endereço | Preenchido igual ao Google: Av. Eng. Fábio Roberto Barnabé, 215 - Vila Nossa Sra. Aparecida, Indaiatuba - SP, 13330-565 |
| Telefone / WhatsApp | (19) 99749-5985 |
| E-mail | `jonathantotini@gmail.com` (mantido). Se criar `contato@jbdev.com.br`, troque em `lib/site.ts` e `public/js/site-config.js` |
| Coordenadas (`geo`) | **Faltam.** Os geocodificadores públicos não acharam o número 215 com precisão. Pegue latitude/longitude no Google Maps (clique no pino → copiar coordenadas) e adicione `geo` em `organizationSchema()` (`lib/seo.ts`) |
| Horário de atendimento (`openingHours`) | **Falta.** Precisa ser igual ao do Perfil da Empresa no Google. Adicionar em `organizationSchema()` (`lib/seo.ts`) e, se quiser, no rodapé |

## 2. Preços e prazos

Sem valores informados, os textos dizem "Valor conforme o escopo, com proposta fechada após o briefing" e
"Sites em poucas semanas, conforme o escopo".

| Dado | Onde entra |
|---|---|
| Preço inicial de site | FAQ da home e das páginas de serviço (`content/dictionaries/*.ts`, `content/service-pages.ts`), artigos "Quanto custa um site profissional" e "Vale a pena ter um app" |
| Prazo médio de um site (semanas) | FAQ da home e de criação de sites |
| Faixas de investimento do formulário | `contact.investOptions` nos 3 dicionários. Hoje: "Ainda não sei / Quero começar enxuto / Projeto completo / Projeto maior (sistema ou app)" |
| Preços dos 3 planos de SEO | `content/seo-service.ts` → `price` de cada plano (hoje o card mostra só "Solicitar orçamento") |

## 3. Cases do portfólio

Arquivo: `content/projects.ts`. Campos vazios ficam **ocultos** no site.

| Campo | Situação |
|---|---|
| Ano (`year`) | Falta para os 8 cases: BALLI, JB CRM, JB Barber, Vitra Mobile, finance.ai, Izabella Nail Designer, Valarine Beauty, Menu Online |
| Cliente (`client`) | JB CRM e JB Barber = "Projeto próprio". **finance.ai** e **Menu Online** sem cliente informado (campo oculto). Se forem produtos próprios, use `client: null` |
| Desafio / Resultado | Ocultos até ter texto real (`challenge`, `result`) |
| Métricas | Ocultas até ter dados reais (`metrics`) |

**Depoimentos:** o bloco de depoimento só aparece no case da **Valarine Beauty** (Carla Valarine). Nos outros 7 foi removido.
A seção "Quem já trabalhou com a gente" do portfólio mantém os 3 depoimentos que já estavam publicados no site antigo
(Gabriel Silva, Carla Valarine, Julia Rosa). Confirme que podem continuar; se não, apague de `TESTIMONIALS`.

**Logos de clientes:** a faixa "Marcas que confiam na JB DEV" foi removida. Para voltar, precisa dos arquivos e autorização de uso.

## 4. Páginas novas para revisar

| Página | O que revisar |
|---|---|
| `/sobre` (pt/en/es) | Texto montado com o que já estava no site antigo (sem anos de experiência ou números novos). A foto é a do site antigo (`about-jonathan-workspace.webp`); há um `TODO` em `app/[lang]/sobre/page.tsx` para trocar por uma foto profissional |
| `/politica-de-privacidade` (pt/en/es) | Modelo baseado no que o site realmente coleta. Recomendo revisão jurídica. O prazo de retenção está descrito como "enquanto necessário", sem número de meses |
| 8 páginas de nicho e cidade (só pt) | `content/local-pages.ts`. Textos próprios, sem prometer posição no Google e sem citar clientes que não temos nessas cidades |

## 5. Blog

- **6 artigos completos** publicados (pt-BR).
- **6 rascunhos** em `content/blog/*.md` com `draft: true` (não aparecem no site nem no sitemap): estrutura pronta, texto a escrever.
  Alguns rascunhos ainda têm `[R$ 0.000]` e `[FONTE NECESSÁRIA]` nas notas internas; preencher antes de trocar para `draft: false`.
- Os artigos existem só em português.

## 6. Envio real do formulário e da newsletter

O destino depende das variáveis de ambiente (`FORM_DELIVERY`, `BRIEFING_WEBHOOK_URL`, `NEWSLETTER_WEBHOOK_URL`).
Falta escolher a ferramenta da newsletter e o destino dos briefings, se ainda não estiverem configurados na Vercel.

## 7. Decisões que você pode querer rever

- **Páginas de nicho e cidade só em português:** o público é brasileiro. No rodapé em en/es, as especialidades continuam apontando para a página de criação de sites no idioma.
- **Slugs em en/es:** usam os mesmos caminhos em português (`/en/servicos/criacao-de-sites`), com `hreflang` correto.
- **Pasta de imagens:** renomeada de `assents` para `assets`. URLs antigas `/assents/*` redirecionam (301) para `/assets/*`.
- **Cartão digital (`/cartao`):** página estática antiga; lê `public/js/site-config.js`.
- **Victoria Films:** o print continua em `public/assets/img/`, mas não é usado.

## SEO & Google Meu Negócio (`/servicos/seo-google-meu-negocio`)

| Item | Situação |
|---|---|
| Entregas dos planos | Revisar se batem com o que será vendido |
| Selo do plano do meio | "Recomendado" |
| FAQ "Meu site não foi feito pela JB DEV…" | Resposta provisória: atende, começando pelo diagnóstico — confirmar |
