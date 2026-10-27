import Image from "next/image";

type Props = { src?: string; alt: string; label: string; sizes: string; priority?: boolean };

/** Imagem do projeto (next/image) ou, sem arquivo, um espaço reservado na proporção certa. */
export function Media({ src, alt, label, sizes, priority }: Props) {
  if (src) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="media-img" />;
  return (
    <div className="ph" role="img" aria-label={alt}>
      <span className="ph-label label">{label}</span>
    </div>
  );
}
