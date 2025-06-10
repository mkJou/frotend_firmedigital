import React from 'react';
import BaseJsonLd from '../BaseJsonLd';

export default function SectorSaludJsonLd() {
  // Datos estructurados para el Sector Salud
  const sectorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Firma Digital para Sector Salud - FIRMEDIGITAL PSC',
    description: 'Soluciones de firma electrónica certificada por SUSCERTE para profesionales y organizaciones de salud en Venezuela. Optimice la gestión de historias clínicas, recetas médicas y consentimientos informados con validez legal.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    serviceType: 'Firma Electrónica para Sector Salud',
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
          description: 'Hasta 10 créditos para firmas digitales en documentos médicos',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/salud#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para firmas digitales en documentos médicos',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/salud#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para firmas digitales en documentos médicos',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/salud#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    // Casos de uso específicos para el sector salud, basados en la memoria
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Historias clínicas',
        description: 'Firma digital de historias clínicas y expedientes médicos con validez legal'
      },
      {
        '@type': 'UseAction',
        name: 'Recetas médicas',
        description: 'Emisión y firma digital de recetas médicas y órdenes de exámenes'
      },
      {
        '@type': 'UseAction',
        name: 'Consentimientos informados',
        description: 'Firma digital de consentimientos informados para procedimientos médicos'
      },
      {
        '@type': 'UseAction',
        name: 'Informes médicos',
        description: 'Firma digital de informes de diagnóstico, tratamiento y seguimiento'
      },
      {
        '@type': 'UseAction',
        name: 'Certificados médicos',
        description: 'Emisión y firma digital de certificados de salud y aptitud física'
      },
      {
        '@type': 'UseAction',
        name: 'Documentación hospitalaria',
        description: 'Firma digital de documentos administrativos y clínicos hospitalarios'
      }
    ],
    // Preguntas frecuentes sobre el servicio para el sector salud
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo beneficia la firma digital al sector salud en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La firma digital certificada por SUSCERTE permite a los profesionales de la salud venezolanos firmar historias clínicas, recetas médicas y consentimientos informados con validez legal, mejorando la eficiencia administrativa, reduciendo el uso de papel y facilitando el acceso seguro a la documentación médica.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Las recetas médicas firmadas digitalmente son válidas en farmacias?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, las recetas médicas firmadas digitalmente con nuestra solución certificada por SUSCERTE tienen plena validez legal en farmacias y establecimientos de salud en Venezuela, cumpliendo con todas las normativas del Ministerio de Salud.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se garantiza la confidencialidad de la información médica?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestra solución de firma digital para el sector salud implementa estrictos protocolos de seguridad y cifrado que cumplen con las normativas de protección de datos de salud, garantizando la confidencialidad de la información médica en todo momento.'
        }
      }
    ],
    // Imagen destacada basada en la memoria
    image: 'https://firmedigital.com/images/sectores/benesalud.png'
  };

  return <BaseJsonLd data={sectorJsonLd} />;
}
