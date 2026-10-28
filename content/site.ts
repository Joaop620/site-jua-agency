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
  { href: "#diagnostico", label: "Diagnóstico" },
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
  { phase: 1 as const, title: "Imersão", sub: "a gente escuta antes de desenhar.", text: "Conversamos com você, olhamos seus números, seus clientes e seus concorrentes." },
  { phase: 2 as const, title: "Estratégia", sub: "o mapa antes da viagem.", text: "Posicionamento, público, tom de voz e mensagem principal, tudo documentado." },
  { phase: 3 as const, title: "Design", sub: "a parte que todo mundo vê.", text: "Logo, paleta, tipografia, aplicações e manual. Bonito e construído sobre a estratégia." },
  { phase: 4 as const, title: "Lançamento", sub: "e a gente mede o que importa.", text: "Marca na rua com conteúdo e site, acompanhando resultados e ajustando o que for preciso." },
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

export const formServices = ["Branding", "Identidade visual", "Social media", "Site", "Tudo junto"];
