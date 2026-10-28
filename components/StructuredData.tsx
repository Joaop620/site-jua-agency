import { faq, plans, projectPrices, promoPrice, site } from "@/content/site";

/** Dados estruturados (schema.org) para o Google entender a agência, os preços e as dúvidas. */
export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      email: site.contact.email,
      telephone: site.contact.whatsapp.phone,
      description: site.description,
      slogan: site.tagline,
      areaServed: "BR",
      sameAs: [site.contact.instagram.href, site.contact.behance.href],
      makesOffer: [
        ...plans.map((p) => ({
          "@type": "Offer",
          name: `Social media · ${p.name}`,
          price: promoPrice(p.price),
          priceCurrency: "BRL",
          priceSpecification: { "@type": "UnitPriceSpecification", price: promoPrice(p.price), priceCurrency: "BRL", unitText: "MONTH" },
        })),
        ...projectPrices.map((p) => ({
          "@type": "Offer",
          name: p.name,
          priceSpecification: { "@type": "PriceSpecification", minPrice: promoPrice(p.from), priceCurrency: "BRL" },
        })),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
