import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const c = site.contact;
  return (
    <section className="sec contact" id="contato" aria-labelledby="contact-title">
      <div className="rise" aria-hidden="true" />
      <div className="wrap contact-in">
        <div>
          <div className="kick mono">
            {site.agenda.month} · {site.agenda.year}
          </div>
          <h2 id="contact-title" className="h h-l rv">
            Agenda <i className="pink">aberta</i> pra novos projetos.
          </h2>
          <p className="lead" style={{ marginTop: 28 }}>
            Trabalhamos com poucos clientes por vez, pra dar atenção de verdade a cada marca. Conta um pouco do seu negócio e a
            gente volta pra marcar uma conversa.
          </p>
          <div className="contact-info">
            <a href={`mailto:${c.email}`}>
              <span className="mono">E-mail</span>
              {c.email}
            </a>
            <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <span className="mono">WhatsApp</span>
              {c.whatsapp.label}
            </a>
            <a href={c.instagram.href} target="_blank" rel="noopener noreferrer">
              <span className="mono">Instagram</span>
              {c.instagram.label}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
