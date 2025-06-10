import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function AnalisisJsonLd() {
  // Datos estructurados para el producto Análisis
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Análisis de Firma Digital - FIRMEDIGITAL PSC',
    description: 'Solución de análisis de firma digital para verificar la autenticidad y validez legal de documentos firmados electrónicamente. Certificado por SUSCERTE en Venezuela.',
    image: 'https://firmedigital.com/images/productos/analisis.webp',
    brand: {
      '@type': 'Brand',
      name: 'FIRMEDIGITAL PSC'
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
          description: 'Hasta 10 créditos para análisis de firmas digitales',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/analisis#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para análisis de firmas digitales',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/analisis#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para análisis de firmas digitales',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/analisis#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Carlos Rodríguez'
        },
        datePublished: '2023-09-15',
        reviewBody: 'El servicio de análisis de firma digital de FIRMEDIGITAL ha sido fundamental para nuestra empresa. La verificación es rápida y confiable.',
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
          name: 'María González'
        },
        datePublished: '2023-10-22',
        reviewBody: 'Excelente herramienta para validar documentos firmados electrónicamente. Cumple con todas las normativas legales de Venezuela.',
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
        name: '¿Qué es el servicio de Análisis de FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El servicio de Análisis de FIRMEDIGITAL permite verificar la autenticidad y validez legal de documentos firmados electrónicamente, garantizando que cumplen con los requisitos establecidos por SUSCERTE en Venezuela.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona el sistema de créditos para el análisis de firmas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cada vez que se analiza un documento firmado se consume un crédito. Ofrecemos diferentes planes según la cantidad de análisis que necesite realizar, desde el Plan Despegue con 10 créditos hasta planes ilimitados para grandes empresas.'
        }
      },
      {
        '@type': 'Question',
        name: '¿El análisis de firma digital tiene validez legal en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, nuestro servicio de análisis cumple con todas las normativas establecidas por SUSCERTE (Superintendencia de Servicios de Certificación Electrónica) de la República Bolivariana de Venezuela, otorgando validez legal a los documentos analizados.'
        }
      }
    ]
  };

  return <BaseJsonLd data={productJsonLd} />;
}
