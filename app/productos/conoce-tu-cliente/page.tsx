"use client"
import { useEffect, useState, useRef } from 'react';
import styles from '../../styles/FlipCard.module.css';
import { motion,AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MegaMenu from '../../../components/MegaMenu';
import { GiCookingPot } from 'react-icons/gi';
import { FaQuestionCircle, FaChevronDown, FaEnvelope, FaPaperPlane, FaFileSignature, FaUserCheck, FaUserShield, FaMoneyBillWave, FaDatabase, FaHistory, FaLeaf, FaGraduationCap, FaTools, FaBolt, FaLock, FaRocket, FaClipboardCheck, FaBuilding, FaUser, FaBell, FaIdCard, FaShieldAlt, FaHandshake, FaUserMd, FaCalendar } from 'react-icons/fa';
import { CardSkeleton } from '../../../components/ui/Skeletons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
 // Función para manejar el efecto de brillo en las tarjetas
 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};
const faqs = [
  {
    pregunta: "¿Qué es KYC?",
    respuesta: "KYC se refiere al proceso de conocer a tus clientes, asegurando que tengas la información necesaria para prevenir fraudes y cumplir con las regulaciones."
  },
  {
    pregunta: "¿Por qué es importante el KYC?",
    respuesta: "Es esencial para proteger tu negocio y las relaciones con tus clientes, además de cumplir con las normativas legales."
  },
  {
    pregunta: "¿Qué tipo de información se requiere para KYC?",
    respuesta: "Se requiere información básica como identificación, dirección y, en algunos casos, información financiera."
  }
];
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};


