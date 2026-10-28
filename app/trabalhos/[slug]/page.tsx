import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { JuaSymbol } from "@/components/JuaSymbol";
import { Media } from "@/components/Placeholder";
import { Footer } from "@/components/sections/Footer";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.summary ?? `${p.client} · ${p.services.join(", ")} · ${p.year}`,
        openGraph: p.image?.startsWith("http") ? { images: [p.image] } : undefined,
      }
    : {};
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <header className="nav" data-light>
        <div className="wrap nav-bar">
          <Link className="nav-logo" href="/" aria-label="Juá Agency, início">
            <JuaSymbol size={26} variant="mono" />
            <span>
              Juá <i>Agency</i>
            </span>
          </Link>
          <Link className="nav-cta nav-back" href="/#trabalhos">
            ← Todos os trabalhos
          </Link>
        </div>
      </header>
      <main id="conteudo" className="case-page">
        <div className="wrap">
          <div className="kick">Case {String(i + 1).padStart(2, "0")}</div>
          <h1 className="h h-l">{p.title}</h1>
          <div className="case-intro">
            {p.summary && <p className="lead">{p.summary}</p>}
            <dl className="case-specs">
              <div>
                <dt className="label">Cliente</dt>
                <dd>{p.client}</dd>
              </div>
              <div>
                <dt className="label">Serviços</dt>
                <dd>{p.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="label">Ano</dt>
                <dd>{p.year}</dd>
              </div>
            </dl>
          </div>
          <div className="case-hero" data-cover={p.cover ? "" : undefined}>
            <Media src={p.cover || p.image} alt={p.title} label="Imagem principal" sizes="(max-width: 1320px) 100vw, 1220px" priority />
          </div>
          {p.details?.length ? (
            <dl className="case-details">
              {p.details.map((d) => (
                <div key={d.label}>
                  <dt className="label">{d.label}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {p.screens?.map((src, j) => (
            <div className="case-screen" key={src}>
              <Media src={src} alt={`${p.title}, tela ${j + 2} no computador`} label={`Tela ${j + 2}`} sizes="(max-width: 1320px) 100vw, 1220px" />
            </div>
          ))}
          {p.gallery?.length ? (
            <div className="case-gallery">
              {p.gallery.map((g, j) => (
                <div className="case-gi" key={g}>
                  <Media src={g} alt={`${p.title}, imagem ${j + 1}`} label={`Imagem ${j + 1}`} sizes="(max-width: 600px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          ) : null}
          {p.href && (
            <div className="case-cta">
              <p>{p.hrefText ?? "As peças completas deste projeto estão no Behance."}</p>
              <a className="btn btn-p" href={p.href} target="_blank" rel="noopener noreferrer">
                {p.hrefLabel ?? "Ver projeto completo"} <span className="arr" aria-hidden="true">↗</span>
              </a>
            </div>
          )}
          <div className="case-ask">
            <h2 className="h h-m">
              Quer algo assim pra sua marca?
            </h2>
            <div className="case-ask-ctas">
              <Link className="btn btn-p" href="/#form">
                Agendar conversa
              </Link>
              <Link className="btn btn-g" href="/#planos">
                Ver planos e preços
              </Link>
            </div>
          </div>
          <Link className="case-next" href={`/trabalhos/${next.slug}`}>
            <span className="label">Próximo case</span>
            <span className="h h-m">
              <span className="ul">{next.title}</span> <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
