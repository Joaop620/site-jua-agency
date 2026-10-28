import { studio } from "@/content/site";
import { MoonPhase } from "../MoonPhase";

export function Studio() {
  return (
    <section className="sec studio" id="estudio" aria-labelledby="studio-title">
      <div className="wrap studio-grid">
        <div>
          <div className="kick label">O estúdio</div>
          <h2 id="studio-title" className="h h-l rv">
            Pequeno, <i className="pink">de propósito</i>.
          </h2>
          <div className="studio-text">
            {studio.paragraphs.map((t, i) => (
              <p className={i === 0 ? "lead rv" : "rv"} key={i}>
                {t}
              </p>
            ))}
          </div>
        </div>
        <ul className="team">
          {studio.team.map((m) => (
            <li className="member rv" key={m.name}>
              <div className="member-mark" aria-hidden="true">
                <MoonPhase phase={2} />
              </div>
              <div>
                <h3>{m.name}</h3>
                <p className="label">{m.role}</p>
                <ul className="member-links">
                  {m.links.map((l) => (
                    <li key={l.href}>
                      <a className="ul" href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
