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
  /** "tall" ocupa duas linhas (topo em arco), "wide" é 16:10, "half" é 4:3 */
  layout: "tall" | "wide" | "half";
  summary?: string;
  /** Link do projeto completo (Behance) */
  href?: string;
  gallery?: string[];
};

export const site = {
  url: "https://jua.agency",
  name: "Juá Agency",
  tagline: "Bonito. Estratégico. Vende.",
  description:
    "Agência criativa de branding, identidade visual, social media e sites. Design bonito, estratégia clara e resultado que dá pra medir.",
  agenda: { open: true, month: "Novembro", year: "2026" },
  contact: {
    email: "ola@jua.agency",
    whatsapp: { label: "+55 11 9 8765-4321", href: "https://wa.me/5511987654321" },
    instagram: { label: "@jua.agency", href: "https://instagram.com/jua.agency" },
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
  { title: "Confiável", text: "Cada decisão tem um porquê, e a gente explica qual é." },
  { title: "Premium", text: "Tipografia, cor e acabamento escolhidos com cuidado editorial." },
  { title: "Direta", text: "Sem rodeio. A gente promete o que dá pra cumprir, e cumpre." },
  { title: "Noturna", text: "Trabalhamos enquanto outras agências dormem." },
];

export const services = [
  {
    n: "i.",
    area: "Estratégia",
    title: "Branding & posicionamento",
    text: "Quem você é, pra quem fala e por que alguém deveria escolher você.",
    items: ["Imersão no negócio", "Pesquisa de público e concorrência", "Posicionamento e proposta de valor", "Tom de voz e mensagens-chave"],
    pick: "Branding",
  },
  {
    n: "ii.",
    area: "Design",
    title: "Identidade visual",
    text: "Logo, cores, tipografia e um manual pra marca ficar igual em qualquer lugar.",
    items: ["Logotipo e variações", "Paleta e tipografia", "Aplicações: papelaria, redes, embalagem", "Manual de marca"],
    pick: "Identidade visual",
  },
  {
    n: "iii.",
    area: "Conteúdo",
    title: "Social media",
    text: "Conteúdo planejado pra atrair as pessoas certas e transformar seguidor em cliente.",
    items: ["Estratégia e calendário editorial", "Posts, carrosséis e stories", "Roteiros de reels", "Relatório mensal de resultados"],
    pick: "Social media",
  },
  {
    n: "iv.",
    area: "Digital",
    title: "Sites & landing pages",
    text: "Páginas bonitas que guiam o visitante até o pedido de orçamento.",
    items: ["Arquitetura e textos", "Design responsivo", "Desenvolvimento e publicação", "Métricas e ajustes"],
    pick: "Site",
  },
];

export const phases = [
  { phase: 1 as const, title: "Imersão", sub: "a gente escuta antes de desenhar.", text: "Conversamos com você, olhamos seus números, seus clientes e seus concorrentes.", time: "Semana 1" },
  { phase: 2 as const, title: "Estratégia", sub: "o mapa antes da viagem.", text: "Posicionamento, público, tom de voz e mensagem principal, tudo documentado.", time: "Semanas 2 e 3" },
  { phase: 3 as const, title: "Design", sub: "a parte que todo mundo vê.", text: "Logo, paleta, tipografia, aplicações e manual. Bonito e construído sobre a estratégia.", time: "Semanas 3 a 6" },
  { phase: 4 as const, title: "Lançamento", sub: "e a gente mede o que importa.", text: "Marca na rua com conteúdo e site, acompanhando resultados e ajustando o que for preciso.", time: "Contínuo" },
];

// Projetos do portfólio da Lua (github.com/Joaop620/lua-design-portfolio · behance.net/rlua)
export const projects: Project[] = [
  {
    slug: "identidade-visual-lua-design",
    title: "Identidade Visual Lua Design",
    client: "Lua Design",
    services: ["Branding", "Logo", "Guidelines"],
    year: "2024",
    layout: "tall",
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
    layout: "wide",
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
    layout: "half",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/bb394f193166227.65e759d04fed9.png",
    href: "https://www.behance.net/gallery/193166227/Social-Media-Programador",
    summary: "Série de peças para presença digital de programador.",
  },
];

export const signs = [
  { title: "Você precisa explicar demais o que faz.", text: "Todo cliente novo pede uma reunião só pra entender o seu serviço." },
  { title: "Cada post parece de uma empresa diferente.", text: "Muda a cor, a fonte e o tom. Quem vê não cria memória." },
  { title: "Você só consegue competir no preço.", text: "Quando a percepção de valor é baixa, desconto vira o único argumento." },
  { title: "Dá receio de mandar o link do seu Instagram.", text: "No fundo você sabe que o seu negócio é melhor do que parece." },
];

export const testimonial = {
  quote: "Antes eu tinha vergonha de mandar o link do meu Instagram. Hoje é ele que apresenta a minha empresa.",
  name: "Nome do cliente",
  company: "Empresa · Cidade",
  avatar: "",
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
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "Pra marca aparecer com constância e cara de profissional.",
    price: 1490,
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
    tagline: "Pra quem quer transformar seguidor em cliente.",
    price: 2690,
    featured: true,
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
    tagline: "Conteúdo, comunidade e anúncios num lugar só.",
    price: 4290,
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
    a: "Entre 4 e 6 semanas, contando imersão, estratégia, design e manual. O prazo exato entra na proposta, e a gente cumpre.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Projetos são divididos em até 3 parcelas: entrada, entrega da proposta visual e entrega final. Planos mensais são cobrados todo mês, e o semestral sai 10% mais barato.",
  },
  {
    q: "Tem fidelidade nos planos mensais?",
    a: "O plano mensal pode ser cancelado com 30 dias de aviso. O semestral tem o desconto justamente pelo compromisso de 6 meses.",
  },
  {
    q: "Quantas rodadas de ajuste estão incluídas?",
    a: "Duas rodadas em cada etapa do projeto. Nos planos mensais, cada peça pode ser ajustada antes de ir pro ar.",
  },
  {
    q: "A verba de anúncios está incluída no plano Completo?",
    a: "Não. A gestão das campanhas está incluída; a verba é paga direto pra plataforma (Meta ou Google) e você define o valor.",
  },
  {
    q: "Vocês atendem fora de São Paulo?",
    a: "Sim. O trabalho é todo remoto, com reuniões por vídeo, então atendemos marcas do Brasil inteiro.",
  },
  {
    q: "Posso começar só por um serviço?",
    a: "Pode. Muita gente começa pela identidade e depois parte pro conteúdo. A gente ajuda a decidir a ordem que faz mais sentido pro seu momento.",
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
