import { attributes } from "@/content/site";

export function Attributes() {
  return (
    <section className="attrs" aria-label="Como a Juá é">
      <div className="wrap attrs-in">
        {attributes.map((a, i) => (
          <div className="attr rv" key={a.title} data-spot>
            <div className="attr-top mono">
              <span>MOD.0{i + 1}</span>
              <span className="attr-bar" style={{ ["--w" as string]: `${[92, 88, 96, 100][i]}%` }} aria-hidden="true" />
            </div>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
