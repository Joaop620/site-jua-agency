import Image from "next/image";

type Props = { src?: string; alt: string; label: string; sizes: string; priority?: boolean; seed?: number };

/** Imagem do projeto (next/image) ou, sem arquivo, um placeholder gerado com o grid da marca. */
export function Media({ src, alt, label, sizes, priority, seed = 0 }: Props) {
  if (src) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="media-img" />;
  return (
    <div className="ph" style={{ ["--seed" as string]: seed }} role="img" aria-label={alt}>
      <div className="ph-grid" />
      <svg className="ph-moon" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M38 7 A26 26 0 1 0 57 38 A18.5 18.5 0 0 1 38 7 Z" fill="none" stroke="currentColor" strokeWidth=".4" />
      </svg>
      <span className="ph-label mono">{label}</span>
    </div>
  );
}
