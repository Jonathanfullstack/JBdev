import type { Locale } from '@/lib/i18n';
import type { ServiceSlug } from './dictionaries/types';

// Conteúdo longo das páginas /servicos/[slug].
// Português é a versão completa (foco de SEO). Inglês e espanhol são condensados.

export type ServicePageContent = {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  lead: string;
  intro: string[];
  sections: { h2: string; body: string[]; list?: string[] }[];
  faq: [string, string][];
};

type Pages = Record<ServiceSlug, Record<Locale, ServicePageContent>>;

export const SERVICE_PAGES: Pages = {
  'criacao-de-sites': {
    pt: {
      metaTitle: 'Criação de Sites em Indaiatuba | JB DEV',
      metaDesc: 'Criação de sites profissionais, landing pages e lojas virtuais em Indaiatuba e região. Rápidos, otimizados pro Google e feitos pra gerar contato.',
      h1: 'Criação de sites em Indaiatuba que geram contato',
      lead: 'Sites institucionais, landing pages e lojas virtuais rápidos, bonitos e otimizados pro Google — feitos por quem escreve o código, do briefing ao ar.',
      intro: [
        'Um site não deveria ser só um cartão de visitas bonito. Quando alguém procura pelo seu serviço no Google, o seu site precisa aparecer, carregar rápido no celular, explicar em segundos o que você faz e deixar o próximo passo óbvio: chamar no WhatsApp, pedir um orçamento ou comprar.',
        'Na JB DEV, a criação de sites começa pelo seu objetivo de negócio, não pelo template. A gente entende quem é o seu cliente, o que ele procura e o que faz ele confiar em você. Depois disso, desenha e programa um site sob medida, com código próprio, pensado pra ser encontrado e pra virar contato.',
      ],
      sections: [
        {
          h2: 'Que tipo de site a sua empresa precisa?',
          body: [
            'Nem todo negócio precisa do mesmo site. Antes de qualquer proposta, a gente ajuda você a escolher o formato que resolve o seu momento:',
          ],
          list: [
            'Site institucional: apresenta a empresa, os serviços, a equipe e a forma de contato. Ideal para clínicas, escritórios, estúdios e prestadores de serviço que precisam passar credibilidade.',
            'Landing page: uma página focada em uma única oferta ou campanha, com mensagem direta e um só botão de ação. Funciona muito bem com anúncios e lançamentos.',
            'Loja virtual: catálogo, carrinho e integração com WhatsApp ou pagamento online, para vender todos os dias, inclusive fora do horário comercial.',
            'Cardápio ou catálogo digital: navegação por categorias e busca, para facilitar pedidos sem depender de PDF ou foto no direct.',
          ],
        },
        {
          h2: 'Como um site aparece no Google em Indaiatuba?',
          body: [
            'Aparecer no Google começa no código. Cada página do site tem título e descrição pensados para o que as pessoas realmente digitam, hierarquia correta de títulos, imagens leves com texto alternativo e dados estruturados que ajudam o Google a entender quem você é, onde atende e o que oferece.',
            'Para negócios locais, a gente também configura o SEO local: nome, endereço e telefone iguais em todo lugar, páginas que falam da região atendida e um site preparado para conversar com o seu Perfil da Empresa no Google. É esse conjunto que ajuda a sua empresa a aparecer quando alguém busca o seu serviço em Indaiatuba, Campinas, Itu, Salto ou Sorocaba.',
          ],
        },
        {
          h2: 'Por que velocidade e celular fazem tanta diferença?',
          body: [
            'A maior parte das visitas chega pelo celular, muitas vezes com internet instável. Um site lento faz a pessoa voltar para a busca e clicar no concorrente. Por isso, todo site da JB DEV é desenvolvido primeiro para o celular, com imagens otimizadas, fontes carregadas do jeito certo e só o código necessário.',
            'Isso também conta para o Google, que leva em consideração a experiência de quem visita a página. Um site rápido não é detalhe técnico: é parte de como você é encontrado.',
          ],
        },
        {
          h2: 'O que acontece depois que o site vai ao ar?',
          body: [
            'O site é seu: código, domínio e acessos ficam com você. A gente publica, configura hospedagem e domínio, testa formulários e integrações e orienta como acompanhar os contatos que chegam. Se quiser, seguimos juntos com suporte e evolução contínua — novas páginas, ajustes de texto, melhorias de desempenho e otimizações a partir do que os dados mostrarem.',
          ],
        },
      ],
      faq: [
        ['Quanto custa a criação de um site?', 'Depende do tipo de site, do número de páginas e dos recursos. Depois do briefing você recebe uma proposta fechada, sem surpresa. Projetos a partir de [R$ 0.000].'],
        ['Em quanto tempo o site fica pronto?', 'Sites institucionais e landing pages costumam ficar prontos em cerca de [X] semanas, dependendo do conteúdo e das aprovações.'],
        ['Vocês escrevem os textos do site?', 'Sim. A gente organiza a mensagem a partir do briefing e escreve os textos pensando no seu cliente e nas buscas do Google. Você revisa e aprova tudo.'],
        ['Consigo editar o site depois?', 'Sim. Quando faz sentido, o site vem com um painel para editar textos e fotos. Também é possível contratar suporte para as mudanças maiores.'],
        ['Vocês atendem fora de Indaiatuba?', 'Sim. Atendemos presencialmente em Indaiatuba e região e de forma remota em todo o Brasil.'],
      ],
    },
    en: {
      metaTitle: 'Website Development | JB DEV',
      metaDesc: 'Business websites, landing pages and online stores that are fast, search-optimized and built to generate leads. Custom code, from brief to launch.',
      h1: 'Website development that generates leads',
      lead: 'Business websites, landing pages and online stores — fast, beautiful and search-optimized, built by the people who write the code.',
      intro: [
        'A website shouldn’t just look nice. When someone searches for your service, your site must show up, load fast on mobile, explain what you do in seconds and make the next step obvious.',
        'At JB DEV, every website starts from your business goal, not a template. We design and code it from scratch, optimized for search and for conversion.',
      ],
      sections: [
        {
          h2: 'Which kind of website do you need?',
          body: ['We help you choose the format that fits your moment:'],
          list: [
            'Business website: presents your company, services and how to reach you.',
            'Landing page: one offer, one message, one call to action — great for ads and launches.',
            'Online store: catalog, cart and WhatsApp or online payment integration.',
          ],
        },
        {
          h2: 'Built to be found',
          body: ['Page titles, structured data, fast loading and mobile-first design are part of every project, so search engines understand who you are and what you offer. The code, domain and access are yours.'],
        },
      ],
      faq: [
        ['How much does a website cost?', 'It depends on scope. After the brief you get a fixed proposal. Projects from [R$ 0.000].'],
        ['How long does it take?', 'Business websites and landing pages usually take about [X] weeks.'],
        ['Do you work remotely?', 'Yes. We work remotely with clients anywhere, with online meetings at every step.'],
      ],
    },
    es: {
      metaTitle: 'Desarrollo de sitios web | JB DEV',
      metaDesc: 'Sitios institucionales, landing pages y tiendas online rápidos, optimizados para Google y hechos para generar contactos. Código propio, del briefing al aire.',
      h1: 'Desarrollo de sitios web que generan contactos',
      lead: 'Sitios institucionales, landing pages y tiendas online rápidos, bonitos y optimizados para Google, hechos por quien escribe el código.',
      intro: [
        'Un sitio no debería ser solo una tarjeta bonita. Cuando alguien busca tu servicio, tu sitio tiene que aparecer, cargar rápido en el móvil, explicar en segundos lo que haces y dejar claro el próximo paso.',
        'En JB DEV cada sitio empieza por el objetivo de tu negocio, no por una plantilla. Lo diseñamos y programamos a medida, pensado para ser encontrado y convertir.',
      ],
      sections: [
        {
          h2: '¿Qué tipo de sitio necesitas?',
          body: ['Te ayudamos a elegir el formato que resuelve tu momento:'],
          list: [
            'Sitio institucional: presenta la empresa, los servicios y la forma de contacto.',
            'Landing page: una oferta, un mensaje y un solo botón de acción — ideal para anuncios.',
            'Tienda online: catálogo, carrito e integración con WhatsApp o pago online.',
          ],
        },
        {
          h2: 'Hecho para ser encontrado',
          body: ['Títulos por página, datos estructurados, carga rápida y diseño pensado primero para el móvil forman parte de cada proyecto. El código, el dominio y los accesos son tuyos.'],
        },
      ],
      faq: [
        ['¿Cuánto cuesta un sitio?', 'Depende del alcance. Después del briefing recibes una propuesta cerrada. Proyectos desde [R$ 0.000].'],
        ['¿En cuánto tiempo está listo?', 'Sitios institucionales y landing pages suelen tardar unas [X] semanas.'],
        ['¿Trabajan de forma remota?', 'Sí. Atendemos de forma remota, con reuniones online en cada etapa.'],
      ],
    },
  },

  'sistemas-sob-medida': {
    pt: {
      metaTitle: 'Sistema Sob Medida para Empresas | JB DEV',
      metaDesc: 'Sistema sob medida para empresas: clientes, vendas, estoque, agenda e CRM personalizado com as regras do seu negócio. Indaiatuba e todo o Brasil.',
      h1: 'Sistema sob medida com as regras do seu negócio',
      lead: 'Clientes, vendas, estoque, agenda e financeiro num painel só — desenvolvido do zero para o jeito que a sua empresa trabalha.',
      intro: [
        'Planilhas, cadernos, grupos de WhatsApp e a memória de quem está há mais tempo na empresa: é assim que muitos negócios funcionam até o dia em que a informação se perde, o estoque não bate ou ninguém sabe quanto foi vendido no mês.',
        'Um sistema sob medida resolve isso organizando os dados e as rotinas da sua empresa num único lugar, com as regras que você já usa. Em vez de adaptar o seu processo a um software genérico, o software é que se adapta ao seu processo.',
      ],
      sections: [
        {
          h2: 'O que um sistema de gestão personalizado pode fazer?',
          body: ['Cada sistema nasce do seu dia a dia, mas alguns módulos aparecem em quase todo projeto:'],
          list: [
            'Cadastro de clientes com histórico de compras, atendimentos e conversas.',
            'Vendas, orçamentos e controle de estoque integrados.',
            'Agenda de serviços, profissionais e horários, com confirmação para o cliente.',
            'CRM com funil de vendas, propostas e follow-ups, como no JB CRM.',
            'Relatórios e indicadores para decidir com números reais.',
            'Acesso por perfil: cada pessoa da equipe vê e faz só o que precisa.',
          ],
        },
        {
          h2: 'Sistema pronto ou sistema sob medida: qual escolher?',
          body: [
            'Sistemas prontos funcionam bem quando o seu processo é igual ao de todo mundo. O problema começa quando a sua empresa tem regras próprias — um jeito específico de orçar, de agendar, de comissionar a equipe — e você passa a criar gambiarras para encaixar o negócio no software.',
            'O sistema sob medida faz sentido quando essas adaptações custam tempo todos os dias, quando você paga por vários sistemas que não conversam entre si ou quando a operação já não cabe mais nas planilhas. No briefing, a gente avalia com sinceridade qual caminho resolve melhor o seu caso.',
          ],
        },
        {
          h2: 'Como é desenvolvido um sistema web para empresas?',
          body: [
            'Começamos mapeando o processo atual: quem faz o quê, onde estão os dados e onde estão os gargalos. Depois você vê e aprova as telas num protótipo antes de qualquer linha de código. O desenvolvimento acontece em entregas frequentes, para você usar e dar retorno desde cedo, e a migração dos dados das planilhas é planejada para não parar a operação.',
            'Os sistemas rodam no navegador, funcionam no computador e no celular e podem se integrar a outras ferramentas, como WhatsApp, meios de pagamento e emissores de nota.',
          ],
        },
        {
          h2: 'E a segurança dos dados?',
          body: [
            'Cada pessoa entra com o próprio login, os acessos são definidos por perfil e os dados ficam em banco de dados com backup. O código é seu ao fim do projeto, e a gente segue disponível para suporte, correções e novas funcionalidades conforme a empresa cresce.',
          ],
        },
      ],
      faq: [
        ['Quanto custa um sistema sob medida?', 'Depende dos módulos e das integrações. Depois do briefing você recebe uma proposta fechada, com escopo e prazo. Projetos a partir de [R$ 0.000].'],
        ['Quanto tempo leva para ficar pronto?', 'Depende do escopo. As entregas são frequentes, então você começa a usar as primeiras partes antes do projeto inteiro terminar.'],
        ['Dá para importar os dados das minhas planilhas?', 'Sim. A migração é planejada junto com você para levar clientes, produtos e histórico para o sistema novo.'],
        ['O sistema funciona no celular?', 'Sim. Os sistemas são web e responsivos, funcionando no computador, tablet e celular.'],
        ['Vocês dão suporte depois da entrega?', 'Sim. Seguimos juntos com suporte, correções e evolução contínua.'],
      ],
    },
    en: {
      metaTitle: 'Custom Software for Businesses | JB DEV',
      metaDesc: 'Custom business software: customers, sales, inventory, scheduling and CRM built around your rules. Web-based, secure and yours.',
      h1: 'Custom software built around your business rules',
      lead: 'Customers, sales, inventory, scheduling and finance in one dashboard — built from scratch for the way your company works.',
      intro: [
        'Spreadsheets, notebooks and chat groups work until information gets lost. Custom software organizes your data and routines in one place, following the rules you already use.',
      ],
      sections: [
        {
          h2: 'What can it include?',
          body: ['Every system starts from your daily routine. Common modules:'],
          list: ['Customer records and history', 'Sales, quotes and inventory', 'Scheduling and team management', 'CRM with sales pipeline', 'Reports and role-based access'],
        },
        {
          h2: 'How we build it',
          body: ['We map your process, you approve a prototype, and development happens in frequent deliveries. Data migration is planned so your operation never stops. The code is yours.'],
        },
      ],
      faq: [
        ['How much does custom software cost?', 'It depends on modules and integrations. You get a fixed proposal after the brief. Projects from [R$ 0.000].'],
        ['Does it work on mobile?', 'Yes. Our systems are web-based and responsive.'],
        ['Can I import my spreadsheets?', 'Yes. We plan the data migration with you.'],
      ],
    },
    es: {
      metaTitle: 'Sistema a medida para empresas | JB DEV',
      metaDesc: 'Desarrollo de sistemas a medida: clientes, ventas, stock, agenda y CRM con las reglas de tu negocio. Web, seguro y tuyo.',
      h1: 'Sistema a medida con las reglas de tu negocio',
      lead: 'Clientes, ventas, stock, agenda y finanzas en un solo panel — desarrollado desde cero para la forma en que trabaja tu empresa.',
      intro: [
        'Hojas de cálculo, cuadernos y grupos de chat funcionan hasta que la información se pierde. Un sistema a medida organiza tus datos y rutinas en un solo lugar, con las reglas que ya usas.',
      ],
      sections: [
        {
          h2: '¿Qué puede incluir?',
          body: ['Cada sistema nace de tu día a día. Módulos frecuentes:'],
          list: ['Registro de clientes e historial', 'Ventas, presupuestos y stock', 'Agenda y gestión del equipo', 'CRM con embudo de ventas', 'Informes y acceso por perfil'],
        },
        {
          h2: 'Cómo lo construimos',
          body: ['Mapeamos tu proceso, apruebas un prototipo y el desarrollo avanza con entregas frecuentes. La migración de datos se planifica para no detener la operación. El código es tuyo.'],
        },
      ],
      faq: [
        ['¿Cuánto cuesta un sistema a medida?', 'Depende de los módulos e integraciones. Recibes una propuesta cerrada después del briefing. Proyectos desde [R$ 0.000].'],
        ['¿Funciona en el móvil?', 'Sí. Los sistemas son web y responsivos.'],
        ['¿Puedo importar mis hojas de cálculo?', 'Sí. Planificamos la migración contigo.'],
      ],
    },
  },

  'automacao-e-ia': {
    pt: {
      metaTitle: 'Automação de WhatsApp com IA | JB DEV',
      metaDesc: 'Automação de WhatsApp e chatbot com IA para empresas: respostas, agendamentos, lembretes e cobranças no automático, com passagem para atendente humano.',
      h1: 'Automação de WhatsApp com IA para o seu atendimento',
      lead: 'Um assistente que responde dúvidas, agenda horários, envia lembretes e chama a sua equipe quando precisa — 24 horas por dia, com a voz da sua marca.',
      intro: [
        'Se o WhatsApp da sua empresa virou um segundo expediente, você não está sozinho. Grande parte das conversas segue um padrão: horário de funcionamento, preço, endereço, disponibilidade de agenda, segunda via de boleto. E tudo que segue padrão pode ser automatizado.',
        'A automação de WhatsApp da JB DEV combina regras claras com inteligência artificial para tirar o trabalho repetitivo das suas mãos, sem perder o toque humano quando a conversa pede alguém de verdade.',
      ],
      sections: [
        {
          h2: 'O que dá para automatizar no WhatsApp?',
          body: ['Os pontos que mais tomam tempo da equipe costumam ser os primeiros a automatizar:'],
          list: [
            'Respostas para perguntas frequentes, com informações sempre atualizadas.',
            'Agendamento sem troca de mensagens, consultando a agenda em tempo real.',
            'Lembretes e confirmações de horário, para reduzir faltas.',
            'Cobranças e envio de segunda via com link de pagamento.',
            'Triagem: entender o que a pessoa precisa e encaminhar para a pessoa certa, com o histórico completo.',
          ],
        },
        {
          h2: 'Chatbot com IA ou automação com regras?',
          body: [
            'Automações com regras são previsíveis e ótimas para fluxos fechados, como confirmar um horário. Um chatbot com IA entende perguntas escritas de jeitos diferentes e responde com naturalidade a partir das informações do seu negócio.',
            'Na prática, os melhores resultados vêm da combinação dos dois: a IA conversa e entende a intenção, e as regras garantem que ações importantes — marcar, cobrar, cancelar — aconteçam do jeito certo. Quando a IA não tem certeza, a conversa vai para um humano.',
          ],
        },
        {
          h2: 'Como a automação se conecta aos seus sistemas?',
          body: [
            'Usamos a API oficial do WhatsApp e integramos a automação à sua agenda, ao seu sistema de gestão, ao CRM e aos meios de pagamento. Assim o assistente consulta horários reais, registra o atendimento no histórico do cliente e avisa a equipe no canal certo.',
            'Também dá para automatizar tarefas que não passam pelo WhatsApp: integrar sistemas que hoje não conversam, gerar relatórios automáticos e eliminar o retrabalho de copiar dados de um lugar para o outro.',
          ],
        },
        {
          h2: 'Como começar sem riscos?',
          body: [
            'A gente começa pela tarefa que você mais repete por dia, mede o resultado e só então expande. O assistente é treinado com as informações do seu negócio, aprovado por você antes de ir ao ar e acompanhado de perto nas primeiras semanas.',
            'Antes de qualquer automação, fazemos um levantamento simples: quais mensagens chegam com mais frequência, em que horários, quem responde hoje e quanto tempo isso leva. Com esse retrato em mãos, fica claro onde a automação devolve mais horas para a equipe — e onde o atendimento humano deve continuar sendo o protagonista.',
          ],
        },
        {
          h2: 'Para quais negócios a automação de WhatsApp faz mais sentido?',
          body: [
            'Clínicas, consultórios, salões, barbearias, academias, escolas, imobiliárias, oficinas e lojas que vendem pelo WhatsApp costumam ter o mesmo padrão: muitas perguntas repetidas, agendamentos e confirmações todos os dias. Nesses casos, automatizar o atendimento libera a equipe e melhora a experiência de quem chama, principalmente fora do horário comercial.',
          ],
        },
      ],
      faq: [
        ['Preciso trocar o número do WhatsApp?', 'Depende da solução. Em muitos casos dá para usar o número atual com a API oficial do WhatsApp. Avaliamos isso no briefing.'],
        ['A IA pode responder algo errado?', 'O assistente responde a partir das informações que você aprova e passa para um humano quando não tem certeza. As respostas são revisadas antes de ir ao ar.'],
        ['Quanto custa uma automação de WhatsApp?', 'Depende dos fluxos e das integrações. Depois do briefing você recebe uma proposta fechada. Projetos a partir de [R$ 0.000].'],
        ['Meus clientes vão saber que é um robô?', 'Recomendamos ser transparente: o assistente se apresenta e oferece falar com uma pessoa a qualquer momento.'],
      ],
    },
    en: {
      metaTitle: 'WhatsApp Automation with AI | JB DEV',
      metaDesc: 'WhatsApp automation and AI chatbots for businesses: answers, booking, reminders and billing on autopilot, with hand-off to a human agent.',
      h1: 'WhatsApp automation with AI for your customer service',
      lead: 'An assistant that answers questions, books appointments, sends reminders and calls your team when needed — 24/7, in your brand’s voice.',
      intro: [
        'Most WhatsApp conversations follow a pattern: opening hours, prices, address, availability, invoices. Anything that follows a pattern can be automated — without losing the human touch.',
      ],
      sections: [
        {
          h2: 'What can be automated?',
          body: ['Usually the first things to automate:'],
          list: ['FAQ answers', 'Booking from real-time availability', 'Reminders and confirmations', 'Billing and payment links', 'Triage and hand-off to the right person'],
        },
        {
          h2: 'AI plus rules',
          body: ['AI understands intent and talks naturally; rules make sure important actions happen correctly. When the AI isn’t sure, a human takes over. We use the official WhatsApp API and integrate with your calendar, CRM and payments.'],
        },
      ],
      faq: [
        ['Can the AI give wrong answers?', 'It answers from information you approve and hands off to a human when unsure.'],
        ['How much does it cost?', 'It depends on flows and integrations. Projects from [R$ 0.000].'],
      ],
    },
    es: {
      metaTitle: 'Automatización de WhatsApp con IA | JB DEV',
      metaDesc: 'Automatización de WhatsApp y chatbot con IA para empresas: respuestas, reservas, recordatorios y cobros en automático, con derivación a un humano.',
      h1: 'Automatización de WhatsApp con IA para tu atención',
      lead: 'Un asistente que responde dudas, agenda horarios, envía recordatorios y llama a tu equipo cuando hace falta — 24 horas, con la voz de tu marca.',
      intro: [
        'La mayoría de las conversaciones de WhatsApp sigue un patrón: horarios, precios, dirección, disponibilidad, facturas. Todo lo que sigue un patrón se puede automatizar, sin perder el toque humano.',
      ],
      sections: [
        {
          h2: '¿Qué se puede automatizar?',
          body: ['Lo primero que solemos automatizar:'],
          list: ['Respuestas a preguntas frecuentes', 'Reservas con la agenda en tiempo real', 'Recordatorios y confirmaciones', 'Cobros y enlaces de pago', 'Triaje y derivación a la persona correcta'],
        },
        {
          h2: 'IA más reglas',
          body: ['La IA entiende la intención y conversa con naturalidad; las reglas garantizan que las acciones importantes ocurran bien. Si la IA no está segura, una persona toma la conversación. Usamos la API oficial de WhatsApp e integramos agenda, CRM y pagos.'],
        },
      ],
      faq: [
        ['¿La IA puede responder algo incorrecto?', 'Responde a partir de la información que apruebas y deriva a un humano cuando no está segura.'],
        ['¿Cuánto cuesta?', 'Depende de los flujos e integraciones. Proyectos desde [R$ 0.000].'],
      ],
    },
  },

  aplicativos: {
    pt: {
      metaTitle: 'Desenvolvimento de Aplicativos para Empresas | JB DEV',
      metaDesc: 'Desenvolvimento de aplicativos iOS, Android e PWA para empresas: app de fidelidade, agendamento, pedidos e área do cliente, com a sua marca.',
      h1: 'Desenvolvimento de aplicativos para empresas',
      lead: 'Apps para iOS e Android — ou PWA — com a sua marca, pensados para fidelizar clientes, facilitar pedidos e colocar o seu negócio no bolso de quem compra de você.',
      intro: [
        'Um aplicativo faz sentido quando o cliente volta com frequência: para agendar, pedir, acompanhar um serviço, acumular pontos ou acessar a própria conta. Nesses casos, ter o seu negócio a um toque de distância muda a relação com quem compra de você.',
        'Na JB DEV, o desenvolvimento de aplicativos começa por uma pergunta honesta: você precisa mesmo de um app, ou um site bem feito resolve? Quando o app faz sentido, a gente desenha a experiência, desenvolve e publica nas lojas.',
      ],
      sections: [
        {
          h2: 'Quando criar um app para a sua empresa?',
          body: ['Alguns sinais de que um aplicativo pode trazer resultado:'],
          list: [
            'Seus clientes compram ou agendam com frequência.',
            'Você quer um canal direto com a sua base, com notificações.',
            'Existe um programa de fidelidade ou uma área do cliente.',
            'A equipe em campo precisa registrar informações pelo celular.',
          ],
        },
        {
          h2: 'App nativo, híbrido ou PWA: qual a diferença?',
          body: [
            'Apps nativos e híbridos são instalados pelas lojas da Apple e do Google e têm acesso completo aos recursos do celular. Um PWA é um site que se comporta como aplicativo: pode ser instalado na tela inicial, funciona offline em partes e não depende de aprovação nas lojas.',
            'Cada formato tem custo, prazo e alcance diferentes. No briefing, a gente compara as opções para o seu caso e recomenda o caminho mais simples que resolve o problema.',
          ],
        },
        {
          h2: 'Como é o processo de desenvolvimento?',
          body: [
            'Primeiro desenhamos as telas e o fluxo principal e validamos com você num protótipo navegável. Depois desenvolvemos em entregas frequentes, integrando login, pagamentos, notificações e o seu sistema de gestão quando necessário. Por fim, publicamos nas lojas e acompanhamos as primeiras versões.',
            'A primeira versão do app deve ser enxuta: o fluxo que o cliente mais usa, bem resolvido, rápido e estável. Com o app no ar, os dados de uso mostram o que priorizar nas próximas versões — em vez de apostar em funcionalidades que talvez ninguém use.',
          ],
        },
        {
          h2: 'O que acontece depois da publicação?',
          body: [
            'Um aplicativo precisa de cuidado contínuo. A Apple e o Google lançam novas versões dos sistemas todos os anos, e o app precisa acompanhar. Oferecemos suporte para atualizações, correções e novas funcionalidades, além de acompanhar as avaliações nas lojas para entender o que os seus clientes estão achando. O código e as contas ficam em nome da sua empresa.',
          ],
        },
        {
          h2: 'Ainda não temos um app publicado no portfólio',
          body: [
            'Os projetos que estão no ar hoje são sites, lojas virtuais e sistemas web — várias dessas soluções já funcionam no celular como aplicativos web. Se você tem um projeto de app, a conversa começa com o mesmo cuidado: entender o negócio antes de falar em tecnologia.',
          ],
        },
      ],
      faq: [
        ['Quanto custa criar um aplicativo?', 'Depende das funcionalidades, das integrações e do formato (nativo, híbrido ou PWA). Depois do briefing você recebe uma proposta fechada. Projetos a partir de [R$ 0.000].'],
        ['Vocês publicam o app nas lojas?', 'Sim. Cuidamos da publicação na App Store e no Google Play, usando a conta de desenvolvedor da sua empresa.'],
        ['Um PWA aparece nas lojas?', 'Normalmente não. O PWA é instalado direto pelo navegador, o que reduz custo e prazo.'],
        ['O app pode se integrar ao meu sistema?', 'Sim. O app pode usar os mesmos dados do seu sistema de gestão, loja ou CRM.'],
      ],
    },
    en: {
      metaTitle: 'Mobile App Development for Businesses | JB DEV',
      metaDesc: 'iOS, Android and PWA app development for businesses: loyalty, booking, ordering and customer areas, with your brand.',
      h1: 'Mobile app development for businesses',
      lead: 'iOS and Android apps — or PWAs — with your brand, designed to build loyalty, simplify orders and put your business in your customer’s pocket.',
      intro: [
        'An app makes sense when customers come back often: to book, order, track a service or collect points. We start with an honest question: do you really need an app, or does a great website solve it?',
      ],
      sections: [
        {
          h2: 'Native, hybrid or PWA?',
          body: ['Native and hybrid apps are installed from the stores and use all phone features. A PWA is a website that behaves like an app, installed from the browser. We compare cost, timeline and reach for your case.'],
        },
        {
          h2: 'No app in our portfolio yet',
          body: ['Our live projects today are websites, online stores and web systems — many already work on mobile like web apps. App projects start with the same care: understanding the business first.'],
        },
      ],
      faq: [
        ['How much does an app cost?', 'It depends on features and format. Projects from [R$ 0.000].'],
        ['Do you publish to the stores?', 'Yes, using your company’s developer account.'],
      ],
    },
    es: {
      metaTitle: 'Desarrollo de aplicaciones para empresas | JB DEV',
      metaDesc: 'Desarrollo de apps iOS, Android y PWA para empresas: fidelidad, reservas, pedidos y área del cliente, con tu marca.',
      h1: 'Desarrollo de aplicaciones para empresas',
      lead: 'Apps para iOS y Android — o PWA — con tu marca, pensadas para fidelizar clientes, facilitar pedidos y poner tu negocio en el bolsillo del cliente.',
      intro: [
        'Una app tiene sentido cuando el cliente vuelve con frecuencia: para reservar, pedir, seguir un servicio o acumular puntos. Empezamos con una pregunta honesta: ¿de verdad necesitas una app o un buen sitio lo resuelve?',
      ],
      sections: [
        {
          h2: '¿Nativa, híbrida o PWA?',
          body: ['Las apps nativas e híbridas se instalan desde las tiendas y usan todos los recursos del móvil. Una PWA es un sitio que se comporta como app y se instala desde el navegador. Comparamos costo, plazo y alcance para tu caso.'],
        },
        {
          h2: 'Aún no hay apps en el portafolio',
          body: ['Los proyectos en línea hoy son sitios, tiendas online y sistemas web — muchos ya funcionan en el móvil como apps web. Los proyectos de app empiezan con el mismo cuidado: entender el negocio primero.'],
        },
      ],
      faq: [
        ['¿Cuánto cuesta una app?', 'Depende de las funciones y del formato. Proyectos desde [R$ 0.000].'],
        ['¿Publican en las tiendas?', 'Sí, con la cuenta de desarrollador de tu empresa.'],
      ],
    },
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES) as ServiceSlug[];
