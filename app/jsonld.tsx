'use client';

import { usePathname } from 'next/navigation';
import HomeJsonLd from './components/jsonld/HomeJsonLd';
import BlogJsonLd from './components/jsonld/BlogJsonLd';
import FirmaElectronicaJsonLd from './components/jsonld/FirmaElectronicaJsonLd';
import GestorDocumentosJsonLd from './components/jsonld/GestorDocumentosJsonLd';
import IAJsonLd from './components/jsonld/IAJsonLd';
import MultifirmaJsonLd from './components/jsonld/MultifirmaJsonLd';
import VerificacionCertificadosJsonLd from './components/jsonld/VerificacionCertificadosJsonLd';

export default function JsonLd() {
  const pathname = usePathname();

  // Seleccionar el componente JsonLd adecuado según la ruta actual
  switch (pathname) {
    case '/':
      return <HomeJsonLd />;
    case '/blog':
      return <BlogJsonLd />;
    case '/productos/firma-electronica':
      return <FirmaElectronicaJsonLd />;
    case '/productos/gestor-de-documentos':
      return <GestorDocumentosJsonLd />;
    case '/productos/ia':
      return <IAJsonLd />;
    case '/productos/multifirma':
      return <MultifirmaJsonLd />;
    case '/productos/verificacion-certificados':
      return <VerificacionCertificadosJsonLd />;
    default:
      // Para cualquier otra página, usar el JsonLd de la página principal
      return <HomeJsonLd />;
  }
}