import type { Locale } from '@/lib/i18n';

// Projetos reais publicados em jbdev.com.br (inventário de 25/10/2026).
// Tudo entre colchetes é dado que ainda falta — ver PENDENCIAS.md.

type L<T = string> = Record<Locale, T>;

export type ProjectKey = 'sites' | 'sistemas' | 'auto' | 'apps';

export type Project = {
  slug: string;
  name: string;
  key: ProjectKey;
  href: string;
  host: string;
  image: { src: string; width: number; height: number; alt: L };
  cat: L;
  segment: L;
  client: string;
  year: string;
  desc: L;
  tags: L<string[]>;
  challenge: L;
  result: L;
  metrics: L<[string, string][]>;
  testimonial?: { quote: L; name: string; role: string };
  palette: { bg: string; fg: string; acc: string };
};

const P = (pt: string, en: string, es: string): L => ({ pt, en, es });
const pendingChallenge = P('[Desafio do projeto — a preencher]', '[Project challenge — to be filled in]', '[Desafío del proyecto — por completar]');
const pendingResult = P('[Resultado do projeto — a preencher]', '[Project result — to be filled in]', '[Resultado del proyecto — por completar]');
// sem métricas reais o bloco de números não aparece
const pendingMetrics: L<[string, string][]> = { pt: [], en: [], es: [] };

