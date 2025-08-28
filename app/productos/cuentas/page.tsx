'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/FlipCard.module.css';
import MegaMenu from '../../../components/MegaMenu';
import Link from 'next/link';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaUserLock, FaUserCog, FaShieldAlt, FaChartLine, FaUsers, FaUserShield, FaHandshake, FaLock, FaChartBar, FaQuestionCircle, FaChevronDown, FaEnvelope, FaBuilding, FaPaperPlane, FaCalendar, FaIndustry, FaGavel, FaMoneyBillWave } from 'react-icons/fa';
import { motion as m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TitleSkeleton, CardSkeleton } from '../../../components/ui/Skeletons';


// Definimos un alias para motion para evitar problemas de tipos
const motion = m;

export default function CuentasMultiples() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const heroRef = useRef<HTMLElement>(null);

   // Función para manejar el efecto de brillo en las tarjetas
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };
  
  // Variables para el formulario
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success: boolean; message: string} | null>(null);
  const [activeFilter, setActiveFilter] = useState('financiero');

  const faqs = [
    {
      pregunta: "¿Cómo funciona el sistema de cuentas múltiples?",
      respuesta: "El sistema permite crear y gestionar múltiples cuentas de usuario con diferentes niveles de acceso y permisos, facilitando la administración de documentos y firmas digitales en tu organización."
    },
    {
      pregunta: "¿Cuántas cuentas puedo crear?",
      respuesta: "El número de cuentas depende del plan contratado, ofreciendo flexibilidad para adaptarse a las necesidades de tu organización, desde pequeños equipos hasta grandes empresas."
    },
    {
      pregunta: "¿Cómo se gestionan los permisos?",
      respuesta: "Los permisos se administran de forma centralizada, permitiendo asignar roles específicos a cada usuario y definir sus niveles de acceso a documentos y funcionalidades."
    },
    {
      pregunta: "¿Es seguro compartir accesos entre usuarios?",
      respuesta: "Sí, el sistema cuenta con múltiples capas de seguridad y encriptación, garantizando que cada usuario solo pueda acceder a la información autorizada según su rol."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
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
        body: JSON.stringify({ email, companyName, section: 'Cuentas' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: '¡Gracias! Hemos recibido tu solicitud y te contactaremos pronto.' });
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
    // Obtener artículos con categoría 'cuentas multiples' desde la API
    const fetchCuentasArticles = async () => {
      try {
        // Usar encodeURIComponent para manejar espacios en la URL
        const response = await fetch(`/api/articles/category/${encodeURIComponent('cuentas multiples')}`);
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
    
    fetchCuentasArticles();
    
    const timer = setTimeout(() => {
      if (blogArticles.length === 0) {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [blogArticles.length]);

  return (
    <main className="min-h-screen bg-[#000000] text-white flex-1">
        <MegaMenu />

         {/* Hero Section */}
      <section ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/portada gestor.jpg"
            alt="Cuentas Múltiples Background"
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
                        <span className="text-sm font-medium text-blue-300">Cuentas Múltiples</span>
                      </div>
                      
                      {/* Main Title */}
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          <span className="block text-white mb-2 relative inline-block">
                            <span 
                              className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                              data-text=""
                            >
                              Cuentas Múltiples
                            </span>
                          </span>
                          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">
                            Gestiona Todos Tus Accesos Desde Un Solo Lugar
                          </span>
                              </h1>
                      </div>
                            
                      {/* Description */}
                      <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                                Simplifica la administración de usuarios y optimiza el control de accesos en tu organización. ¡Eficiencia y seguridad en cada cuenta!
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
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre personal o de la empresa</label>
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

      {/* ¿Por Qué Elegir Cuentas Múltiples de FIRMEDIGITAL? Section */}
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
              <span className="block text-white mb-2">¿Por Qué Elegir</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Cuentas Múltiples FIRMEDIGITAL?
              </span>
          </h2>
          
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre las razones que nos convierten en la mejor opción para la gestión de usuarios
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
              </div>
            </div>
            
          {/* Main Content - Tarjetas centradas y responsivas */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  {
                    icon: <FaUsers className="text-3xl" />,
                    title: "Gestión Centralizada",
                    description: "Administra múltiples usuarios desde una sola plataforma intuitiva y eficiente.",
                    color: "blue",
                    gradient: "from-blue-500 to-blue-600",
                    textColor: "text-blue-300",
                    borderColor: "hover:border-blue-400/40",
                    lineGradient: "from-blue-400 to-transparent"
                  },
                  {
                    icon: <FaUserCog className="text-3xl" />,
                    title: "Accesos Personalizables",
                    description: "Define permisos específicos para cada usuario según sus necesidades.",
                    color: "purple",
                    gradient: "from-purple-500 to-purple-600",
                    textColor: "text-purple-300",
                    borderColor: "hover:border-purple-400/40",
                    lineGradient: "from-purple-400 to-transparent"
                  },
                  {
                    icon: <FaShieldAlt className="text-3xl" />,
                    title: "Seguridad Avanzada",
                    description: "Protege datos sensibles y minimiza riesgos con autenticación confiable.",
                    color: "green",
                    gradient: "from-green-500 to-green-600",
                    textColor: "text-green-300",
                    borderColor: "hover:border-green-400/40",
                    lineGradient: "from-green-400 to-transparent"
                  },
                  {
                    icon: <FaChartLine className="text-3xl" />,
                    title: "Escalabilidad",
                    description: "Ideal para empresas de cualquier tamaño que necesitan coordinar múltiples perfiles de acceso.",
                    color: "pink",
                    gradient: "from-pink-500 to-pink-600",
                    textColor: "text-pink-300",
                    borderColor: "hover:border-pink-400/40",
                    lineGradient: "from-pink-400 to-transparent"
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${benefit.borderColor}`}
                  >
                    {/* Card background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon and title */}
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
          
                    {/* Description */}
                    <div className="relative z-10">
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                    
                    {/* Decorative line with gradient and glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
                </div>
            ))}
          </div>
        </div>
      </div>
      </section>


        {/* Beneficios Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium text-green-300">Beneficios Clave</span>
                </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Beneficios de las</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Cuentas Múltiples</span>
            </h2>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
              </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                icon: <FaUsers className="text-3xl" />,
                      title: "Gestión Centralizada",
                description: "Control unificado de usuarios y accesos desde una plataforma.",
                gradient: "from-blue-500 to-blue-600",
                textColor: "text-blue-300"
                    },
                    {
                icon: <FaUserShield className="text-3xl" />,
                      title: "Asignación de Roles",
                description: "Definición precisa de roles y permisos por usuario.",
                gradient: "from-purple-500 to-purple-600",
                textColor: "text-purple-300"
                    },
                    {
                icon: <FaHandshake className="text-3xl" />,
                      title: "Colaboración Eficiente",
                description: "Trabajo simultáneo en documentos con acceso controlado.",
                gradient: "from-green-500 to-green-600",
                textColor: "text-green-300"
                    },
                    {
                icon: <FaChartBar className="text-3xl" />,
                      title: "Monitoreo de Actividades",
                description: "Registro detallado de acciones para auditoría y control.",
                gradient: "from-pink-500 to-pink-600",
                textColor: "text-pink-300"
                    }
                  ].map((feature, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className={feature.textColor}>
                            {feature.icon}
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className={feature.textColor}>
                              {feature.icon}
                          </div>
                        </div>
                    <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">{feature.description}</p>
                      </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
              </div>
                  ))}
                </div>
          </div>
        </section>
        
        
       {/* Casos de Uso Section con filtros */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-400/30 mb-6">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm font-medium text-orange-300">Casos de Uso</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                <span className="block text-white">Casos de Uso de</span>
                <span className="block bg-gradient-to-r from-orange-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Cuentas Múltiples</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Soluciones de gestión de usuarios y accesos para diferentes sectores empresariales</p>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'financiero', label: 'Sector Financiero' },
                { id: 'legal', label: 'Sector Legal' },
                { id: 'gobierno', label: 'Sector Gobierno' },
                { id: 'salud', label: 'Sector Salud' }
              ].map((filter) => (
              <button 
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    activeFilter === filter.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20 border border-blue-400/30' 
                      : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 text-gray-300 hover:border-blue-400/30 hover:shadow-lg'
                  }`}
                >
                  {filter.label}
              </button>
              ))}
            </div>
            
            {/* Contenido de casos de uso */}
            <div className="mt-8">
              {/* Caso de uso para Sector Financiero */}
              {activeFilter === 'financiero' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Cuentas Múltiples para el Sector Financiero</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión centralizada de usuarios con diferentes niveles de acceso para sucursales bancarias</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Control de permisos para operaciones financieras con trazabilidad de acciones por usuario</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Segregación de funciones para cumplimiento normativo con roles específicos para aprobaciones</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autenticación multifactor para cuentas con privilegios elevados en sistemas financieros</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Cuentas Múltiples para Financiero
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/contable.webp"
                      alt="Validación de identidad para el sector financiero"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Legal */}
              {activeFilter === 'legal' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Cuentas Múltiples para el Sector Legal</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de accesos para bufetes jurídicos con roles específicos para abogados, asistentes y personal administrativo</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Control de acceso a expedientes confidenciales con niveles de permisos para diferentes tipos de casos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Trazabilidad de acciones legales con registro detallado de quién accedió a cada documento y cuándo</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Colaboración segura entre equipos legales con permisos temporales para consultores externos</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Cuentas Múltiples para Legal
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/legalH.webp"
                      alt="Validación de identidad para el sector legal"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Cuentas Múltiples para el Sector Gobierno</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión jerárquica de usuarios para instituciones gubernamentales con roles por departamentos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Control de acceso a documentos oficiales con niveles de autorización basados en cargos públicos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Auditoría completa de acciones administrativas con registro detallado para transparencia gubernamental</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de permisos temporales para comisiones especiales y proyectos interinstitucionales</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Cuentas Múltiples para Gobierno
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/gobiernoss.webp"
                      alt="Validación de identidad para el sector gobierno"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Cuentas Múltiples para el Sector Salud</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de usuarios para centros médicos con roles específicos para médicos, enfermeros y personal administrativo</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Control de acceso a historias clínicas con permisos basados en especialidades médicas y relación con el paciente</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Registro detallado de acciones por usuario para auditorías de cumplimiento con normativas de privacidad médica</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de accesos para equipos multidisciplinarios con colaboración segura entre diferentes departamentos médicos</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Cuentas Múltiples para Salud
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/saludd.webp"
                      alt="Validación de identidad para el sector salud"
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
        
        {/* Blog Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
          <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-400/30 mb-6">
              <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
              <span className="text-sm font-medium text-indigo-300">Recursos Adicionales</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Artículos</span>
              <span className="block bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Relacionados</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Descubre contenido valioso sobre gestión de cuentas múltiples</p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : blogArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogArticles.map((article, index) => (
                  <Link href={`/blog/${article.slug}`} key={article.id || index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-200/20 h-full hover:border-blue-400/30"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 absolute z-10"></div>
                        {article.imageUrl ? (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                            <HiOutlineUserGroup className="text-6xl text-gray-400" />
                          </div>
                        )}
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
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">Próximamente artículos sobre cuentas múltiples</p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonios Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

          <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-400/30 mb-6">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-medium text-yellow-300">Experiencias de Clientes</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Testimonios de</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Clientes</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Descubre lo que dicen nuestros clientes sobre las cuentas múltiples</p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  client: "Dohmi",
                  quote: "La gestión de cuentas múltiples ha simplificado enormemente nuestro control de accesos y permisos.",
                  role: "Director de Tecnología"
                },
                {
                  client: "IUTCM",
                  quote: "La capacidad de administrar roles y permisos de manera centralizada ha mejorado nuestra eficiencia operativa.",
                  role: "Gerente de Operaciones"
                },
                {
                  client: "CIDEZ",
                  quote: "El sistema de cuentas múltiples nos ha permitido mantener un control preciso sobre quién accede a cada documento.",
                  role: "Coordinador de Seguridad"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateY: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2, type: "spring", damping: 15 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.3)", transition: { duration: 0.3 } }}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-3xl border border-gray-200/20 shadow-2xl transition-all duration-300 hover:border-blue-400/30"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-blue-400">{testimonial.client.charAt(0)}</span>
                      </div>
                    <h3 className="text-xl font-bold text-center text-blue-400 group-hover:text-white transition-colors duration-300">{testimonial.client}</h3>
                    </div>
                    <div className="flex-grow">
                    <p className="text-gray-300 text-center italic mb-4 group-hover:text-gray-200 transition-colors duration-300">"{testimonial.quote}"</p>
                    </div>
                  <div className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">
                      <span>{testimonial.role}</span>
                    </div>
                    <div className="flex justify-center mt-4">
                      {[1, 2, 3, 4, 5].map((star, i) => (
                        <motion.svg 
                          key={star} 
                          className="w-5 h-5 text-yellow-400" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + (i * 0.1), type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.2 } }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </motion.svg>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
             
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-400/30 mb-6">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-sm font-medium text-red-300">Preguntas Frecuentes</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Preguntas</span>
              <span className="block bg-gradient-to-r from-red-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Frecuentes</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Resolvemos tus dudas sobre cuentas múltiples</p>
            <div className="mt-4 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 via-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, x: -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/20 hover:border-blue-400/30 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all duration-300"
                  >
                  <h3 className="text-xl font-semibold text-blue-400 group-hover:text-white transition-colors duration-300">{faq.pregunta}</h3>
                    <FaChevronDown 
                    className={`text-blue-400 transition-transform duration-300 group-hover:text-white ${
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
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="px-6 pb-4"
                      >
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{faq.respuesta}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* ¿Cómo Funcionan las Cuentas Múltiples? Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text tracking-wide uppercase">Proceso Simple</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">¿Cómo Funcionan las</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Cuentas Múltiples FIRMEDIGITAL?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Un proceso simple y eficiente para gestionar usuarios y permisos
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Configuración de Usuarios",
                description: "Crea y organiza perfiles con permisos personalizados.",
                icon: <FaUserCog className="w-12 h-12" />
              },
              {
                step: "2",
                title: "Gestión Eficiente",
                description: "Monitorea y ajusta accesos en tiempo real desde un panel único.",
                icon: <FaUsers className="w-12 h-12" />
              },
              {
                step: "3",
                title: "Seguridad y Control",
                description: "Mantén el acceso protegido con autenticación avanzada.",
                icon: <FaShieldAlt className="w-12 h-12" />
              }
            ].map((step, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:border-blue-400/30"
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step number and icon */}
                <div className="relative z-10 text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-blue-400">{step.step}</span>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-blue-400">
                      {step.icon}
                    </div>
                  </div>
                </div>
                
                {/* Title and description */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
  );
}

