# Juá Agency — site

Site one-page da Juá Agency, baseado na primeira versão do design (`Site Juá Agency.html`) com uma camada visual mais tecnológica: lua de partículas interativa no hero, HUD, grid, ticker, pipeline do processo que acompanha a rolagem, diagnóstico em formato de console e formulário com envio real.

Stack: Next.js (App Router) + TypeScript, CSS global com variáveis (sem Tailwind), fontes via `next/font/google`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

## Editar o conteúdo

Tudo que é texto editável (projetos, serviços, processo, sinais do diagnóstico, depoimento, contato e mês da agenda) está em **`content/site.ts`**. O layout fica em `components/sections/*.tsx`.

## Planos, preços e dúvidas

Em `content/site.ts`:

- `plans`: os três planos mensais de social media (nome, frase, preço mensal, itens). O desconto do semestral fica em `semesterDiscount`.
- `planCompare`: as linhas da tabela "Comparar os planos".
- `projectPrices`: projetos avulsos com preço "a partir de" e prazo.
- `faq`: perguntas e respostas da seção Dúvidas (também viram dados estruturados para o Google).

Quando alguém clica em "Quero o ..." ou na seta de um projeto, a escolha aparece no formulário e vai junto no e-mail.

## Projetos

Os cinco projetos em `content/site.ts` vêm do portfólio da Lua ([GitHub](https://github.com/Joaop620/lua-design-portfolio) · [Behance](https://www.behance.net/rlua)). As capas são carregadas direto do CDN do Behance (liberado em `next.config.ts`) e cada case tem o link para o projeto completo. Para adicionar um projeto, copie um item da lista e troque título, serviços, ano, imagem e `href`.

## Imagens

Coloque os arquivos em `public/images/` e aponte o caminho em `content/site.ts`. Enquanto o campo `image` estiver vazio, o site mostra um placeholder no tamanho certo.

| Arquivo sugerido | Onde | Proporção |
| --- | --- | --- |
| `/images/case-1.jpg` | Projeto principal (`layout: "tall"`) | 4:5 |
| `/images/case-2.jpg`, `/images/case-3.jpg` | Projetos secundários (`layout: "wide"`) | 16:10 |
| `/images/avatar.jpg` | Foto do depoimento (`testimonial.avatar`) | 1:1 |
| `gallery: [...]` de cada projeto | Página `/trabalhos/[slug]` | 4:5 |

A imagem principal da página de case usa 16:8.

## Contato e formulário

- E-mail: juagency.info@gmail.com · Instagram: @agencyjua · WhatsApp: +55 (69) 99245-9026 (tudo em `content/site.ts`).
- O formulário abre o WhatsApp da Juá com a mensagem pronta. Funciona sem nenhuma configuração.
- Cópia por e-mail (opcional): crie uma conta grátis no [Resend](https://resend.com) com o e-mail acima, gere uma API key e adicione `RESEND_API_KEY` nas variáveis de ambiente da Vercel. Sem domínio próprio, o remetente padrão é `onboarding@resend.dev`.

## Segurança

- **Cabeçalhos HTTP** em todas as páginas (`next.config.ts`): Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy e COOP.
- **Rota do formulário** (`app/api/contato/route.ts`): aceita só POST com JSON, confere a origem, limita o tamanho (16 KB) e o número de envios por IP (5 a cada 10 min), valida tudo no servidor (zod), tem campo-isca anti-robô, escapa o HTML do e-mail e não é indexada.
- **Dependências** sem vulnerabilidades conhecidas (`npm audit` limpo). Rode `npm audit` de vez em quando e atualize o Next.js quando sair versão de segurança.
- **Segredos** só em variáveis de ambiente; `.env*` está no `.gitignore`.
- `/.well-known/security.txt` com o contato pra quem achar alguma falha.

## Privacidade (LGPD)

Página `/privacidade` explica quais dados o site recebe, pra quê, com quem passam e como pedir a exclusão. Ela é linkada no rodapé e no formulário. O site não usa cookies de rastreamento (o Vercel Analytics é anônimo e sem cookies), então não precisa de banner de cookies.

## Publicar na Vercel

1. O projeto `site-jua-agency` já publica sozinho a cada envio para o GitHub.
2. Endereço atual: https://site-jua-agency.vercel.app
3. Domínio próprio: adicione em *Settings → Domains* e defina `NEXT_PUBLIC_SITE_URL` com o novo endereço (usado no sitemap, no Google e no compartilhamento).

SEO e métricas já inclusos: Vercel Analytics (ativa sozinho na Vercel), dados estruturados (serviço, ofertas e FAQ), metadata, Open Graph gerado (`app/opengraph-image.tsx`), favicon a partir do símbolo (`app/icon.svg`), `sitemap.xml` e `robots.txt`. As animações respeitam `prefers-reduced-motion`.
