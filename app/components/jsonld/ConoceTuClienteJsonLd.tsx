import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function ConoceTuClienteJsonLd() {
  // Datos estructurados para el producto Conoce Tu Cliente
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Conoce Tu Cliente (KYC) - FIRMEDIGITAL PSC',
    description: 'Solución de verificación de identidad digital para cumplimiento KYC (Conoce Tu Cliente) certificada por SUSCERTE en Venezuela. Validación segura para empresas y entidades financieras.',
    image: 'https://firmedigital.com/images/productos/conoce-tu-cliente.webp',
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
          description: 'Hasta 10 verificaciones KYC mensuales',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/conoce-tu-cliente#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 verificaciones KYC mensuales',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/conoce-tu-cliente#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Verificaciones KYC ilimitadas',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/conoce-tu-cliente#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '76',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Miguel Fernández'
        },
        datePublished: '2023-09-28',
        reviewBody: 'El sistema KYC de FIRMEDIGITAL ha simplificado enormemente nuestro proceso de verificación de clientes. Ahora cumplimos con todas las regulaciones sin complicaciones.',
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
          name: 'Daniela Torres'
        },
        datePublished: '2023-10-15',
        reviewBody: 'Excelente herramienta para la validación de identidad. Ha reducido significativamente los fraudes en nuestra institución financiera.',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1'
        }
      }
    ],
    // Preguntas frecuentes sobre el producto
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué es el servicio Conoce Tu Cliente (KYC) de FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El servicio KYC de FIRMEDIGITAL es una solución integral para la verificación de identidad digital que permite a empresas y entidades financieras validar la identidad de sus clientes de forma segura y conforme a las regulaciones de la República Bolivariana de Venezuela.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona el proceso de verificación KYC?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El proceso incluye la captura de documentos de identidad, verificación biométrica facial, validación contra bases de datos oficiales y comprobación de listas de vigilancia. Todo el proceso está certificado por SUSCERTE y cumple con las normativas venezolanas.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué normativas cumple el servicio KYC de FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro servicio KYC cumple con todas las normativas de la Superintendencia de Servicios de Certificación Electrónica (SUSCERTE), la Superintendencia de las Instituciones del Sector Bancario (SUDEBAN) y las leyes contra legitimación de capitales vigentes en Venezuela.'
        }
      }
    ]
  };

  return <BaseJsonLd data={productJsonLd} />;
}
