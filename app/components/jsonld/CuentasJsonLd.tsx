import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function CuentasJsonLd() {
  // Datos estructurados para el producto Cuentas
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Cuentas Digitales - FIRMEDIGITAL PSC',
    description: 'Gestión de cuentas digitales con certificación SUSCERTE para empresas y profesionales en Venezuela. Solución segura para administración de identidades digitales y firmas electrónicas.',
    image: 'https://firmedigital.com/images/productos/cuentas.webp',
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
          description: 'Hasta 10 cuentas digitales',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/cuentas#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 cuentas digitales',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/cuentas#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Cuentas digitales ilimitadas',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/cuentas#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '65',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Pedro Ramírez'
        },
        datePublished: '2023-11-05',
        reviewBody: 'La gestión de cuentas digitales de FIRMEDIGITAL ha simplificado enormemente la administración de identidades en nuestra empresa.',
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
          name: 'Luisa Hernández'
        },
        datePublished: '2023-12-10',
        reviewBody: 'Sistema muy seguro y fácil de usar. La integración con nuestros procesos existentes fue perfecta.',
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
        name: '¿Qué son las Cuentas Digitales de FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las Cuentas Digitales de FIRMEDIGITAL son identidades digitales certificadas por SUSCERTE que permiten a empresas y profesionales en Venezuela gestionar de forma segura sus firmas electrónicas, accesos y autorizaciones en entornos digitales.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se administran las Cuentas Digitales?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las Cuentas Digitales se administran a través de nuestro panel de control centralizado, donde los administradores pueden crear, modificar, suspender o revocar cuentas, asignar permisos y monitorear la actividad de firma electrónica.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Las Cuentas Digitales cumplen con la normativa venezolana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, todas nuestras Cuentas Digitales están certificadas por SUSCERTE (Superintendencia de Servicios de Certificación Electrónica) de la República Bolivariana de Venezuela, garantizando su validez legal y cumplimiento con la normativa nacional.'
        }
      }
    ]
  };

  return <BaseJsonLd data={productJsonLd} />;
}
