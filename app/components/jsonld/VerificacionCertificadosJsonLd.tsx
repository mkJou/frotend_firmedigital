import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function VerificacionCertificadosJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Verificación de Certificados',
    description: 'Servicio de verificación de certificados digitales',
    url: 'https://firmedigital.com/productos/verificacion-certificados',
    provider: {
      '@type': 'Organization',
      name: 'FirmeDigital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firmedigital.com/images/logo.svg'
      }
    },
    serviceType: 'Verificación Digital',
    areaServed: {
      '@type': 'Country',
      name: 'España'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/productos/verificacion-certificados'
    }
  };

  return <BaseJsonLd data={data} />;
}
