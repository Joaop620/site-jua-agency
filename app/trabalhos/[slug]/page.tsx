import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { Logo } from "@/components/Logo";
import { Media } from "@/components/Placeholder";

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
      <header className="nav" data-solid>
        <div className="wrap nav-bar">
          <Logo />
          <Link className="btn btn-g btn-sm" href="/#trabalhos">
            ← Todos os trabalhos
          </Link>
        </div>
      </header>
      <main id="conteudo" className="case-page">
        <div className="wrap">
          <div className="kick label">Case {String(i + 1).padStart(2, "0")}</div>
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
          <div className="case-hero">
            <Media src={p.image} alt={p.title} label="Imagem principal" sizes="(max-width: 1320px) 100vw, 1220px" priority />
          </div>
          {p.gallery?.length ? (
            <div className="case-gallery">
              {p.gallery.map((g, j) => (
                <div className="case-gi" key={g}>
                  <Media src={g} alt={`${p.title}, imagem ${j + 1}`} label={`Imagem ${j + 1}`} sizes="(max-width: 600px) 100vw, 33vw" />
                </div>
              ))}
            </div>
          ) : null}
          {p.href && (
            <div className="case-cta">
              <p>As peças completas deste projeto estão no Behance.</p>
              <a className="btn btn-p" href={p.href} target="_blank" rel="noopener noreferrer">
                Ver projeto completo <span className="arr" aria-hidden="true">↗</span>
              </a>
            </div>
          )}
          <Link className="case-next" href={`/trabalhos/${next.slug}`}>
            <span className="label">Próximo case</span>
            <span className="h h-m">
              <span className="ul">{next.title}</span> <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