export const PROJECTS: Project[] = [
  {
    slug: 'balli-acessorios',
    name: 'BALLI Acessórios',
    key: 'sites',
    href: 'https://balli-semijoias.vercel.app/',
    host: 'balli-semijoias.vercel.app',
    image: {
      src: '/assents/img/project-balli.webp', width: 1536, height: 960,
      alt: P('E-commerce BALLI Acessórios em notebook e celular', 'BALLI Acessórios online store on laptop and phone', 'Tienda online BALLI Acessórios en portátil y móvil'),
    },
    cat: P('LOJA VIRTUAL', 'ONLINE STORE', 'TIENDA ONLINE'),
    segment: P('Moda e acessórios', 'Fashion and accessories', 'Moda y accesorios'),
    client: 'BALLI Acessórios',
    year: '[Ano]',
    desc: P(
      'E-commerce premium com design sofisticado, responsividade completa, coleções organizadas, integração com WhatsApp e experiência visual pensada para valorizar os produtos e aumentar a conversão.',
      'Premium e-commerce with refined design, fully responsive, organized collections, WhatsApp integration and a visual experience built to showcase products and increase conversion.',
      'E-commerce premium con diseño sofisticado, totalmente responsivo, colecciones organizadas, integración con WhatsApp y una experiencia visual pensada para valorizar los productos y aumentar la conversión.',
    ),
    tags: { pt: ['E-commerce', 'Coleções', 'WhatsApp', 'Responsivo'], en: ['E-commerce', 'Collections', 'WhatsApp', 'Responsive'], es: ['E-commerce', 'Colecciones', 'WhatsApp', 'Responsivo'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#F4F1EA', fg: '#1A1A1A', acc: '#1F5FE0' },
  },
  {
    slug: 'vitra-mobile',
    name: 'Vitra Mobile',
    key: 'sites',
    href: 'https://iphone-loja.vercel.app/',
    host: 'iphone-loja.vercel.app',
    image: {
      src: '/assents/img/project-vitra-mobile.webp', width: 1536, height: 960,
      alt: P('Site da loja de celulares Vitra Mobile em notebook e celular', 'Vitra Mobile phone store website on laptop and phone', 'Sitio de la tienda de móviles Vitra Mobile en portátil y móvil'),
    },
    cat: P('LOJA DE CELULARES', 'PHONE STORE', 'TIENDA DE MÓVILES'),
    segment: P('Celulares e assistência técnica', 'Phones and repair services', 'Móviles y servicio técnico'),
    client: 'Vitra Mobile',
    year: '[Ano]',
    desc: P(
      'Site para loja de celulares em Indaiatuba, com catálogo de aparelhos novos e seminovos, assistência técnica e contato direto pelo WhatsApp, em um visual escuro e premium 100% responsivo.',
      'Website for a phone store in Indaiatuba, with a catalog of new and pre-owned devices, repair services and direct WhatsApp contact, in a dark, premium and fully responsive design.',
      'Sitio para una tienda de móviles en Indaiatuba, con catálogo de equipos nuevos y seminuevos, servicio técnico y contacto directo por WhatsApp, con un diseño oscuro, premium y 100% responsivo.',
    ),
    tags: { pt: ['Catálogo', 'Assistência técnica', 'WhatsApp', 'Responsivo'], en: ['Catalog', 'Repair services', 'WhatsApp', 'Responsive'], es: ['Catálogo', 'Servicio técnico', 'WhatsApp', 'Responsivo'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#0E0E10', fg: '#F2F2F2', acc: '#1F5FE0' },
  },
  {
    slug: 'jb-crm',
    name: 'JB CRM',
    key: 'sistemas',
    href: 'https://crm-production-47ab.up.railway.app/',
    host: 'crm-production-47ab.up.railway.app',
    image: {
      src: '/assents/img/project-crm.webp', width: 1296, height: 864,
      alt: P('Painel do JB CRM em notebook e tablet', 'JB CRM dashboard on laptop and tablet', 'Panel de JB CRM en portátil y tableta'),
    },
    cat: P('CRM COMERCIAL', 'SALES CRM', 'CRM COMERCIAL'),
    segment: P('Vendas e atendimento comercial', 'Sales and customer pipeline', 'Ventas y atención comercial'),
    client: '[Cliente]',
    year: '[Ano]',
    desc: P(
      'Gestão de leads e funil kanban com propostas, follow-ups, agenda e indicadores de conversão em um só painel.',
      'Lead management and kanban pipeline with proposals, follow-ups, calendar and conversion metrics in a single dashboard.',
      'Gestión de leads y embudo kanban con propuestas, seguimientos, agenda e indicadores de conversión en un solo panel.',
    ),
    tags: { pt: ['Sistema web', 'Kanban', 'Agenda', 'Indicadores'], en: ['Web system', 'Kanban', 'Calendar', 'Metrics'], es: ['Sistema web', 'Kanban', 'Agenda', 'Indicadores'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#0E1424', fg: '#E8EEF9', acc: '#4C8DFF' },
  },
  {
    slug: 'jb-barber',
    name: 'JB Barber',
    key: 'sistemas',
    href: 'https://barber-jb-production.up.railway.app/',
    host: 'barber-jb-production.up.railway.app',
    image: {
      src: '/assents/img/project-jb-barber.webp', width: 1536, height: 1024,
      alt: P('Sistema de agendamento JB Barber em notebook e celular', 'JB Barber booking system on laptop and phone', 'Sistema de reservas JB Barber en portátil y móvil'),
    },
    cat: P('SISTEMA DE AGENDAMENTO', 'BOOKING SYSTEM', 'SISTEMA DE RESERVAS'),
    segment: P('Barbearia', 'Barbershop', 'Barbería'),
    client: '[Cliente]',
    year: '[Ano]',
    desc: P(
      'Agendamento de serviços, profissionais e horários com área administrativa para a barbearia.',
      'Booking for services, barbers and time slots, with an admin area for the barbershop.',
      'Reservas de servicios, profesionales y horarios, con área administrativa para la barbería.',
    ),
    tags: { pt: ['Agendamento', 'Painel admin', 'Responsivo'], en: ['Booking', 'Admin panel', 'Responsive'], es: ['Reservas', 'Panel admin', 'Responsivo'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#151A2E', fg: '#F2F4FA', acc: '#38A3F5' },
  },
  {
    slug: 'finance-ai',
    name: 'finance.ai',
    key: 'sistemas',
    href: 'https://finance-ia.up.railway.app/',
    host: 'finance-ia.up.railway.app',
    image: {
      src: '/assents/img/project-finance.webp', width: 1536, height: 1024,
      alt: P('Sistema finance.ai em notebook e celular', 'finance.ai app on laptop and phone', 'Sistema finance.ai en portátil y móvil'),
    },
    cat: P('APLICAÇÃO WEB', 'WEB APP', 'APLICACIÓN WEB'),
    segment: P('Finanças pessoais', 'Personal finance', 'Finanzas personales'),
    client: '[Cliente]',
    year: '[Ano]',
    desc: P(
      'Gestão financeira pessoal com visão de receitas, despesas, orçamentos e indicadores em um único ambiente.',
      'Personal finance management with income, expenses, budgets and metrics in a single place.',
      'Gestión financiera personal con ingresos, gastos, presupuestos e indicadores en un solo entorno.',
    ),
    tags: { pt: ['Web app', 'Dashboard', 'Orçamentos', 'IA'], en: ['Web app', 'Dashboard', 'Budgets', 'AI'], es: ['Web app', 'Dashboard', 'Presupuestos', 'IA'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#1F5FE0', fg: '#FFFFFF', acc: '#0A1020' },
  },
  {
    slug: 'izabella-nail-designer',
    name: 'Izabella Nail Designer',
    key: 'sistemas',
    href: 'https://izabellafernandez.up.railway.app/',
    host: 'izabellafernandez.up.railway.app',
    image: {
      src: '/assents/img/project-izabella-nails.webp', width: 1536, height: 1024,
      alt: P('Sistema da Izabella Nail Designer em notebook e celular', 'Izabella Nail Designer system on laptop and phone', 'Sistema de Izabella Nail Designer en portátil y móvil'),
    },
    cat: P('SISTEMA DE AGENDAMENTO', 'BOOKING SYSTEM', 'SISTEMA DE RESERVAS'),
    segment: P('Beleza — nail designer', 'Beauty — nail designer', 'Belleza — nail designer'),
    client: 'Izabella Nail Designer',
    year: '[Ano]',
    desc: P(
      'Portfólio de serviços integrado à escolha de datas e horários, com gestão de agendamentos.',
      'Service portfolio connected to date and time selection, with appointment management.',
      'Portafolio de servicios integrado a la elección de fechas y horarios, con gestión de citas.',
    ),
    tags: { pt: ['Agendamento', 'Portfólio', 'Gestão'], en: ['Booking', 'Portfolio', 'Management'], es: ['Reservas', 'Portafolio', 'Gestión'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#E9EEF6', fg: '#0A1020', acc: '#1F5FE0' },
  },
  {
    slug: 'valarine-beauty',
    name: 'Valarine Beauty',
    key: 'sites',
    href: 'https://valarine-carla.vercel.app/',
    host: 'valarine-carla.vercel.app',
    image: {
      src: '/assents/img/project-valarine.webp', width: 1536, height: 1024,
      alt: P('Landing page Valarine Beauty em notebook e celular', 'Valarine Beauty landing page on laptop and phone', 'Landing page Valarine Beauty en portátil y móvil'),
    },
    cat: P('LANDING PAGE', 'LANDING PAGE', 'LANDING PAGE'),
    segment: P('Estúdio de beleza', 'Beauty studio', 'Estudio de belleza'),
    client: 'Valarine Beauty',
    year: '[Ano]',
    desc: P(
      'Apresentação de serviços, trabalhos e contato para fortalecer a presença digital do estúdio.',
      'Services, work samples and contact in one page to strengthen the studio’s online presence.',
      'Presentación de servicios, trabajos y contacto para fortalecer la presencia digital del estudio.',
    ),
    tags: { pt: ['Landing page', 'Galeria', 'WhatsApp'], en: ['Landing page', 'Gallery', 'WhatsApp'], es: ['Landing page', 'Galería', 'WhatsApp'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    testimonial: {
      quote: P(
        'O Jonathan desenvolveu meu site com muito cuidado. O resultado superou minhas expectativas e meus clientes adoram a facilidade de navegação.',
        'Jonathan built my website with great care. The result exceeded my expectations and my clients love how easy it is to navigate.',
        'Jonathan desarrolló mi sitio con mucho cuidado. El resultado superó mis expectativas y a mis clientes les encanta lo fácil que es navegar.',
      ),
      name: 'Carla Valarine',
      role: 'Valarine Beauty',
    },
    palette: { bg: '#0B0F19', fg: '#FFFFFF', acc: '#6B83FF' },
  },
  {
    slug: 'menu-online',
    name: 'Menu Online',
    key: 'sites',
    href: 'https://menu-cardapio-jonathan.netlify.app/',
    host: 'menu-cardapio-jonathan.netlify.app',
    image: {
      src: '/assents/img/project-menu-online.webp', width: 1536, height: 1024,
      alt: P('Cardápio digital Menu Online em notebook e celular', 'Menu Online digital menu on laptop and phone', 'Menú digital Menu Online en portátil y móvil'),
    },
    cat: P('CARDÁPIO DIGITAL', 'DIGITAL MENU', 'MENÚ DIGITAL'),
    segment: P('Alimentação', 'Food service', 'Gastronomía'),
    client: '[Cliente]',
    year: '[Ano]',
    desc: P(
      'Navegação por categorias, busca e apresentação organizada dos produtos para facilitar pedidos.',
      'Category navigation, search and a clear product layout that makes ordering easier.',
      'Navegación por categorías, búsqueda y presentación ordenada de los productos para facilitar los pedidos.',
    ),
    tags: { pt: ['Cardápio', 'Busca', 'Categorias'], en: ['Menu', 'Search', 'Categories'], es: ['Menú', 'Búsqueda', 'Categorías'] },
    challenge: pendingChallenge,
    result: pendingResult,
    metrics: pendingMetrics,
    palette: { bg: '#121B2C', fg: '#EDF1F7', acc: '#4C8DFF' },
  },
];

export const TESTIMONIALS = [
  {
    quote: P(
      'Simplesmente transformador! A atenção aos detalhes e a agilidade no atendimento superaram todas as expectativas.',
      'Simply transformative! The attention to detail and fast response exceeded every expectation.',
      '¡Simplemente transformador! La atención al detalle y la rapidez en la atención superaron todas las expectativas.',
    ),
    name: 'Gabriel Silva',
    role: P('Empreendedor', 'Entrepreneur', 'Emprendedor'),
  },
  {
    quote: PROJECTS.find((p) => p.slug === 'valarine-beauty')!.testimonial!.quote,
    name: 'Carla Valarine',
    role: P('Valarine Beauty', 'Valarine Beauty', 'Valarine Beauty'),
  },
  {
    quote: P(
      'Trabalho impecável! Um site que representa minha marca e facilita o contato com meus clientes.',
      'Flawless work! A website that represents my brand and makes it easy for clients to reach me.',
      '¡Trabajo impecable! Un sitio que representa mi marca y facilita el contacto con mis clientes.',
    ),
    name: 'Julia Rosa',
    role: P('Julia Rosa Estética Facial', 'Julia Rosa Estética Facial', 'Julia Rosa Estética Facial'),
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
