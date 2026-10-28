import { Effects } from "@/components/Effects";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Attributes } from "@/components/sections/Attributes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Diagnostic } from "@/components/sections/Diagnostic";
// import { Testimonial } from "@/components/sections/Testimonial";
import { Studio } from "@/components/sections/Studio";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StructuredData } from "@/components/StructuredData";
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
        <Attributes />
        <Manifesto />
        <Services />
        <Process />
        <Work />
        <Diagnostic />
        {/* depoimento escondido até ter um cliente real: volte a linha abaixo quando tiver */}
        {/* <Testimonial /> */}
        <Studio />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <StructuredData />
    </>
  );
}
