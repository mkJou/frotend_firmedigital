import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function HomeJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FirmeDigital',
    url: 'https://firmedigital.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://firmedigital.com/images/logo.svg'
    },
    description: 'Soluciones avanzadas de firma digital y gestión documental certificada para empresas',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES'
    },
    sameAs: [
      'https://www.linkedin.com/company/firmedigital',
      'https://twitter.com/firmedigital'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Firma Digital',
      itemListElement: [{
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Servicios de Firma Digital',
          description: 'Soluciones de firma digital avanzada y gestión documental para empresas'
        }
      }]
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com'
    }
  };

  return <BaseJsonLd data={data} />;
}
