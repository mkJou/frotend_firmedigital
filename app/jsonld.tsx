export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FirmeDigital',
    url: 'https://firmedigital.com',
    logo: 'https://firmedigital.com/images/logo.svg',
    description: 'Soluciones avanzadas de firma digital y gestión documental certificada para empresas',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES'
    },
    sameAs: [
      'https://www.linkedin.com/company/firmedigital',
      'https://twitter.com/firmedigital'
    ],
    offers: {
      '@type': 'Offer',
      name: 'Servicios de Firma Digital',
      description: 'Soluciones de firma digital avanzada y gestión documental para empresas',
      category: 'Digital Signature Services'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}