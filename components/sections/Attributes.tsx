import { attributes } from "@/content/site";

export function Attributes() {
  return (
    <section className="attrs" aria-label="Como a Juá é">
      <div className="wrap attrs-in">
        {attributes.map((a, i) => (
          <div className="attr rv" key={a.title} style={{ ["--d" as string]: i }}>
            <span className="label attr-n">0{i + 1}</span>
            <h3>{a.title}</h3>
            <p>{a.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
