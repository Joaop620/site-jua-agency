import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Now } from "../Now";

export function Contact() {
  const c = site.contact;
  return (
    <section className="sec contact" id="contato" data-progress aria-labelledby="contact-title">
      <div className="rise" aria-hidden="true" />
      <div className="wrap contact-in">
        <div>
          <div className="kick">
            <Now kind="month" />
          </div>
          <h2 id="contact-title" className="h h-l rv">
            Agenda aberta pra novos projetos.
          </h2>
          <p className="lead" style={{ marginTop: 28 }}>
            Trabalhamos com poucos clientes por vez, pra dar atenção de verdade a cada marca. Conta um pouco do seu negócio: a mensagem vai pronta pro nosso WhatsApp e a gente marca a conversa por lá.
          </p>
          <div className="contact-info">
            <a href={`mailto:${c.email}`}>
              <span className="label">E-mail</span>
              {c.email}
            </a>
            <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer">
              <span className="label">WhatsApp</span>
              {c.whatsapp.label}
            </a>
            <a href={c.instagram.href} target="_blank" rel="noopener noreferrer">
              <span className="label">Instagram</span>
              {c.instagram.label}
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
