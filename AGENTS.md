# Jonathan-DEV — portfolio pessoal

Site estático do portfolio de **Jonathan Balieiro** (https://jonathanbalieiro.dev/), deploy na Vercel.

## Stack

- HTML estático (`index.html`) — sem framework / sem build step
- CSS em `assents/style.css`
- JS vanilla em `js/`
- Font Awesome, AOS, EmailJS (CDN)
- Deploy: `vercel.json` (`framework: null`)

## Estrutura

| Caminho | Função |
|---------|--------|
| `index.html` | Página única do portfolio |
| `assents/style.css` | Estilos |
| `assents/img/` | Imagens e logos |
| `js/site-config.js` | Fonte única de verdade (contato, EmailJS, SEO person) |
| `js/script.js` | Interações gerais |
| `js/themeMode.js` | Tema claro/escuro |
| `js/emailForm.js` | Formulário de contato (EmailJS) |
| `js/particles.js` | Background de partículas |
| `js/voltarTopo.js` | Botão voltar ao topo |

## Convenções

- Idioma do site e da copy: **pt-BR**
- Dados públicos de contato/config: editar só em `js/site-config.js` (não duplicar em HTML quando der para ler do config)
- Pasta de assets é `assents/` (grafia existente — não renomear sem migração de links)
- Manter o visual atual (Sora + Plus Jakarta Sans, accent `#493eda`) a menos que o pedido seja redesign
- Preferir mudanças pequenas e localizadas; sem introduzir bundler/React/Next sem pedido explícito
- Não commitar secrets; chaves EmailJS em `site-config.js` são públicas do client — ok no repo

## Como validar

- Abrir `index.html` no browser (ou preview estático local)
- Conferir formulário de contato, toggle de tema e layout mobile
