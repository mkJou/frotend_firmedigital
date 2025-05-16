'use client';

import React, { useState, useEffect, useRef } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsShieldCheck, BsPeople, BsGear, BsFolder, } from 'react-icons/bs';
import { FaLandmark, FaUserTie, FaShieldAlt,FaCogs,FaUsers, FaIndustry, FaChartLine,  FaCalendar, FaBuilding, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
const features = {
  "Gestión Documental": "Sistema completo para administrar documentos oficiales con firma electrónica certificada.",
  "Seguridad Avanzada": "Protección de datos sensibles con los más altos estándares de ciberseguridad.",
  "Eficiencia Operativa": "Reducción de tiempos y costos en procesos administrativos internos."
};

const characteristics = [
  {
    icon: <BsGear className="text-4xl text-blue-500" />,
    title: " Firma electrónica para documentos oficiale",
    description: "Resoluciones, contratos y acuerdos"
  },
  {
    icon: <BsPeople className="text-4xl text-blue-500" />,
    title: "Almacenamiento Seguro",
    description: "Protección avanzada para documentos sensibles y estratégicos."
  },
  {
    icon: <BsShieldCheck className="text-4xl text-blue-500" />,
    title: "Accesibilidad Remota",
    description: "Permite la gestión desde diferentes oficinas o regiones."
  },
  {
    icon: <BsFolder className="text-4xl text-blue-500" />,
    title: "Sostenibilidad",
    description: "Reducción en el uso de papel y contribución a políticas ambientales."
  },
];

const benefits = [
  {
    icon: <FaLandmark className="text-4xl text-blue-400" />,
    title: "Gestión Gubernamental",
    description: "Firma digital de documentos oficiales."
  },
  {
    icon: <FaUserTie className="text-4xl text-blue-400" />,
    title: "Trámites Ciudadanos",
    description: "Servicios digitales para la ciudadanía."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-400" />,
    title: "Seguridad Estatal",
    description: "Protección de documentos gubernamentales."
  }
];


interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
      <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
        <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <p className="text-gray-300 text-center">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

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

export default function SectorGobierno() {
  const [governmentArticles, setGovernmentArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const heroRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Obtener artículos con categoría 'Gubernamentales' desde la API
    const fetchGovernmentArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/Gubernamentales');
        const data = await response.json();
        
        if (data.success) {
          setGovernmentArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGovernmentArticles();
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
        body: JSON.stringify({ email, companyName, section: 'Gobierno' }),
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
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 px-4 md:px-8 overflow-hidden mt-[120px] min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda: Título y subtítulo */}
            <div className="flex flex-col">
              <div className="flex flex-col mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] leading-tight p-4 rounded-lg backdrop-blur-sm bg-black/30 shadow-xl text-left">
                "Digitalice los trámites gubernamentales con firma electrónica válida ante instituciones venezolanas"
                </h1>
              
                <div className="bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm p-6 mb-8">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-left">
                  Agiliza trámites, mejora la transparencia y optimiza los servicios públicos con nuestra solución de firma digital.
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
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre de la Entidad</label>
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
                          placeholder="Nombre de tu entidad"
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
            
            {/* Columna derecha: Imagen */}
            <div className="relative h-[300px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 transform hover:scale-[1.02] transition-all duration-500">
              <Image
                src="/images/gobiernoss.webp"
                alt="Sector gobierno"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo se integra Section */}
      <section className="py-16 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">¿Cómo se Integra?</h2>
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed mb-8">
              El sector gubernamental se integra perfectamente con la plataforma de FIRMEDIGITAL, aprovechando sus funcionalidades de firma electrónica, gestión documental y flujo de trabajo. Se implementan módulos específicos para trámites administrativos, documentación oficial y procesos internos, creando una solución integral que se adapta a las necesidades de cada institución pública.
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
      <section ref={benefitsRef} className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios para el Sector Gobierno
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full">
              <div className="w-full h-[500px] md:h-[550px] lg:h-[600px] relative">
                <img 
                  src="/images/benegobierno.jpg" 
                  alt="Beneficios Gobierno" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    icon: <FaLandmark className="text-4xl text-blue-400" />,
                    title: "Gestión Gubernamental",
                    description: "Firma digital de documentos oficiales con validez legal y respaldo digital."
                  },
                  {
                    icon: <FaUserTie className="text-4xl text-blue-400" />,
                    title: "Trámites Ciudadanos",
                    description: "Servicios digitales para la ciudadanía con mayor rapidez y seguridad."
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-400" />,
                    title: "Seguridad Estatal",
                    description: "Protección avanzada de documentos gubernamentales con cifrado de última generación."
                  },
                  {
                    icon: <FaUsers className="text-4xl text-blue-400" />,
                    title: "Participación Ciudadana",
                    description: "Facilita la interacción entre ciudadanos y entidades gubernamentales de forma segura."
                  },
                  {
                    icon: <FaChartLine className="text-4xl text-blue-400" />,
                    title: "Transparencia",
                    description: "Mejora la rendición de cuentas y acceso a información pública verificable."
                  },
                  {
                    icon: <FaCogs className="text-4xl text-blue-400" />,
                    title: "Modernización",
                    description: "Impulsa la transformación digital del sector público con soluciones innovadoras."
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500 hover:border-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    <div className="flex items-start gap-3 md:gap-4 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{benefit.title}</h3>
                        <p className="text-sm md:text-base text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Why Choose FIRMEDIGITAL Banner */}
       <section className="relative py-16 border-t border-white/5 why-choose-banner bg-gradient-to-b from-black to-[#050A20]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[400px] h-[400px] bg-blue-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[400px] h-[400px] bg-purple-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5" />
          
          {/* Stars in arc formation like Venezuelan flag */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-25">
            <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 8 stars in an arc formation - larger size */}
              <path d="M75,150 L85,120 L95,150 L65,130 L105,130 Z" fill="white" />
              <path d="M150,120 L160,90 L170,120 L140,100 L180,100 Z" fill="white" />
              <path d="M225,100 L235,70 L245,100 L215,80 L255,80 Z" fill="white" />
              <path d="M300,90 L310,60 L320,90 L290,70 L330,70 Z" fill="white" />
              <path d="M375,100 L385,70 L395,100 L365,80 L405,80 Z" fill="white" />
              <path d="M450,120 L460,90 L470,120 L440,100 L480,100 Z" fill="white" />
              <path d="M525,150 L535,120 L545,150 L515,130 L555,130 Z" fill="white" />
              <path d="M300,180 L310,150 L320,180 L290,160 L330,160 Z" fill="white" />
            </svg>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 z-10">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <span className="text-white font-semibold">¿Por qué elegir FIRMEDIGITAL para instituciones gubernamentales?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight max-w-4xl">
              Documentos oficiales con soberanía digital garantizada
            </h2>
          </div>
          
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="space-y-6 text-left">
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  En FirmeDigital, garantizamos que sus documentos oficiales, trámites administrativos y comunicaciones gubernamentales cumplen con las leyes venezolanas y se gestionan 100% dentro del territorio nacional, respaldados por SUSCERTE.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Nuestra plataforma ofrece una solución integral para instituciones públicas que asegura la validez legal de sus documentos electrónicos, cumpliendo con todos los requisitos establecidos por la Ley de Infogobierno y demás normativas vigentes. Al elegir FIRMEDIGITAL para su entidad gubernamental, usted obtiene:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Firmas digitales con validez oficial</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Trámites ciudadanos 100% digitales</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Verificación de identidad para funcionarios</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Archivo digital con valor probatorio</span>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Al digitalizar sus procesos gubernamentales con una plataforma certificada por SUSCERTE, garantizamos no solo el cumplimiento legal sino también la soberanía tecnológica y la seguridad de la información oficial, reduciendo costos operativos y tiempos de respuesta mientras se mantiene la transparencia y trazabilidad de todos los trámites públicos en la República Bolivariana de Venezuela.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://app.firmedigital.com/auth/signup" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    Comenzar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative border-t border-white/5 pricing-section bg-gradient-to-b from-blue-950 to-blue-950">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-400">
              Planes y Precios
            </h2>
            <p className="mt-4 text-xl text-gray-400">Soluciones flexibles para todas tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/rocket-svgrepo-com.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Despegue</h3>
                    <p className="text-gray-400 text-sm">¡Impulso al siguiente nivel!</p>
                    <p className="text-gray-400 text-sm">Para persona natural</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/rocket-svgrepo-com.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                      <h3 className="text-2xl font-semibold mb-2">Plan Despegue</h3>
                        <p className="text-gray-400 text-sm">Carga, publica y gestiona miles de docs.</p>
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
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400 mt-10">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firmas ilimitadas</span>
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
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/efficiency.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Élite</h3>
                    <p className="text-gray-400 text-sm">¡Gestión eficiente de Documentos!</p>
                    <p className="text-gray-400 text-sm">Para persona jurídica</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/efficiency.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Plan Élite</h3>
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8" style={{ paddingTop: '1rem' }}>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="ml-2 flex flex-col">
                                
                                </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
                              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                30$
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
                            <span>Firmas ilimitadas</span>
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
                            <span>Gestor de Documentos</span>
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
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/organizacion.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Max</h3>
                    <p className="text-gray-400 text-sm"> ¡Mantén tus certificados emitidos al día!</p>
                    <p className="text-gray-400 text-sm">Para corporaciones</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/organizacion.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Plan Max</h3>
                        <p className="text-gray-400 text-sm mb-2">Creditos Ilimitados</p>
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
                            <span>Firmas ilimitadas</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Gestor de Documentos</span>
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
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>IA</span>
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
       {/* Características */}
       <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Características</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(features).map(([title, content], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[200px] md:h-[180px] w-full cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaCogs className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaCogs className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <p className="text-sm md:text-base text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Recursos Adicionales Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aprende Más con Nuestros Recursos
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : governmentArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Gubernamentales.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {governmentArticles.map((article, index) => (
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

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
