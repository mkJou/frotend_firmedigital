import React from 'react';
import BaseJsonLd from '../BaseJsonLd';

export default function SectorIngenieriaJsonLd() {
  // Datos estructurados para el Sector Ingeniería
  const sectorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Firma Digital para Sector Ingeniería - FIRMEDIGITAL PSC',
    description: 'Soluciones de firma electrónica certificada por SUSCERTE para ingenieros y empresas de ingeniería en Venezuela. Optimice la gestión de planos, informes descriptivos y proyectos de ingeniería con validez legal.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    serviceType: 'Firma Electrónica para Sector Ingeniería',
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
          description: 'Hasta 10 créditos para firmas digitales en proyectos de ingeniería',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/ingenieria#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para firmas digitales en proyectos de ingeniería',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/ingenieria#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para firmas digitales en proyectos de ingeniería',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/ingenieria#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    // Casos de uso específicos para el sector ingeniería
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Planos y diseños',
        description: 'Firma digital de planos arquitectónicos, diseños estructurales y documentación técnica'
      },
      {
        '@type': 'UseAction',
        name: 'Informes descriptivos',
        description: 'Firma digital de informes técnicos, memorias descriptivas y estudios de factibilidad'
      },
      {
        '@type': 'UseAction',
        name: 'Proyectos de ingeniería',
        description: 'Firma digital de proyectos completos, presupuestos y cronogramas de obra'
      }
    ],
    // Preguntas frecuentes sobre el servicio para el sector ingeniería
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo beneficia la firma digital a los profesionales de ingeniería en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La firma digital certificada por SUSCERTE permite a los ingenieros venezolanos firmar planos, informes y proyectos con validez legal, agilizando la aprobación de proyectos, reduciendo costos de impresión y traslado de documentos, y facilitando la colaboración remota entre equipos de trabajo.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué documentos de ingeniería pueden firmarse digitalmente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pueden firmarse digitalmente planos arquitectónicos, diseños estructurales, memorias de cálculo, informes técnicos, presupuestos, cronogramas, estudios de impacto ambiental, y cualquier otro documento relacionado con proyectos de ingeniería.'
        }
      },
      {
        '@type': 'Question',
        name: '¿La firma digital tiene validez ante los colegios profesionales de ingeniería en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, nuestra firma digital está certificada por SUSCERTE (Superintendencia de Servicios de Certificación Electrónica) de la República Bolivariana de Venezuela, lo que le otorga validez legal ante los colegios profesionales de ingeniería y organismos públicos del país.'
        }
      }
    ]
  };

  return <BaseJsonLd data={sectorJsonLd} />;
}
