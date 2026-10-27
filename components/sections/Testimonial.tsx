import Image from "next/image";
import { testimonial } from "@/content/site";
import { ScrollWords } from "../ScrollWords";

export function Testimonial() {
  return (
    <section className="sec testi" data-progress aria-label="Depoimento">
      <figure className="wrap testi-in">
        <div className="q rv" aria-hidden="true">
          “
        </div>
        <blockquote>
          <ScrollWords text={testimonial.quote} start={-0.05} span={0.75} />
        </blockquote>
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
