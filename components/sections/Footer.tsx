import { nav, site } from "@/content/site";
import { Logo } from "../Logo";
import { Clock } from "../Clock";

export function Footer() {
  const c = site.contact;
  return (
    <footer className="foot">
      <div className="wrap">
        <p className="h foot-big rv">
          Bonito é o começo. <i className="pink">Vender</i> é o ponto.
        </p>
        <div className="foot-grid">
          <div>
            <Logo />
            <p className="foot-desc">Agência criativa de branding, identidade visual, social media e sites.</p>
          </div>
          <div>
            <h4>Navegue</h4>
            <ul>
              {nav.map((l) => (
                <li key={l.href}>
                  <a className="ul" href={`/${l.href}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a className="ul" href={`mailto:${c.email}`}>
                  {c.email}
                </a>
              </li>
              <li>
                <a className="ul" href={c.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  {c.whatsapp.label}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Redes</h4>
            <ul>
              <li>
                <a className="ul" href={c.instagram.href} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot label">
          <span>© 2026 Juá Agency</span>
          <Clock prefix="São Paulo" />
          <span>jua.agency · est. 2026</span>
        </div>
      </div>
    </footer>
  );
}
