import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { JuaSymbol } from "@/components/JuaSymbol";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Juá Agency trata os dados enviados pelo site, de acordo com a LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  const email = site.contact.email;
  return (
    <>
      <header className="nav">
        <div className="nav-pill">
          <Link className="nav-logo" href="/" aria-label="Juá Agency, início">
            <JuaSymbol size={28} />
            <span>
              Juá <i>Agency</i>
            </span>
          </Link>
          <Link className="nav-cta nav-back" href="/">
            ← Voltar ao site
          </Link>
        </div>
      </header>
      <main id="conteudo" className="case-page legal">
        <div className="wrap">
          <p className="kick">Atualizada em novembro de 2026</p>
          <h1 className="h h-l">Política de privacidade</h1>
          <div className="legal-body">
            <p className="lead">
              A Juá Agency respeita a sua privacidade. Este texto explica, de forma direta, quais dados o site recebe, para que
              servem e como você pode pedir que sejam apagados, conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>

            <h2>Quem cuida dos seus dados</h2>
            <p>
              Juá Agency, estúdio de branding, design e social media. Contato para qualquer assunto de privacidade:{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>

            <h2>O que coletamos</h2>
            <ul>
              <li>
                <strong>Formulário de contato:</strong> nome, e-mail, empresa ou Instagram, serviços de interesse, plano escolhido
                e a mensagem que você escrever. Esses dados vão para o nosso WhatsApp quando você toca em enviar e, se estiver
                ativado, também chegam por e-mail.
              </li>
              <li>
                <strong>Rascunho do formulário:</strong> o que você digita fica guardado só no seu navegador por até 7 dias, para
                não se perder se você sair da página. Nada disso chega até nós antes do envio.
              </li>
              <li>
                <strong>Estatísticas de visita:</strong> usamos o Vercel Analytics, que conta visitas de forma anônima, sem
                cookies e sem identificar você.
              </li>
            </ul>

            <h2>Pra que usamos</h2>
            <p>
              Apenas para responder ao seu contato e preparar uma proposta. Não vendemos, não alugamos e não compartilhamos seus dados
              com terceiros para fins de publicidade.
            </p>

            <h2>Com quem os dados passam</h2>
            <ul>
              <li>WhatsApp (Meta), quando você envia a mensagem pelo app;</li>
              <li>Resend, serviço de envio de e-mail, quando a cópia por e-mail está ativada;</li>
              <li>Vercel, empresa que hospeda o site.</li>
            </ul>

            <h2>Por quanto tempo</h2>
            <p>
              Guardamos as conversas enquanto houver uma negociação ou projeto em andamento e por até 2 anos depois, por motivos
              contratuais e fiscais. Você pode pedir a exclusão antes disso.
            </p>

            <h2>Seus direitos</h2>
            <p>
              Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, ou saber com quem eles foram
              compartilhados. Basta escrever para <a href={`mailto:${email}`}>{email}</a> e responderemos em até 15 dias.
            </p>

            <h2>Cookies</h2>
            <p>Este site não usa cookies de rastreamento nem de publicidade.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
