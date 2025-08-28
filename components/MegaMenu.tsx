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
} from '../components/icons';

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
      //{
        //title: 'IA',
        //icon: BsCpu,
        //description: 'Inteligencia artificial avanzada',
        //href: '/productos/ia'
      //},
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
    title: 'RECURSOS',
    href: '#recursos',
    subItems: [
      {
        title: 'Blog',
        icon: BsBook,
        description: 'Artículos y noticias',
        href: '/blog'
      },
      {
        title: 'Academia',
        icon: BsBook,
        description: 'Videos educativos',
        href: '/academia'
      },
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

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResourcesClick = () => {
    const recursosSection = document.getElementById('recursos');
    if (recursosSection) {
      recursosSection.scrollIntoView({ behavior: 'smooth' });
      setActiveMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

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

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(title);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
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
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Menu */}
      <nav className="hidden lg:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto">
        <div className="bg-black/95 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-2xl px-8 py-3">
          <div className="flex items-center space-x-4 min-w-max">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex-shrink-0">
                <img 
                  src="/images/logo.webp" 
                  alt="Firme Digital Logo" 
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Menu Items */}
            <div className="flex items-center space-x-4 flex-1 justify-center">
              {menuData.map((section) => (
                <div 
                  key={section.title} 
                  className="relative"
                >
                  <button
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 rounded-full hover:bg-white/10 whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      if (section.title === 'RECURSOS') {
                        handleResourcesClick();
                      }
                      if (!section.subItems) {
                        if (section.href) {
                          window.location.href = section.href;
                        }
                      } else {
                        setActiveMenu(activeMenu === section.title ? null : section.title);
                      }
                    }}
                  >
                    {section.title}
                    {section.subItems && (
                      <HiChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          activeMenu === section.title ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    )}
                  </button>

                  {section.subItems && activeMenu === section.title && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-black/95 backdrop-blur-xl border border-gray-800/50 rounded-lg shadow-2xl z-50 overflow-hidden">
                      <div className={`p-4 ${
                        section.title === 'PRODUCTOS' ? 'w-[500px] max-w-[90vw]' :
                        section.title === 'SECTORES' ? 'w-[450px] max-w-[90vw]' :
                        'w-[300px] max-w-[90vw]'
                      }`}>
                        <div className={`grid gap-2 ${
                          section.title === 'PRODUCTOS' || section.title === 'SECTORES' ? 'grid-cols-2' : 'grid-cols-1'
                        }`}>
                          {section.subItems.map((item, index) => (
                            <Link
                              key={item.title}
                              href={item.href || '#'}
                              className="group flex items-start gap-2 p-3 hover:bg-gray-900/50 transition-all duration-200 rounded-md"
                            >
                              <div className="flex-shrink-0 w-6 h-6 bg-gray-800/50 rounded-md flex items-center justify-center group-hover:bg-gray-700/50 transition-all duration-200">
                                {item.icon && <item.icon className="w-3 h-3 text-gray-400 group-hover:text-white" />}
                              </div>
                              <div className="flex-1 min-w-0 space-y-0.5">
                                <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors text-xs uppercase tracking-wide">
                                  {item.title}
                                </h3>
                                <p className="text-[10px] text-gray-400 group-hover:text-gray-300 transition-colors leading-tight">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Access Button */}
              <Link 
                href="https://app.firmedigital.com/auth/signin" 
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors rounded-full hover:bg-white/10 whitespace-nowrap"
              >
                Acceso clientes
              </Link>
              
              {/* Register Button */}
              <Link 
                href="https://app.firmedigital.com/auth/signup" 
                className="relative bg-white text-gray-900 px-6 py-2 text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap border border-gray-200 overflow-hidden group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative z-10">Registrarse</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu */}
      <nav className="lg:hidden fixed top-4 left-4 right-4 z-50">
        <div className="bg-black/95 backdrop-blur-xl rounded-full border border-gray-700/50 shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Mobile Logo */}
            <Link href="/" className="flex-shrink-0">
              <img 
                src="/images/logo.webp" 
                alt="Firme Digital Logo" 
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <HiOutlineX className="w-5 h-5" />
              ) : (
                <HiOutlineMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-sm transition-opacity duration-300
          ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-20 left-4 right-4 bg-black/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 rounded-2xl border border-gray-700/50 overflow-hidden
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
          onClick={e => e.stopPropagation()}
        >
          {/* Compact header - removed as we have the top nav */}

          <div className="max-h-[70vh] overflow-y-auto">
            <nav className="p-6 space-y-2">
              {menuData.map((section) => (
                <div key={section.title} className="relative">
                  <button
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-300 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center justify-between group border border-transparent hover:border-gray-700/30"
                    onClick={(e) => {
                      e.preventDefault();
                      if (section.title === 'RECURSOS') {
                        handleResourcesClick();
                      }
                      if (!section.subItems) {
                        if (section.href) {
                          window.location.href = section.href;
                        }
                        setIsMobileMenuOpen(false);
                      } else {
                        setActiveMenu(activeMenu === section.title ? null : section.title);
                      }
                    }}
                  >
                    <span className="group-hover:text-blue-300 transition-colors font-medium">{section.title}</span>
                    {section.subItems && (
                      <HiChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 text-gray-500 group-hover:text-gray-300 ${
                          activeMenu === section.title ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    )}
                  </button>

                  {section.subItems && activeMenu === section.title && (
                    <div className="mt-2 space-y-1 bg-gray-900/30 rounded-xl p-3 ml-2">
                      {section.subItems.map((item, index) => (
                        <Link
                          key={item.title}
                          href={item.href || '#'}
                          className="block px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && (
                              <div className="w-4 h-4 flex items-center justify-center">
                                <item.icon className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="font-medium group-hover:text-blue-300 transition-colors text-xs">
                                {item.title}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
              

          {/* Mobile Auth Buttons */}
          <div className="p-6 border-t border-gray-700/30">
            <div className="flex space-x-3">
              <Link 
                href="https://app.firmedigital.com/auth/signin" 
                className="flex-1 py-2.5 text-center text-gray-300 hover:text-white font-medium rounded-xl hover:bg-white/5 transition-all duration-200 border border-gray-600/30 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Acceso
              </Link>
              <Link 
                href="https://app.firmedigital.com/auth/signup" 
                className="flex-1 py-2.5 text-center bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg text-sm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
