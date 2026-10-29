// Todo o conteúdo editável do site fica aqui.
// Para trocar uma imagem, coloque o arquivo em /public/images e aponte o caminho em `image`.
// Se `image` ficar vazio, o site mostra um placeholder gerado no lugar.

export type Project = {
  slug: string;
  title: string;
  client: string;
  services: string[];
  year: string;
  /** Capa do projeto: caminho em /public/images ou URL do Behance */
  image?: string;
  /** "tall" ocupa duas linhas (topo em arco), "wide" é 16:10, "half" é 4:3, "full" ocupa a linha toda */
  layout: "tall" | "wide" | "half" | "full";
  summary?: string;
  /** Link do projeto completo (Behance ou o site no ar) */
  href?: string;
  /** Texto do botão e da frase do link (padrão: Behance) */
  hrefLabel?: string;
  hrefText?: string;
  /** Desafio, o que foi feito, resultado… */
  details?: { label: string; text: string }[];
  /** Imagem grande da página do case (16:9); se vazia, usa `image` */
  cover?: string;
  /** Telas largas (16:9) */
  screens?: string[];
  /** Galeria (4:5) */
  gallery?: string[];
};

export const site = {
  // endereço público do site; com domínio próprio, defina NEXT_PUBLIC_SITE_URL na Vercel
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://site-jua-agency.vercel.app").replace(/\/$/, ""),
  name: "Juá Agency",
  tagline: "Bonito. Estratégico. Vende.",
  description:
    "Estúdio de branding, identidade visual, social media e sites em Ji-Paraná (RO). Design com estratégia e resultados mensuráveis.",
  // o mês e o ano da agenda são calculados na hora (mês atual)
  agenda: { open: true },
  contact: {
    email: "juagency.info@gmail.com",
    whatsapp: { label: "+55 (69) 99245-9026", href: "https://wa.me/5569992459026", phone: "+5569992459026" },
    instagram: { label: "@agencyjua", href: "https://www.instagram.com/agencyjua/" },
    behance: { label: "Behance", href: "https://www.behance.net/rlua" },
  },
};

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const attributes = [
  { title: "Confiável", text: "Toda decisão tem um motivo, e você sabe qual é." },
  { title: "Premium", text: "Tipografia, cor e acabamento tratados com cuidado editorial." },
  { title: "Direta", text: "Prometemos apenas o que podemos cumprir. E cumprimos." },
  { title: "Dedicada", text: "Poucos clientes por vez, com atenção real a cada marca." },
];

export const services = [
  {
    n: "i.",
    area: "Estratégia",
    title: "Branding & posicionamento",
    text: "Quem é a sua marca, com quem ela fala e por que deve ser a escolhida.",
    items: ["Imersão no negócio", "Pesquisa de público e concorrência", "Posicionamento e proposta de valor", "Tom de voz e mensagens-chave"],
    pick: "Branding",
  },
  {
    n: "ii.",
    area: "Design",
    title: "Identidade visual",
    text: "Logo, cores, tipografia e um manual que mantém a marca consistente em qualquer aplicação.",
    items: ["Logotipo e variações", "Paleta e tipografia", "Aplicações: papelaria, redes, embalagem", "Manual de marca"],
    pick: "Identidade visual",
  },
  {
    n: "iii.",
    area: "Conteúdo",
    title: "Social media",
    text: "Conteúdo planejado para atrair o público certo e transformar seguidores em clientes.",
    items: ["Estratégia e calendário editorial", "Posts, carrosséis e stories", "Roteiros de reels", "Relatório mensal de resultados"],
    pick: "Social media",
  },
  {
    n: "iv.",
    area: "Digital",
    title: "Sites & landing pages",
    text: "Páginas que conduzem o visitante, com clareza, até o pedido de orçamento.",
    items: ["Arquitetura e textos", "Design responsivo", "Desenvolvimento e publicação", "Métricas e ajustes"],
    pick: "Site",
  },
];

