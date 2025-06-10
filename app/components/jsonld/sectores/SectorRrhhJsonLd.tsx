import React from 'react';
import BaseJsonLd from '../BaseJsonLd';

export default function SectorRrhhJsonLd() {
  // Datos estructurados para el Sector Recursos Humanos
  const sectorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Firma Digital para Recursos Humanos - FIRMEDIGITAL PSC',
    description: 'Soluciones de firma electrónica certificada por SUSCERTE para departamentos de recursos humanos en Venezuela. Optimice la gestión de contratos laborales, nóminas y documentación de personal con validez legal.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    serviceType: 'Firma Electrónica para Recursos Humanos',
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
          description: 'Hasta 10 créditos para firmas digitales en documentos de RRHH',
          price: '10',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/recursos-humanos#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Élite',
          description: 'Hasta 200 créditos para firmas digitales en documentos de RRHH',
          price: '30',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/recursos-humanos#planes',
          availability: 'https://schema.org/InStock'
        },
        {
          '@type': 'Offer',
          name: 'Plan Max',
          description: 'Créditos ilimitados para firmas digitales en documentos de RRHH',
          price: '100',
          priceCurrency: 'USD',
          priceValidUntil: '2025-12-31',
          url: 'https://firmedigital.com/sectores/recursos-humanos#planes',
          availability: 'https://schema.org/InStock'
        }
      ]
    },
    // Casos de uso específicos para el sector RRHH, basados en la memoria
    potentialAction: [
      {
        '@type': 'UseAction',
        name: 'Contratos laborales',
        description: 'Firma digital de contratos de trabajo y adendas con validez legal'
      },
      {
        '@type': 'UseAction',
        name: 'Nóminas y recibos de pago',
        description: 'Firma digital de nóminas, recibos de pago y liquidaciones'
      },
      {
        '@type': 'UseAction',
        name: 'Documentos de personal',
        description: 'Firma digital de expedientes de empleados, evaluaciones y planes de carrera'
      },
      {
        '@type': 'UseAction',
        name: 'Políticas internas',
        description: 'Firma digital de manuales, políticas y procedimientos internos'
      },
      {
        '@type': 'UseAction',
        name: 'Acuerdos de confidencialidad',
        description: 'Firma digital de NDAs y acuerdos de confidencialidad'
      },
      {
        '@type': 'UseAction',
        name: 'Documentación de capacitación',
        description: 'Firma digital de certificados de capacitación y desarrollo profesional'
      }
    ],
    // Preguntas frecuentes sobre el servicio para el sector RRHH
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cómo beneficia la firma digital a los departamentos de recursos humanos en Venezuela?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La firma digital certificada por SUSCERTE permite a los departamentos de RRHH venezolanos agilizar la firma de contratos laborales, nóminas y documentación de personal, reduciendo tiempos de gestión, costos administrativos y facilitando el trabajo remoto con empleados y candidatos.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Los contratos laborales firmados digitalmente cumplen con la legislación venezolana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, los contratos laborales firmados digitalmente con nuestra solución certificada por SUSCERTE tienen plena validez legal y cumplen con todas las disposiciones de la Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras (LOTTT) de la República Bolivariana de Venezuela.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo se integra la firma digital con los sistemas de gestión de RRHH existentes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestra solución de firma digital para RRHH se integra fácilmente con los sistemas de gestión existentes mediante APIs y conectores específicos, permitiendo mantener los flujos de trabajo actuales mientras se añade la capacidad de firma electrónica certificada.'
        }
      }
    ],
    // Imagen destacada
    image: 'https://firmedigital.com/images/sectores/recursos-humanos.png'
  };

  return <BaseJsonLd data={sectorJsonLd} />;
}
