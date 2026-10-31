# Inventário do site atual — JB DEV

Levantado em 25/10/2026 a partir de https://www.jbdev.com.br/.
O site publicado é idêntico ao `index.html` deste repositório (diff = 0), então a fonte é o próprio repo.

Páginas encontradas (`sitemap.xml`):

| URL | Arquivo |
|---|---|
| https://www.jbdev.com.br/ | `index.html` (one-page: hero, tecnologias, serviços, processo, confiança, projetos, vantagens, sobre, depoimentos, FAQ, CTA, contato, rodapé) |
| https://www.jbdev.com.br/cartao | `cartao/index.html` (cartão digital do Jonathan) |

Não existem páginas separadas de serviços, portfólio, blog ou contato. **Não há artigos de blog.**
O site atual também tem versão em inglês (toggle PT/EN via JS), que não existe no mockup.

---

## 1. Marca e SEO atual

| Item | Valor | Origem |
|---|---|---|
| Nome | JB DEV | `/` |
| Descrição | Sites, sistemas e soluções digitais | `js/site-config.js` |
| `<title>` home | Criação de Sites e Sistemas em Indaiatuba \| JB DEV | `/` |
| Meta description | A JB DEV desenvolve sites, sistemas e soluções digitais sob medida para empresas e profissionais. Atendimento em Indaiatuba/SP e remoto. | `/` |
| Schema | `ProfessionalService` + `Person` + `WebSite` + `WebPage` | `js/site-config.js` |
| Áreas atendidas (schema) | Indaiatuba, Campinas, Itu, Salto, Sorocaba, São Paulo, Brasil | `js/site-config.js` |
| Logo | `assets/img/logo.webp/.png`, `logo-escura.webp/.png` | repo |
| Favicon | `assets/img/favicon-jbdev.png`, `favicon.ico` | repo |
| OG image | `assets/img/og-jbdev.png` | repo |

## 2. Contato e NAP

| Item | Valor | Origem |
|---|---|---|
| Responsável | Jonathan Vinicius Balieiro de Oliveira — Desenvolvedor Web Full Stack / Fundador | `js/site-config.js`, `/cartao` |
| Telefone / WhatsApp | (19) 99749-5985 — `5519997495985` | `js/site-config.js` |
| E-mail | jonathantotini@gmail.com | `js/site-config.js` |
| Cidade / UF | Indaiatuba/SP (sede) — atendimento presencial e remoto em todo o Brasil | `/` |
| Endereço completo | **não existe** | — |
| Horário de atendimento | **não existe** | — |
| Razão social / CNPJ | **não existe** | — |
| Instagram | https://www.instagram.com/jonathan_desenvolvedor/ | rodapé |
| LinkedIn | https://www.linkedin.com/in/jonathan-balieiro-b83230298/ | rodapé |
| GitHub | https://github.com/Jonathanfullstack | rodapé |
| Mensagem padrão WhatsApp | "Olá, JB DEV! Quero conversar sobre um projeto digital para o meu negócio." (+ mensagens por contexto de CTA) | `js/site-config.js` |
| Foto | `assets/img/1716911104056.jpeg`, `about-jonathan-workspace*.webp` | repo |

## 3. Serviços (site atual)

| # | Serviço | Descrição |
|---|---|---|
| 01 | Sites institucionais | Apresente sua empresa com clareza, credibilidade e uma jornada pensada para gerar contatos. |
| 02 | Landing pages | Páginas focadas em campanhas, lançamentos e ofertas com uma mensagem direta e comercial. |
| 03 | Sistemas web | Ferramentas sob medida para organizar rotinas, atendimentos, dados e processos internos. |
| 04 | Lojas virtuais | Experiências de compra simples, confiáveis e preparadas para apresentar seus produtos. |
| 05 | Otimização | Melhorias de desempenho, usabilidade e estrutura para sites que precisam entregar mais. |
| 06 | Suporte e evolução | Acompanhamento técnico para manter sua solução atualizada e alinhada ao crescimento do negócio. |

O `/cartao` lista também **Automações** (sem descrição). **Apps mobile não aparecem** no site atual.

Rodapé — coluna "Soluções": Criação de Sites, Landing Pages, Sistemas Web, Loja Virtual, CRM Personalizado, Sistema de Agendamento, Otimização de Sites, Manutenção e Suporte.
Rodapé — "Especialidades": Site para Empresas, Clínicas, Estética, Imobiliária, Restaurantes, Sistemas Personalizados, SEO Local, Google Meu Negócio.

## 4. Projetos (portfólio real)

Todos em `/` → seção "Projetos selecionados". Prints já estão no repo (`assets/img/project-*.webp`, com versões 480/800).

| Projeto | Categoria | Descrição | Link | Imagem |
|---|---|---|---|---|
| finance.ai | Aplicação web | Gestão financeira pessoal com visão de receitas, despesas, orçamentos e indicadores em um único ambiente. | https://finance-ia.up.railway.app/ | `project-finance.webp` |
| JB CRM | CRM comercial | Gestão de leads e funil kanban com propostas, follow-ups, agenda e indicadores de conversão em um só painel. | https://crm-production-47ab.up.railway.app/ | `project-crm.webp` |
| JB Barber | Sistema de agendamento | Agendamento de serviços, profissionais e horários com área administrativa para a barbearia. | https://barber-jb-production.up.railway.app/ | `project-jb-barber.webp` |
| Izabella Nail Designer | Sistema de agendamento | Portfólio de serviços integrado à escolha de datas e horários, com gestão de agendamentos. | https://izabellafernandez.up.railway.app/ | `project-izabella-nails.webp` |
| BALLI Acessórios | Loja virtual | E-commerce premium com design sofisticado, responsividade completa, coleções organizadas, integração com WhatsApp e experiência visual pensada para valorizar os produtos e aumentar a conversão. | https://balli-semijoias.vercel.app/ | `project-balli.webp` |
| Menu Online | Cardápio digital | Navegação por categorias, busca e apresentação organizada dos produtos para facilitar pedidos. | https://menu-cardapio-jonathan.netlify.app/ | `project-menu-online.webp` |
| Valarine Beauty | Landing page | Apresentação de serviços, trabalhos e contato para fortalecer a presença digital do estúdio. | https://valarine-carla.vercel.app/ | `project-valarine.webp` |

