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
                    <section ref={heroRef} className="relative py-16 px-4 md:px-8 overflow-hidden mt-[120px] min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
                      
                      {/* Fondo oscuro */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80"></div>
                      
                      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          {/* Columna izquierda: Título y subtítulo */}
                          <div className="flex flex-col">
                            <div className="flex flex-col mb-8">
                              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] leading-tight p-4 rounded-lg backdrop-blur-sm bg-black/30 shadow-xl text-left tracking-tight">
        
                              Cuentas Múltiples: <br />Gestiona Todos Tus Accesos Desde Un Solo Lugar con FIRMEDIGITAL
        
                              </h1>
                            
                              <div className="bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm p-6 mb-8">
                                <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-left">
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
                          
                          {/* Columna derecha: Imagen */}
                          <div className="relative h-[300px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 transform hover:scale-[1.02] transition-all duration-500">
                            <Image
                              src="/images/portada multiple.jpg"
                              alt="Sector Banca"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 relative z-10" style={{ paddingTop: '2rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm p-6 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              ¡Optimiza la gestión de accesos y permisos en tu organización!
            </h2>
          </motion.div>
        </div>
              
                      </div>
                    </section>

{/* ¿Por Qué Elegir FIRMA DIGITAL? Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-black to-blue-950 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            ¿Por Qué Elegir Cuentas Múltiples de FIRMADIGITAL?
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            {/* Imagen en el lado izquierdo */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full flex items-center">
              <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative">
                <img 
                  src="/images/porque elegir multi.jpg" 
                  alt="¿Por Qué Elegir FIRMA DIGITAL?" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Tarjetas en el lado derecho */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ paddingTop: '7rem' }}>
                {[
                  {
                    title: "Gestión Centralizada",
                    description: "Administra múltiples usuarios desde una sola plataforma intuitiva y eficiente.",
                    icon: <FaUsers className="text-5xl text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  },
                  {
                    title: "Accesos Personalizables",
                    description: "Define permisos específicos para cada usuario según sus necesidades.",
                    icon: <FaUserCog className="text-5xl text-purple-500 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                  },
                  {
                    title: "Seguridad Avanzada",
                    description: "Protege datos sensibles y minimiza riesgos con autenticación confiable.",
                    icon: <FaShieldAlt className="text-5xl text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  },
                  {
                    title: "Escalabilidad",
                    description: "Ideal para empresas de cualquier tamaño que necesitan coordinar múltiples perfiles de acceso.",
                    icon: <FaChartLine className="text-5xl text-purple-500 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 overflow-hidden transition-all duration-500 hover:border-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-300">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            ¿Cómo Funcionan las Cuentas Múltiples de FIRMEDIGITAL?
          </h2>
          <p className="text-xl text-center text-gray-300 mb-16 max-w-3xl mx-auto">
            Un proceso simple y eficiente para gestionar usuarios y permisos
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Configuración de Usuarios",
                description: "Crea y organiza perfiles con permisos personalizados.",
                icon: <FaUserCog className="text-4xl text-blue-500" />,
                step: 1
              },
              {
                title: "Gestión Eficiente",
                description: "Monitorea y ajusta accesos en tiempo real desde un panel único.",
                icon: <FaUsers className="text-4xl text-purple-500" />,
                step: 2
              },
              {
                title: "Seguridad y Control",
                description: "Mantén el acceso protegido con autenticación avanzada.",
                icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                step: 3
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                <div className="flex flex-col items-center text-center pt-4">
                  <div className="mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 mb-3">{step.title}</h3>
                  <p className="text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </section>


        {/* Beneficios Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="space-y-12">
                <TitleSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-12">
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <h2>Beneficios de las Cuentas Múltiples</h2>
                  </m.div>
                  <m.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <FaUsers className="text-4xl text-blue-500" />,
                      title: "Gestión Centralizada",
                      description: "Control unificado de usuarios y accesos desde una plataforma."
                    },
                    {
                      icon: <FaUserShield className="text-4xl text-purple-500" />,
                      title: "Asignación de Roles",
                      description: "Definición precisa de roles y permisos por usuario."
                    },
                    {
                      icon: <FaHandshake className="text-4xl text-blue-500" />,
                      title: "Colaboración Eficiente",
                      description: "Trabajo simultáneo en documentos con acceso controlado."
                    },
                    {
                      icon: <FaChartBar className="text-4xl text-purple-500" />,
                      title: "Monitoreo de Actividades",
                      description: "Registro detallado de acciones para auditoría y control."
                    }
                  ].map((feature, index) => (
                    <m.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", damping: 12 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                      <div>
                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                          <motion.div 
                            className="mb-4"
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                          >
                            {feature.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                            {feature.title}
                          </h3>
                        </div>

                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                          <div className="flex flex-col items-center justify-center h-full">
                            <motion.div 
                              className="mb-4"
                              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                            >
                              {feature.icon}
                            </motion.div>
                            <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              </>
            )}
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
              <h2 className="text-4xl font-bold mb-4">Casos de Uso de Cuentas Múltiples</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Soluciones de gestión de usuarios y accesos para diferentes sectores empresariales</p>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setActiveFilter('financiero')}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${activeFilter === 'financiero' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'}`}
              >
                Sector Financiero
              </button>
              <button 
                onClick={() => setActiveFilter('legal')}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${activeFilter === 'legal' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'}`}
              >
                Sector Legal
              </button>
              <button 
                onClick={() => setActiveFilter('gobierno')}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${activeFilter === 'gobierno' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'}`}
              >
                Sector Gobierno
              </button>
              <button 
                onClick={() => setActiveFilter('salud')}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${activeFilter === 'salud' ? 'bg-blue-600 text-white' : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700'}`}
              >
                Sector Salud
              </button>
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
                        Implementar Cuentas Múltiples para Contadores
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
        
        {/* Blog Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                <h2>Artículos Relacionados</h2>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
              />
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
                      className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
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
        <section className="py-12 px-4 bg-gradient-to-b from-black to-blue-950 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Testimonios de Clientes
            </motion.h2>
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
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm transition-all duration-300"
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
        <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-2">
              <div className="flex items-center">
                <FaQuestionCircle className="text-4xl text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
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
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
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

