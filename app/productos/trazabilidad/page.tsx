'use client';
import { useEffect, useState, useRef } from 'react';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import MegaMenu from '@/components/MegaMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineAudit, AiOutlineHistory, AiOutlineNotification, AiOutlineEye } from 'react-icons/ai';
import { BsShieldCheck, BsClockHistory, BsArrowRepeat } from 'react-icons/bs';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

const SkeletonCard = () => (
  <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-2/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

export default function Trazabilidad() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const titleRef = useRef(null);
  
  const faqs = [
    {
      pregunta: "¿Qué es la firma digital?",
      respuesta: "La firma digital es un mecanismo criptográfico que permite autenticar la identidad del firmante y garantizar la integridad de los documentos electrónicos."
    },
    {
      pregunta: "¿Cómo puedo obtener una firma digital?",
      respuesta: "Para obtener una firma digital, debe completar el proceso de solicitud en nuestra plataforma y cumplir con los requisitos de verificación de identidad."
    },
    {
      pregunta: "¿Qué es la trazabilidad?",
      respuesta: "Es la capacidad de seguir el rastro de un documento a lo largo de todo el proceso de firma."
    },
    {
      pregunta: "¿Qué información se registra en la trazabilidad de los documentos?.",
      respuesta: "Fecha y hora de cada firma, identidad del firmante, y cualquier acción realizada sobre el documento."
    },
    {
      pregunta: "¿Qué validez legal tiene la firma digital?",
      respuesta: "La firma digital tiene la misma validez legal que una firma manuscrita según la legislación vigente en materia de documentos electrónicos."
    },
    {
      pregunta: "¿En qué dispositivos puedo usar la firma digital?",
      respuesta: "Nuestra solución de firma digital es compatible con computadoras, tablets y smartphones, permitiendo firmar documentos desde cualquier dispositivo."
    }
    
  ];
  
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (!isLoading) {
      // Animación inicial de carga
      tl.from('.hero-section', { 
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from('.hero-icon', {
        scale: 0,
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Efecto de escritura para el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          duration: 2,
          text: "Trazabilidad: Seguridad y transparencia en cada firma",
          ease: "none",
          delay: 0.5
        });
      }

      // Animación del texto descriptivo
      tl.from('.hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 2.5
      });

      // Animaciones de las cards al hacer scroll
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          gsap.set(card, { opacity: 1, y: 0 }); // Asegura que las cards sean visibles inicialmente
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });
    }

    // Simular tiempo de carga
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
      // Limpia las animaciones al desmontar
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-b from-black via-black to-[#111827] text-white py-24 px-4 mt-[100px] relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {isLoading ? (
            <SkeletonHero />
          ) : (
            <>
              <HiOutlineSearchCircle className="hero-icon text-6xl mx-auto mb-4 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <h1 
                ref={titleRef}
                className="hero-title text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              ></h1>
              <p className="hero-text text-xl max-w-3xl mx-auto text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                La trazabilidad en Firmedigital es la capacidad de rastrear y documentar el historial y recorrido de un producto, documento o proceso a lo largo de su ciclo de vida, asegurando transparencia, control de calidad y cumplimiento normativo. Firmedigital proporciona herramientas avanzadas que permiten a las empresas mantener un registro preciso y verificable de cada etapa del proceso, mejorando la eficiencia y la confianza en la gestión de documentos y contratos.
              </p>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 px-4 bg-gradient-to-b from-[#111827] to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              <>
                {[
                  {
                    icon: <AiOutlineAudit className="text-4xl text-blue-500" />,
                    title: "Visibilidad Completa",
                    description: "Monitoreo detallado de cada paso en el proceso de firma digital."
                  },
                  {
                    icon: <BsShieldCheck className="text-4xl text-purple-500" />,
                    title: "Seguridad Personal",
                    description: "Registro detallado de acciones para prevenir fraudes y usos indebidos."
                  },
                  {
                    icon: <AiOutlineHistory className="text-4xl text-blue-500" />,
                    title: "Historial de Firmas",
                    description: "Acceso rápido al registro histórico de todas tus firmas electrónicas."
                  },
                  {
                    icon: <AiOutlineNotification className="text-4xl text-purple-500" />,
                    title: "Notificaciones en Tiempo Real",
                    description: "Alertas instantáneas sobre el estado de tus documentos y firmas."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-4">
                          {feature.icon}
                        </div>
                        <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <AiOutlineAudit className="text-4xl text-blue-500" />,
                title: "Auditoría Integral",
                description: "Registro detallado de actividades para facilitar auditorías y cumplimiento."
              },
              {
                icon: <BsClockHistory className="text-4xl text-purple-500" />,
                title: "Monitoreo en Tiempo Real",
                description: "Supervisión instantánea del progreso de documentos y firmas."
              },
              {
                icon: <BsArrowRepeat className="text-4xl text-blue-500" />,
                title: "Gestión de Flujos",
                description: "Optimización de procesos de firma para mayor eficiencia operativa."
              },
              {
                icon: <AiOutlineEye className="text-4xl text-purple-500" />,
                title: "Transparencia Total",
                description: "Visibilidad completa del proceso para todas las partes involucradas."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {benefit.title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                client: "Dohmi",
                quote: "Firmedigital ha transformado nuestra gestión documental, permitiéndonos rastrear cada etapa del proceso con total transparencia y seguridad.",
                role: "Director de Operaciones"
              },
              {
                client: "IUTCM",
                quote: "La trazabilidad que ofrece Firmedigital nos ha permitido optimizar nuestros procesos académicos y administrativos, mejorando significativamente nuestra eficiencia.",
                role: "Coordinador Académico"
              },
              {
                client: "CIDEZ",
                quote: "Gracias a Firmedigital, hemos logrado un control total sobre nuestros documentos, con la capacidad de verificar su autenticidad en cualquier momento del proceso.",
                role: "Gerente de Proyectos"
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

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
