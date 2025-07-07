import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function MultifirmaJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Multifirma',
    description: 'Solución para la firma múltiple de documentos en empresas',
    url: 'https://firmedigital.com/productos/multifirma',
    brand: {
      '@type': 'Brand',
      name: 'FirmeDigital'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    image: 'https://firmedigital.com/images/multifirma.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/productos/multifirma'
    }
  };

  return <BaseJsonLd data={data} />;
}
