import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function CarnetCertificadoJsonLd() {
  // Datos estructurados para el producto Carnet Certificado
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Carnet Certificado Digital - FIRMEDIGITAL PSC',
    description: 'Carnet digital certificado por SUSCERTE para identificación segura y firma electrónica en Venezuela. Solución de identidad digital para empresas y profesionales.',
    image: 'https://firmedigital.com/images/productos/carnetcertificado.webp',
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
          description: 'Hasta 10 carnets certificados digitales',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/carnetcertificado#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 carnets certificados digitales',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/carnetcertificado#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Carnets certificados digitales ilimitados',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/productos/carnetcertificado#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '87',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Roberto Pérez'
        },
        datePublished: '2023-10-18',
        reviewBody: 'Los carnets certificados digitales de FIRMEDIGITAL han mejorado significativamente la seguridad de identificación en nuestra empresa.',
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
          name: 'Ana Martínez'
        },
        datePublished: '2023-11-25',
        reviewBody: 'Excelente solución para la verificación de identidad. El proceso de implementación fue rápido y el soporte técnico es excepcional.',
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
        name: '¿Qué es un Carnet Certificado Digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un Carnet Certificado Digital es una credencial electrónica que verifica la identidad de una persona y permite realizar firmas electrónicas certificadas. Está respaldado por SUSCERTE en Venezuela y tiene plena validez legal.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se utiliza el Carnet Certificado Digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Carnet Certificado Digital se utiliza a través de nuestra aplicación móvil o plataforma web. Permite identificarse de forma segura, firmar documentos electrónicamente y acceder a servicios digitales con garantía de identidad.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo de validez tiene un Carnet Certificado Digital?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Los Carnets Certificados Digitales tienen una validez de un año desde su emisión, cumpliendo con los estándares establecidos por SUSCERTE en la República Bolivariana de Venezuela. Pueden renovarse fácilmente antes de su vencimiento.'
        }
      }
    ]
  };

  return <BaseJsonLd data={productJsonLd} />;
}