export const phases = [
  { phase: 1 as const, title: "Imersão", sub: "ouvir antes de desenhar.", text: "Entrevistas, análise de números, clientes e concorrentes.", time: "Semana 1" },
  { phase: 2 as const, title: "Estratégia", sub: "o mapa antes da viagem.", text: "Posicionamento, público, tom de voz e mensagem principal, tudo documentado.", time: "Semanas 2 e 3" },
  { phase: 3 as const, title: "Design", sub: "a parte que todos veem.", text: "Logo, paleta, tipografia, aplicações e manual, construídos sobre a estratégia.", time: "Semanas 3 a 6" },
  { phase: 4 as const, title: "Lançamento", sub: "e a medição do que importa.", text: "Marca no ar com conteúdo e site, acompanhamento de resultados e ajustes contínuos.", time: "Contínuo" },
];

// Projetos do portfólio da Lua (github.com/Joaop620/lua-design-portfolio · behance.net/rlua)
export const projects: Project[] = [
  {
    slug: "coletivo-respirartes",
    title: "Coletivo Respirartes",
    client: "Coletivo Respirartes · Ponto de Cultura de Ji-Paraná (RO)",
    services: ["Site", "Design", "Desenvolvimento"],
    year: "2026",
    layout: "tall",
    image: "/images/respirartes/capa-v2.jpg",
    cover: "/images/respirartes/desktop-hero.jpg",
    href: "https://respirartes.com",
    hrefLabel: "Ver o site no ar",
    hrefText: "O site está no ar em respirartes.com.",
    summary:
      "Site oficial do Respirartes, coletivo de doze artistas de Ji-Paraná reconhecido como Ponto de Cultura pela Política Nacional Cultura Viva.",
    details: [
      {
        label: "Desafio",
        text: "Reunir em um só lugar a história do coletivo, os sete filmes, as ações culturais e o certificado de Ponto de Cultura, com ótima experiência no celular, onde está o público deles.",
      },
      {
        label: "O que fizemos",
        text: "Arquitetura e textos, design com tipografia marcante e as cores das linguagens do coletivo, vídeo de apresentação de 2 minutos, galeria com 21 fotos das ações e certificado com link de verificação. Site leve, que abre rápido mesmo com conexão fraca.",
      },
      {
        label: "Resultado",
        text: "Site publicado com domínio próprio, acessível e pronto para compartilhar. O coletivo incluiu o link na bio do Instagram no mesmo dia da entrega.",
      },
    ],
    screens: ["/images/respirartes/desktop-filmes-v2.jpg", "/images/respirartes/desktop-acoes-v2.jpg"],
    gallery: [
      "/images/respirartes/celular-filmes-v2.jpg",
      "/images/respirartes/celular-sobre-v2.jpg",
      "/images/respirartes/celular-acoes-v2.jpg",
      "/images/respirartes/celular-certificado-v2.jpg",
    ],
  },
  {
    slug: "identidade-visual-lua-design",
    title: "Identidade Visual Lua Design",
    client: "Lua Design",
    services: ["Branding", "Logo", "Guidelines"],
    year: "2024",
    layout: "wide",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d5c1d4188786339.65a130c530602.jpg",
    href: "https://www.behance.net/gallery/188786339/Identidade-Visual-Lua-Design",
    summary: "A marca autoral da Lua: alegre, moderna e elegante.",
  },
  {
    slug: "deus-eu-e-o-cachorro-toto",
    title: "Deus, Eu e o cachorro Totó",
    client: "Documentário cultural · Lei Paulo Gustavo",
    services: ["Design gráfico", "Social media", "Banner", "Camiseta"],
    year: "2025",
    layout: "wide",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/05babb228666705.6856f4c4b9b63.png",
    href: "https://www.behance.net/gallery/228666705/Design-Grafico-Deus-Eu-e-o-cachorro-Toto",
    summary: "Materiais visuais para documentário cultural (Lei Paulo Gustavo).",
  },
  {
    slug: "consultor-imobiliario",
    title: "Consultor Imobiliário",
    client: "Consultor imobiliário",
    services: ["Social media", "Identidade"],
    year: "2024",
    layout: "half",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/defb3a198776469.664661fe5be14.png",
    href: "https://www.behance.net/gallery/198776469/Social-Media-Consultor-Imobiliario",
    summary: "Criação de artes e reforço de identidade para performance nas redes.",
  },
  {
    slug: "loja-de-roupas",
    title: "Loja de roupas",
    client: "Loja de moda",
    services: ["Social media", "Moda"],
    year: "2024",
    layout: "half",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_632_webp/139e8a198595029.6643c63b843f1.png",
    href: "https://www.behance.net/gallery/198595029/Social-Media-Loja-de-roupas",
    summary: "Pacote criativo para posicionamento de marca e divulgação de produtos.",
  },
  {
    slug: "programador",
    title: "Programador",
    client: "Programador",
    services: ["Social media", "Tech"],
    year: "2024",
    layout: "full",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/bb394f193166227.65e759d04fed9.png",
    href: "https://www.behance.net/gallery/193166227/Social-Media-Programador",
    summary: "Série de peças para presença digital de programador.",
  },
];

