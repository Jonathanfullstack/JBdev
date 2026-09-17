# Revisão de SEO — JB DEV

Data: 17/09/2026. Escopo: código local da home e do cartão, e leitura pública da home. Alterações ainda não publicadas.

## Diagnóstico

A base já contém canonical absoluto, robots permitindo rastreamento, sitemap com as duas páginas, H1 descritivo, HTML estático com conteúdo acessível sem renderização JavaScript, descrição, Open Graph e imagens com dimensões e texto alternativo. O domínio utilizado consistentemente no código é https://www.jbdev.com.br/, embora AGENTS.md ainda mencione o domínio antigo.

Não foi atribuída nota de SEO: sem Search Console e métricas de campo, não é possível confirmar indexação, posições, tráfego ou Core Web Vitals.

## Correções implementadas

- Título da home alinhado ao H1 e à intenção local: “Criação de Sites e Sistemas em Indaiatuba | JB DEV”. Atualizado também no Open Graph, Twitter e no retorno do seletor para português.
- Português como idioma inicial da home e do cartão, independentemente do idioma do navegador. A escolha manual de inglês e a preferência salva continuam funcionando. Uma mesma URL que muda de idioma automaticamente dificulta apresentar uma versão consistente aos mecanismos de busca.
- Cartão passou a consumir o e-mail e os dados estruturados de `js/site-config.js`. O e-mail anterior estava divergente. A exportação estática `.vcf` foi alinhada à configuração; deve continuar sendo atualizada quando os contatos mudarem.
- Grafo JSON-LD com empresa, fundador, website e página, usando identificadores conectados. O cartão é descrito como ProfilePage. Nenhum endereço de rua, avaliação ou horário de funcionamento foi inventado.
- Imagem de compartilhamento do cartão utiliza o mesmo arquivo social da home. Texto alternativo do Twitter acrescentado na home.
- Redirecionamentos permanentes de `/index.html` para `/` e de `/cartao/index.html` para `/cartao`, para consolidar URLs duplicadas.

## Próximas prioridades

1. **Desempenho da abertura:** a introdução esconde o conteúdo e bloqueia interação por vários segundos, com watchdog de 11 segundos. Medir LCP/INP/CLS em mobile e considerar exibir título e CTA imediatamente. A animação foi preservada nesta revisão.
2. **JavaScript:** `js/fontawesome.min.js` tem aproximadamente 1,4 MB em disco, antes de compressão. Considerar um subconjunto de ícones ou SVGs individuais. Medir também o custo das partículas e bibliotecas de animação.
3. **Publicação:** confirmar na Vercel os redirecionamentos acima, HTTPS, versão com/sem www, domínio antigo e resposta 404 para páginas inexistentes. A conexão HTTP direta não pôde ser verificada nesta sessão; não afirmar que esses comportamentos já estão corretos em produção.
4. **Search Console:** enviar o sitemap e inspecionar `/` e `/cartao`, verificando canonical escolhido, cobertura e métricas de campo. O acesso público à home não comprova indexação no Google.
5. **Conteúdo:** avaliar páginas próprias para serviços prioritários e estudos de caso reais, com escopo, soluções e resultados verificáveis. Uma lista de cidades/especialidades no rodapé não substitui conteúdo útil. Não criar páginas quase idênticas por cidade.
6. **Inglês:** caso se torne objetivo de aquisição orgânica, criar URLs próprias com conteúdo traduzido, canonical e hreflang correspondentes. Hoje EN é uma preferência de interface na mesma URL.
7. **Dados estruturados:** validar as URLs publicadas no Rich Results Test e Schema Markup Validator. JSON-LD válido não garante resultados enriquecidos; endereço incompleto pode limitar recursos de negócio local. Os schemas ainda são gerados por JavaScript, como já ocorria na home.

## Validação realizada

- Sintaxe dos três arquivos JavaScript alterados e JSON do Vercel.
- Execução de `site-config.js` em contexto simulado para home e cartão: quatro entidades, referências internas resolvidas e e-mail consistente.
- Verificação de H1 único na home, idioma padrão e título.
- Existência dos assets locais referenciados em ambas as páginas; atributos alt/width/height das imagens.
- Parsing do sitemap e `git diff --check`.
- Leitura pública da home confirmou que o conteúdo textual principal está acessível.

Limitações: testes visuais, toggle de tema, layout mobile e fluxo do formulário não foram concluídos no navegador por ausência de Chrome/Chromium no ambiente de automação. Nenhuma mensagem de contato foi enviada. Sem medição Lighthouse ou Core Web Vitals, sem consulta ao Search Console e sem deploy.

## Referências

- Google: sites multilíngues — https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- Google: consolidação de URLs duplicadas — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
