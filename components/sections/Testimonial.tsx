import Image from "next/image";
import Link from "next/link";
import { testimonial } from "@/content/site";

export function Testimonial() {
  return (
    <section className="sec testi" data-dark aria-label="Depoimento">
      <figure className="wrap testi-in">
        <div className="q rv" aria-hidden="true">
          “
        </div>
        <blockquote className="rv">{testimonial.quote}</blockquote>
        <figcaption className="who rv">
          <div className="avatar">
            {testimonial.avatar ? (
              <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="72px" />
            ) : (
              <span className="label">Foto</span>
            )}
          </div>
          <div>
            <strong>{testimonial.name}</strong>
            <span className="label">{testimonial.company}</span>
          </div>
          {testimonial.project && (
            <Link className="testi-link ul" href={`/trabalhos/${testimonial.project}`}>
              Ver o projeto <span aria-hidden="true">→</span>
            </Link>
          )}
        </figcaption>
      </figure>
    </section>
  );
}
