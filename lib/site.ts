// Fonte única de verdade para dados públicos da JB DEV (contato, redes, NAP).
// O cartão digital (/cartao) ainda lê public/js/site-config.js: se mudar algo
// aqui, atualize lá também.

export const SITE = {
  url: 'https://www.jbdev.com.br',
  name: 'JB DEV',
  legalName: '[Razão social LTDA]',
  cnpj: '[00.000.000/0001-00]',
  founder: {
    name: 'Jonathan Vinicius Balieiro de Oliveira',
    shortName: 'Jonathan Balieiro',
    jobTitle: 'Desenvolvedor Web Full Stack',
    image: '/assents/img/1716911104056.jpeg',
  },
  contact: {
    phoneDisplay: '(19) 99749-5985',
    phoneE164: '+5519997495985',
    whatsapp: '5519997495985',
    email: 'jonathantotini@gmail.com',
  },
  address: {
    street: '[Endereço, número]',
    locality: 'Indaiatuba',
    region: 'SP',
    country: 'BR',
  },
  areaServed: ['Indaiatuba', 'Campinas', 'Itu', 'Salto', 'Sorocaba'],
  social: {
    instagram: 'https://www.instagram.com/jonathan_desenvolvedor/',
    linkedin: 'https://www.linkedin.com/in/jonathan-balieiro-b83230298/',
    github: 'https://github.com/Jonathanfullstack',
  },
  responseTime: '[24h]',
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
