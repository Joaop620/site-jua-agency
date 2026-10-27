import { Effects } from "@/components/Effects";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Attributes } from "@/components/sections/Attributes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Diagnostic } from "@/components/sections/Diagnostic";
import { Testimonial } from "@/components/sections/Testimonial";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Effects />
      <Nav />
      <main id="conteudo">
        <span id="topo" />
        <Hero />
        <Marquee />
        <Attributes />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Diagnostic />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
