import type { Locale } from '@/lib/i18n';
import { SITE } from '@/lib/site';
import type { LocalSection } from './local-pages';

// Textos longos das páginas /sobre e /politica-de-privacidade.

export type TextPage = {
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: LocalSection[];
};

export type AboutPage = TextPage & {
  photoAlt: string;
  stackTitle: string;
  stack: string[];
  ctaButton: string;
};

export type PrivacyPage = TextPage & { updated: string };

const STACK = ['Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker', 'Supabase', 'Vercel', 'Railway', 'OpenAI', 'n8n', 'Tailwind CSS'];

export const ABOUT: Record<Locale, AboutPage> = {
  pt: {
    metaTitle: 'Sobre a JB DEV | Jonathan Balieiro, desenvolvedor full stack',
    metaDesc: 'Conheça a JB DEV e o Jonathan Balieiro, desenvolvedor full stack em Indaiatuba/SP: como trabalhamos, stack, diferenciais e atendimento direto com quem programa.',
    eyebrow: '// sobre',
    h1: 'Quem está por trás da JB DEV',
    lead: 'A JB DEV é o estúdio do Jonathan Balieiro, desenvolvedor web full stack de Indaiatuba/SP. Aqui você fala direto com quem desenha, programa e cuida do seu projeto depois que ele vai ao ar.',
    photoAlt: 'Jonathan Balieiro programando em sua estação de trabalho, com dois monitores e um notebook com código aberto',
    sections: [
      {
        title: 'Quem é o Jonathan',
        paras: [
          'Jonathan Vinicius Balieiro de Oliveira é desenvolvedor web full stack e fundador da JB DEV. Ele acompanha cada projeto pessoalmente e combina desenvolvimento, visão de produto e cuidado visual em todas as entregas.',
          'A JB DEV nasceu para atender empresas e profissionais que querem fortalecer a presença digital, organizar processos ou tirar uma ideia do papel, sem passar por agência com várias camadas de atendimento.',
        ],
      },
      {
        title: 'Experiência na prática',
        paras: [
          'O portfólio reúne projetos reais no ar em segmentos bem diferentes: loja virtual de semijoias, site de loja de celulares, CRM comercial, sistemas de agendamento para barbearia e nail designer, gestão financeira pessoal, landing page para estúdio de beleza e cardápio digital.',
          'Cada um resolveu um problema diferente, e é essa variedade que permite olhar para o seu negócio e propor o caminho mais simples, seja um site, um sistema ou uma automação.',
        ],
      },
      {
        title: 'Como a gente trabalha',
        paras: ['Todo projeto passa por quatro etapas, com você acompanhando de perto:'],
        list: [
          'Descoberta: entender o negócio, o cliente e o problema antes de falar de tela',
          'Direção: proposta fechada com escopo, prazo e layout aprovado',
          'Construção: desenvolvimento com entregas frequentes para você ver o progresso',
          'Entrega: publicação, treinamento e suporte para evoluir depois do lançamento',
        ],
      },
      {
        title: 'Diferenciais',
        paras: [],
        list: [
          'Código proprietário: código, domínio e acessos ficam no seu nome ao fim do projeto',
          'Atendimento direto com quem programa, sem intermediário',
          'Projeto sob medida, dimensionado para o momento do negócio',
          'Atendimento presencial em Indaiatuba e região, e remoto em todo o Brasil',
          'Comunicação transparente e resposta em até 24 horas',
          'Suporte e evolução contínua depois da entrega',
        ],
      },
    ],
    stackTitle: 'Stack que usamos no dia a dia',
    stack: STACK,
    ctaButton: 'Conversar com o Jonathan',
  },
  en: {
    metaTitle: 'About JB DEV | Jonathan Balieiro, full stack developer',
    metaDesc: 'Meet JB DEV and Jonathan Balieiro, a full stack developer in Indaiatuba, Brazil: how we work, our stack, what sets us apart and direct contact with the person who codes.',
    eyebrow: '// about',
    h1: 'The person behind JB DEV',
    lead: 'JB DEV is the studio of Jonathan Balieiro, a full stack web developer based in Indaiatuba, São Paulo, Brazil. You talk directly to the person who designs, codes and looks after your project after launch.',
    photoAlt: 'Jonathan Balieiro coding at his workstation, with two monitors and a laptop showing code',
    sections: [
      {
        title: 'Who Jonathan is',
        paras: [
          'Jonathan Vinicius Balieiro de Oliveira is a full stack web developer and the founder of JB DEV. He follows every project personally and brings together development, product thinking and visual care in every delivery.',
          'JB DEV was created for companies and professionals who want a stronger online presence, better-organized processes or to bring an idea to life, without going through an agency with layers of account managers.',
        ],
      },
      {
        title: 'Hands-on experience',
        paras: [
          'The portfolio brings together real, live projects in very different industries: a jewelry online store, a phone store website, a sales CRM, booking systems for a barbershop and a nail designer, a personal finance app, a beauty studio landing page and a digital menu.',
          'Each one solved a different problem, and that range is what makes it possible to look at your business and suggest the simplest path, whether it is a website, custom software or an automation.',
        ],
      },
      {
        title: 'How we work',
        paras: ['Every project goes through four stages, with you following closely:'],
        list: [
          'Discovery: understand the business, the customer and the problem before talking about screens',
          'Direction: a fixed proposal with scope, timeline and an approved layout',
          'Build: development with frequent deliveries so you can see progress',
          'Launch: publishing, training and support to keep evolving after launch',
        ],
      },
      {
        title: 'What sets us apart',
        paras: [],
        list: [
          'Proprietary code: code, domain and access are in your name at the end of the project',
          'Direct contact with the person who codes, no middlemen',
          'Tailor-made projects, sized for where your business is today',
          'In-person meetings in Indaiatuba and the region, remote work anywhere',
          'Transparent communication and replies within 24 hours',
          'Ongoing support and improvements after delivery',
        ],
      },
    ],
    stackTitle: 'The stack we use every day',
    stack: STACK,
    ctaButton: 'Talk to Jonathan',
  },
  es: {
    metaTitle: 'Sobre JB DEV | Jonathan Balieiro, desarrollador full stack',
    metaDesc: 'Conoce JB DEV y a Jonathan Balieiro, desarrollador full stack en Indaiatuba, Brasil: cómo trabajamos, stack, diferenciales y atención directa con quien programa.',
    eyebrow: '// sobre',
    h1: 'Quién está detrás de JB DEV',
    lead: 'JB DEV es el estudio de Jonathan Balieiro, desarrollador web full stack de Indaiatuba, São Paulo, Brasil. Aquí hablas directamente con quien diseña, programa y cuida tu proyecto después del lanzamiento.',
    photoAlt: 'Jonathan Balieiro programando en su estación de trabajo, con dos monitores y un portátil con código abierto',
    sections: [
      {
        title: 'Quién es Jonathan',
        paras: [
          'Jonathan Vinicius Balieiro de Oliveira es desarrollador web full stack y fundador de JB DEV. Acompaña cada proyecto personalmente y combina desarrollo, visión de producto y cuidado visual en todas las entregas.',
          'JB DEV nació para atender a empresas y profesionales que quieren fortalecer su presencia digital, organizar procesos o hacer realidad una idea, sin pasar por una agencia con varias capas de atención.',
        ],
      },
      {
        title: 'Experiencia en la práctica',
        paras: [
          'El portafolio reúne proyectos reales en línea de sectores muy distintos: tienda online de bisutería, sitio de una tienda de móviles, CRM comercial, sistemas de reservas para barbería y nail designer, gestión financiera personal, landing page para un estudio de belleza y menú digital.',
          'Cada uno resolvió un problema diferente, y esa variedad permite mirar tu negocio y proponer el camino más simple, ya sea un sitio, un sistema o una automatización.',
        ],
      },
      {
        title: 'Cómo trabajamos',
        paras: ['Todo proyecto pasa por cuatro etapas, contigo acompañando de cerca:'],
        list: [
          'Descubrimiento: entender el negocio, el cliente y el problema antes de hablar de pantallas',
          'Dirección: propuesta cerrada con alcance, plazo y diseño aprobado',
          'Construcción: desarrollo con entregas frecuentes para que veas el avance',
          'Entrega: publicación, capacitación y soporte para evolucionar después del lanzamiento',
        ],
      },
      {
        title: 'Diferenciales',
        paras: [],
        list: [
          'Código propio: el código, el dominio y los accesos quedan a tu nombre al final del proyecto',
          'Atención directa con quien programa, sin intermediarios',
          'Proyecto a medida, dimensionado para el momento del negocio',
          'Atención presencial en Indaiatuba y la región, y remota en cualquier lugar',
          'Comunicación transparente y respuesta en hasta 24 horas',
          'Soporte y evolución continua después de la entrega',
        ],
      },
    ],
    stackTitle: 'El stack que usamos a diario',
    stack: STACK,
    ctaButton: 'Hablar con Jonathan',
  },
};

