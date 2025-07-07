import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function IAJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Soluciones de IA',
    description: 'Soluciones de inteligencia artificial para automatización de procesos documentales',
    url: 'https://firmedigital.com/productos/ia',
    brand: {
      '@type': 'Brand',
      name: 'FirmeDigital'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    image: 'https://firmedigital.com/images/ia-solutions.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/productos/ia'
    }
  };

  return <BaseJsonLd data={data} />;
}
