'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  HiOutlineChartBar, 
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineLightningBolt,
  HiOutlineSearchCircle,
  HiOutlineMenu,
  HiOutlineX,
  HiChevronDown
} from 'react-icons/hi';
import { AiOutlineFileDone, AiOutlineFileSync } from 'react-icons/ai';
import { 
  BsBuilding, 
  BsStars, 
  BsRocket,
  BsDiamond,
  BsBank2,
  BsHospital,
  BsShop,
  BsBuildings,
  BsBook,
  BsGavel,
  BsTools,
  BsCalculator,
  BsGlobe,
  BsCurrencyDollar,
  BsCpu,
  BsPeople,
  BsTractor,
  BsScales
} from 'react-icons/bs';
import { FiTruck } from 'react-icons/fi';

interface MenuItem {
  title: string;
  items?: string[]; 
  icon?: React.ElementType;
  description?: string;
  href?: string;
}

interface MenuSection {
  title: string;
  subItems?: MenuItem[];
  href?: string;
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
        title: 'MULTIFIRMA',
        icon: AiOutlineFileSync,
        description: 'Firma múltiple de documentos',
        href: '/productos/multifirma'
      },
      {
        title: 'TRAZABILIDAD',
        icon: HiOutlineSearchCircle,
        description: 'Seguimiento detallado de procesos',
        href: '/productos/trazabilidad'
      },
      {
        title: 'ANALISIS PERSONALIZABLE',
        icon: HiOutlineChartBar,
        description: 'Análisis adaptado a tus necesidades',
        href: '/productos/analisis'
      },
      {
        title: 'CUENTAS MULTIPLES',
        icon: HiOutlineUserGroup,
        description: 'Gestión de múltiples usuarios',
        href: '/productos/cuentas'
      },
      {
        title: 'APLICACIONE DE ACCESO',
        icon: HiOutlineLockClosed,
        description: 'Control de acceso seguro',
        href: '/productos/aplicaciones'
      },
      {
        title: 'WORKFLOW',
        icon: HiOutlineLightningBolt,
        description: 'Flujos de trabajo automatizados',
        href: '/productos/workflow'
      },
    ],
  },
  {
    title: 'SECTORES',
    subItems: [
      {
        title: 'Legal y jurídico',
        icon: BsBuildings,
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
        icon: BsGlobe,
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
        icon: FiTruck,
        description: 'Soluciones para el sector agropecuario',
        href: '/sectores/agropecuario'
      }
    ]
  },
  {
    title: 'SOLUCIONES',
    subItems: [
      {
        title: 'Industriales',
        icon: BsBuilding,
        description: 'Soluciones para la industria',
        href: '/soluciones/industriales'
      },
    ],
  },
  {
    title: 'PLANES',
    subItems: [
      {
        title: 'Básico',
        icon: BsStars,
        description: 'Para pequeños equipos',
        href: '/planes/basico'
      },
      {
        title: 'Enterprise',
        icon: BsRocket,
        description: 'Para grandes organizaciones',
        href: '/planes/enterprise'
      },
      {
        title: 'Avanzado',
        icon: BsDiamond,
        description: 'Para equipos en crecimiento',
        href: '/planes/avanzado'
      },
    ],
  },
];

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-[#111827] border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-[120px] relative z-[60]">
          <a href="/" className="flex-shrink-0">
            <img 
              src="/images/logo.webp" 
              alt="Firme Digital Logo" 
              className="h-20 w-auto"
            />
          </a>

          {/* Botón hamburguesa para móvil */}
          <button
            className="lg:hidden text-white p-2 transition-colors"
            onClick={toggleMobileMenu}
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
                <Link
                  href={section.href || '#'}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {section.title}
                </Link>

                {section.subItems && activeMenu === section.title && (
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
                          onClick={() => {
                            setActiveMenu(null);
                            setIsMobileMenuOpen(false);
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
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Menú móvil */}
          <div className={`md:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`fixed inset-y-0 right-0 w-full max-w-sm bg-gray-900 shadow-xl transition-transform duration-300 overflow-y-auto
              ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <button
                  className="text-white p-2 transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <HiOutlineX className="w-6 h-6 text-[#fff]" />
                </button>
              </div>
              {menuData.map((section) => (
                <div 
                  key={section.title} 
                  className="mb-6"
                >
                  <Link
                    href={section.href || '#'}
                    className="w-full text-left px-4 py-3 text-lg font-medium text-gray-300 rounded-lg
                      hover:text-white hover:bg-gradient-to-br hover:from-gray-800/50 hover:via-gray-800/30 hover:to-transparent
                      transition-colors flex items-center justify-between"
                    onClick={() => setActiveMenu(activeMenu === section.title ? null : section.title)}
                  >
                    <span>{section.title}</span>
                    {section.subItems && (
                      <HiChevronDown 
                        className={`w-5 h-5 transition-transform duration-300
                          ${activeMenu === section.title ? 'rotate-180' : 'rotate-0'}`}
                      />
                    )}
                  </Link>

                  <div
                    className={`transition-all duration-300 ease-out overflow-y-auto
                      ${activeMenu === section.title ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}
                      ${['SECTORES', 'PRODUCTOS'].includes(section.title) 
                        ? 'grid md:grid-cols-2 gap-2 px-4' 
                        : 'space-y-1 px-4'}
                      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500`}
                  >
                    {section.subItems?.map((item, index) => (
                      <Link
                        key={item.title}
                        href={item.href || '#'}
                        className={`flex items-center space-x-2 px-3 py-2 text-gray-300 rounded-lg
                          hover:text-white hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-transparent
                          transition-colors relative group cursor-pointer ${
                            ['SECTORES', 'PRODUCTOS'].includes(section.title) 
                              ? 'text-sm' 
                              : ''
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        style={{
                          transform: activeMenu === section.title ? 'translateY(0)' : 'translateY(-10px)',
                          opacity: activeMenu === section.title ? 1 : 0,
                          transition: `transform 0.3s ease ${index * 0.05}s, opacity 0.3s ease ${index * 0.05}s`
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
                          <div className="font-medium">{item.title}</div>
                          {item.description && ['SECTORES', 'PRODUCTOS'].includes(section.title) ? (
                            <div className="text-xs text-gray-400 group-hover:text-gray-300">
                              {item.description}
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
