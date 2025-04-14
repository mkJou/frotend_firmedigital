import React from 'react';
import BaseJsonLd from './BaseJsonLd';

export default function BlogJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de FirmeDigital',
    description: 'Artículos sobre firma electrónica, seguridad digital y transformación digital',
    url: 'https://firmedigital.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'FirmeDigital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firmedigital.com/images/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://firmedigital.com/blog'
    }
  };

  return <BaseJsonLd data={data} />;
}
