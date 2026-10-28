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

## Formulário (Resend)

1. Crie uma conta no [Resend](https://resend.com), verifique o domínio `jua.agency` e gere uma API key.
2. Copie `.env.example` para `.env.local` e preencha `RESEND_API_KEY` (e, se quiser, `CONTACT_FROM` / `CONTACT_TO`).
3. O envio passa por `app/api/contato/route.ts`, com validação no servidor (zod) e campo honeypot anti-spam. Sem a chave, o formulário mostra a mensagem de erro.

## Publicar na Vercel

1. Importe este repositório em [vercel.com/new](https://vercel.com/new) (framework detectado: Next.js).
2. Em *Settings → Environment Variables*, adicione `RESEND_API_KEY` (e as outras do `.env.example`).
3. Aponte o domínio `jua.agency` em *Settings → Domains*.

SEO e métricas já inclusos: Vercel Analytics (ativa sozinho na Vercel), dados estruturados (serviço, ofertas e FAQ), metadata, Open Graph gerado (`app/opengraph-image.tsx`), favicon a partir do símbolo (`app/icon.svg`), `sitemap.xml` e `robots.txt`. As animações respeitam `prefers-reduced-motion`.
