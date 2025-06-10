import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function AplicacionesJsonLd() {
  // Datos estructurados para el producto Aplicaciones
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Aplicaciones de Firma Digital - FIRMEDIGITAL PSC',
    description: 'Aplicaciones especializadas para firma electrónica certificada y gestión documental digital. Soluciones personalizadas para empresas en Venezuela con certificación SUSCERTE.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS, Android, iOS',
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
          description: 'Aplicación básica con hasta 10 usuarios',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/aplicaciones#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Aplicación empresarial con hasta 200 usuarios',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/aplicaciones#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Aplicación corporativa con usuarios ilimitados',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/aplicaciones#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '98',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Juan Méndez'
        },
        datePublished: '2023-11-10',
        reviewBody: 'Las aplicaciones de FIRMEDIGITAL han transformado nuestros procesos de firma de documentos. Ahora todo es más rápido y seguro.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        }
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Laura Castillo'
        },
        datePublished: '2023-12-05',
        reviewBody: 'Excelente interfaz y fácil de usar. La integración con nuestros sistemas existentes fue perfecta.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '4',
          bestRating: '5',
          worstRating: '1'
        }
      }
    ],
    // Preguntas frecuentes sobre el producto
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué tipos de aplicaciones ofrece FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FIRMEDIGITAL ofrece aplicaciones para firma electrónica certificada, gestión documental, validación de identidad, y soluciones personalizadas según las necesidades específicas de cada empresa en Venezuela.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Las aplicaciones cumplen con la normativa de SUSCERTE?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, todas nuestras aplicaciones están certificadas por SUSCERTE (Superintendencia de Servicios de Certificación Electrónica) de la República Bolivariana de Venezuela, garantizando su validez legal y cumplimiento normativo.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Puedo integrar las aplicaciones con mis sistemas actuales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, nuestras aplicaciones están diseñadas para integrarse fácilmente con los sistemas existentes a través de APIs y conectores específicos, minimizando el impacto en su infraestructura actual.'
        }
      }
    ]
  };

  return <BaseJsonLd data={productJsonLd} />;
}
