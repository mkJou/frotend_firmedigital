import React from 'react';
import BaseJsonLd from '../BaseJsonLd';

export default function SectorLegalJsonLd() {
  // Datos estructurados para el Sector Legal
  const sectorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Firma Digital para Sector Legal - FIRMEDIGITAL PSC',
    description: 'Soluciones de firma electrónica certificada por SUSCERTE para abogados, notarios y profesionales del derecho en Venezuela. Optimice la gestión de contratos, poderes notariados y documentos legales con plena validez jurídica.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    serviceType: 'Firma Electrónica para Sector Legal',
    areaServed: {
      '@type': 'Country',
      name: 'Venezuela'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: '10',
      highPrice: '100',
      offerCount: 3,
      offers: [
        {
          '@type': 'Offer',
          name: 'Plan Despegue',
          description: 'Hasta 10 créditos para firmas digitales en documentos legales',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/legal#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para firmas digitales en documentos legales',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/legal#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para firmas digitales en documentos legales',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/legal#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    // Casos de uso específicos para el sector legal, basados en la memoria
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Contratos',
        description: 'Firma digital de contratos civiles, mercantiles y laborales con validez legal'
      },
      {
        '@type': 'UseAction',
        name: 'Poderes notariados',
        description: 'Firma digital de poderes y documentos notariales'
      },
      {
        '@type': 'UseAction',
        name: 'Documentos legales',
        description: 'Firma digital de demandas, recursos, escritos y documentos judiciales'
      },
      {
        '@type': 'UseAction',
        name: 'Acuerdos y convenios',
        description: 'Firma digital de acuerdos entre partes y convenios de colaboración'
      },
      {
        '@type': 'UseAction',
        name: 'Dictámenes jurídicos',
        description: 'Firma digital de dictámenes, informes y opiniones legales'
      },
      {
        '@type': 'UseAction',
        name: 'Documentación corporativa',
        description: 'Firma digital de actas, estatutos y documentos societarios'
      }
    ],
    // Preguntas frecuentes sobre el servicio para el sector legal
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo beneficia la firma digital al sector legal en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La firma digital certificada por SUSCERTE permite a los profesionales del derecho venezolanos firmar contratos, poderes y documentos legales con plena validez jurídica, agilizando procesos, reduciendo costos de gestión documental y facilitando el trabajo remoto con clientes y tribunales.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Los documentos firmados digitalmente son admisibles en tribunales venezolanos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, los documentos firmados digitalmente con nuestra solución certificada por SUSCERTE tienen plena validez legal y son admisibles como prueba en tribunales venezolanos, conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas de la República Bolivariana de Venezuela.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se verifica la autenticidad de un documento legal firmado digitalmente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La autenticidad de un documento legal firmado digitalmente puede verificarse a través de nuestro servicio de validación, que comprueba la integridad del documento, la identidad del firmante y la vigencia del certificado digital emitido por SUSCERTE.'
        }
      }
    ],
    // Imagen destacada
    image: 'https://firmedigital.com/images/sectores/legal.png'
  };

  return <BaseJsonLd data={sectorJsonLd} />;
}