export default function VerificacionIdentidad() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('financiero');
  
  // Variables para el formulario
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success: boolean; message: string} | null>(null);
  
  // Variables para el blog
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  // Función para cargar artículos del blog relacionados con KYC
  const fetchKYCArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/articles/category/kyc');
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
    fetchKYCArticles();
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
        body: JSON.stringify({ email, companyName, section: 'Conoce Tu Cliente' }),
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
  return (
    <main className="bg-transparent">
      <MegaMenu />

      {/* Hero Section */}
                        <section ref={heroRef}
                          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]"
                        >
                          {/* Background Image */}
                          <div className="absolute inset-0">
                            <Image
                              src="/images/portada kyc.jpg"
                              alt="KYC Background"
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
                                <span className="text-sm font-medium text-blue-300">Conoce a tu Cliente (KYC)</span>
                              </div>
                              
                              {/* Main Title */}
                              <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                  <span className="block text-white mb-2 relative inline-block">
                                    <span 
                                      className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                                      data-text=""
                                    >
                                      Conoce a tu Cliente
                                    </span>
                                  </span>
                                  <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">
                                    Verificación Segura y Eficiente
                                  </span>
                                  </h1>
                              </div>
                              
                              {/* Description */}
                              <div className="space-y-6">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                  Automatiza el proceso de verificación con cumplimiento, seguridad y eficiencia. Reduce riesgos y fortalece la confianza.
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
            
      
        {/* ¿Por Qué Elegir el Validador de Identidad? Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                              </div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-300">Ventajas Competitivas</span>
                            </div>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    <span className="block text-white">¿Por Qué Elegir</span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">KYC de FIRMEDIGITAL?</span>
                                        </h2>
                  <div className="mt-2 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
                                    </div>
                          </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                  {/* Imagen en el lado izquierdo */}
                  <div className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full flex items-center">
                    <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative">
                      <img 
                        src="/images/porque kyc.jpg" 
                        alt="¿Por Qué Elegir KYC?" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Tarjetas en el lado derecho */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" style={{ paddingTop: '7rem' }}>
                      {[
                       {
                        icon: <FaRocket className="text-3xl" />,
                        title: "Automatización Completa",
                        description: "Agiliza el proceso de verificación con resultados en tiempo real.",
                        gradient: "from-blue-500 to-blue-600",
                        textColor: "text-blue-300",
                        borderColor: "hover:border-blue-400/40",
                        lineGradient: "from-blue-400 to-transparent"
                      },
                      {
                        icon: <FaClipboardCheck className="text-3xl" />,
                        title: "Cumplimiento Normativo",
                        description: "Cumple regulaciones nacionales e internacionales con facilidad.",
                        gradient: "from-purple-500 to-purple-600",
                        textColor: "text-purple-300",
                        borderColor: "hover:border-purple-400/40",
                        lineGradient: "from-purple-400 to-transparent"
                      },
                      {
                        icon: <FaShieldAlt className="text-3xl" />,
                        title: "Confianza y Transparencia",
                        description: "Procesos auditables y trazables para mayor confianza.",
                        gradient: "from-green-500 to-green-600",
                        textColor: "text-green-300",
                        borderColor: "hover:border-green-400/40",
                        lineGradient: "from-green-400 to-transparent"
                      },
                      {
                        icon: <FaUserShield className="text-3xl" />,
                        title: "Reducción de Riesgos",
                        description: "Minimiza fraudes y errores en la validación de usuarios.",
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
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative z-10 mb-4">
                            <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                              <div className={benefit.textColor}>
                              {benefit.icon}
                            </div>
                            </div>
                            <h3 className={`text-xl font-bold ${benefit.textColor} mb-2 group-hover:text-white transition-colors duration-300`}>
                              {benefit.title}
                            </h3>
                          </div>
                          <p className="relative z-10 text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            {benefit.description}
                          </p>
                          <div className={`relative z-10 mt-6 h-1 bg-gradient-to-r ${benefit.lineGradient} rounded-full group-hover:h-2 transition-all duration-300`}></div>
                          <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Cómo funciona header estilizado */}
                <div className="mt-16 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-green-300">Proceso Simple</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    <span className="block text-white">¿Cómo Funciona</span>
                    <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">el KYC de FIRMEDIGITAL?</span>
                  </h2>
                  <div className="mt-2 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" style={{ paddingTop: '5rem' }}>
            ¿Cómo funciona el KYC de FIRMEDIGITAL?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex flex-col items-center text-center mb-4 pt-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                    <FaIdCard className="text-5xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Captura de Información del Cliente</h3>
                </div>
                <p className="text-gray-300 text-center">Recopila datos y documentos con rapidez y seguridad.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(124,58,237,0.2)] transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex flex-col items-center text-center mb-4 pt-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                    <FaUserCheck className="text-5xl text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-400">Validación Automática</h3>
                </div>
                <p className="text-gray-300 text-center">Verifica identidades en tiempo real utilizando tecnología avanzada.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex flex-col items-center text-center mb-4 pt-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                    <FaClipboardCheck className="text-5xl text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Confirmación de Cumplimiento</h3>
                </div>
                <p className="text-gray-300 text-center">Obtén resultados precisos que aseguran el cumplimiento normativo.</p>
              </div>
            </motion.div>
          </div>
        </div>
              </div>
            </section>
      
      {/* Beneficios Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-400/30 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full"></div>
              <span className="text-sm font-medium text-transparent bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text">Beneficios Clave</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="block text-white">Más Razones para</span>
              <span className="block bg-gradient-to-r from-orange-400 via-teal-500 to-purple-500 bg-clip-text text-transparent">Elegir Nuestro KYC</span>
            </h2>
            <div className="mt-2 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-teal-500 to-purple-500 rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6">
              Nuestra solución de verificación de identidad ofrece múltiples ventajas para tu negocio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLock className="text-3xl" />,
                title: "Prevención de Fraudes",
                description: "Conoce a tus clientes a fondo y evita riesgos potenciales.",
                gradient: "from-blue-500 to-blue-600",
                textColor: "text-blue-300",
                borderColor: "hover:border-blue-400/40",
                lineGradient: "from-blue-400 to-transparent"
              },
              {
                icon: <FaRocket className="text-3xl" />,
                title: "Decisiones Informadas",
                description: "Accede a datos completos para decisiones estratégicas.",
                gradient: "from-purple-500 to-purple-600",
                textColor: "text-purple-300",
                borderColor: "hover:border-purple-400/40",
                lineGradient: "from-purple-400 to-transparent"
              },
              {
                icon: <FaClipboardCheck className="text-3xl" />,
                title: "Monitoreo Continuo",
                description: "Seguimiento del estado KYC para integridad de registros.",
                gradient: "from-green-500 to-green-600",
                textColor: "text-green-300",
                borderColor: "hover:border-green-400/40",
                lineGradient: "from-green-400 to-transparent"
              },
              {
                icon: <FaTools className="text-3xl" />,
                title: "Confianza del Cliente",
                description: "Demuestra compromiso con su protección.",
                gradient: "from-pink-500 to-pink-600",
                textColor: "text-pink-300",
                borderColor: "hover:border-pink-400/40",
                lineGradient: "from-pink-400 to-transparent"
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${benefit.borderColor}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 mb-4 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={benefit.textColor}>
                    {benefit.icon}
                  </div>
                  </div>
                  <h3 className={`text-xl font-bold ${benefit.textColor} mb-2 group-hover:text-white transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                </div>
                <p className="relative z-10 text-gray-300 text-sm leading-relaxed text-center group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>
                <div className={`relative z-10 mt-6 h-1 bg-gradient-to-r ${benefit.lineGradient} rounded-full group-hover:h-2 transition-all duration-300`}></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/* Casos de Uso Section con filtros - Negro a Azul */}
<section className="relative py-16 px-4 bg-gradient-to-b from-black via-gray-900 to-blue-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
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
                <span className="text-sm font-medium text-blue-300">Casos de Uso</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                <span className="block text-white">Soluciones por</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Sectores</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Soluciones de verificación de identidad adaptadas a diversos sectores</p>
              <div className="mt-4 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'financiero', label: 'Sector Financiero', gradient: 'from-blue-500 to-blue-600' },
                { key: 'legal', label: 'Sector Legal', gradient: 'from-purple-500 to-purple-600' },
                { key: 'gobierno', label: 'Sector Gobierno', gradient: 'from-indigo-500 to-indigo-600' },
                { key: 'salud', label: 'Sector Salud', gradient: 'from-emerald-500 to-emerald-600' }
              ].map((f) => (
              <button 
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`${activeFilter === f.key 
                    ? `relative px-6 py-3 rounded-full text-white shadow-lg transition-all duration-300 bg-gradient-to-r ${f.gradient}`
                    : 'relative px-6 py-3 rounded-full text-gray-300 transition-all duration-300 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10'}`}
                >
                  {activeFilter === f.key && (
                    <>
                      <span className="absolute -inset-0.5 bg-gradient-to-r from-white/30 to-white/10 rounded-full opacity-20 blur"></span>
                      <span className="absolute inset-0 rounded-full bg-white/10"></span>
                    </>
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">KYC para el Sector Financiero</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Verificación de identidad para apertura de cuentas bancarias y servicios financieros digitales</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Prevención de fraude en transacciones financieras con autenticación biométrica</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Cumplimiento de normativas contra el lavado de dinero (AML) y financiamiento del terrorismo</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Onboarding digital de clientes con verificación remota segura y auditable</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar KYC Financiero
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/fintech.webp"
                      alt="KYC para el sector financiero"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">KYC para el Sector Legal</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Verificación de identidad de firmantes en contratos y documentos legales con validez jurídica</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autenticación de partes en procedimientos notariales y registrales con evidencia digital</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Cumplimiento de requisitos legales de identificación en procesos judiciales y extrajudiciales</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Protección contra suplantación de identidad en trámites legales con validación biométrica</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar KYC Legal
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/legalH.webp"
                      alt="KYC para el sector legal"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">KYC para el Sector Gobierno</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Validación de identidad de ciudadanos para trámites gubernamentales con seguridad biométrica</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Verificación de funcionarios públicos para acceso a sistemas gubernamentales y datos sensibles</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autenticación de proveedores en procesos de contratación pública con trazabilidad completa</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Protección de datos personales en registros gubernamentales con verificación de acceso</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar KYC Gubernamental
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/gobiernoss.webp"
                      alt="KYC para el sector gobierno"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">KYC para el Sector Salud</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Verificación de identidad de pacientes para acceso seguro a historias clínicas digitales</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autenticación de personal médico para acceso a sistemas hospitalarios y datos sensibles</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Protección de datos clínicos sensibles con verificación biométrica de acceso</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Validación de identidad en telemedicina para consultas remotas seguras y confiables</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar KYC para Salud
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/saludd.webp"
                      alt="KYC para el sector salud"
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
      <section className="relative py-20 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/3 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[28rem] h-[28rem] bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium text-blue-300">Aprende Más</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Aprende Más sobre</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">KYC</span>
          </h2>
            <div className="mt-2 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : blogArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría KYC.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => (
                <Link href={`/blog/${article._id}`} key={article._id || index}>
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
                        <div className="w-full h-full bg-gradient-to-br from-blue-800/50 to-purple-800/50"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-blue-400" />
                          {article.date ? new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Fecha no disponible'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por {article.author || 'FIRMEDIGITAL'}</span>
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
      
{/* Testimonios Section */}
<section className="py-12 px-4 bg-gradient-to-b from-black to-blue-950 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                client: "Dohmi",
                quote: "La implementación del sistema KYC de FIRMEDIGITAL ha transformado nuestro proceso de verificación de clientes. La precisión en la detección de documentos falsos y la velocidad del proceso nos ha permitido reducir significativamente los riesgos operativos.",
                role: "Director de Seguridad"
              },
              {
                client: "IUTCM",
                quote: "Como institución educativa, la seguridad en la verificación de identidad es crucial. El sistema KYC nos ha permitido validar eficientemente la autenticidad de los documentos de nuestros estudiantes y personal, manteniendo la integridad de nuestros registros.",
                role: "CEO"
              },
              {
                client: "CIDEZ",
                quote: "La integración del sistema KYC en nuestros procesos ha sido fundamental para cumplir con las regulaciones bancarias. La verificación biométrica y la validación de documentos en tiempo real nos han dado una ventaja competitiva en el sector financiero.",
                role: "Gerente de Operaciones"
              }
            ].map((testimonial, index) => (
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Preguntas Frecuentes Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
