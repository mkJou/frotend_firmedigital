'use client';

import React, { useState, useRef, useEffect } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineChartBar, HiOutlineAdjustments, HiOutlineDocumentReport, HiOutlineClock } from 'react-icons/hi';
import { IoAnalyticsOutline, IoSpeedometerOutline, IoExtensionPuzzleOutline, IoEyeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { FaChartLine, FaDatabase, FaCogs, FaChartBar, FaQuestionCircle, FaChevronDown, FaEnvelope, FaBuilding, FaPaperPlane, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/FlipCard.module.css';
import { CardSkeleton } from '../../../components/ui/Skeletons';

export default function Analisis() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  
  // Variables para el formulario
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Variables para el blog
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('financiero');
  
  // Función para manejar el efecto de brillo en las tarjetas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  // Función para cargar artículos del blog relacionados con análisis personalizable
  const fetchAnalisisPersonalizableArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/articles/category/analisis personalizable');
      const data = await response.json();
      if (data.success) {
        setBlogArticles(data.data);
      } else {
        console.error('Error al obtener artículos:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener artículos:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Cargar artículos cuando se monte el componente
  useEffect(() => {
    fetchAnalisisPersonalizableArticles();
  }, []);
  
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
        body: JSON.stringify({ email, companyName, section: 'Análisis' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: '¡Gracias! Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto.' });
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

  const testimonials = [
    {
      client: "Dohmi",
      role: "Instituto Culinario",
      quote: "La implementación del análisis personalizable ha transformado nuestra gestión de datos, permitiéndonos tomar decisiones más informadas y mejorar nuestros procesos educativos."
    },
    {
      client: "IUTCM",
      role: "Instituto Universitario",
      quote: "Gracias a las herramientas de análisis de FIRMEDIGITAL, hemos optimizado nuestros recursos y mejorado significativamente la experiencia educativa de nuestros estudiantes."
    },
    {
      client: "CIDEZ",
      role: "Colegio de Ingenieros",
      quote: "El análisis personalizable nos ha permitido identificar tendencias y patrones que antes pasaban desapercibidos, mejorando nuestra toma de decisiones estratégicas."
    }
  ];

  const faqs = [
    {
      pregunta: "¿Qué es el Análisis Personalizable de FIRMEDIGITAL?",
      respuesta: "Es una solución avanzada que permite configurar y adaptar análisis de datos según las necesidades específicas de tu empresa, ofreciendo insights valiosos y visualizaciones claras para mejorar la toma de decisiones."
    },
    {
      pregunta: "¿Qué tipos de datos puedo analizar con esta herramienta?",
      respuesta: "Nuestra plataforma es versátil y permite analizar diversos tipos de datos: financieros, operativos, de rendimiento, de ventas, de recursos humanos, y cualquier otro dato estructurado que tu empresa necesite evaluar para mejorar su desempeño."
    },
    {
      pregunta: "¿Qué nivel de conocimiento técnico se requiere para usar el Análisis Personalizable?",
      respuesta: "Nuestra solución está diseñada para ser intuitiva y accesible para usuarios con diferentes niveles de experiencia técnica. Ofrecemos interfaces amigables con opciones de arrastrar y soltar, así como plantillas predefinidas que facilitan la creación de análisis sin necesidad de conocimientos avanzados."
    },
    {
      pregunta: "¿Cómo se integra esta solución con otros sistemas de mi empresa?",
      respuesta: "El Análisis Personalizable de FIRMEDIGITAL cuenta con conectores estándar para las principales plataformas empresariales, bases de datos y servicios en la nube. Nuestro equipo técnico te asistirá en la configuración de integraciones personalizadas para garantizar un flujo de datos eficiente con tus sistemas existentes."
    },
    {
      pregunta: "¿Qué medidas de seguridad implementa FIRMEDIGITAL para proteger mis datos?",
      respuesta: "Implementamos múltiples capas de seguridad, incluyendo cifrado de datos en reposo y en tránsito, autenticación multifactor, controles de acceso basados en roles, auditorías regulares de seguridad y cumplimiento con estándares internacionales como ISO 27001 y GDPR para garantizar la protección total de tu información."
    }
  ];

  const timelineSteps = [
    {
      icon: <FaDatabase className="text-3xl text-blue-500" />,
      title: "Recopilación de Datos",
      description: "Gestión de grandes volúmenes de datos financieros"
    },
    {
      icon: <FaCogs className="text-3xl text-purple-500" />,
      title: "Procesamiento",
      description: "Algoritmos avanzados y aprendizaje automático"
    },
    {
      icon: <FaChartLine className="text-3xl text-blue-500" />,
      title: "Análisis en Tiempo Real",
      description: "Procesamiento y análisis instantáneo"
    },
    {
      icon: <FaChartBar className="text-3xl text-purple-500" />,
      title: "Insights Personalizados",
      description: "Informes detallados y recomendaciones"
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
       {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]">
                    <div className="absolute inset-0">
                      <Image src="/images/PORTADA ANALISIS.jpg" alt="Análisis Personalizable Background" fill className="object-cover" priority />
                      <div className="absolute inset-0 bg-black/70"></div>
                    </div>
                    <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
                      <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-blue-300">Análisis Personalizable</span>
                        </div>
                        <div className="space-y-6">
                          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="block text-white mb-2 relative inline-block">
                              <span className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold" data-text="">Análisis Personalizable</span>
                            </span>
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">Decisiones basadas en datos, al instante</span>
                            </h1>
                            </div>
                        <div className="space-y-6">
                          <p className="text-lg text-gray-300 leading-relaxed">Optimiza tus procesos con una herramienta diseñada para ofrecer resultados precisos, seguros y personalizados.</p>
                        </div>
                            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-8 backdrop-blur-sm">
                              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">Solicita más información</h3>
                              </div>
                              {formStatus && (
                            <div className={`mb-4 p-3 rounded-lg ${formStatus.success ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>{formStatus.message}</div>
                              )}
                              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                  <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaEnvelope className="text-gray-400" /></div>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400" placeholder="tu@email.com" />
                                    </div>
                                  </div>
                                <div>
                                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre personal o de la empresa</label>
                                  <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><FaBuilding className="text-gray-400" /></div>
                                <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400" placeholder="Nombre" />
                                    </div>
                                  </div>
                                <div className="md:col-span-2">
                              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20 border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed h-[42px]">
                                {isSubmitting ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...</>) : (<><FaPaperPlane className="mr-2" /> Enviar</>)}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                    </div>
                  </section>
      


      {/* ¿Por Qué Elegir el Análisis Personalizable de FIRMEDIGITAL? Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text tracking-wide uppercase">Ventajas Competitivas</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">¿Por Qué Elegir</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Análisis Personalizable?</span>
          </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Descubre las razones que lo convierten en la mejor opción para tu transformación digital</p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                    {
                icon: <IoAnalyticsOutline className="text-3xl" />,
                      title: "Resultados Personalizados",
                description: "Obtén insights únicos adaptados a tus objetivos específicos.",
                gradient: "from-blue-500 to-blue-600",
                textColor: "text-blue-300",
                lineGradient: "from-blue-400 to-transparent"
                    },
                    {
                icon: <FaChartBar className="text-3xl" />,
                      title: "Seguridad Garantizada",
                description: "Protege tus datos con tecnología avanzada de encriptación.",
                gradient: "from-purple-500 to-purple-600",
                textColor: "text-purple-300",
                lineGradient: "from-purple-400 to-transparent"
                    },
                    {
                icon: <IoSpeedometerOutline className="text-3xl" />,
                      title: "Optimización de Recursos",
                description: "Toma decisiones estratégicas basadas en análisis confiables.",
                gradient: "from-green-500 to-green-600",
                textColor: "text-green-300",
                lineGradient: "from-green-400 to-transparent"
                    }
                ].map((benefit, index) => (
                  <div
                    key={index}
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:border-blue-400/30`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={benefit.textColor}>
                        {benefit.icon}
                      </div>
                      </div>
                  <h3 className={`text-2xl font-bold ${benefit.textColor} mb-3 group-hover:text-white transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                    </div>
                <p className="relative z-10 text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
                <div className={`relative z-10 mt-8 h-1 bg-gradient-to-r ${benefit.lineGradient} rounded-full group-hover:h-2 transition-all duration-300`}></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
                  </div>
                ))}
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              ¿Cómo Funciona el Análisis Personalizable?
            </h2>
            <div className="mt-2 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm p-8 max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-400">1</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Sube tus Datos o Documentos</h3>
                  <p className="text-gray-300 text-sm">Sube directamente a la plataforma archivos clave para analizar.</p>
                  <div className="mt-4 h-24 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-400">2</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Selecciona el Tipo de Análisis</h3>
                  <p className="text-gray-300 text-sm">Configura las opciones que se alineen con tus objetivos específicos.</p>
                  <div className="mt-4 h-24 flex items-center justify-center">
                    <svg className="w-16 h-16 text-purple-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-400">3</span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Recibe Resultados Personalizados</h3>
                  <p className="text-gray-300 text-sm">Obtén un análisis detallado y soluciones accionables de manera rápida.</p>
                  <div className="mt-4 h-24 flex items-center justify-center">
                    <svg className="w-16 h-16 text-blue-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L11 13.17l7.59-7.59L20 7l-8 8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Beneficios */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Beneficios del Análisis</span>
              </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="block text-white">Beneficios</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">del Análisis Personalizable</span>
            </h2>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <HiOutlineAdjustments className="text-3xl" />, title: 'Flexibilidad Total', gradient: 'from-blue-500 to-blue-600', text: 'Configura análisis a la medida de tu negocio.' },
              { icon: <HiOutlineDocumentReport className="text-3xl" />, title: 'Informes Detallados', gradient: 'from-purple-500 to-purple-600', text: 'Visualizaciones claras y reportes accionables.' },
              { icon: <HiOutlineClock className="text-3xl" />, title: 'Monitoreo en Tiempo Real', gradient: 'from-green-500 to-green-600', text: 'Datos actualizados para decisiones rápidas.' },
              { icon: <IoAnalyticsOutline className="text-3xl" />, title: 'Evaluación de Riesgos', gradient: 'from-pink-500 to-pink-600', text: 'Anticípate con modelos predictivos.' },
              { icon: <IoSpeedometerOutline className="text-3xl" />, title: 'Mayor Productividad', gradient: 'from-orange-500 to-orange-600', text: 'Automatiza y optimiza procesos clave.' },
              { icon: <IoExtensionPuzzleOutline className="text-3xl" />, title: 'Integración Sencilla', gradient: 'from-cyan-500 to-cyan-600', text: 'Conecta con tus sistemas actuales sin fricción.' },
              { icon: <IoEyeOutline className="text-3xl" />, title: 'Visión Global', gradient: 'from-indigo-500 to-indigo-600', text: 'Panorama completo para priorizar acciones.' },
              { icon: <HiOutlineChartBar className="text-3xl" />, title: 'Adaptabilidad', gradient: 'from-teal-500 to-teal-600', text: 'Evoluciona tu análisis con el negocio.' }
            ].map((card, idx) => (
              <div key={idx} className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white/90">{card.icon}</div>
              </div>
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-gray-300 text-sm">{card.text}</p>
                <div className="relative z-10 mt-6 h-1 bg-gradient-to-r from-white/30 to-transparent rounded-full group-hover:h-2 transition-all duration-300"></div>
            </div>
            ))}
          </div>
        </div>
      </section>

{/* Casos de Uso Section con filtros - Negro a Azul */}
<section className="py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-300">Casos de Uso</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                <span className="block text-white">Soluciones por</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Sectores</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Soluciones de análisis personalizables para diferentes sectores empresariales</p>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'financiero', label: 'Sector Financiero', gradient: 'from-blue-500 to-blue-600' },
                { key: 'empresarial', label: 'Sector Empresarial', gradient: 'from-purple-500 to-purple-600' },
                { key: 'gobierno', label: 'Sector Gobierno', gradient: 'from-green-500 to-green-600' },
                { key: 'comercial', label: 'Sector Comercial', gradient: 'from-orange-500 to-orange-600' }
              ].map((f) => (
              <button 
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`group relative px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-500 transform hover:scale-105 ${
                    activeFilter === f.key
                      ? `bg-gradient-to-r ${f.gradient} text-white shadow-2xl shadow-blue-500/25`
                      : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 text-gray-300 hover:text-white hover:border-gray-200/40'
                  }`}
                >
                  {activeFilter === f.key && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${f.gradient} rounded-2xl opacity-20 blur-xl`}></div>
                  )}
                  <span className="relative z-10">{f.label}</span>
              </button>
              ))}
            </div>
            
            {/* Contenido de casos de uso */}
            <div className="mt-8">
              {/* Caso de uso para Sector Financiero */}
              {activeFilter === 'financiero' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Análisis de Datos para el Sector Financiero</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis predictivo de riesgos crediticios con modelos de machine learning personalizables</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Detección de fraudes en tiempo real con análisis de patrones de transacciones</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Segmentación de clientes para estrategias de marketing financiero personalizadas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Tableros de control para monitoreo de indicadores financieros clave en tiempo real</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Análisis Financiero
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/fintech.webp"
                      alt="Análisis de datos para el sector financiero"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Empresarial */}
              {activeFilter === 'empresarial' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Análisis de Datos para el Sector Empresarial</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis de rendimiento operativo con identificación de cuellos de botella en procesos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Optimización de cadenas de suministro con análisis predictivo de demanda</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Monitoreo de KPIs empresariales con alertas automáticas y análisis de tendencias</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis de rentabilidad por líneas de negocio con identificación de oportunidades de crecimiento</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Análisis Empresarial
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/contable.webp"
                      alt="Análisis de datos para el sector empresarial"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Gobierno */}
              {activeFilter === 'gobierno' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Análisis de Datos para el Sector Gobierno</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis de datos para la toma de decisiones en políticas públicas basadas en evidencia</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Monitoreo de indicadores de gestión pública con tableros de control personalizados</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis de eficiencia en la asignación de recursos públicos y presupuestos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Sistemas de alerta temprana para la prevención de fraudes y optimización de procesos</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Análisis Gubernamental
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/gobiernoss.webp"
                      alt="Análisis de datos para el sector gobierno"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Comercial */}
              {activeFilter === 'comercial' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Análisis de Datos para el Sector Comercial</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Análisis predictivo de comportamiento de clientes y patrones de compra</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Optimización de precios en tiempo real basada en análisis de mercado y competencia</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Segmentación avanzada de clientes para campañas de marketing personalizadas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Predicción de tendencias de ventas y gestión inteligente de inventario</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Análisis Comercial
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/rrhhh.webp"
                      alt="Análisis de datos para el sector comercial"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Salud */}
              {activeFilter === 'salud' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Flujos de trabajo para el Sector Salud</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de protocolos médicos con aprobaciones secuenciales y notificaciones automáticas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Coordinación de procesos de admisión y alta de pacientes con asignación de tareas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Automatización de autorizaciones médicas con flujos de aprobación y seguimiento</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de programación de citas y recursos médicos con alertas y recordatorios</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo para Salud
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/salud.jpg"
                      alt="Flujos de trabajo para el sector salud"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
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

      {/* Recursos Adicionales Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Recursos</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="block text-white">Aprende Más con</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Nuestros Recursos</span>
          </h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : blogArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Análisis Personalizable.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => (
                <Link href={`/blog/${article._id}`} key={article._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
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
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por {article.author}</span>
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



      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Testimonios</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="block text-white">Lo que dicen nuestros</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">clientes</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500/10 rounded-full mb-2">
                      <span className="text-2xl font-bold text-blue-400">{testimonial.client.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-center text-blue-400">{testimonial.client}</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-300 text-center italic mb-4">"{testimonial.quote}"</p>
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-300">FAQ</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="block text-white">Preguntas</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Frecuentes</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-400">{faq.pregunta}</h3>
                    <FaChevronDown 
                      className={`text-blue-400 transition-transform duration-300 ${
                        activeQuestion === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-300">{faq.respuesta}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
