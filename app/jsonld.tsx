'use client';

import { usePathname } from 'next/navigation';

// Importación de componentes JsonLd existentes
import HomeJsonLd from './components/jsonld/HomeJsonLd';
import BlogJsonLd from './components/jsonld/BlogJsonLd';
import FirmaElectronicaJsonLd from './components/jsonld/FirmaElectronicaJsonLd';
import GestorDocumentosJsonLd from './components/jsonld/GestorDocumentosJsonLd';
import IAJsonLd from './components/jsonld/IAJsonLd';
import MultifirmaJsonLd from './components/jsonld/MultifirmaJsonLd';
import VerificacionCertificadosJsonLd from './components/jsonld/VerificacionCertificadosJsonLd';

// Componente dinámico para manejar JsonLd recién creados
const DynamicJsonLd = ({ componentPath }: { componentPath: string }) => {
  try {
    // Intentar renderizar el componente HomeJsonLd como fallback seguro
    return <HomeJsonLd />;
  } catch (error) {
    console.error(`Error loading JsonLd component: ${componentPath}`, error);
    return <HomeJsonLd />;
  }
};

export default function JsonLd() {
  const pathname = usePathname();
  
  // Selección del componente JsonLd según la ruta actual
  switch (pathname) {
    // Página principal
    case '/':
      return <HomeJsonLd />;
      
    // Páginas de productos existentes
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
    
    // Blog
    case '/blog':
      return <BlogJsonLd />;
      
    // Para las nuevas páginas de productos y sectores, usamos el componente dinámico
    // que por ahora devolverá HomeJsonLd hasta que los componentes estén disponibles
    case '/productos/analisis':
    case '/productos/aplicaciones':
    case '/productos/carnetcertificado':
    case '/productos/conoce-tu-cliente':
    case '/productos/cuentas':
    case '/sectores/industrial':
    case '/sectores/ingenieria':
    case '/sectores/salud':
    case '/sectores/legal':
    case '/sectores/recursos-humanos':
    case '/academia':
      return <DynamicJsonLd componentPath={pathname} />;
      
    // Por defecto, retorna el JsonLd de la página principal
    default:
      return <HomeJsonLd />;
  }
}