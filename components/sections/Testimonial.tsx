import Image from "next/image";
import { testimonial } from "@/content/site";

export function Testimonial() {
  return (
    <section className="sec testi" aria-label="Depoimento">
      <div className="stars" aria-hidden="true" />
      <div className="wave" aria-hidden="true">
        {Array.from({ length: 48 }, (_, i) => (
          <span key={i} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      <figure className="wrap rv testi-in">
        <div className="q" aria-hidden="true">
          “
        </div>
        <blockquote>{testimonial.quote}</blockquote>
        <figcaption className="who">
          <div className="avatar">
            {testimonial.avatar ? (
              <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="72px" />
            ) : (
              <span className="mono">Foto</span>
            )}
          </div>
          <div>
            <strong>{testimonial.name}</strong>
            <span className="mono">{testimonial.company}</span>
          </div>
          <span className="verified mono">
            <span className="pulse" aria-hidden="true" /> Cliente verificado
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
