import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function GestorDocumentosJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Gestor de Documentos',
    description: 'Sistema avanzado de gestión documental para empresas',
    url: 'https://firmedigital.com/productos/gestor-de-documentos',
    brand: {
      '@type': 'Brand',
      name: 'FirmeDigital'
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock'
    },
    image: 'https://firmedigital.com/images/gestor-documentos.webp',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/productos/gestor-de-documentos'
    }
  };

  return <BaseJsonLd data={data} />;
}