Em desenvolvimento (só no `/cartao`): **CRM SaaS & Automação de Vendas** e **Plataforma de Atendimento com IA**.
Sobra no repo: `project-victoria-films*.webp` (projeto removido do site).

Não existem para nenhum projeto: cidade do cliente, ano, desafio, solução, resultado, métricas.

## 5. Textos institucionais

- **Sobre:** "A JB DEV desenvolve sites, sistemas e soluções digitais para empresas e profissionais que querem fortalecer sua presença, organizar processos ou tirar uma ideia do papel. À frente da empresa, Jonathan Balieiro acompanha cada projeto diretamente e combina desenvolvimento, visão de produto e cuidado visual em todas as entregas."
- **Diferenciais:** Atendimento próximo (você conversa diretamente com quem desenvolve) · Projeto sob medida · Local e remoto · Decisões com propósito · Comunicação transparente · Experiência responsiva · Base para evoluir.
- **Processo (4 etapas):** Descoberta → Direção → Construção → Entrega.
- **Tecnologias:** Next.js, React, TypeScript, Node.js, NestJS, PostgreSQL, Prisma, Docker, OpenAI, Vercel, Supabase, Tailwind CSS (+ no cartão: MySQL, MongoDB, Redis, Railway, n8n, Styled Components).

## 6. Números

**Nenhum número real** (projetos entregues, anos de mercado, clientes, métricas) existe no site atual.

## 7. Depoimentos

| Texto | Nome | Cargo / empresa |
|---|---|---|
| "Simplesmente transformador! A atenção aos detalhes e a agilidade no atendimento superaram todas as expectativas." | Gabriel Silva | Empreendedor |
| "O Jonathan desenvolveu meu site com muito cuidado. O resultado superou minhas expectativas e meus clientes adoram a facilidade de navegação." | Carla Valarine | Valarine Beauty |
| "Trabalho impecável! Um site que representa minha marca e facilita o contato com meus clientes." | Julia Rosa | Julia Rosa Estética Facial |

## 8. FAQ atual

1. Quais tipos de projeto a JB DEV desenvolve? — Sites institucionais, landing pages, lojas virtuais, sistemas web e melhorias em projetos existentes.
2. O atendimento é somente em Indaiatuba? — Não. Presencial em Indaiatuba/SP e remoto para outras cidades e regiões.
3. Como recebo uma proposta? — Conte sua necessidade pelo WhatsApp ou formulário; após entender objetivo e escopo, a JB DEV orienta os próximos passos.
4. A JB DEV também cuida de projetos que já existem? — Sim: otimizações, correções, novas funcionalidades e evolução técnica.

---

# Substituições propostas no mockup

| Placeholder do mockup | Vira | Fonte |
|---|---|---|
| `[(00) 00000-0000]` | (19) 99749-5985 | site-config |
| `[contato@jbdev.com.br]` | jonathantotini@gmail.com *(confirmar)* | site-config |
| `[Cidade — UF]` / `[Cidade, UF]` | Indaiatuba — SP | site-config |
| Redes sociais do rodapé | Instagram, LinkedIn, GitHub reais | rodapé |
| Cases fictícios `PROJ` (p1–p6) e `[Nome do projeto 0X]`, `[clienteX].com.br` | Os 7 projetos reais acima, com nome, categoria, descrição, link e print | `/` |
| Desafio / Solução / Resultado dos cases | Só a descrição real; o resto vira pendência | — |
| `[Nome do cliente]`, `[Cargo]` (depoimento) | Gabriel Silva, Carla Valarine (no case Valarine), Julia Rosa | `/` |
| Prints dos cases | `assets/img/project-*.webp` → `public/` | repo |

## Continuam como placeholder (vão para `PENDENCIAS.md`)

- Todos os números: `[00]+`, `[00]%`, `[00]h`, métricas dos cases (`[+00%]`, `[0,0s]`, `[Top 3]`…)
- Desafio, solução, resultado, ano e segmento de cada case
- Preços e prazos: `[R$ 0.000]`, `[R$ 00.000]`, `[R$ 00 mil]`, `[X] semanas`, `[24h]`
- `[Razão social LTDA]`, `CNPJ [00.000.000/0001-00]`, `[Endereço, número]`
- `[Logo cliente]` (faixa de logos de clientes)
- Cases de **Automação/IA** e **Apps**: não há projetos reais publicados nessas categorias

## Decisões (aprovadas em 25/10/2026)

1. **E-mail público:** `jonathantotini@gmail.com`.
2. **Apps mobile:** mantido como serviço (`/servicos/aplicativos`), sem case; cases de app ficam em pendência.
3. **`/cartao`:** mantido na mesma URL no site novo.
4. **Inglês:** mantido — site novo com pt-BR (padrão) e EN.
5. **Victoria Films:** não usar.