export const signs = [
  { title: "Você precisa explicar demais o que faz.", text: "Todo cliente novo precisa de uma reunião só para entender o seu serviço." },
  { title: "Cada post parece de uma empresa diferente.", text: "Muda a cor, a fonte e o tom. Quem vê não cria memória." },
  { title: "Você só consegue competir no preço.", text: "Quando a percepção de valor é baixa, desconto vira o único argumento." },
  { title: "Dá receio de mandar o link do seu Instagram.", text: "No fundo você sabe que o seu negócio é melhor do que parece." },
];

export const testimonial = {
  quote:
    "Que lindo! Ficou a cara do coletivo, do jeito que a gente sonhava. Já colocamos o link na bio do Instagram e todo mundo que viu amou. Agora a gente tem um lugar pra mostrar nossos filmes e nossas ações com orgulho.",
  name: "Coletivo Respirartes",
  company: "Ponto de Cultura · Ji-Paraná, RO",
  avatar: "/images/respirartes/logo.jpg",
  /** case do projeto (slug em `projects`) */
  project: "coletivo-respirartes",
};

export const formServices = ["Branding", "Identidade visual", "Social media", "Site", "Tudo junto", "Ainda não sei"];

// ---------- Planos e preços ----------
// Valores de referência (pesquisa de mercado BR 2026). Ajuste à vontade.

/** Desconto aplicado na contratação semestral dos planos mensais */
export const semesterDiscount = 0.1;

/**
 * Promoção de inauguração: desconto sobre todos os preços (planos e projetos).
 * Para encerrar, troque `active` para false e os preços cheios voltam sozinhos.
 */
export const launchPromo = {
  active: true,
  discount: 0.2,
  label: "Preço de inauguração",
  until: "contratos fechados até 31 de dezembro",
};

/** Preço com a promoção aplicada, arredondado para a dezena. */
export const promoPrice = (price: number) =>
  launchPromo.active ? Math.round((price * (1 - launchPromo.discount)) / 10) * 10 : price;

export type Plan = {
  id: string;
  name: string;
  tagline: string;
  /** preço mensal em reais, no plano mensal */
  price: number;
  featured?: boolean;
  features: string[];
  /** Entregas por mês; no semestral o site mostra o total de 6 meses */
  monthly: { n: number; label: string }[];
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "Presença constante e profissional nas redes.",
    price: 1490,
    monthly: [
      { n: 12, label: "posts" },
      { n: 1, label: "calendários editoriais" },
      { n: 1, label: "reuniões de pauta" },
      { n: 1, label: "relatórios" },
    ],
    features: [
      "12 posts por mês (feed e carrossel)",
      "Calendário editorial mensal",
      "Legendas e hashtags",
      "1 reunião de pauta por mês",
      "Relatório mensal simples",
    ],
  },
  {
    id: "crescimento",
    name: "Crescimento",
    tagline: "Para transformar seguidores em clientes.",
    price: 2690,
    featured: true,
    monthly: [
      { n: 16, label: "posts" },
      { n: 12, label: "stories" },
      { n: 4, label: "roteiros de reels" },
      { n: 2, label: "reuniões" },
    ],
    features: [
      "16 posts por mês (feed e carrossel)",
      "12 stories por mês",
      "4 roteiros de reels",
      "Estratégia de conteúdo trimestral",
      "Relatório com métricas e próximos passos",
      "Reunião quinzenal",
    ],
  },
  {
    id: "completo",
    name: "Completo",
    tagline: "Conteúdo, comunidade e anúncios em um só lugar.",
    price: 4290,
    monthly: [
      { n: 20, label: "posts" },
      { n: 20, label: "stories" },
      { n: 8, label: "roteiros de reels" },
      { n: 4, label: "reuniões" },
    ],
    features: [
      "20 posts por mês (feed e carrossel)",
      "20 stories por mês",
      "8 roteiros de reels",
      "Resposta a comentários e directs (dias úteis)",
      "Gestão de anúncios (verba à parte)",
      "Relatório completo e reunião semanal",
    ],
  },
];

