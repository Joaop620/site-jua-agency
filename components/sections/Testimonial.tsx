import Image from "next/image";
import { testimonial } from "@/content/site";

export function Testimonial() {
  return (
    <section className="sec testi" aria-label="Depoimento">
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
              <span className="mono">Foto</span>
            )}
          </div>
          <div>
            <strong>{testimonial.name}</strong>
            <span className="mono">{testimonial.company}</span>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
