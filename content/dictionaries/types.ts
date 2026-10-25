export type ServiceSlug = 'criacao-de-sites' | 'sistemas-sob-medida' | 'automacao-e-ia' | 'aplicativos';
export type ServiceKey = 'sites' | 'sistemas' | 'auto' | 'apps';

export type ServiceSummary = {
  slug: ServiceSlug;
  key: ServiceKey;
  n: string;
  icon: string;
  title: string;
  short: string;
  long: string;
  tags: string[];
  ideal: string;
  includes: string[];
};

export type PageMeta = { title: string; description: string };

export type Dict = {
  nav: {
    home: string; services: string; portfolio: string; blog: string; contact: string;
    start: string; openMenu: string; closeMenu: string; menuEyebrow: string;
    toggleTheme: string; language: string; skip: string; homeAria: string; primary: string;
  };
  curtain: Record<'home' | 'servicos' | 'portfolio' | 'case' | 'blog' | 'artigo' | 'contato' | 'servico', string>;
  meta: Record<'home' | 'services' | 'portfolio' | 'blog' | 'contact' | 'notFound', PageMeta>;
  hero: {
    badge: string; l1: string; l2: string; l3: string; lead: string;
    primary: string; secondary: string; canvasLabel: string; scroll: string;
  };
  pin: { eyebrow: string; prefix: string; words: string[]; text: string; cta: string };
  marquee: string[];
  diag: {
    eyebrow: string; title: string; aside: string;
    items: [string, string, string][];
    reveal: string[]; revealSplit: number; cta1: string; cta2: string;
  };
  servicesHome: { eyebrow: string; title: string; link: string };
  services: ServiceSummary[];
  portfolioHome: { eyebrow: string; title: string; link: string; viewCase: string };
  process: { eyebrow: string; title: string; steps: [string, string][] };
  manifesto: { eyebrow: string; l1: string; l2: string; text: string; stats: [string, string][] };
  blogHome: { eyebrow: string; title: string; link: string };
  faq: { eyebrow: string; title: string; text: string; cta: string; whatsapp: string; items: [string, string][] };
  cta: { eyebrow: string; title: string; text: string; button: string };
  footer: {
    studio: string; base: string; pages: string; social: string; solutions: string;
    solutionLinks: [string, string][]; baseLines: string[]; toTop: string; rights: string; made: string; card: string;
  };
  servicesPage: {
    eyebrow: string; title1: string; title2: string; lead: string;
    includes: string; idealFor: string; want: string; details: string; of: string;
  };
  servicePage: {
    eyebrow: string; includes: string; process: string; faq: string; related: string;
    relatedEmpty: string; cta: string; idealFor: string; breadcrumbServices: string;
  };
  portfolioPage: {
    eyebrow: string; lead: string; stats: [string, string][]; filtersLabel: string;
    filters: [string, string][]; featured: string; viewFull: string; visit: string; viewCase: string;
    logos: string; logoPlaceholder: string; empty: string; testimonials: string;
  };
  casePage: {
    back: string; client: string; segment: string; deliveries: string; year: string;
    challenge: string; solution: string; result: string; next: string; visit: string;
    testimonialPlaceholder: string; testimonialName: string; testimonialRole: string;
  };
  blogPage: {
    eyebrow: string; title1: string; title2: string; lead: string; filtersLabel: string;
    filters: [string, string][]; featured: string; author: string; ptOnly: string;
    newsEyebrow: string; newsTitle: string; newsLabel: string; newsPlaceholder: string;
    newsButton: string; newsDone: string; newsDoneStrong: string; newsError: string;
  };
  post: {
    back: string; reading: string; onThisPage: string; share: string; copy: string; copied: string;
    ctaTitle: string; ctaButton: string; more: string; tip: string; faq: string; updated: string;
  };
  contact: {
    eyebrow: string; title1: string; title2: string; lead: string;
    name: string; namePh: string; company: string; optional: string; companyPh: string;
    email: string; emailPh: string; whatsapp: string; whatsappPh: string;
    needs: string; needOptions: string[]; invest: string; investOptions: string[];
    message: string; messagePh: string; consent: string; submit: string; sending: string;
    successTitle: string; successText: string; again: string; error: string;
    whatsappCard: string; emailCard: string; nextTitle: string; nextSteps: string[];
  };
  common: { whatsappMessage: string; notFoundTitle: string; notFoundText: string; notFoundCta: string };
};
