import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function BlogJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de FIRMEDIGITAL PSC',
    headline: 'Recursos y conocimiento sobre firma electrónica certificada en Venezuela',
    description: 'Artículos especializados sobre firma electrónica certificada por SUSCERTE, seguridad digital, gestión documental y transformación digital en Venezuela. Recursos para profesionales y empresas.',
    url: 'https://firmedigital.com/blog',
    inLanguage: 'es-VE',
    publisher: {
      '@type': 'Organization',
      name: 'FIRMEDIGITAL PSC',
      alternateName: 'FIRMEDIGITAL Proveedor de Servicios de Certificación',
      description: 'Proveedor de Servicios de Certificación acreditado por SUSCERTE en la República Bolivariana de Venezuela',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firmedigital.com/images/logo.svg',
        width: '180',
        height: '60'
      }
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Firma Electrónica Certificada',
        description: 'Información sobre firma electrónica con certificación SUSCERTE en Venezuela'
      },
      {
        '@type': 'Thing',
        name: 'Certificados Digitales',
        description: 'Recursos sobre certificados digitales y su implementación en empresas venezolanas'
      },
      {
        '@type': 'Thing',
        name: 'Gestión Documental Digital',
        description: 'Artículos sobre optimización de procesos documentales con validez legal'
      },
      {
        '@type': 'Thing',
        name: 'Transformación Digital',
        description: 'Recursos sobre transformación digital para empresas y profesionales en Venezuela'
      },
      {
        '@type': 'Thing',
        name: 'Normativa SUSCERTE',
        description: 'Información sobre la normativa de la Superintendencia de Servicios de Certificación Electrónica'
      }
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Profesionales y empresas venezolanas interesadas en firma electrónica certificada'
    },
    keywords: [
      'Firma Electrónica Venezuela',
      'Certificado Digital SUSCERTE',
      'Firma Digital Certificada',
      'Gestión Documental Electrónica',
      'Transformación Digital Venezuela',
      'Validez Legal Documentos Electrónicos',
      'SUSCERTE Venezuela',
      'Proveedor Servicios Certificación'
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/blog',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.blog-description']
      }
    }
  };

  return <BaseJsonLd data={data} />;
}
