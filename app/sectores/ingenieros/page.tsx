'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaProjectDiagram,  FaClipboardCheck, FaCalendar, FaUsers, FaBuilding, FaHardHat, FaCheckSquare, FaUsersCog, FaCogs, FaDrawPolygon, FaTools, FaLock, FaCloudUploadAlt, FaMobile, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Link from 'next/link';
import styles from '../../styles/FlipCard.module.css';
const CardSkeleton = () => (
  <div className="w-full h-[400px] bg-gray-800/30 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-1/2 bg-gray-700/50"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700/50 rounded w-full"></div>
      <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
      <div className="h-10 bg-gray-700/50 rounded w-1/2 mx-auto mt-6"></div>
    </div>
  </div>
);
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  isVisible: boolean;
  isFeatured: boolean;
  tags?: string[];
}

const SkeletonHero = () => (
  <div className="space-y-8">
    <div className="flex justify-center">
      <div className="animate-pulse h-16 w-16 bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-6">
      <div className="animate-pulse h-14 max-w-3xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-2xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-xl mx-auto bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default function Ingenieros() {
  const [isLoading, setIsLoading] = useState(true);
  const [engineeringArticles, setEngineeringArticles] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success?: boolean; message?: string} | null>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };
  // Referencias para las secciones
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const casesRef = useRef(null);
  const featuresRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, companyName, section: 'Ingenieros' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: 'Información recibida correctamente. Nos pondremos en contacto pronto.' });
        setEmail('');
        setCompanyName('');
      } else {
        setFormStatus({ success: false, message: data.message || 'Ocurrió un error al enviar el formulario.' });
      }
    } catch (error) {
      setFormStatus({ success: false, message: 'Error de conexión. Por favor, inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    // Obtener artículos con categoría 'ingenieria' desde la API
    const fetchEngineeringArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/ingenieria');
        const data = await response.json();
        
        if (data.success) {
          setEngineeringArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEngineeringArticles();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/ingennieria.webp"
            alt="Sector Ingenieros Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
              
        <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <div className="space-y-8">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-300">Sector Ingenieros</span>
                      </div>
                      
                      {/* Main Title */}
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          <span className="block text-white mb-2 relative inline-block">
                            <span 
                              className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                              data-text=""
                            >
                              ¡Transforma tus proyectos de ingeniería con FIRMEDIGITAL!
                            </span>
                          </span>
                          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">
                            Agiliza la firma de planos, contratos y documentación técnica
                          </span>
                        </h1>
                      </div>

                      {/* Description */}
                      <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                          Agiliza la firma de planos, contratos y documentación técnica con nuestra solución digital avanzada.
                        </p>
                      </div>
                      
                      {/* Formulario de contacto */}
                      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-8 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">Solicita más información</h3>
                        </div>
                        
                        {formStatus && (
                          <div className={`mb-4 p-3 rounded-lg ${formStatus.success ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                            {formStatus.message}
                          </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                                placeholder="tu@email.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre de la Empresa</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaBuilding className="text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                                placeholder="Nombre"
                              />
                            </div>
                          </div>
                          
                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20 border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed h-[42px]"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Enviando...
                                </>
                              ) : (
                                <>
                                  <FaPaperPlane className="mr-2" /> Enviar
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
        </div>
      </section>

      {/* Cómo se integra Section */}
      <section className="py-16 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">¿Cómo se Integra?</h2>
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed mb-8">
              El sector de ingeniería se integra perfectamente con la plataforma de FIRMEDIGITAL, aprovechando sus funcionalidades de firma electrónica, gestión documental y flujo de trabajo. Se implementan módulos específicos para planos, proyectos técnicos y documentación especializada, creando una solución integral que se adapta a las necesidades de cada empresa o profesional de ingeniería.
            </p>
            <div className="flex justify-center">
              <a href="https://app.firmedigital.com/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                ¡Comienza ahora!
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Beneficios Section */}
      <section ref={benefitsRef} className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-green-300">Beneficios Clave</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Beneficios Clave en el</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Sector de Ingeniería</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full">
              <div className="w-full h-[500px] md:h-[550px] lg:h-[600px] relative">
                <img 
                  src="/images/beneinge.jpg" 
                  alt="Beneficios Ingeniería" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    icon: <FaProjectDiagram className="text-3xl" />,
                    title: "Gestión de Proyectos",
                    description: "Genera y envía transmittals de forma automática para una gestión eficiente.",
                    gradient: "from-blue-500 to-blue-600",
                    textColor: "text-blue-300"
                  },
                  {
                    icon: <FaUsers className="text-3xl" />,
                    title: "Colaboración en Equipo",
                    description: "Permite a todas las personas involucradas en el proyecto tener acceso a lo que necesitan.",
                    gradient: "from-purple-500 to-purple-600",
                    textColor: "text-purple-300"
                  },
                  {
                    icon: <FaClipboardCheck className="text-3xl" />,
                    title: "Documentación Permanente",
                    description: "Ten tus documentos e información disponibles para siempre y de forma segura.",
                    gradient: "from-green-500 to-green-600",
                    textColor: "text-green-300"
                  },
                  {
                    icon: <FaHardHat className="text-3xl" />,
                    title: "Supervisión de Obra",
                    description: "Control y seguimiento digital de avances en proyectos de construcción.",
                    gradient: "from-pink-500 to-pink-600",
                    textColor: "text-pink-300"
                  },
                  {
                    icon: <FaTools className="text-3xl" />,
                    title: "Gestión de Recursos",
                    description: "Administración eficiente de materiales y equipos para cada proyecto.",
                    gradient: "from-indigo-500 to-indigo-600",
                    textColor: "text-indigo-300"
                  },
                  {
                    icon: <FaCogs className="text-3xl" />,
                    title: "Procesos Automatizados",
                    description: "Optimización de flujos de trabajo mediante automatización digital.",
                    gradient: "from-orange-500 to-orange-600",
                    textColor: "text-orange-300"
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-4 md:p-6 overflow-hidden transition-all duration-500 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                    <div className="flex items-start gap-3 md:gap-4 relative z-10">
                      <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r ${benefit.gradient} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <div className={benefit.textColor}>
                          {benefit.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">{benefit.title}</h3>
                        <p className="text-sm md:text-base text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{benefit.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Why Choose FIRMEDIGITAL Banner */}
       {/* ¿Por qué elegir FIRMEDIGITAL para ingenieros? Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text tracking-wide uppercase">Ventajas Competitivas</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">¿Por qué elegir FIRMEDIGITAL</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                para ingenieros?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Documentos técnicos con validez legal garantizada
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="space-y-6 text-left">
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  En FirmeDigital, garantizamos que sus planos, memorias descriptivas y proyectos de ingeniería cumplen con las leyes venezolanas y se gestionan 100% dentro del territorio nacional, respaldados por SUSCERTE.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Nuestra plataforma ofrece una solución integral para ingenieros que asegura la validez legal de sus documentos técnicos, cumpliendo con todos los requisitos establecidos por los colegios profesionales y entes reguladores. Al elegir FIRMEDIGITAL para su práctica profesional, usted obtiene:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Firmas digitales en planos y proyectos</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Validez legal en memorias descriptivas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Autenticación profesional verificable</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Almacenamiento seguro de documentación técnica</span>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Al digitalizar sus proyectos de ingeniería con una plataforma certificada por SUSCERTE, garantizamos no solo el cumplimiento legal sino también la integridad y confidencialidad de la información técnica de sus proyectos, reduciendo el riesgo de falsificaciones y permitiendo una gestión más eficiente de la documentación profesional en la República Bolivariana de Venezuela.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://app.firmedigital.com/auth/signup" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20">
                    Comenzar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Planes y Precios Section */}
     <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Planes Flexibles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Planes y</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Soluciones flexibles para todas tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                    <p className="text-gray-300 text-sm">¡Impulso al siguiente nivel!</p>
                    <p className="text-gray-300 text-sm">Para persona natural</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                      <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                        <p className="text-gray-300 text-sm">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8 mt-5">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                
                              </div>
                              <div className="ml-2 flex flex-col">
                                
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="flex flex-col items-center">
  <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    10$
  </span>
  <span className="text-gray-400 text-sm mt-1">Equivale a</span>
  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    {(10/12).toFixed(2)}$/mes
  </span>
</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400 mt-10">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>400 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          
                         
                          
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Valor del Bloque */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                    <p className="text-gray-300 text-sm">¡Gestión eficiente de Documentos!</p>
                    <p className="text-gray-300 text-sm">Para persona jurídica</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                        <p className="text-gray-300 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8" style={{ paddingTop: '1rem' }}>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="ml-2 flex flex-col">
                                
                                </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
                              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                30$
                              </span>
                              <span className="text-gray-400 text-sm mt-1">Equivale a</span>
                              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                {(30/12).toFixed(2)}$/mes
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>1000 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Renovación de Certificados */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                    <p className="text-gray-300 text-sm"> ¡Mantén tus certificados emitidos al día!</p>
                    <p className="text-gray-300 text-sm">Para corporaciones</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                        <p className="text-gray-300 text-sm mb-2">Créditos Ilimitados</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                 
                                </span>
                              </div>
                           
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-6">Te ofrecemos soluciones personalizadas y eficientes para la seguridad y validación de tus documentos, adaptándonos a tus requerimientos específicos</p>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                        
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Documentos ilimitados</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Trazabilidad</span>
                          </li>
                          
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Corporativo */}

          </div>
        </div>
      </section>
      {/* Flujo Lineal Section */}


      {/* Flujo de Revisión Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Flujo de Revisión
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaHardHat className="text-4xl text-blue-400" />,
                title: "Gestión de Proyectos",
                description: "Firma digital de documentos técnicos."
              },
              {
                icon: <FaTools className="text-4xl text-blue-400" />,
                title: "Documentación Técnica",
                description: "Gestión de planos y especificaciones."
              },
              {
                icon: <FaCogs className="text-4xl text-blue-400" />,
                title: "Procesos de Ingeniería",
                description: "Control digital de operaciones."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                    <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <p className="text-gray-300 text-center">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Características */}
          <div className="mt-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaLock className="text-4xl text-blue-400" />,
                  title: "Seguridad",
                  description: "Protección de datos técnicos."
                },
                {
                  icon: <FaCloudUploadAlt className="text-4xl text-blue-400" />,
                  title: "Almacenamiento",
                  description: "Respaldo seguro en la nube."
                },
                {
                  icon: <FaMobile className="text-4xl text-blue-400" />,
                  title: "Accesibilidad",
                  description: "Acceso desde cualquier dispositivo."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <p className="text-gray-300 text-center">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Casos de Uso
          </h2>
          
          {/* Descripción de la sección */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg">
              Descubre cómo FIRMEDIGITAL transforma los procesos de ingeniería con soluciones digitales avanzadas. 
              Estos casos reales demuestran el impacto de nuestra plataforma en proyectos de ingeniería y construcción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                icon: <FaBuilding className="text-4xl text-blue-400" />,
                title: "Gestión de Proyectos de Infraestructura",
                problem: "Una empresa constructora necesitaba coordinar documentación técnica entre 50+ profesionales en 3 países diferentes.",
                solution: "Implementación de flujos de trabajo digitales con firma electrónica y gestión documental centralizada.",
                result: "Reducción del 70% en tiempos de aprobación y eliminación completa de pérdidas documentales."
              },
              {
                icon: <FaHardHat className="text-4xl text-blue-400" />,
                title: "Supervisión Digital de Obras",
                problem: "Supervisores de obra perdían 3 horas diarias en papeleo y reportes manuales durante inspecciones.",
                solution: "Sistema de reportes digitales con validación inmediata mediante firma electrónica desde dispositivos móviles.",
                result: "Aumento del 40% en productividad y mejora significativa en la calidad de la documentación técnica."
              },
              {
                icon: <FaCheckSquare className="text-4xl text-blue-400" />,
                title: "Certificación de Calidad en Manufactura",
                problem: "Proceso de certificación ISO requería gestionar más de 200 documentos con múltiples revisiones y aprobaciones.",
                solution: "Plataforma de gestión documental con trazabilidad completa y flujos de aprobación automatizados.",
                result: "Certificación obtenida en la mitad del tiempo estimado con 100% de cumplimiento en auditorías."
              },
              {
                icon: <FaUsersCog className="text-4xl text-blue-400" />,
                title: "Colaboración Multidisciplinaria",
                problem: "Equipos de ingeniería, arquitectura y construcción con dificultades para coordinar cambios en planos y especificaciones.",
                solution: "Espacio de trabajo digital compartido con control de versiones y firma electrónica para validaciones.",
                result: "Eliminación de errores por versiones desactualizadas y reducción del 60% en tiempos de revisión."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-700/50 group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">DESAFÍO:</h4>
                      <p className="text-gray-300 text-sm">{item.problem}</p>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-purple-400 mb-1">SOLUCIÓN:</h4>
                      <p className="text-gray-300 text-sm">{item.solution}</p>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-400 mb-1">RESULTADO:</h4>
                      <p className="text-gray-300 text-sm">{item.result}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
        </div>
      </section>
       {/* Recursos Adicionales Section */}
       <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text tracking-wide uppercase">Recursos Educativos</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">Aprende Más con</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Nuestros Recursos
              </span>
            </h2>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : engineeringArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría ingeniería.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engineeringArticles.map((article, index) => (
                <Link href={`/blog/${article._id}`} key={article._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl overflow-hidden hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 h-full"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 absolute z-10"></div>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-blue-400" />
                          {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{article.title}</h3>
                      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Por {article.author}</span>
                        <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
