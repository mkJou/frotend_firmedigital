'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import Link from 'next/link';
// Importamos los iconos desde nuestro archivo centralizado
import {
  HiOutlineChartBar, 
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineLightningBolt,
  HiOutlineSearchCircle,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronDown,
  HiOutlineSupport,
  HiOutlineMail,
  HiOutlineDocumentReport,
  AiOutlineFileDone, 
  AiOutlineFileSync,
  BsBuilding, 
  BsHospital,
  BsShop,
  BsBook,
  BsTools,
  BsCalculator,
  BsCurrencyDollar,
  BsCpu,
  BsPeople,
  BsBoxes,
  BsClipboard,
  BsCalendar,
  FiTruck
} from '../../components/icons';

interface MenuItem {
  title: string;
  items?: string[]; 
  icon?: React.ElementType;
  description?: string;
  href?: string;
  onClick?: () => void;
  target?: string;
}

interface MenuSection {
  title: string;
  subItems?: MenuItem[];
  href?: string;
  target?: string;
}

// Datos del menú extraídos a una constante fuera del componente para evitar recreaciones
const menuData: MenuSection[] = [
  { title: 'INICIO', href: '/' },
  {
    title: 'PRODUCTOS',
    subItems: [
      {
        title: 'FIRMA ELECTRONICA',
        icon: AiOutlineFileDone,
        description: 'Firma digital segura y legal',
        href: '/productos/firma-electronica'
      },
      {
        title: 'ANALISIS PERSONALIZABLE',
        icon: HiOutlineChartBar,
        description: 'Análisis adaptado a tus necesidades',
        href: '/productos/analisis'
      },
      {
        title: 'VALIDADOR DE IDENTIDAD',
        icon: HiOutlineSearchCircle,
        description: 'Valida con facilidad',
        href: '/productos/validador-de-identidad'
      },
      {
        title: 'APLICACIONES DE ACCESO',
        icon: HiOutlineLockClosed,
        description: 'Control de acceso seguro',
        href: '/productos/aplicaciones'
      },
      {
        title: 'CONOCE A TU CLIENTE',
        icon: HiOutlineUserGroup,
        description: 'Cliente protegidos',
        href: '/productos/conoce-tu-cliente'
      },
      {
        title: 'FLUJO DE TRABAJO',
        icon: HiOutlineLightningBolt,
        description: 'Flujos de trabajo automatizados',
        href: '/productos/flujos'
      },
      {
        title: 'TRAZABILIDAD',
        icon: HiOutlineSearchCircle,
        description: 'Seguimiento detallado de procesos',
        href: '/productos/trazabilidad'
      },
      {
        title: 'CARNET CERTIFICADO',
        icon: HiOutlineUserGroup,
        description: 'Credenciales Seguras',
        href: '/productos/carnetcertificado'
      },
      {
        title: 'CUENTAS MULTIPLES',
        icon: HiOutlineUserGroup,
        description: 'Gestión de múltiples usuarios',
        href: '/productos/cuentas'
      },
      {
        title: 'IA',
        icon: BsCpu,
        description: 'Inteligencia artificial avanzada',
        href: '/productos/ia'
      },
      {
        title: 'MULTIFIRMA',
        icon: AiOutlineFileSync,
        description: 'Firma múltiple de documentos',
        href: '/productos/multifirma'
      },     
      {
        title: 'GESTOR DE DOCUMENTOS',
        icon: HiOutlineDocumentReport,
        description: 'Gestión de documentos electronicos',
        href: '/productos/gestor-de-documentos'
      }
    ],
  },
  {
    title: 'SECTORES',
    subItems: [
      {
        title: 'Legal y jurídico',
        icon: BsClipboard,
        description: 'Soluciones digitales para el sector legal',
        href: '/sectores/legal'
      },
      {
        title: 'Ingenieros',
        icon: BsTools,
        description: 'Herramientas para profesionales de la ingeniería',
        href: '/sectores/ingenieros'
      },
      {
        title: 'Salud',
        icon: BsHospital,
        description: 'Servicios para el sector salud',
        href: '/sectores/salud'
      },
      {
        title: 'Contadores',
        icon: BsCalculator,
        description: 'Soluciones para profesionales contables',
        href: '/sectores/contadores'
      },
      {
        title: 'Gubernamentales',
        icon: BsBuilding,
        description: 'Servicios para entidades gubernamentales',
        href: '/sectores/gobierno'
      },
      {
        title: 'Tecnología Financiera',
        icon: BsCpu,
        description: 'Soluciones para el sector fintech',
        href: '/sectores/fintech'
      },
      {
        title: 'Industria y Comercio',
        icon: BsShop,
        description: 'Servicios para el sector industrial y comercial',
        href: '/sectores/industria'
      },
      {
        title: 'Educativo',
        icon: BsBook,
        description: 'Soluciones para el sector educativo',
        href: '/sectores/educacion'
      },
      {
        title: 'Recursos Humanos',
        icon: BsPeople,
        description: 'Herramientas para gestión de recursos humanos',
        href: '/sectores/rrhh'
      },
      {
        title: 'Banca y Finanzas',
        icon: BsCurrencyDollar,
        description: 'Servicios para el sector bancario y financiero',
        href: '/sectores/banca'
      },
      {
        title: 'Agropecuario',
        icon: BsBoxes,
        description: 'Soluciones para el sector agropecuario',
        href: '/sectores/agropecuario'
      },
      {
        title: 'Eventos',
        icon: BsCalendar,
        description: 'Soluciones eventos con gestión documental',
        href: '/sectores/eventos'
      }
    ]
  },
  {
    title: 'BLOG',
    href: '/blog',
    target: '_blank'
  },
  {
    title: 'RECURSOS',
    href: '#recursos',
    subItems: [
      {
        title: 'Contactos',
        description: 'Ponte en contacto con nosotros',
        href: '/footer#contacto',
        icon: HiOutlineMail,
        onClick: () => {
          const contactoSection = document.getElementById('footer-contacto');
          if (contactoSection) {
            contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return false;
        }
      },
      {
        title: 'Soporte',
        description: 'Centro de ayuda y soporte',
        href: '/soporte',
        icon: HiOutlineSupport
      }
    ]
  }
];

// Componente memoizado para los elementos del menú
const MenuItem = memo(({ 
  item, 
  section, 
  onClick 
}: { 
  item: MenuItem; 
  section: MenuSection; 
  onClick: () => void 
}) => {
  return (
    <Link
      key={item.title}
      href={item.href || '#'}
      className={`flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white 
        rounded-lg hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-transparent
        transition-colors relative group ${
          ['SECTORES', 'PRODUCTOS'].includes(section.title) 
            ? 'w-full text-sm' 
            : 'w-[300px]'
        }`}
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault();
          item.onClick();
        }
        onClick();
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 
        rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      {item.icon && (
        <span className="relative flex-shrink-0">
          <item.icon className="w-5 h-5 text-gray-300" />
        </span>
      )}
      <div className="relative min-w-0 flex-1">
        <div className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</div>
        {item.description && ['SECTORES', 'PRODUCTOS'].includes(section.title) ? (
          <div className="text-xs text-gray-400 group-hover:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">
            {item.description}
          </div>
        ) : null}
      </div>
    </Link>
  );
});

