<div align="center">

# ⚡ JB DEV

**Site institucional da JB DEV: criação de sites e sistemas sob medida**

Página de apresentação da JB DEV, com serviços, processo de trabalho, depoimentos, FAQ e contato. Atendimento em Indaiatuba/SP e remoto.

[![Site](https://img.shields.io/badge/🌐_Acessar_site-jbdev.com.br-493eda?style=for-the-badge)](https://www.jbdev.com.br)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## ✨ Destaques

- 🚀 **Sem framework e sem build obrigatório**: HTML, CSS e JavaScript puros, leves e rápidos
- 🎬 **Animações** com GSAP + ScrollTrigger, rolagem suave com Lenis, partículas no hero e animações carregadas sob demanda
- 🌗 **Tema claro/escuro** com preferência salva
- 🌍 **Português e inglês** (`i18n.js`)
- 📬 **Formulário de contato** integrado ao EmailJS
- 🪪 **Cartão de visita digital** em [`/cartao`](https://www.jbdev.com.br/cartao), com contato para salvar (`.vcf`)
- 🔎 **SEO**: meta tags, `sitemap.xml` e `robots.txt`
- 🔐 **Cabeçalhos de segurança** e cache configurados no `vercel.json`
- 📱 Layout responsivo, pensado primeiro para o celular

## 🗂️ Estrutura

| Caminho | Função |
| --- | --- |
| `index.html` | Página principal |
| `assents/` | Estilos, fontes, ícones e imagens |
| `js/site-config.js` | Fonte única de dados de contato, EmailJS e SEO |
| `js/` | Tema, animações, i18n, formulário e interações |
| `cartao/` | Cartão de visita digital |
| `scripts/build-styles.mjs` | Geração opcional dos estilos |
| `docs/` | Auditorias de performance e SEO |

## 🚀 Como rodar localmente

É um site estático: basta servir a pasta.

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## ☁️ Deploy

Publicado na **Vercel** (`framework: null`). Cada push na branch principal gera um novo deploy.

---

<div align="center">

Desenvolvido por **[Jonathan Vinicius](https://github.com/Jonathanfullstack)**

</div>
