import { JuaSymbol } from "./JuaSymbol";

export function Logo({ href = "/#topo" }: { href?: string }) {
  return (
    <a className="logo" href={href} aria-label="Juá Agency — início">
      <JuaSymbol size={32} />
      <span>
        Juá <i>Agency</i>
      </span>
    </a>
  );
}