MenuItem.displayName = 'MenuItem';

// Componente memoizado para el submenú
const SubMenu = memo(({ 
  section, 
  isActive, 
  onItemClick 
}: { 
  section: MenuSection; 
  isActive: boolean; 
  onItemClick: () => void 
}) => {
  if (!section.subItems || !isActive) return null;
  
  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 bg-[#111827] rounded-lg shadow-xl border border-gray-800/50 overflow-hidden mx-4 max-w-[calc(100vw-2rem)] w-full md:w-auto"
      style={{
        animation: 'slideDown 0.3s ease-out forwards'
      }}
    >
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
      <div className={`p-4 ${
        ['SECTORES', 'PRODUCTOS'].includes(section.title) 
          ? 'grid md:grid-cols-2 gap-3 w-full md:w-[600px]' 
          : ''
      }`}>
        {section.subItems.map((item) => (
          <MenuItem 
            key={item.title} 
            item={item} 
            section={section} 
            onClick={onItemClick} 
          />
        ))}
      </div>
    </div>
  );
});

SubMenu.displayName = 'SubMenu';

// Componente principal optimizado
function MegaMenuOptimized() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Funciones memoizadas para evitar recreaciones en cada renderizado
  const handleResourcesClick = useCallback(() => {
    const recursosSection = document.getElementById('recursos');
    if (recursosSection) {
      recursosSection.scrollIntoView({ behavior: 'smooth' });
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
    }
  }, []);

  const handleMouseEnter = useCallback((title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(title);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    const currentTarget = e.currentTarget as Node;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    
    if (!relatedTarget || (menuRef.current && !menuRef.current.contains(relatedTarget))) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 100);
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMenuItemClick = useCallback(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  }, []);

  // Efecto para manejar el overflow del body
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  // Limpieza del timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Componente memoizado para el botón de sección
  const SectionButton = memo(({ section }: { section: MenuSection }) => (
    <Link
      href={section.title === 'RECURSOS' ? '#recursos' : (section.href || '#')}
      className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-bold"
      onClick={(e) => {
        if (section.title === 'RECURSOS') {
          e.preventDefault();
          handleResourcesClick();
        }
        if (!section.subItems) {
          setIsMobileMenuOpen(false);
        } else {
          setActiveMenu(activeMenu === section.title ? null : section.title);
        }
      }}
    >
      {section.title}
    </Link>
  ));
  
  SectionButton.displayName = 'SectionButton';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-[#111827] border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[120px] relative z-[60]">
          <a href="/" className="flex-shrink-0">
            <img 
              src="/images/logo.webp" 
              alt="Firme Digital Logo" 
              className="h-20 w-auto"
              loading="eager" // Cargar con prioridad
            />
          </a>

          {/* Botón hamburguesa para móvil */}
          <button
            className="lg:hidden text-white p-2 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="w-6 h-6 text-[#fff]" />
            ) : (
              <HiOutlineMenu className="w-6 h-6 text-[#fff]" />
            )}
          </button>

          {/* Menú para desktop */}
          <div className="hidden lg:flex items-center gap-3" ref={menuRef}>
            {menuData.map((section) => (
              <div
                key={section.title}
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.title)}
                onMouseLeave={handleMouseLeave}
              >
                <SectionButton section={section} />
                <SubMenu 
                  section={section} 
                  isActive={activeMenu === section.title} 
                  onItemClick={handleMenuItemClick} 
                />
              </div>
            ))}
            
            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="https://appdev.firmedigital.com.ve/api/auth/login" 
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="https://appdev.firmedigital.com.ve/api/auth/signup" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Mobile menu - Renderizado condicional para evitar cálculos innecesarios */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 lg:hidden bg-black/80 backdrop-blur-sm transition-opacity duration-300 opacity-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#111827] shadow-xl transform transition-transform duration-300 translate-x-0"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <a href="/" className="block">
                    <img src="/images/logo.webp" alt="Firme Digital Logo" className="h-16 w-auto" />
                  </a>
                  <button
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                  >
                    <HiOutlineX className="w-6 h-6" />
                  </button>
                </div>

                <nav className="p-4 space-y-2">
                  {menuData.map((section) => (
                    <div key={section.title} className="relative">
                      <Link
                        href={section.href || '#'}
                        className="w-full text-left px-4 py-3 text-lg font-bold text-gray-300 rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-gray-800/50 hover:via-gray-800/30 hover:to-transparent transition-colors flex items-center justify-between"
                        onClick={(e) => {
                          if (section.title === 'RECURSOS') {
                            e.preventDefault();
                            handleResourcesClick();
                          }
                          if (!section.subItems) {
                            setIsMobileMenuOpen(false);
                          } else {
                            setActiveMenu(activeMenu === section.title ? null : section.title);
                          }
                        }}
                      >
                        <span>{section.title}</span>
                        {section.subItems && (
                          <HiChevronDown 
                            className={`w-5 h-5 transition-transform duration-300 ${activeMenu === section.title ? 'rotate-180' : 'rotate-0'}`}
                          />
                        )}
                      </Link>

                      {section.subItems && activeMenu === section.title && (
                        <div className="pl-4 py-2 space-y-1 max-h-[60vh] overflow-y-auto">
                          {section.subItems.map((item) => (
                            <Link
                              key={item.title}
                              href={item.href || '#'}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="w-5 h-5" />}
                                <span>{item.title}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="mt-6 space-y-3">
                    <Link 
                      href="https://appdev.firmedigital.com.ve/api/auth/login"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link 
                      href="https://appdev.firmedigital.com.ve/api/auth/signup"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default memo(MegaMenuOptimized);