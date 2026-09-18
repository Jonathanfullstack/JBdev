# Auditoria de performance mobile — JB DEV

Data: 18/09/2026. Projeto estático em HTML, CSS e JavaScript, sem Next.js, React ou Framer Motion.

## Comparação Lighthouse local

As duas medições foram executadas no mesmo preview estático, com o mesmo Chrome e a configuração mobile padrão do Lighthouse.

| Métrica | Antes | Depois |
|---|---:|---:|
| Performance | 28 | 82 (melhor rodada: 84) |
| FCP | 5,62 s | 1,66 s |
| LCP | 10,58 s | 3,51 s |
| TBT | 301 ms | 165 ms (melhor rodada: 76 ms) |
| CLS | 0,505 | 0 |
| Speed Index | 11,80 s | 6,06 s |
| SEO | 100 | 100 |

O LCP continua sendo o parágrafo `.hero__lead`. A sequência de abertura o revela apenas depois da animação. O usuário optou explicitamente por manter a sequência e os tempos atuais, portanto LCP abaixo de 2,5 segundos não é compatível com essa restrição. A melhoria restante exigiria exibir o conteúdo principal antes ou encurtar a abertura.

## Causas encontradas

- O canvas Three.js do hero era movido por `top`, `left`, `width` e `height`. Essa transição produzia quase todo o CLS.
- O Font Awesome completo tinha aproximadamente 1,47 MB e era processado para substituir poucos ícones.
- Google Fonts criava uma cadeia externa bloqueante.
- GSAP, ScrollTrigger, Lenis, cenas de toda a página e EmailJS eram solicitados no primeiro carregamento.
- As sete imagens dos projetos e a imagem da seção Sobre usavam `loading="eager"` e arquivos muito maiores que a exibição mobile.
- Three.js continua sendo a maior dependência inicial, pois é indispensável para a abertura escolhida. No mobile o próprio efeito já reduz partículas e resolução.
- O CSS do antigo condutor narrativo permanecia no arquivo, embora o componente correspondente não exista mais no HTML.

## Alterações realizadas

- Transição do canvas refeita com FLIP e `transform`, mantendo o visual e o tempo da abertura sem provocar relayout.
- Font Awesome substituído pelos mesmos vetores SVG diretamente no HTML.
- Fontes Sora e Plus Jakarta Sans hospedadas localmente em WOFF2 variável, com preload e `font-display: swap`.
- CSS consolidado em `assents/site.css`; o script `scripts/build-styles.mjs` mantém o arquivo gerado sincronizado.
- GSAP e Three.js mantidos nas mesmas versões e hospedados localmente.
- ScrollTrigger e cenas abaixo da dobra carregados apenas perto da seção de tecnologias; Lenis é carregado somente em desktop com ponteiro preciso.
- EmailJS carregado quando o formulário se aproxima da viewport ou recebe foco.
- Imagens abaixo da dobra usam lazy loading, `srcset`, `sizes` e versões WebP de 480 e 800 pixels.
- Logos convertidos para WebP sem perda visual.
- Ícones externos de tecnologias hospedados localmente para eliminar conexões adicionais.
- Código e CSS inativos do antigo condutor removidos do caminho de produção.

## Validação

- Lighthouse: Performance 82, Acessibilidade 96, Boas práticas 100 e SEO 100.
- Chrome: sem erros de JavaScript, sem overflow horizontal, canvas presente e conteúdo semanticamente acessível.
- Layout comparado em 390 px e 1440 px, nos temas claro e escuro: mesmos textos, dimensões de seções e tipografia.
- Sintaxe dos scripts, integridade do CSS gerado e `git diff --check` validados.

As pontuações Lighthouse podem variar entre execuções. Métricas reais devem ser acompanhadas no PageSpeed Insights/CrUX depois que a nova versão acumular tráfego.