/** Linhas da tabela de comparação: [item, essencial, crescimento, completo] */
export const planCompare: [string, string, string, string][] = [
  ["Posts no feed", "12", "16", "20"],
  ["Stories", "—", "12", "20"],
  ["Roteiros de reels", "—", "4", "8"],
  ["Calendário editorial", "✓", "✓", "✓"],
  ["Estratégia de conteúdo", "Mensal", "Trimestral", "Trimestral"],
  ["Gestão de comunidade", "—", "—", "✓"],
  ["Gestão de anúncios", "—", "—", "✓"],
  ["Reuniões", "Mensal", "Quinzenal", "Semanal"],
  ["Relatório", "Simples", "Com métricas", "Completo"],
];

export type ProjectPrice = { name: string; text: string; from: number; time: string; pick: string };

export const projectPrices: ProjectPrice[] = [
  { name: "Identidade visual", text: "Logo, variações, paleta, tipografia, aplicações e manual de marca.", from: 3900, time: "4 a 6 semanas", pick: "Identidade visual" },
  { name: "Branding completo", text: "Imersão, posicionamento, tom de voz e identidade visual completa.", from: 6900, time: "6 a 8 semanas", pick: "Branding" },
  { name: "Landing page", text: "Uma página de venda com textos, design responsivo e publicação.", from: 2900, time: "2 a 3 semanas", pick: "Site" },
  { name: "Site institucional", text: "Até 6 páginas, textos, design, desenvolvimento e métricas.", from: 5900, time: "4 a 6 semanas", pick: "Site" },
];

// ---------- Dúvidas frequentes ----------
export const faq = [
  {
    q: "Quanto tempo leva um projeto de identidade visual?",
    a: "Entre 4 e 6 semanas, incluindo imersão, estratégia, design e manual. O prazo exato consta na proposta.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Projetos podem ser parcelados em até 3 vezes: entrada, aprovação da proposta visual e entrega final. Planos são cobrados mensalmente; no semestral, cada mensalidade sai 10% mais barata.",
  },
  {
    q: "Tem fidelidade nos planos mensais?",
    a: "O plano mensal pode ser cancelado com 30 dias de aviso. O semestral oferece desconto em troca do compromisso de 6 meses.",
  },
  {
    q: "Quantas rodadas de ajuste estão incluídas?",
    a: "Duas rodadas por etapa do projeto. Nos planos mensais, cada peça pode ser ajustada antes da publicação.",
  },
  {
    q: "A verba de anúncios está incluída no plano Completo?",
    a: "Não. A gestão das campanhas está incluída; a verba é paga diretamente à plataforma (Meta ou Google), no valor que você definir.",
  },
  {
    q: "Vocês atendem fora de Rondônia?",
    a: "Sim. A Juá fica em Ji-Paraná (RO), mas trabalha de forma remota, com reuniões por vídeo, e atende marcas de todo o Brasil.",
  },
  {
    q: "Posso começar por apenas um serviço?",
    a: "Sim. Muitos clientes começam pela identidade e depois seguem para o conteúdo. Ajudamos a definir a ordem ideal para o seu momento.",
  },
];

// ---------- Estúdio ----------
export const studio = {
  paragraphs: [
    "Somos um estúdio pequeno, e isso é de propósito. Atendemos poucos clientes por vez pra conhecer cada negócio de perto e cuidar dos detalhes que fazem diferença.",
    "A gente gosta de design bonito, mas só quando ele ajuda a vender. Por isso toda decisão aqui tem um motivo, e a gente sempre conta qual é.",
    "E sim, muita coisa boa por aqui acontece depois das dez da noite.",
  ],
  team: [
    {
      name: "Lua",
      role: "Designer gráfica",
      links: [
        { label: "Behance", href: "https://www.behance.net/rlua" },
        { label: "Instagram", href: "https://www.instagram.com/designerrlua/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/raisalua/" },
      ],
    },
  ],
};
