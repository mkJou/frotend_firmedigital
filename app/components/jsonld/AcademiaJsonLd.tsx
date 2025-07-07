import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function AcademiaJsonLd() {
  // Datos estructurados para la sección de Academia
  const academiaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Academia FIRMEDIGITAL - Recursos Educativos sobre Firma Digital',
    description: 'Plataforma educativa con videos y recursos sobre firma electrónica certificada, firma digital avanzada y gestión documental electrónica en Venezuela. Certificada por SUSCERTE.',
    provider: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      url: 'https://firmedigital.com'
    },
    learningResourceType: 'Video Collection',
    educationalUse: 'Professional Development',
    audience: {
      '@type': 'Audience',
      audienceType: 'Professionals, Business Users, Students'
    },
    inLanguage: 'es',
    about: [
      {
        '@type': 'Thing',
        name: 'Firma Electrónica',
        description: 'Recursos educativos sobre firma electrónica certificada en Venezuela'
      },
      {
        '@type': 'Thing',
        name: 'Certificados Digitales',
        description: 'Información sobre certificados digitales y su uso en documentos electrónicos'
      },
      {
        '@type': 'Thing',
        name: 'Gestión Documental',
        description: 'Recursos sobre gestión documental electrónica y mejores prácticas'
      }
    ],
    // Información sobre la estructura de la página basada en las memorias
    mainContentOfPage: {
      '@type': 'WebPageElement',
      isPartOf: {
        '@type': 'WebPage',
        '@id': 'https://firmedigital.com/academia'
      },
      description: 'Colección de videos educativos de YouTube con buscador integrado, modal para visualización y enlaces a artículos relacionados del blog.'
    },
    // Preguntas frecuentes sobre la Academia
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué tipo de contenido ofrece la Academia FIRMEDIGITAL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La Academia FIRMEDIGITAL ofrece videos educativos sobre firma electrónica certificada, certificados digitales, gestión documental electrónica y otros temas relacionados con la digitalización de procesos en Venezuela, todos con información actualizada y conforme a la normativa de SUSCERTE.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cómo puedo encontrar videos específicos en la Academia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes utilizar el buscador integrado que permite encontrar videos por título o descripción. Los resultados se actualizan en tiempo real mientras escribes, facilitando la localización de contenido específico.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Los videos están relacionados con artículos del blog?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, muchos videos tienen enlaces a artículos relacionados del blog de FIRMEDIGITAL, lo que permite profundizar en los temas tratados. Puedes acceder a estos artículos a través del botón "Saber más" disponible en el modal de visualización de cada video.'
        }
      }
    ],
    // Información sobre la interactividad
    interactivityType: 'active',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://firmedigital.com/academia?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return <BaseJsonLd data={academiaJsonLd} />;
}
