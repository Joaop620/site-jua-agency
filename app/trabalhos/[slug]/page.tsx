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
  return p ? { title: p.title, description: `${p.client} · ${p.services.join(", ")} · ${p.year}` } : {};
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const gallery = p.gallery?.length ? p.gallery : ["", "", ""];

  return (
    <>
      <header className="nav">
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
          <dl className="case-specs label">
            <div>
              <dt>Cliente</dt>
              <dd>{p.client}</dd>
            </div>
            <div>
              <dt>Serviços</dt>
              <dd>{p.services.join(" · ")}</dd>
            </div>
            <div>
              <dt>Ano</dt>
              <dd>{p.year}</dd>
            </div>
          </dl>
          {p.summary && <p className="lead">{p.summary}</p>}
          <div className="case-hero">
            <Media src={p.image} alt={p.title} label="Imagem principal · 16:8" sizes="100vw" priority />
          </div>
          <div className="case-gallery">
            {gallery.map((g, j) => (
              <div className="case-gi" key={j}>
                <Media src={g} alt={`${p.title} — imagem ${j + 1}`} label={`Galeria ${j + 1} · 4:5`} sizes="(max-width: 600px) 100vw, 33vw" />
              </div>
            ))}
          </div>
          <Link className="case-next" href={`/trabalhos/${next.slug}`}>
            <span className="label">Próximo case →</span>
            <span className="h h-m">{next.title}</span>
          </Link>
        </div>
      </main>
    </>
  );
}
