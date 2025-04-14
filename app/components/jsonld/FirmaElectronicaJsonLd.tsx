import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function FirmaElectronicaJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Firma Electrónica',
    description: 'Solución de firma electrónica certificada para empresas y personas',
    url: 'https://firmedigital.com/productos/firma-electronica',
    brand: {
      '@type': 'Brand',
      name: 'FirmeDigital'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    image: 'https://firmedigital.com/images/firma-electronica.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/productos/firma-electronica'
    }
  };

  return <BaseJsonLd data={data} />;
}
