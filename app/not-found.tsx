import Link from "next/link";
import { JuaSymbol } from "@/components/JuaSymbol";

export default function NotFound() {
  return (
    <main id="conteudo" className="nf">
      <JuaSymbol size={88} />
      <p className="label nf-code">Erro 404</p>
      <h1 className="h h-l">
        Lua <i className="pink">nova</i> por aqui.
      </h1>
      <p className="lead">Essa página não existe, ou ainda não nasceu.</p>
      <Link className="btn btn-p" href="/">
        Voltar pro início <span className="arr" aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
