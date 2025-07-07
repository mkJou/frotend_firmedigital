import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function HomeJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FIRMEDIGITAL PSC',
    alternateName: 'FIRMEDIGITAL Proveedor de Servicios de Certificación',
    url: 'https://firmedigital.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://firmedigital.com/images/logo.svg',
      width: '180',
      height: '60'
    },
    description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela. Soluciones avanzadas de firma electrónica certificada y gestión documental digital para empresas y profesionales.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VE',
      addressRegion: 'Caracas',
      addressLocality: 'Caracas'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@firmedigital.com',
      availableLanguage: ['Spanish']
    },
    sameAs: [
      'https://www.linkedin.com/company/firmedigital',
      'https://twitter.com/firmedigital',
      'https://www.instagram.com/firmedigital_ve/'
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'certification',
      name: 'Certificación SUSCERTE',
      description: 'Certificación oficial de la Superintendencia de Servicios de Certificación Electrónica (SUSCERTE) de la República Bolivariana de Venezuela'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Firma Electrónica Certificada',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Firma Electrónica Certificada',
            description: 'Servicio de firma electrónica certificada por SUSCERTE con validez legal en Venezuela',
            url: 'https://firmedigital.com/productos/firma-electronica'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gestor de Documentos',
            description: 'Plataforma de gestión documental con firma electrónica certificada integrada',
            url: 'https://firmedigital.com/productos/gestor-de-documentos'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'SoftwareApplication',
            name: 'Aplicaciones con IA',
            description: 'Soluciones de inteligencia artificial para automatización de procesos documentales',
            url: 'https://firmedigital.com/productos/aplicaciones'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Carnet Certificado',
            description: 'Credenciales digitales certificadas para identificación segura',
            url: 'https://firmedigital.com/productos/carnetcertificado'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Conoce Tu Cliente (KYC)',
            description: 'Verificación de identidad y cumplimiento normativo para empresas',
            url: 'https://firmedigital.com/productos/conoce-tu-cliente'
          }
        }
      ]
    },
    knowsAbout: [
      'Firma Electrónica Certificada',
      'Certificados Digitales',
      'Gestión Documental Digital',
      'Identidad Digital',
      'Seguridad Informática',
      'Transformación Digital',
      'SUSCERTE Venezuela'
    ],
    knowsLanguage: [
      'es-VE'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Venezuela'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Empresas y profesionales venezolanos'
    },
    award: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE',
    slogan: 'Firma Digital Certificada para Venezuela',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.hero-description']
      }
    }
  };

  return <BaseJsonLd data={data} />;
}