export const PRIVACY: Record<Locale, PrivacyPage> = {
  pt: {
    metaTitle: 'Política de Privacidade | JB DEV',
    metaDesc: 'Como a JB DEV trata os dados enviados pelo formulário de briefing, pela newsletter e pelo WhatsApp, conforme a LGPD: finalidade, base legal, retenção e seus direitos.',
    eyebrow: '// privacidade',
    h1: 'Política de Privacidade',
    lead: 'Esta política explica quais dados pessoais a JB DEV recebe pelo site e pelo WhatsApp, para que eles são usados e como você pode exercer seus direitos, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).',
    updated: 'Atualizada em 30 de outubro de 2026.',
    sections: [
      {
        title: '1. Quem é o responsável pelos dados',
        paras: [
          `O controlador dos dados é a JB DEV, representada por Jonathan Vinicius Balieiro de Oliveira, com endereço na ${SITE.address.display}. Dúvidas e pedidos sobre seus dados podem ser enviados para ${SITE.contact.email} ou pelo WhatsApp ${SITE.contact.phoneDisplay}.`,
        ],
      },
      {
        title: '2. Quais dados coletamos',
        paras: ['Coletamos apenas o que você decide enviar:'],
        list: [
          'Formulário de briefing: nome, empresa (opcional), e-mail, WhatsApp (opcional), tipo de projeto, faixa de investimento, mensagem e a página de onde o formulário foi enviado',
          'Newsletter: e-mail',
          'WhatsApp: nome e número do seu perfil e o conteúdo das mensagens que você enviar',
          'Dados técnicos: o provedor de hospedagem registra informações como endereço IP e navegador para segurança e funcionamento do site',
        ],
      },
      {
        title: '3. Para que usamos',
        paras: [
          'Os dados do briefing e do WhatsApp servem para responder seu contato, entender o projeto, enviar proposta e, se houver contratação, executar o serviço. O e-mail da newsletter é usado só para enviar os artigos do blog. Não vendemos nem alugamos dados pessoais, e não usamos seus dados para publicidade de terceiros.',
        ],
      },
      {
        title: '4. Base legal',
        paras: [
          'O tratamento se apoia no seu consentimento, dado ao marcar a caixa do formulário ou ao assinar a newsletter (art. 7º, I, da LGPD), e na execução de procedimentos preliminares a um contrato a seu pedido, como o envio de proposta (art. 7º, V). Os registros técnicos de acesso se baseiam no legítimo interesse de manter o site seguro (art. 7º, IX).',
        ],
      },
      {
        title: '5. Com quem os dados são compartilhados',
        paras: [
          'Os dados podem passar por fornecedores necessários para o funcionamento do serviço: a hospedagem do site (Vercel), o provedor de e-mail e o WhatsApp (Meta), que tem sua própria política de privacidade. Alguns desses fornecedores armazenam dados fora do Brasil, com as garantias previstas na LGPD.',
        ],
      },
      {
        title: '6. Por quanto tempo guardamos',
        paras: [
          'Os dados ficam guardados enquanto forem necessários para a finalidade que motivou a coleta: responder o contato, conduzir a negociação ou prestar o serviço contratado. Depois disso, são excluídos, salvo quando a lei exigir a guarda por mais tempo. Você pode pedir a exclusão a qualquer momento, e o e-mail da newsletter sai da lista assim que você pedir.',
        ],
      },
      {
        title: '7. Seus direitos',
        paras: ['Pela LGPD, você pode pedir a qualquer momento:'],
        list: [
          'Confirmação de que tratamos seus dados e acesso a eles',
          'Correção de dados incompletos, inexatos ou desatualizados',
          'Anonimização, bloqueio ou exclusão de dados desnecessários',
          'Portabilidade dos dados a outro fornecedor',
          'Informação sobre com quem os dados foram compartilhados',
          'Revogação do consentimento',
        ],
      },
      {
        title: '8. Cookies e armazenamento no navegador',
        paras: [
          'O site não usa cookies de publicidade nem ferramentas de rastreamento de terceiros. Ele guarda no seu navegador apenas a preferência de tema claro ou escuro, que não identifica você.',
        ],
      },
      {
        title: '9. Contato e atualizações',
        paras: [
          `Para exercer seus direitos ou tirar dúvidas, fale com o responsável pelo e-mail ${SITE.contact.email} ou pelo WhatsApp ${SITE.contact.phoneDisplay}. Se não ficar satisfeito com a resposta, você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD). Esta política pode ser atualizada, e a data no topo indica a versão em vigor.`,
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Privacy Policy | JB DEV',
    metaDesc: 'How JB DEV handles data sent through the brief form, the newsletter and WhatsApp under Brazil’s LGPD: purpose, legal basis, retention and your rights.',
    eyebrow: '// privacy',
    h1: 'Privacy Policy',
    lead: 'This policy explains which personal data JB DEV receives through the website and WhatsApp, what it is used for and how you can exercise your rights under Brazil’s General Data Protection Law (LGPD, Law 13,709/2018).',
    updated: 'Last updated on October 30, 2026.',
    sections: [
      {
        title: '1. Who is responsible for the data',
        paras: [
          `The data controller is JB DEV, represented by Jonathan Vinicius Balieiro de Oliveira, located at ${SITE.address.display}, Brazil. Questions and requests about your data can be sent to ${SITE.contact.email} or via WhatsApp at +55 ${SITE.contact.phoneDisplay}.`,
        ],
      },
      {
        title: '2. What data we collect',
        paras: ['We only collect what you choose to send:'],
        list: [
          'Brief form: name, company (optional), email, WhatsApp (optional), project type, budget range, message and the page the form was sent from',
          'Newsletter: email address',
          'WhatsApp: your profile name and number and the content of the messages you send',
          'Technical data: the hosting provider logs information such as IP address and browser for security and to keep the site running',
        ],
      },
      {
        title: '3. How we use it',
        paras: [
          'Brief and WhatsApp data are used to reply to you, understand the project, send a proposal and, if you hire us, deliver the service. The newsletter email is only used to send blog articles. We do not sell or rent personal data, and we do not use it for third-party advertising.',
        ],
      },
      {
        title: '4. Legal basis',
        paras: [
          'Processing is based on your consent, given when you tick the form checkbox or subscribe to the newsletter (LGPD art. 7, I), and on preliminary steps to a contract at your request, such as sending a proposal (art. 7, V). Technical access logs rely on our legitimate interest in keeping the site secure (art. 7, IX).',
        ],
      },
      {
        title: '5. Who we share data with',
        paras: [
          'Data may pass through providers needed to run the service: website hosting (Vercel), the email provider and WhatsApp (Meta), which has its own privacy policy. Some of these providers store data outside Brazil, with the safeguards required by the LGPD.',
        ],
      },
      {
        title: '6. How long we keep it',
        paras: [
          'Data is kept for as long as needed for the purpose it was collected for: replying to you, handling the negotiation or delivering the service. After that it is deleted, unless the law requires longer retention. You can ask for deletion at any time, and your newsletter email is removed as soon as you ask.',
        ],
      },
      {
        title: '7. Your rights',
        paras: ['Under the LGPD you can ask at any time for:'],
        list: [
          'Confirmation that we process your data, and access to it',
          'Correction of incomplete, inaccurate or outdated data',
          'Anonymization, blocking or deletion of unnecessary data',
          'Portability of your data to another provider',
          'Information about who your data was shared with',
          'Withdrawal of consent',
        ],
      },
      {
        title: '8. Cookies and browser storage',
        paras: [
          'The site does not use advertising cookies or third-party tracking tools. It only stores your light or dark theme preference in your browser, which does not identify you.',
        ],
      },
      {
        title: '9. Contact and updates',
        paras: [
          `To exercise your rights or ask questions, contact us at ${SITE.contact.email} or via WhatsApp at +55 ${SITE.contact.phoneDisplay}. If you are not satisfied with the answer, you can also contact Brazil’s National Data Protection Authority (ANPD). This policy may be updated, and the date at the top shows the current version.`,
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Política de Privacidad | JB DEV',
    metaDesc: 'Cómo JB DEV trata los datos enviados por el formulario de briefing, el boletín y WhatsApp según la LGPD de Brasil: finalidad, base legal, conservación y tus derechos.',
    eyebrow: '// privacidad',
    h1: 'Política de Privacidad',
    lead: 'Esta política explica qué datos personales recibe JB DEV a través del sitio y de WhatsApp, para qué se usan y cómo puedes ejercer tus derechos según la Ley General de Protección de Datos de Brasil (LGPD, Ley 13.709/2018).',
    updated: 'Actualizada el 30 de octubre de 2026.',
    sections: [
      {
        title: '1. Quién es el responsable de los datos',
        paras: [
          `El responsable del tratamiento es JB DEV, representada por Jonathan Vinicius Balieiro de Oliveira, con domicilio en ${SITE.address.display}, Brasil. Las dudas y solicitudes sobre tus datos pueden enviarse a ${SITE.contact.email} o por WhatsApp al +55 ${SITE.contact.phoneDisplay}.`,
        ],
      },
      {
        title: '2. Qué datos recopilamos',
        paras: ['Solo recopilamos lo que decides enviar:'],
        list: [
          'Formulario de briefing: nombre, empresa (opcional), correo, WhatsApp (opcional), tipo de proyecto, rango de inversión, mensaje y la página desde la que se envió el formulario',
          'Boletín: correo electrónico',
          'WhatsApp: nombre y número de tu perfil y el contenido de los mensajes que envíes',
          'Datos técnicos: el proveedor de alojamiento registra información como dirección IP y navegador por seguridad y para el funcionamiento del sitio',
        ],
      },
      {
        title: '3. Para qué los usamos',
        paras: [
          'Los datos del briefing y de WhatsApp sirven para responderte, entender el proyecto, enviar una propuesta y, si nos contratas, prestar el servicio. El correo del boletín solo se usa para enviar los artículos del blog. No vendemos ni alquilamos datos personales ni los usamos para publicidad de terceros.',
        ],
      },
      {
        title: '4. Base legal',
        paras: [
          'El tratamiento se basa en tu consentimiento, dado al marcar la casilla del formulario o al suscribirte al boletín (art. 7, I, de la LGPD), y en la ejecución de pasos previos a un contrato a tu solicitud, como el envío de una propuesta (art. 7, V). Los registros técnicos de acceso se basan en el interés legítimo de mantener el sitio seguro (art. 7, IX).',
        ],
      },
      {
        title: '5. Con quién compartimos los datos',
        paras: [
          'Los datos pueden pasar por proveedores necesarios para el servicio: el alojamiento del sitio (Vercel), el proveedor de correo y WhatsApp (Meta), que tiene su propia política de privacidad. Algunos de estos proveedores almacenan datos fuera de Brasil, con las garantías previstas en la LGPD.',
        ],
      },
      {
        title: '6. Cuánto tiempo los guardamos',
        paras: [
          'Los datos se guardan mientras sean necesarios para la finalidad de la recopilación: responderte, llevar la negociación o prestar el servicio contratado. Después se eliminan, salvo cuando la ley exija conservarlos por más tiempo. Puedes pedir la eliminación en cualquier momento, y tu correo sale del boletín en cuanto lo pidas.',
        ],
      },
      {
        title: '7. Tus derechos',
        paras: ['Según la LGPD, puedes pedir en cualquier momento:'],
        list: [
          'Confirmación de que tratamos tus datos y acceso a ellos',
          'Corrección de datos incompletos, inexactos o desactualizados',
          'Anonimización, bloqueo o eliminación de datos innecesarios',
          'Portabilidad de los datos a otro proveedor',
          'Información sobre con quién se compartieron los datos',
          'Revocación del consentimiento',
        ],
      },
      {
        title: '8. Cookies y almacenamiento en el navegador',
        paras: [
          'El sitio no usa cookies publicitarias ni herramientas de rastreo de terceros. Solo guarda en tu navegador la preferencia de tema claro u oscuro, que no te identifica.',
        ],
      },
      {
        title: '9. Contacto y actualizaciones',
        paras: [
          `Para ejercer tus derechos o resolver dudas, escribe a ${SITE.contact.email} o por WhatsApp al +55 ${SITE.contact.phoneDisplay}. Si no quedas satisfecho con la respuesta, también puedes acudir a la Autoridad Nacional de Protección de Datos de Brasil (ANPD). Esta política puede actualizarse, y la fecha al inicio indica la versión vigente.`,
        ],
      },
    ],
  },
};
