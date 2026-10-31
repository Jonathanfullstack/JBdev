// Páginas de SEO local (nicho e cidade). Só em português: o público é brasileiro.
// Cada página tem texto próprio — não copiar parágrafos de uma para outra.

export type LocalSection = { title: string; paras: string[]; list?: string[] };

export type LocalPage = {
  slug: string;
  kind: 'nicho' | 'cidade';
  /** cidade atendida (páginas de cidade) */
  city?: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  h1: string;
  lead: string;
  waMessage: string;
  sections: LocalSection[];
  /** slugs de projetos do portfólio que servem de exemplo */
  projects?: string[];
  faq: [string, string][];
  cta: { title: string; text: string };
};

export const LOCAL_PAGES: LocalPage[] = [
  // ---------------------------------------------------------------- NICHOS
  {
    slug: 'criacao-de-sites-para-clinicas',
    kind: 'nicho',
    metaTitle: 'Criação de Sites para Clínicas | JB DEV',
    metaDesc: 'Site para clínicas médicas, odontológicas e de fisioterapia: agendamento online, páginas por especialidade, SEO local e respeito às regras do conselho.',
    eyebrow: '// sites para clínicas',
    h1: 'Criação de sites para clínicas que querem agenda cheia e paciente bem informado',
    lead: 'Um site de clínica precisa passar confiança em poucos segundos, explicar cada especialidade sem jargão e levar o paciente até o agendamento. É isso que a JB DEV constrói, com código próprio e atendimento direto com quem programa.',
    waMessage: 'Olá, JB DEV! Tenho uma clínica e quero conversar sobre um site.',
    sections: [
      {
        title: 'O paciente pesquisa antes de ligar',
        paras: [
          'Quem procura um dentista, um fisioterapeuta ou um dermatologista quase sempre começa pelo Google. Ele compara endereço, convênios, horários, a cara do consultório e a formação de quem vai atender. Se o site não responde essas perguntas, a ligação vai para a clínica do lado.',
          'Por isso o site de uma clínica não é um cartão de visita bonito: é uma recepção que funciona 24 horas. Ele precisa mostrar a equipe, as especialidades, a estrutura e o caminho mais curto para marcar uma consulta, seja pelo WhatsApp, por telefone ou por um agendamento online.',
        ],
      },
      {
        title: 'O que um bom site de clínica precisa ter',
        paras: ['Cada projeto é desenhado para a realidade da clínica, mas alguns pontos aparecem em quase todos:'],
        list: [
          'Uma página para cada especialidade ou procedimento, com linguagem que o paciente entende',
          'Apresentação dos profissionais com registro no conselho e área de atuação',
          'Convênios aceitos, endereço com mapa, estacionamento e acessibilidade',
          'Botão de WhatsApp com mensagem pronta e, quando faz sentido, agenda online integrada',
          'Carregamento rápido no celular, onde está a maior parte das buscas',
          'Estrutura de SEO local para aparecer quando alguém busca a especialidade na sua cidade',
        ],
      },
      {
        title: 'Publicidade na saúde tem regras',
        paras: [
          'Conselhos como CFM, CFO e COFFITO têm normas próprias para publicidade. Promessa de resultado, preço como chamariz e alguns tipos de foto podem gerar problema. O conteúdo do site é escrito pensando nisso, e a revisão final das regras do seu conselho fica com você, que conhece as normas da sua profissão.',
          'O mesmo cuidado vale para os dados dos pacientes. Formulários pedem só o necessário, a política de privacidade fica visível e nada de prontuário ou informação sensível trafega pelo site.',
        ],
      },
      {
        title: 'Agendamento que conversa com a rotina da recepção',
        paras: [
          'Se a clínica já usa um sistema de agenda, o site leva o paciente até ele. Se não usa, dá para construir um agendamento sob medida, com horários por profissional, confirmação e área administrativa, como os sistemas de agendamento que já estão no portfólio da JB DEV.',
        ],
      },
    ],
    projects: ['izabella-nail-designer', 'jb-barber'],
    faq: [
      ['O site pode ter agendamento online?', 'Pode. Dá para integrar com o sistema que a clínica já usa ou criar um agendamento próprio, com horários por profissional e painel para a recepção.'],
      ['Vocês escrevem os textos das especialidades?', 'Sim. A JB DEV organiza e escreve os textos com base nas informações da clínica, em linguagem clara para o paciente. A validação técnica e das regras do conselho fica com o responsável pela clínica.'],
      ['O site ajuda a aparecer no Google da minha cidade?', 'Ajuda. O site sai com estrutura de SEO local, dados estruturados e páginas por especialidade. Isso aumenta as chances de aparecer, mas nenhuma empresa séria garante posição no Google.'],
      ['Quanto custa um site para clínica?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Vamos montar o site da sua clínica?', text: 'Conte quais especialidades você atende e como funciona sua agenda hoje. A resposta vem em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-para-estetica',
    kind: 'nicho',
    metaTitle: 'Criação de Sites para Estética e Salões | JB DEV',
    metaDesc: 'Site para clínicas de estética, estúdios de beleza, nail designers e salões: vitrine de procedimentos, galeria, agendamento e WhatsApp em um só lugar.',
    eyebrow: '// sites para estética',
    h1: 'Sites para estética e beleza que transformam seguidor em cliente agendado',
    lead: 'O Instagram mostra seu trabalho, mas não organiza preço, procedimento, horário e endereço. Um site próprio faz isso e ainda aparece no Google para quem não te segue.',
    waMessage: 'Olá, JB DEV! Tenho um negócio de estética e quero um site.',
    sections: [
      {
        title: 'Rede social é vitrine; site é a loja',
        paras: [
          'Quem trabalha com estética vive de imagem e de indicação. O perfil no Instagram atrai, mas a cliente nova precisa rolar dezenas de posts para descobrir se você faz o procedimento que ela quer, quanto tempo dura e como marcar. Muita gente desiste no meio do caminho.',
          'O site resolve esse atrito. Ele reúne os procedimentos em páginas próprias, mostra uma galeria organizada, responde as dúvidas mais comuns e deixa o botão de agendamento sempre à vista. A rede social continua importante, só que agora ela aponta para um lugar que converte.',
        ],
      },
      {
        title: 'O que entra em um site de estética',
        paras: ['O desenho muda de acordo com o seu público, mas a base costuma ser esta:'],
        list: [
          'Catálogo de procedimentos com descrição, duração, cuidados antes e depois',
          'Galeria de trabalhos, sempre com autorização de quem aparece nas fotos',
          'Agendamento online ou WhatsApp com mensagem já preenchida com o procedimento',
          'Identidade visual alinhada à sua marca: cores, fontes e fotos do seu espaço',
          'Página de localização com mapa, horários e formas de pagamento',
          'Base de SEO para buscas como "design de sobrancelha perto de mim"',
        ],
      },
      {
        title: 'Exemplos reais no portfólio',
        paras: [
          'A Valarine Beauty ganhou uma landing page que apresenta serviços, trabalhos e contato em um só lugar. A Izabella Nail Designer foi além: o site virou um sistema em que a cliente escolhe o serviço, a data e o horário, e a profissional gerencia tudo num painel.',
          'Esses dois caminhos mostram que não existe um modelo único. Dá para começar com uma página enxuta e evoluir para agendamento quando a agenda pedir.',
        ],
      },
      {
        title: 'Agenda organizada, menos mensagem perdida',
        paras: [
          'Quando o agendamento acontece pelo site, acabam as conversas longas no WhatsApp só para encontrar um horário. Você define os serviços, a duração de cada um e os dias de atendimento, e a cliente escolhe sozinha. Lembretes e confirmações podem ser automatizados para reduzir faltas.',
        ],
      },
      {
        title: 'Do primeiro contato ao retorno da cliente',
        paras: [
          'O site também ajuda depois do atendimento. Uma página com cuidados pós-procedimento, enviada pelo WhatsApp, evita dúvidas repetidas e passa profissionalismo. Pacotes, cartão fidelidade e lembrete de manutenção, como a próxima aplicação de cílios ou a reposição das unhas, podem ser pensados junto com o agendamento para trazer a cliente de volta no momento certo.',
        ],
      },
    ],
    projects: ['valarine-beauty', 'izabella-nail-designer'],
    faq: [
      ['Posso mostrar fotos de antes e depois?', 'Depende da sua área. Algumas profissões têm regras do conselho sobre isso. Quando a foto é permitida, ela só entra com autorização por escrito de quem aparece.'],
      ['Consigo atualizar procedimentos e preços sozinha?', 'Consegue, quando o site é entregue com painel de edição. Isso é definido no briefing, conforme a frequência com que você muda o catálogo.'],
      ['Preciso de um sistema de agendamento ou só do WhatsApp?', 'Para agenda pequena, o WhatsApp com mensagem pronta resolve. Quando o volume cresce, o agendamento online economiza tempo e reduz faltas.'],
      ['Quanto custa um site para estética?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Seu trabalho merece um site à altura.', text: 'Mande o link do seu Instagram e conte quais procedimentos quer destacar. A gente responde em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-para-imobiliarias',
    kind: 'nicho',
    metaTitle: 'Criação de Sites para Imobiliárias e Corretores | JB DEV',
    metaDesc: 'Site para imobiliárias e corretores com busca de imóveis por bairro, preço e tipo, fichas completas, captação de proprietários e leads direto no WhatsApp.',
    eyebrow: '// sites para imobiliárias',
    h1: 'Sites para imobiliárias com busca de imóveis rápida e captação de leads',
    lead: 'Portal de anúncio traz visitas, mas o lead fica dividido com a concorrência. Um site próprio coloca seus imóveis em destaque, com sua marca, e manda cada interessado direto para o seu time.',
    waMessage: 'Olá, JB DEV! Tenho uma imobiliária e quero conversar sobre um site.',
    sections: [
      {
        title: 'Por que ter site próprio se já anuncio nos portais',
        paras: [
          'Os grandes portais são ótimos para volume, mas lá seu imóvel aparece ao lado de dezenas de outros, e o cliente compara só preço. No seu site, a vitrine é exclusiva: a pessoa vê seus imóveis, sua marca e seu atendimento, sem distração.',
          'O site também é o lugar para falar com o proprietário. Uma página de captação bem feita, explicando como funciona a administração e a venda, traz imóveis novos para a carteira sem depender só de indicação.',
        ],
      },
      {
        title: 'Recursos que fazem diferença para quem procura imóvel',
        paras: ['A busca precisa ser simples no celular, que é onde a maioria das pessoas olha imóveis. Os recursos mais comuns são:'],
        list: [
          'Filtros por cidade, bairro, tipo, faixa de preço, quartos e vagas',
          'Ficha completa com galeria grande, planta, características e mapa aproximado',
          'Botão de WhatsApp que já informa o código do imóvel ao corretor',
          'Separação entre venda, locação e lançamentos',
          'Página de captação para proprietários com formulário próprio',
          'Páginas por bairro e por cidade, que ajudam no Google',
        ],
      },
      {
        title: 'Cadastro de imóveis sem retrabalho',
        paras: [
          'Ninguém quer cadastrar o mesmo imóvel três vezes. O painel administrativo é pensado para a rotina da equipe: subir fotos, mudar status para vendido ou alugado e destacar oportunidades em poucos cliques. Quando a imobiliária já usa um sistema de gestão com exportação de dados, o site pode ler esses dados em vez de exigir um novo cadastro.',
          'Os leads que chegam pelo site podem cair num CRM, com etapa, responsável e histórico de contato. O JB CRM, sistema próprio da JB DEV, é um exemplo de como organizar esse funil.',
        ],
      },
      {
        title: 'SEO para buscas de imóvel na região',
        paras: [
          'Buscas como "apartamento para alugar no centro" ou "casa em condomínio em Indaiatuba" são locais por natureza. Cada página de bairro e cada ficha de imóvel são estruturadas para o Google entender o que está ali, com título, descrição e dados organizados.',
        ],
      },
      {
        title: 'Velocidade e fotos grandes sem pesar',
        paras: [
          'Imóvel se vende pela foto, mas foto pesada derruba o site no celular. As imagens são otimizadas automaticamente em formatos modernos, carregadas conforme a pessoa rola a página e exibidas em tamanho certo para cada tela. Assim a galeria continua bonita e a ficha abre rápido, mesmo no 4G, que é onde muita gente procura imóvel no intervalo do trabalho.',
        ],
      },
    ],
    projects: ['jb-crm'],
    faq: [
      ['O site importa os imóveis do sistema que já uso?', 'Quando o sistema atual exporta os dados (por XML, API ou planilha), dá para integrar. Isso é verificado no briefing, antes da proposta.'],
      ['Corretores autônomos também podem ter site?', 'Podem. O projeto é dimensionado para o tamanho da carteira, de um corretor a uma imobiliária com várias lojas.'],
      ['Os leads chegam onde?', 'No WhatsApp do corretor responsável, no e-mail ou num CRM, conforme a rotina da equipe.'],
      ['Quanto custa um site para imobiliária?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Seus imóveis com a vitrine que eles merecem.', text: 'Conte quantos imóveis você tem hoje e como a equipe trabalha os leads. Respondemos em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-para-restaurantes',
    kind: 'nicho',
    metaTitle: 'Criação de Sites para Restaurantes e Cardápio Digital | JB DEV',
    metaDesc: 'Site e cardápio digital para restaurantes, lanchonetes e delivery: cardápio por categoria, busca, pedido pelo WhatsApp e informações sempre atualizadas.',
    eyebrow: '// sites para restaurantes',
    h1: 'Sites e cardápios digitais para restaurantes que vendem mais pelo WhatsApp',
    lead: 'Cardápio em PDF não abre direito no celular e fica desatualizado no primeiro aumento de preço. Um cardápio digital próprio é rápido, fácil de mudar e leva o pedido direto para o seu WhatsApp, sem comissão por venda.',
    waMessage: 'Olá, JB DEV! Tenho um restaurante e quero um site ou cardápio digital.',
    sections: [
      {
        title: 'Fome não espera carregamento',
        paras: [
          'Quem procura onde comer está com pressa e com o celular na mão. Se o cardápio demora para abrir, se a foto não carrega ou se o horário está errado, a pessoa escolhe outro lugar. O site de um restaurante precisa ser leve, direto e mostrar logo o que interessa: cardápio, preço, endereço e como pedir.',
        ],
      },
      {
        title: 'Cardápio digital próprio x aplicativo de delivery',
        paras: [
          'Os aplicativos de entrega ajudam a ser encontrado, mas cobram comissão sobre cada pedido e ficam com o contato do cliente. Com um cardápio próprio, o pedido chega pelo seu WhatsApp, o cliente é seu e você decide promoções, taxas e área de entrega.',
          'Os dois canais podem conviver. Muitos restaurantes usam o aplicativo para atrair o primeiro pedido e o cardápio próprio para fidelizar quem já conhece a casa.',
        ],
      },
      {
        title: 'O que pode ter no site do seu restaurante',
        paras: ['O projeto se ajusta ao formato da casa, do rodízio ao delivery de bairro:'],
        list: [
          'Cardápio por categorias, com busca, fotos e observações como "sem glúten"',
          'Pedido montado no site e enviado pronto para o WhatsApp',
          'Horário de funcionamento, área de entrega e formas de pagamento',
          'QR Code para as mesas, com o mesmo cardápio do site',
          'Página de reservas e eventos, quando fizer sentido',
          'Painel simples para trocar preço e pausar item que acabou',
        ],
      },
      {
        title: 'Um exemplo que já está no ar',
        paras: [
          'O Menu Online, do portfólio da JB DEV, é um cardápio digital com navegação por categorias, busca e apresentação organizada dos produtos para facilitar o pedido. Ele mostra como um cardápio pode ser claro no celular sem depender de aplicativo.',
          'Para aparecer no Google quando alguém busca "pizzaria perto de mim", o site trabalha junto com o Perfil da Empresa no Google: mesmo nome, endereço, telefone e horário nos dois lugares.',
        ],
      },
      {
        title: 'Informação certa no Google e no site',
        paras: [
          'Nada irrita mais do que chegar e encontrar a porta fechada. Feriados, horário especial e itens esgotados precisam aparecer no site no mesmo dia. Com o painel, você ajusta isso em minutos, e as fotos dos pratos são otimizadas para abrir rápido sem perder o apetite que elas despertam. Avaliações do Google podem ser destacadas para reforçar a confiança de quem ainda não conhece a casa.',
        ],
      },
    ],
    projects: ['menu-online'],
    faq: [
      ['Consigo mudar preços sozinho?', 'Sim. O cardápio é entregue com um painel para editar itens, preços e disponibilidade sem depender de ninguém.'],
      ['O pedido pode ir direto para o WhatsApp?', 'Pode. O cliente monta o pedido no site e ele chega pronto no WhatsApp da casa, com itens, observações e endereço.'],
      ['Serve para quem só faz delivery?', 'Serve. O site pode focar em delivery, em salão ou nos dois, com área de entrega e taxas configuradas.'],
      ['Quanto custa um cardápio digital?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Seu cardápio no celular do cliente, sem comissão.', text: 'Conte como funcionam seus pedidos hoje e mande o cardápio atual. Respondemos em até 24 horas.' },
  },

  // ---------------------------------------------------------------- CIDADES
  {
    slug: 'criacao-de-sites-em-campinas',
    kind: 'cidade',
    city: 'Campinas',
    metaTitle: 'Criação de Sites em Campinas | JB DEV',
    metaDesc: 'Criação de sites, landing pages e sistemas para empresas de Campinas e região metropolitana, com código próprio, SEO local e atendimento direto com o desenvolvedor.',
    eyebrow: '// campinas e região',
    h1: 'Criação de sites em Campinas para empresas que disputam atenção num mercado grande',
    lead: 'Campinas tem muita empresa boa brigando pelo mesmo cliente. A JB DEV, sediada em Indaiatuba, desenvolve sites e sistemas sob medida para negócios campineiros que querem se diferenciar com um site rápido, bem posicionado e feito com código próprio.',
    waMessage: 'Olá, JB DEV! Tenho uma empresa em Campinas e quero conversar sobre um site.',
    sections: [
      {
        title: 'Concorrência alta pede um site que trabalhe',
        paras: [
          'Em uma cidade com o porte e a economia de Campinas, quase todo segmento tem dezenas de concorrentes a poucos quilômetros. Quem busca um serviço abre três ou quatro sites e decide em segundos. Ganha quem carrega rápido, explica melhor e facilita o contato.',
          'Um template genérico raramente vence essa comparação. O site é planejado a partir do seu cliente: o que ele pesquisa, o que o faz confiar e qual o caminho mais curto até o orçamento.',
        ],
      },
      {
        title: 'Serviços para empresas de Campinas',
        paras: ['O atendimento cobre desde a primeira página até sistemas internos:'],
        list: [
          'Sites institucionais e landing pages para campanhas',
          'Lojas virtuais e catálogos com pedido pelo WhatsApp',
          'Sistemas sob medida: CRM, agendamento, painéis e áreas de cliente',
          'Automação de atendimento no WhatsApp com IA',
          'SEO local e Perfil da Empresa no Google',
        ],
      },
      {
        title: 'SEO local pensado para bairros e região metropolitana',
        paras: [
          'Campinas é grande o bastante para que a busca aconteça por bairro: Cambuí, Taquaral, Barão Geraldo e assim por diante. Para negócios com atendimento físico, o site pode ter páginas específicas por região de atuação, alinhadas ao Perfil da Empresa no Google. Para quem atende toda a região metropolitana, como Valinhos, Vinhedo, Paulínia e Hortolândia, o conteúdo deixa isso claro para o Google e para o cliente.',
        ],
      },
      {
        title: 'Como funciona o atendimento',
        paras: [
          'As reuniões acontecem online, por vídeo, em cada etapa: briefing, aprovação do layout e entrega. Quando faz sentido, dá para combinar um encontro presencial, já que Indaiatuba fica na região metropolitana de Campinas. Em todos os casos você fala direto com o Jonathan, que desenha e programa o projeto.',
          'Ao final, código, domínio e acessos ficam no seu nome. Depois da entrega, o suporte e a evolução do site continuam com a mesma pessoa que o construiu.',
        ],
      },
      {
        title: 'Velocidade como diferencial competitivo',
        paras: [
          'Em mercado disputado, segundos fazem diferença. Os sites da JB DEV são construídos com Next.js, imagens otimizadas e carregamento pensado para o celular, com meta de nota acima de 90 no Lighthouse. Isso melhora a experiência de quem visita e é um dos sinais que o Google considera na hora de ordenar os resultados. Ninguém garante primeira posição, mas um site lento já começa perdendo.',
        ],
      },
    ],
    projects: ['balli-acessorios', 'jb-crm', 'valarine-beauty'],
    faq: [
      ['A JB DEV tem escritório em Campinas?', 'A sede fica em Indaiatuba, na região metropolitana de Campinas. O atendimento para empresas campineiras é online, com encontros presenciais quando o projeto pede.'],
      ['Vocês atendem as cidades vizinhas de Campinas?', 'Sim: Valinhos, Vinhedo, Paulínia, Hortolândia, Sumaré e toda a região metropolitana.'],
      ['Em quanto tempo o site fica pronto?', 'Sites em poucas semanas, conforme o escopo. Sistemas dependem dos módulos e são entregues por etapas.'],
      ['Quanto custa um site em Campinas?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Sua empresa de Campinas com um site à altura.', text: 'Conte o que você vende e para quem. A resposta chega em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-em-itu',
    kind: 'cidade',
    city: 'Itu',
    metaTitle: 'Criação de Sites em Itu | JB DEV',
    metaDesc: 'Sites para empresas, comércio e turismo em Itu: páginas rápidas, SEO local, integração com WhatsApp e atendimento próximo, a poucos quilômetros de Indaiatuba.',
    eyebrow: '// itu',
    h1: 'Criação de sites em Itu para comércio, serviços e turismo',
    lead: 'Itu recebe visitantes de toda a região e tem um comércio local forte. A JB DEV, de Indaiatuba, cria sites que ajudam empresas ituanas a serem encontradas por quem mora na cidade e por quem está planejando uma visita.',
    waMessage: 'Olá, JB DEV! Tenho um negócio em Itu e quero conversar sobre um site.',
    sections: [
      {
        title: 'Dois públicos: quem mora e quem visita',
        paras: [
          'Uma cidade histórica e turística como Itu tem um desafio curioso. O mesmo negócio atende o morador, que já conhece a região, e o turista, que pesquisa pelo celular antes de sair de casa ou já andando pelo centro histórico. São perguntas diferentes, e o site precisa responder as duas.',
          'Para o morador, importam serviços, preço e facilidade de contato. Para o visitante, importam localização, horário, fotos do lugar e como chegar. Um site bem estruturado separa essas jornadas sem complicar a navegação.',
        ],
      },
      {
        title: 'Negócios que mais se beneficiam',
        paras: ['Atendemos qualquer segmento, mas alguns ganham muito com presença digital organizada em Itu:'],
        list: [
          'Restaurantes, cafés e doçarias que dependem do movimento de fim de semana',
          'Pousadas, espaços de evento e chácaras para festas e casamentos',
          'Lojas do centro que querem vender também pelo WhatsApp',
          'Clínicas, escritórios e prestadores de serviço da cidade',
          'Indústrias e empresas que precisam de um site institucional sólido',
        ],
      },
      {
        title: 'Aparecer no mapa na hora certa',
        paras: [
          'Boa parte das buscas locais acontece no Google Maps. O site é construído junto com o Perfil da Empresa no Google, com nome, endereço, telefone e horário iguais nos dois lugares, fotos atualizadas e dados estruturados que ajudam o Google a entender onde você está e o que oferece.',
          'Para quem recebe turistas, vale também ter conteúdo sobre a experiência: o que tem no local, como reservar e o que fazer por perto. Esse tipo de página atrai buscas de quem ainda está decidindo o passeio.',
        ],
      },
      {
        title: 'Perto de verdade',
        paras: [
          'Itu e Indaiatuba são vizinhas. Isso facilita reuniões presenciais quando o projeto pede, além das reuniões online em cada etapa. Você conversa direto com quem desenvolve, sem intermediário, e recebe o código e os acessos do site no seu nome.',
        ],
      },
      {
        title: 'Conteúdo que conta a história do negócio',
        paras: [
          'Muitos negócios de Itu têm história: famílias que tocam o comércio há décadas, receitas tradicionais, prédios antigos restaurados. Esse tipo de narrativa diferencia a empresa e cria conexão com o cliente. O site tem espaço para contar essa trajetória com fotos e texto bem escritos, sem virar um livro, e sem esquecer o que mais importa: o botão para falar com você.',
        ],
      },
    ],
    projects: ['menu-online', 'valarine-beauty', 'balli-acessorios'],
    faq: [
      ['Dá para fazer reunião presencial em Itu?', 'Dá. Como Itu fica ao lado de Indaiatuba, encontros presenciais podem ser combinados nas etapas mais importantes do projeto.'],
      ['Meu negócio depende de turismo. O site ajuda?', 'Ajuda a ser encontrado por quem planeja a visita: fotos, localização, horários, reservas e conteúdo sobre a experiência, tudo pensado para o celular.'],
      ['Vocês cuidam do Perfil da Empresa no Google?', 'Sim. A configuração e a otimização do perfil fazem parte do serviço de SEO local, que pode ser contratado junto com o site.'],
      ['Quanto custa um site em Itu?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Seu negócio em Itu encontrado por quem procura.', text: 'Conte o que você faz e quem é seu cliente. Respondemos em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-em-salto',
    kind: 'cidade',
    city: 'Salto',
    metaTitle: 'Criação de Sites em Salto/SP | JB DEV',
    metaDesc: 'Criação de sites e sistemas para empresas de Salto/SP: presença no Google, WhatsApp integrado e atendimento presencial com a JB DEV, da vizinha Indaiatuba.',
    eyebrow: '// salto',
    h1: 'Criação de sites em Salto para empresas que querem sair da indicação boca a boca',
    lead: 'Em Salto, muito negócio cresce por indicação. Isso é ótimo até a indicação parar. Um site próprio, bem posicionado no Google, traz clientes novos todo mês, e a JB DEV atende a cidade de perto, a partir de Indaiatuba.',
    waMessage: 'Olá, JB DEV! Tenho uma empresa em Salto e quero conversar sobre um site.',
    sections: [
      {
        title: 'Indicação é bom, mas não é previsível',
        paras: [
          'Em cidades do porte de Salto, a reputação corre rápido e o boca a boca sustenta muitos negócios. O problema é que ele não se controla: tem mês cheio e mês parado. Quando alguém recebe a sua indicação, a primeira coisa que faz é procurar seu nome no Google. Se não encontra nada, ou encontra um perfil abandonado, a indicação perde força.',
          'O site funciona como prova. Ele confirma que a empresa existe, mostra o trabalho e facilita o contato. E, com SEO local, começa a trazer gente que nunca ouviu falar de você, mas pesquisou pelo serviço na cidade.',
        ],
      },
      {
        title: 'Um projeto do tamanho do seu negócio',
        paras: ['Nem todo negócio precisa de um site grande. O ponto de partida é entender o objetivo e escolher o formato certo:'],
        list: [
          'Landing page para um serviço principal ou uma campanha',
          'Site institucional com páginas de serviço, sobre e contato',
          'Catálogo ou loja com pedido pelo WhatsApp',
          'Sistema de agendamento para quem vive de horário marcado',
          'Perfil da Empresa no Google configurado e ligado ao site',
        ],
      },
      {
        title: 'Salto, Itu e Indaiatuba: uma região só',
        paras: [
          'Muita gente mora em uma dessas cidades e trabalha ou consome na outra. Um negócio de Salto pode atender clientes de Itu e Indaiatuba sem esforço extra, e o site pode deixar isso claro, com áreas de atendimento bem informadas e conteúdo que fala com quem está em toda a região.',
          'Para a JB DEV, essa proximidade também conta: dá para combinar visitas presenciais quando o projeto pede, além das reuniões online.',
        ],
      },
      {
        title: 'Depois da entrega',
        paras: [
          'Site parado envelhece. Depois do lançamento, a JB DEV segue com suporte, ajustes e novas páginas conforme o negócio cresce. Você fala com quem programou o site, então a correção não precisa passar por fila de atendimento.',
        ],
      },
      {
        title: 'O que você precisa separar antes de começar',
        paras: [
          'Para o projeto andar rápido, vale reunir algumas coisas: logotipo, fotos do espaço e do trabalho, lista de serviços com uma descrição curta de cada um, horário de atendimento e as perguntas que os clientes mais fazem. Se faltar algo, a JB DEV ajuda a organizar e escrever os textos durante o briefing. Fotos profissionais fazem diferença, mas não precisam travar o lançamento.',
        ],
      },
    ],
    projects: ['izabella-nail-designer', 'vitra-mobile', 'jb-barber'],
    faq: [
      ['A JB DEV atende presencialmente em Salto?', 'Atende. A sede fica em Indaiatuba, cidade vizinha, e encontros presenciais podem ser combinados quando o projeto pede.'],
      ['Tenho um negócio pequeno. Vale a pena ter site?', 'Vale, se o formato for proporcional. Uma landing page bem feita, ligada ao Perfil da Empresa no Google, já muda a forma como novos clientes te encontram.'],
      ['Em quanto tempo fica pronto?', 'Sites em poucas semanas, conforme o escopo e o tempo de envio de textos e fotos.'],
      ['Quanto custa um site em Salto?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Do boca a boca para o Google.', text: 'Conte como os clientes chegam até você hoje. A resposta vem em até 24 horas.' },
  },
  {
    slug: 'criacao-de-sites-em-sorocaba',
    kind: 'cidade',
    city: 'Sorocaba',
    metaTitle: 'Criação de Sites e Sistemas em Sorocaba | JB DEV',
    metaDesc: 'Sites, lojas virtuais e sistemas sob medida para empresas de Sorocaba e região: código próprio, integrações e atendimento online com o desenvolvedor.',
    eyebrow: '// sorocaba e região',
    h1: 'Criação de sites e sistemas em Sorocaba para empresas que querem crescer com processo',
    lead: 'Sorocaba tem indústria, comércio e serviços em ritmo de cidade grande. A JB DEV atende empresas sorocabanas com sites que geram contato e sistemas que organizam a operação, sempre com código próprio e atendimento direto.',
    waMessage: 'Olá, JB DEV! Tenho uma empresa em Sorocaba e quero conversar sobre um projeto.',
    sections: [
      {
        title: 'Site que vende e sistema que organiza',
        paras: [
          'Em muitas empresas de Sorocaba, o site é só a ponta do problema. Os pedidos chegam, mas se perdem entre planilhas, cadernos e conversas de WhatsApp. Por isso a conversa costuma começar no site e terminar na operação: de onde vem o cliente, quem atende, como o orçamento é feito e como a venda é acompanhada.',
          'A JB DEV trabalha nas duas pontas. O site atrai e converte; o sistema sob medida organiza o que acontece depois.',
        ],
      },
      {
        title: 'O que dá para construir',
        paras: ['Alguns projetos comuns para empresas da região:'],
        list: [
          'Site institucional para indústrias e prestadores de serviço B2B',
          'Landing pages para campanhas e geração de orçamento',
          'Loja virtual ou catálogo com integração ao WhatsApp',
          'CRM sob medida para acompanhar leads, propostas e follow-ups',
          'Automação de atendimento no WhatsApp com IA',
          'Integrações entre o site e os sistemas que a empresa já usa',
        ],
      },
      {
        title: 'Empresas B2B também precisam de presença digital',
        paras: [
          'Compradores de empresas pesquisam fornecedores na internet antes de pedir cotação. Um site institucional claro, com linhas de produtos, certificações, capacidade de atendimento e canais de contato, encurta esse processo e passa credibilidade para quem ainda não conhece a empresa.',
          'Para essas empresas, o SEO não é sobre "perto de mim", e sim sobre termos técnicos do setor. O conteúdo é organizado para aparecer nessas buscas específicas.',
        ],
      },
      {
        title: 'Atendimento online, com proximidade',
        paras: [
          'O atendimento para Sorocaba é feito com reuniões online em cada etapa, compartilhamento de tela e acompanhamento por entregas. Quando o projeto pede, um encontro presencial pode ser combinado. Do briefing à manutenção, você fala com o mesmo desenvolvedor, e o código fica no seu nome.',
        ],
      },
      {
        title: 'Do primeiro briefing à operação rodando',
        paras: [
          'O primeiro passo é uma conversa para mapear o processo atual: como o cliente chega, quem responde, onde ficam os dados. A partir disso sai uma proposta fechada, com escopo e etapas. Sistemas são entregues por módulos, para que a equipe comece a usar cedo e ajuste o que for preciso. Ninguém precisa esperar meses para ver resultado.',
          'Ao final, o código fica com a empresa, documentado, e o suporte continua com quem construiu, o que evita depender de um fornecedor que não conhece o sistema.',
        ],
      },
    ],
    projects: ['jb-crm', 'finance-ai', 'balli-acessorios'],
    faq: [
      ['Vocês atendem empresas de Sorocaba presencialmente?', 'O atendimento padrão é online, com reuniões por vídeo em cada etapa. Encontros presenciais podem ser combinados quando o projeto pede.'],
      ['Dá para integrar o site ao sistema que já usamos?', 'Na maioria dos casos, sim, quando o sistema atual oferece API ou exportação de dados. Isso é avaliado no briefing.'],
      ['Vocês fazem sistemas além de sites?', 'Sim. CRM, agendamento, painéis de gestão e automações fazem parte dos serviços da JB DEV.'],
      ['Quanto custa um projeto em Sorocaba?', 'Valor conforme o escopo, com proposta fechada após o briefing.'],
    ],
    cta: { title: 'Site e operação andando juntos.', text: 'Conte o que sua empresa faz e onde o processo trava hoje. Respondemos em até 24 horas.' },
  },
];

export const LOCAL_SLUGS = LOCAL_PAGES.map((p) => p.slug);
export const getLocalPage = (slug: string) => LOCAL_PAGES.find((p) => p.slug === slug);

/** Página de cidade correspondente a um nome (para links do rodapé). */
export const cityPath = (city: string) => {
  const p = LOCAL_PAGES.find((x) => x.kind === 'cidade' && x.city === city);
  return p ? `/${p.slug}` : undefined;
};
