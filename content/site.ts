// Todo o conteúdo editável do site fica aqui.
// Para trocar uma imagem, coloque o arquivo em /public/images e aponte o caminho em `image`.
// Se `image` ficar vazio, o site mostra um placeholder gerado no lugar.

export type Project = {
  slug: string;
  title: string;
  client: string;
  services: string[];
  year: string;
  image?: string;
  /** "tall" ocupa duas linhas (4:5, topo em arco); "wide" é 16:10 */
  layout: "tall" | "wide";
  summary?: string;
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

export const projects: Project[] = [
  {
    slug: "do-improviso-ao-posicionamento",
    title: "Do improviso ao posicionamento",
    client: "Cliente",
    services: ["Branding"],
    year: "2026",
    layout: "tall",
    image: "",
  },
  {
    slug: "projeto-2",
    title: "Nome do projeto",
    client: "Cliente",
    services: ["Identidade", "Social"],
    year: "2026",
    layout: "wide",
    image: "",
  },
  {
    slug: "projeto-3",
    title: "Nome do projeto",
    client: "Cliente",
    services: ["Site"],
    year: "2026",
    layout: "wide",
    image: "",
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
