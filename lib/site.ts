// Fonte única de verdade para dados públicos da JB DEV (contato, redes, NAP).
// O cartão digital (/cartao) ainda lê public/js/site-config.js: se mudar algo
// aqui, atualize lá também.

export const SITE = {
  url: 'https://www.jbdev.com.br',
  name: 'JB DEV',
  founder: {
    name: 'Jonathan Vinicius Balieiro de Oliveira',
    shortName: 'Jonathan Balieiro',
    jobTitle: 'Desenvolvedor Web Full Stack',
    image: '/assets/img/1716911104056.jpeg',
  },
  contact: {
    phoneDisplay: '(19) 99749-5985',
    phoneE164: '+5519997495985',
    whatsapp: '5519997495985',
    email: 'jonathantotini@gmail.com',
  },
  address: {
    // igual ao Perfil da Empresa no Google
    display: 'Av. Eng. Fábio Roberto Barnabé, 215 - Vila Nossa Sra. Aparecida, Indaiatuba - SP, 13330-565',
    street: 'Av. Eng. Fábio Roberto Barnabé, 215',
    neighborhood: 'Vila Nossa Sra. Aparecida',
    locality: 'Indaiatuba',
    region: 'SP',
    postalCode: '13330-565',
    country: 'BR',
  },
  areaServed: ['Indaiatuba', 'Salto', 'Itu', 'Campinas', 'Sorocaba', 'São Paulo'],
  social: {
    instagram: 'https://www.instagram.com/jonathan_desenvolvedor/',
    linkedin: 'https://www.linkedin.com/in/jonathan-balieiro-b83230298/',
    github: 'https://github.com/Jonathanfullstack',
  },
  responseTime: '24 horas',
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
