import React from 'react';
import BaseJsonLd from '../BaseJsonLd';

export default function SectorIndustrialJsonLd() {
  // Datos estructurados para el Sector Industrial
  const sectorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Firma Digital para Sector Industrial - FIRMEDIGITAL PSC',
    description: 'Soluciones de firma electrónica certificada por SUSCERTE para el sector industrial en Venezuela. Optimice la gestión de contratos de producción, certificaciones de calidad y documentación técnica con validez legal.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    serviceType: 'Firma Electrónica para Sector Industrial',
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
          description: 'Hasta 10 créditos para firmas digitales en el sector industrial',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/industrial#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para firmas digitales en el sector industrial',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/industrial#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para firmas digitales en el sector industrial',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/industrial#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    // Casos de uso específicos para el sector industrial
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Contratos de producción',
        description: 'Firma digital de contratos de producción con proveedores y clientes'
      },
      {
        '@type': 'UseAction',
        name: 'Certificaciones de calidad',
        description: 'Firma digital de certificaciones de calidad y cumplimiento normativo'
      },
      {
        '@type': 'UseAction',
        name: 'Documentación técnica',
        description: 'Firma digital de manuales técnicos, planos y especificaciones'
      }
    ],
    // Preguntas frecuentes sobre el servicio para el sector industrial
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo beneficia la firma digital al sector industrial en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La firma digital certificada por SUSCERTE permite al sector industrial venezolano agilizar procesos de contratación, certificación de calidad y documentación técnica, reduciendo tiempos de gestión, costos operativos y garantizando la validez legal de todos los documentos firmados.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué documentos industriales pueden firmarse digitalmente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pueden firmarse digitalmente contratos de producción, órdenes de compra, certificaciones de calidad, documentación técnica, planos, manuales de procedimientos, reportes de mantenimiento y cualquier otro documento relevante para la operación industrial.'
        }
      },
      {
        '@type': 'Question',
        name: '¿La firma digital industrial cumple con las normativas venezolanas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, nuestras soluciones de firma digital para el sector industrial cumplen con todas las normativas establecidas por SUSCERTE (Superintendencia de Servicios de Certificación Electrónica) de la República Bolivariana de Venezuela, garantizando su validez legal.'
        }
      }
    ]
  };

  return <BaseJsonLd data={sectorJsonLd} />;
}
