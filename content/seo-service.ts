import type { Locale } from '@/lib/i18n';

// Página /servicos/seo-google-meu-negocio. Tem estrutura própria (problemas, blocos
// de entrega e planos), por isso não usa o modelo de content/service-pages.ts.
// Planos sem preço mostram o botão de orçamento (ver PENDENCIAS.md).

export const SEO_SLUG = 'seo-google-meu-negocio';

export type SeoPlan = { name: string; desc: string; items: string[]; price?: string; featured?: boolean; msg: string };

export type SeoPageContent = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  waMessage: string;
  art: { query: string; result: string; meta: string; profile: string; profileMeta: string };
  problemEyebrow: string;
  problemTitle: string;
  problems: [string, string][];
  includesEyebrow: string;
  includesTitle: string;
  includesLead: string;
  blocks: { title: string; tag: string; items: string[] }[];
  process: { eyebrow: string; title: string; steps: [string, string][] };
  plansEyebrow: string;
  plansTitle: string;
  plansLead: string;
  featuredLabel: string;
  quote: string;
  plans: SeoPlan[];
  faqEyebrow: string;
  faqTitle: string;
  faq: [string, string][];
  cta: { eyebrow: string; title: string; text: string; button: string; message: string };
};

export const SEO_PAGE: Record<Locale, SeoPageContent> = {
  pt: {
    metaTitle: 'SEO e Google Meu Negócio | JB DEV',
    metaDesc: 'SEO local e Perfil da Empresa no Google para sua empresa aparecer nas buscas e no Maps da sua região. Peça um diagnóstico gratuito.',
    eyebrow: '// seo & google meu negócio',
    h1: 'Seja encontrado por quem procura o seu negócio no Google',
    lead: 'Otimizamos o seu site e criamos ou otimizamos o seu Perfil da Empresa no Google (o antigo Google Meu Negócio) para você aparecer nas buscas e no Google Maps.',
    ctaPrimary: 'Quero um diagnóstico gratuito',
    ctaSecondary: 'Ver o que está incluso',
    waMessage: 'Olá! Vi a página de SEO e Google Meu Negócio no site da JB DEV e quero um diagnóstico gratuito da minha empresa no Google.',
    art: {
      query: 'dentista perto de mim',
      result: 'Sua empresa',
      meta: 'Aberto agora · 1,2 km',
      profile: 'Perfil completo',
      profileMeta: 'Fotos · horários · serviços · avaliações',
    },
    problemEyebrow: '// o problema',
    problemTitle: 'O cliente está procurando. Só não está achando você.',
    problems: [
      ['Seu site não aparece no Google', 'Quem pesquisa pelo seu serviço chega em outros sites, porque o seu não foi preparado para ser lido e ranqueado pelo Google.'],
      ['O concorrente aparece primeiro no Maps', 'Clientes da sua região veem outras empresas no mapa e ligam para elas antes mesmo de saber que você existe.'],
      ['Seu perfil no Google está incompleto', 'Perfil desatualizado, sem fotos ou horários, com dados diferentes do site — ou que nem existe ainda.'],
    ],
    includesEyebrow: '// o que está incluso',
    includesTitle: 'Três frentes para você ser encontrado.',
    includesLead: 'SEO técnico, SEO on-page e Perfil da Empresa no Google trabalhando juntos: o site sustenta o perfil, e o perfil leva clientes ao site.',
    blocks: [
      {
        title: 'SEO técnico', tag: 'tec',
        items: [
          'Análise e melhoria de velocidade (Core Web Vitals)',
          'Versão mobile otimizada',
          'Configuração de sitemap.xml, robots.txt e HTTPS',
          'Dados estruturados (Schema.org)',
          'Configuração do Google Search Console e do Google Analytics',
        ],
      },
      {
        title: 'SEO on-page', tag: 'page',
        items: [
          'Pesquisa de palavras-chave do seu nicho e da sua região',
          'Otimização de títulos, meta descriptions, headings e URLs',
          'Otimização de imagens: peso, formato e texto alternativo',
          'Melhoria de textos e links internos',
        ],
      },
      {
        title: 'Google Meu Negócio', tag: 'maps',
        items: [
          'Criação e verificação do perfil, ou recuperação de um perfil existente',
          'Categorias certas, descrição otimizada, horários, área de atendimento, serviços e produtos',
          'Fotos e dados padronizados: nome, endereço e telefone iguais no site e no perfil',
          'Orientação para conseguir e responder avaliações',
          'Integração do mapa e do perfil com o site',
        ],
      },
    ],
    process: {
      eyebrow: '// como funciona',
      title: 'Do diagnóstico ao relatório, em quatro passos.',
      steps: [
        ['Diagnóstico', 'Analisamos o seu site e a sua presença no Google: o que já funciona e o que está te escondendo.'],
        ['Plano', 'Apresentamos o que será feito e em que ordem, começando pelo que traz resultado mais rápido.'],
        ['Execução', 'Aplicamos as melhorias no site e criamos ou ajustamos o seu Perfil da Empresa no Google.'],
        ['Acompanhamento', 'Você recebe um relatório com o antes e o depois e as próximas recomendações.'],
      ],
    },
    plansEyebrow: '// planos',
    plansTitle: 'Escolha por onde começar.',
    plansLead: 'Cada empresa está num ponto diferente. O diagnóstico mostra qual plano faz mais sentido para você.',
    featuredLabel: 'Recomendado',
    quote: 'Solicitar orçamento',
    plans: [
      {
        name: 'Google Meu Negócio',
        desc: 'Para aparecer no Google Maps e nas buscas da sua região.',
        items: [
          'Criação, verificação ou recuperação do perfil',
          'Categorias, descrição, horários, serviços e produtos',
          'Fotos e nome, endereço e telefone padronizados',
          'Orientação para conseguir e responder avaliações',
        ],
        msg: 'Olá! Quero um orçamento do plano Google Meu Negócio da JB DEV.',
      },
      {
        name: 'SEO + Google Meu Negócio',
        desc: 'Site e perfil otimizados juntos, para ser encontrado nas duas frentes.',
        featured: true,
        items: [
          'Tudo do plano Google Meu Negócio',
          'SEO técnico: velocidade, mobile, sitemap e dados estruturados',
          'SEO on-page com pesquisa de palavras-chave local',
          'Search Console e Analytics configurados',
          'Relatório com o antes e o depois',
        ],
        msg: 'Olá! Quero um orçamento do plano SEO + Google Meu Negócio da JB DEV.',
      },
      {
        name: 'Acompanhamento mensal',
        desc: 'Para manter o site e o perfil atualizados e evoluindo mês a mês.',
        items: [
          'Relatório mensal de buscas, cliques e contatos',
          'Atualização do perfil: fotos, horários, serviços e novidades',
          'Ajustes de textos e páginas conforme os dados',
          'Acompanhamento das avaliações',
        ],
        msg: 'Olá! Quero um orçamento do Acompanhamento mensal de SEO da JB DEV.',
      },
    ],
    faqEyebrow: '// dúvidas',
    faqTitle: 'Perguntas frequentes',
    faq: [
      ['Em quanto tempo vejo resultado?', 'SEO costuma levar de semanas a alguns meses, porque o Google precisa reler e reavaliar o site. O Perfil da Empresa no Google tende a trazer resultado mais rápido, já que um perfil completo e bem configurado passa a aparecer nas buscas locais e no Maps logo depois de verificado.'],
      ['Vocês garantem a primeira posição no Google?', 'Não. Ninguém pode garantir posição no Google — quem promete isso está prometendo algo que não controla. O que fazemos é aplicar boas práticas de SEO e SEO local e medir os resultados no Search Console, no Analytics e no próprio perfil, para você ver a evolução com dados.'],
      ['Preciso ter site para ter o Google Meu Negócio?', 'Não. O Perfil da Empresa no Google funciona sem site. Mas os dois juntos funcionam melhor: o site dá mais informação ao Google e ao cliente, e o perfil leva quem está perto direto até você.'],
      ['Meu site não foi feito pela JB DEV. Vocês atendem mesmo assim?', 'Sim. Começamos pelo diagnóstico do site atual, com acesso ao painel ou à hospedagem. Se a plataforma limitar alguma melhoria, explicamos o que dá para fazer nela e o que exigiria mudança, antes de qualquer proposta.'],
      ['Já tenho perfil no Google, mas perdi o acesso. Vocês ajudam a recuperar?', 'Sim. Ajudamos a pedir o acesso ao perfil pelo processo oficial do Google e, quando não é possível, orientamos a criar e verificar um novo perfil sem duplicar a empresa no Maps.'],
    ],
    cta: {
      eyebrow: '// vamos conversar',
      title: 'Vamos colocar sua empresa no mapa?',
      text: 'Mande uma mensagem e receba um diagnóstico gratuito de como sua empresa aparece hoje no Google.',
      button: 'Falar no WhatsApp',
      message: 'Olá! Quero colocar minha empresa no mapa. Pode fazer um diagnóstico de SEO e Google Meu Negócio?',
    },
  },

  en: {
    metaTitle: 'SEO & Google Business Profile | JB DEV',
    metaDesc: 'Local SEO and Google Business Profile so your business shows up in Google Search and Maps in your area. Ask for a free audit.',
    eyebrow: '// seo & google business profile',
    h1: 'Get found by people searching for your business on Google',
    lead: 'We optimize your website and create or optimize your Google Business Profile (formerly Google My Business) so you show up in search results and on Google Maps.',
    ctaPrimary: 'I want a free audit',
    ctaSecondary: 'See what’s included',
    waMessage: 'Hi! I saw the SEO & Google Business Profile page on the JB DEV website and I’d like a free audit of my business on Google.',
    art: {
      query: 'dentist near me',
      result: 'Your business',
      meta: 'Open now · 0.7 mi',
      profile: 'Complete profile',
      profileMeta: 'Photos · hours · services · reviews',
    },
    problemEyebrow: '// the problem',
    problemTitle: 'Customers are searching. They just aren’t finding you.',
    problems: [
      ['Your website doesn’t show up on Google', 'People searching for your service land on other sites, because yours wasn’t built to be read and ranked by Google.'],
      ['Competitors show up first on Maps', 'Local customers see other businesses on the map and call them before they even know you exist.'],
      ['Your Google profile is incomplete', 'Outdated, no photos or hours, details that don’t match your website — or no profile at all.'],
    ],
    includesEyebrow: '// what’s included',
    includesTitle: 'Three fronts to get you found.',
    includesLead: 'Technical SEO, on-page SEO and your Google Business Profile working together: the website supports the profile, and the profile brings customers to the website.',
    blocks: [
      {
        title: 'Technical SEO', tag: 'tec',
        items: [
          'Speed audit and improvements (Core Web Vitals)',
          'Optimized mobile version',
          'sitemap.xml, robots.txt and HTTPS setup',
          'Structured data (Schema.org)',
          'Google Search Console and Google Analytics setup',
        ],
      },
      {
        title: 'On-page SEO', tag: 'page',
        items: [
          'Keyword research for your niche and your area',
          'Optimized titles, meta descriptions, headings and URLs',
          'Image optimization: size, format and alt text',
          'Better copy and internal links',
        ],
      },
      {
        title: 'Google Business Profile', tag: 'maps',
        items: [
          'Profile creation and verification, or recovery of an existing one',
          'Right categories, optimized description, hours, service area, services and products',
          'Photos and consistent details: same name, address and phone on site and profile',
          'Guidance to get and reply to reviews',
          'Map and profile integrated with your website',
        ],
      },
    ],
    process: {
      eyebrow: '// how it works',
      title: 'From audit to report, in four steps.',
      steps: [
        ['Audit', 'We review your website and your presence on Google: what already works and what is hiding you.'],
        ['Plan', 'We present what will be done and in what order, starting with what brings results fastest.'],
        ['Execution', 'We apply the website improvements and create or fine-tune your Google Business Profile.'],
        ['Follow-up', 'You get a before-and-after report and the next recommendations.'],
      ],
    },
    plansEyebrow: '// plans',
    plansTitle: 'Choose where to start.',
    plansLead: 'Every business is at a different point. The audit shows which plan makes the most sense for you.',
    featuredLabel: 'Recommended',
    quote: 'Request a quote',
    plans: [
      {
        name: 'Google Business Profile',
        desc: 'To show up on Google Maps and in local searches.',
        items: [
          'Profile creation, verification or recovery',
          'Categories, description, hours, services and products',
          'Photos and consistent name, address and phone',
          'Guidance to get and reply to reviews',
        ],
        msg: 'Hi! I’d like a quote for the JB DEV Google Business Profile plan.',
      },
      {
        name: 'SEO + Google Business Profile',
        desc: 'Website and profile optimized together, to be found on both fronts.',
        featured: true,
        items: [
          'Everything in the Google Business Profile plan',
          'Technical SEO: speed, mobile, sitemap and structured data',
          'On-page SEO with local keyword research',
          'Search Console and Analytics set up',
          'Before-and-after report',
        ],
        msg: 'Hi! I’d like a quote for the JB DEV SEO + Google Business Profile plan.',
      },
      {
        name: 'Monthly follow-up',
        desc: 'To keep your website and profile up to date and improving month after month.',
        items: [
          'Monthly report on searches, clicks and leads',
          'Profile updates: photos, hours, services and news',
          'Copy and page adjustments based on the data',
          'Review monitoring',
        ],
        msg: 'Hi! I’d like a quote for the JB DEV monthly SEO follow-up.',
      },
    ],
    faqEyebrow: '// questions',
    faqTitle: 'Frequently asked questions',
    faq: [
      ['How long until I see results?', 'SEO usually takes from a few weeks to a few months, because Google needs to recrawl and re-evaluate the website. A Google Business Profile tends to bring results faster: a complete, well-configured profile starts showing in local searches and on Maps soon after it is verified.'],
      ['Do you guarantee the first position on Google?', 'No. Nobody can guarantee a position on Google — whoever promises that is promising something they don’t control. We apply SEO and local SEO best practices and measure results in Search Console, Analytics and the profile itself, so you can follow the progress with data.'],
      ['Do I need a website to have a Google Business Profile?', 'No. A Google Business Profile works without a website. But the two work better together: the website gives Google and customers more information, and the profile brings nearby people straight to you.'],
      ['My website wasn’t built by JB DEV. Can you still help?', 'Yes. We start with an audit of your current website, with access to its dashboard or hosting. If the platform limits an improvement, we explain what can be done on it and what would require a change, before any proposal.'],
      ['I have a Google profile but lost access. Can you help me recover it?', 'Yes. We help you request access to the profile through Google’s official process and, when that isn’t possible, guide you to create and verify a new profile without duplicating your business on Maps.'],
    ],
    cta: {
      eyebrow: '// let’s talk',
      title: 'Shall we put your business on the map?',
      text: 'Send a message and get a free audit of how your business shows up on Google today.',
      button: 'Chat on WhatsApp',
      message: 'Hi! I want to put my business on the map. Could you do an SEO & Google Business Profile audit?',
    },
  },

  es: {
    metaTitle: 'SEO y Perfil de Empresa en Google | JB DEV',
    metaDesc: 'SEO local y Perfil de Empresa en Google para que tu negocio aparezca en las búsquedas y en Maps de tu zona. Pide un diagnóstico gratuito.',
    eyebrow: '// seo & google business profile',
    h1: 'Que te encuentre en Google quien busca tu negocio',
    lead: 'Optimizamos tu sitio y creamos u optimizamos tu Perfil de Empresa en Google (antes Google My Business) para que aparezcas en las búsquedas y en Google Maps.',
    ctaPrimary: 'Quiero un diagnóstico gratuito',
    ctaSecondary: 'Ver qué incluye',
    waMessage: '¡Hola! Vi la página de SEO y Perfil de Empresa en Google en el sitio de JB DEV y quiero un diagnóstico gratuito de mi negocio en Google.',
    art: {
      query: 'dentista cerca de mí',
      result: 'Tu negocio',
      meta: 'Abierto ahora · 1,2 km',
      profile: 'Perfil completo',
      profileMeta: 'Fotos · horarios · servicios · reseñas',
    },
    problemEyebrow: '// el problema',
    problemTitle: 'El cliente está buscando. Solo que no te encuentra.',
    problems: [
      ['Tu sitio no aparece en Google', 'Quien busca tu servicio llega a otros sitios, porque el tuyo no fue preparado para que Google lo lea y lo posicione.'],
      ['La competencia aparece primero en Maps', 'Los clientes de tu zona ven otras empresas en el mapa y las llaman antes de saber que existes.'],
      ['Tu perfil en Google está incompleto', 'Desactualizado, sin fotos ni horarios, con datos distintos a los del sitio — o que ni siquiera existe.'],
    ],
    includesEyebrow: '// qué incluye',
    includesTitle: 'Tres frentes para que te encuentren.',
    includesLead: 'SEO técnico, SEO on-page y Perfil de Empresa en Google trabajando juntos: el sitio respalda el perfil y el perfil lleva clientes al sitio.',
    blocks: [
      {
        title: 'SEO técnico', tag: 'tec',
        items: [
          'Análisis y mejora de velocidad (Core Web Vitals)',
          'Versión móvil optimizada',
          'Configuración de sitemap.xml, robots.txt y HTTPS',
          'Datos estructurados (Schema.org)',
          'Configuración de Google Search Console y Google Analytics',
        ],
      },
      {
        title: 'SEO on-page', tag: 'page',
        items: [
          'Investigación de palabras clave de tu nicho y tu zona',
          'Optimización de títulos, meta descriptions, encabezados y URLs',
          'Optimización de imágenes: peso, formato y texto alternativo',
          'Mejora de textos y enlaces internos',
        ],
      },
      {
        title: 'Perfil de Empresa en Google', tag: 'maps',
        items: [
          'Creación y verificación del perfil, o recuperación de uno existente',
          'Categorías correctas, descripción optimizada, horarios, zona de servicio, servicios y productos',
          'Fotos y datos coherentes: mismo nombre, dirección y teléfono en el sitio y en el perfil',
          'Orientación para conseguir y responder reseñas',
          'Integración del mapa y del perfil con el sitio',
        ],
      },
    ],
    process: {
      eyebrow: '// cómo funciona',
      title: 'Del diagnóstico al informe, en cuatro pasos.',
      steps: [
        ['Diagnóstico', 'Analizamos tu sitio y tu presencia en Google: lo que ya funciona y lo que te está escondiendo.'],
        ['Plan', 'Presentamos qué se hará y en qué orden, empezando por lo que da resultado más rápido.'],
        ['Ejecución', 'Aplicamos las mejoras en el sitio y creamos o ajustamos tu Perfil de Empresa en Google.'],
        ['Seguimiento', 'Recibes un informe con el antes y el después y las próximas recomendaciones.'],
      ],
    },
    plansEyebrow: '// planes',
    plansTitle: 'Elige por dónde empezar.',
    plansLead: 'Cada empresa está en un punto distinto. El diagnóstico muestra qué plan tiene más sentido para ti.',
    featuredLabel: 'Recomendado',
    quote: 'Solicitar presupuesto',
    plans: [
      {
        name: 'Perfil de Empresa en Google',
        desc: 'Para aparecer en Google Maps y en las búsquedas de tu zona.',
        items: [
          'Creación, verificación o recuperación del perfil',
          'Categorías, descripción, horarios, servicios y productos',
          'Fotos y nombre, dirección y teléfono coherentes',
          'Orientación para conseguir y responder reseñas',
        ],
        msg: '¡Hola! Quiero un presupuesto del plan Perfil de Empresa en Google de JB DEV.',
      },
      {
        name: 'SEO + Perfil de Empresa',
        desc: 'Sitio y perfil optimizados juntos, para que te encuentren en los dos frentes.',
        featured: true,
        items: [
          'Todo lo del plan Perfil de Empresa en Google',
          'SEO técnico: velocidad, móvil, sitemap y datos estructurados',
          'SEO on-page con investigación de palabras clave local',
          'Search Console y Analytics configurados',
          'Informe con el antes y el después',
        ],
        msg: '¡Hola! Quiero un presupuesto del plan SEO + Perfil de Empresa de JB DEV.',
      },
      {
        name: 'Seguimiento mensual',
        desc: 'Para mantener el sitio y el perfil actualizados y mejorando mes a mes.',
        items: [
          'Informe mensual de búsquedas, clics y contactos',
          'Actualización del perfil: fotos, horarios, servicios y novedades',
          'Ajustes de textos y páginas según los datos',
          'Seguimiento de las reseñas',
        ],
        msg: '¡Hola! Quiero un presupuesto del Seguimiento mensual de SEO de JB DEV.',
      },
    ],
    faqEyebrow: '// dudas',
    faqTitle: 'Preguntas frecuentes',
    faq: [
      ['¿En cuánto tiempo veo resultados?', 'El SEO suele tardar de algunas semanas a algunos meses, porque Google necesita volver a leer y evaluar el sitio. El Perfil de Empresa en Google tiende a dar resultados más rápido: un perfil completo y bien configurado empieza a aparecer en las búsquedas locales y en Maps poco después de verificarse.'],
      ['¿Garantizan la primera posición en Google?', 'No. Nadie puede garantizar una posición en Google — quien lo promete está prometiendo algo que no controla. Aplicamos buenas prácticas de SEO y SEO local y medimos los resultados en Search Console, Analytics y el propio perfil, para que veas la evolución con datos.'],
      ['¿Necesito un sitio para tener Perfil de Empresa en Google?', 'No. El Perfil de Empresa en Google funciona sin sitio. Pero los dos juntos funcionan mejor: el sitio le da más información a Google y al cliente, y el perfil lleva a quien está cerca directo hacia ti.'],
      ['Mi sitio no lo hizo JB DEV. ¿Me atienden igual?', 'Sí. Empezamos por el diagnóstico del sitio actual, con acceso al panel o al hosting. Si la plataforma limita alguna mejora, explicamos qué se puede hacer en ella y qué requeriría un cambio, antes de cualquier propuesta.'],
      ['Ya tengo perfil en Google, pero perdí el acceso. ¿Me ayudan a recuperarlo?', 'Sí. Te ayudamos a solicitar el acceso al perfil por el proceso oficial de Google y, cuando no es posible, te orientamos para crear y verificar un nuevo perfil sin duplicar tu empresa en Maps.'],
    ],
    cta: {
      eyebrow: '// hablemos',
      title: '¿Ponemos tu empresa en el mapa?',
      text: 'Envía un mensaje y recibe un diagnóstico gratuito de cómo aparece hoy tu empresa en Google.',
      button: 'Hablar por WhatsApp',
      message: '¡Hola! Quiero poner mi empresa en el mapa. ¿Pueden hacer un diagnóstico de SEO y Perfil de Empresa en Google?',
    },
  },
};
