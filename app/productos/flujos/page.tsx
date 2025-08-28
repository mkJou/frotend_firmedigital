'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/FlipCard.module.css';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineCog, HiOutlineChartBar, HiOutlinePuzzle, HiOutlineDocumentText, HiOutlineSparkles } from 'react-icons/hi';
import { IoRocketOutline, IoFlashOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown, FaEnvelope, FaBuilding, FaPaperPlane, FaCalendar, FaRocket, FaUserCheck, FaShieldAlt, FaChartLine, FaFileSignature, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';
import { CardSkeleton } from '../../../components/ui/Skeletons';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function WorkflowPage() {
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const numbersRef = useRef([]);
  const titleRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  
   // Función para manejar el efecto de brillo en las tarjetas
   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Estado para el filtro de casos de uso
  const [activeFilter, setActiveFilter] = useState('rrhh');
  
  useEffect(() => {
   // Obtener artículos con categoría 'flujo de trabajo' desde la API
   const fetchWorkflowArticles = async () => {
    try {
      // Usar encodeURIComponent para manejar espacios en la URL
      const response = await fetch(`/api/articles/category/${encodeURIComponent('flujo de trabajo')}`);
      const data = await response.json();
      
      console.log('Respuesta de la API:', data);
      
      if (data.success) {
        console.log('Artículos obtenidos:', data.data);
        setBlogArticles(data.data);
      } else {
        console.error('Error al obtener artículos:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener artículos:', error);
    } finally {
      // Asegurar que isLoading se establezca a false incluso si hay un error
      setIsLoading(false);
    }
  };
  
  fetchWorkflowArticles();
  }, []);

  // Variables para el formulario
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success: boolean; message: string} | null>(null);

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
        body: JSON.stringify({ email, companyName, section: 'Flujos de Trabajo' }),
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

  const faqs = [
    {
      pregunta: "¿Qué es un flujo de trabajo digital?",
      respuesta: "Un flujo de trabajo digital es un sistema automatizado que organiza y controla tareas, procedimientos y procesos de negocio. Con FIRMEDIGITAL, puedes crear flujos personalizados que optimizan la gestión documental y agilizan la toma de decisiones."
    },
    {
      pregunta: "¿Cómo puedo personalizar los flujos de trabajo?",
      respuesta: "Nuestra plataforma permite personalizar cada aspecto de tus flujos de trabajo. Puedes definir roles, establecer condiciones, configurar notificaciones y adaptar cada proceso a las necesidades específicas de tu organización."
    },
    {
      pregunta: "¿Es posible integrar los flujos con otros sistemas?",
      respuesta: "Sí, nuestros flujos de trabajo están diseñados para integrarse perfectamente con tus sistemas existentes. Ofrecemos APIs y conectores para las principales plataformas empresariales, garantizando una experiencia unificada."
    },
    {
      pregunta: "¿Qué nivel de seguridad ofrecen los flujos de trabajo?",
      respuesta: "Todos nuestros flujos de trabajo incorporan medidas de seguridad avanzadas, incluyendo encriptación de datos, control de acceso basado en roles, y registro detallado de actividades. Cumplimos con los estándares internacionales de seguridad y privacidad."
    },
    {
      pregunta: "¿Cómo puedo monitorear el progreso de mis flujos de trabajo?",
      respuesta: "Nuestra plataforma ofrece dashboards en tiempo real y reportes detallados que te permiten visualizar el estado de cada proceso, identificar cuellos de botella y optimizar continuamente tus flujos de trabajo."
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const ctx = gsap.context(() => {
      timelineSteps.forEach((step, index) => {
        // Animación del paso
        gsap.fromTo(step,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            scrollTrigger: {
              trigger: step,
              start: "top bottom-=150",
              end: "top center",
              toggleActions: "play none none reverse",
              markers: false,
              scrub: false,
              once: false
            }
          }
        );

        // Animación de la tarjeta
        const card = step.querySelector('.timeline-card');
        if (card) {
          gsap.fromTo(card,
            {
              x: index % 2 === 0 ? -30 : 30,
              opacity: 0,
              scale: 0.8,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.4,
              delay: 0,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: step,
                start: "top bottom-=150",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false,
                scrub: false
              }
            }
          );
        }

        // Animación del número con contador
        const number = step.querySelector('.step-number');
        if (number) {
          let startNumber = 0;
          const endNumber = index + 1;
          
          gsap.fromTo(number,
            {
              scale: 0,
              opacity: 0,
              rotate: -180,
            },
            {
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.6,
              delay: 0.3,
              ease: "elastic.out(1, 0.5)",
              scrollTrigger: {
                trigger: step,
                start: "top bottom-=150",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false,
                onEnter: () => {
                  // Animación del contador
                  gsap.to(number.querySelector('.number-value'), {
                    innerHTML: endNumber,
                    duration: 1,
                    snap: { innerHTML: 1 },
                    ease: "power2.inOut",
                  });
                }
              }
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline cards animation
      const timelineCards = document.querySelectorAll('.timeline-card');
      timelineCards.forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            scale: 0.8,
            y: 50
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              end: "top top",
              toggleActions: "play reverse restart reverse",
              markers: false
            }
          }
        );
      });

      // Numbers counter animation
      const numbers = document.querySelectorAll('.timeline-number');
      numbers.forEach((number) => {
        const targetNumber = parseInt(number.textContent || '0', 10);
        gsap.fromTo(number,
          {
            innerText: '0'
          },
          {
            innerText: targetNumber,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: number,
              start: "top bottom-=100",
              end: "top top",
              toggleActions: "play reverse restart reverse",
              markers: false
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animación del título principal
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
      gsap.fromTo(mainTitle,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: mainTitle,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Efecto de escritura
      const text = mainTitle.textContent || '';
      mainTitle.textContent = '';
      const chars = text.split('');
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        mainTitle.appendChild(span);

        gsap.to(span, {
          opacity: 1,
          duration: 0.1,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: mainTitle,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    // Animación de las feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, []);

  
  const steps = [
    {
      title: "Registro y Configuración",
      description: "Comienza tu viaje con nosotros registrándote en nuestra plataforma. Configura tu cuenta con tus datos y preferencias. Nuestro sistema es intuitivo y te guiará en cada paso del camino, asegurando que todo esté listo para empezar a trabajar de manera eficiente.",
      icon: "🔐"
    },
    {
      title: "Creación de Documentos",
      description: "Sube o crea documentos directamente en nuestra plataforma. Ofrecemos herramientas fáciles de usar para que puedas redactar, editar y organizar tus documentos sin complicaciones. Todo está diseñado para que te concentres en lo que realmente importa.",
      icon: "📄"
    },
    {
      title: "Flujo de Trabajo Personalizado",
      description: "Configura tu Workflow según las necesidades de tu empresa. Asigna tareas, establece plazos y define el orden de aprobación. Nuestro sistema automatizado asegura que cada paso se siga de manera precisa, evitando retrasos y errores.",
      icon: "⚙️"
    },
    {
      title: "Firma Electrónica Segura",
      description: "Cuando tus documentos estén listos, es el momento de firmarlos electrónicamente. Con FIRMEDIGITAL PSC, puedes estar seguro de que cada firma es legalmente vinculante y está protegida con la tecnología más avanzada. Firma desde cualquier dispositivo, en cualquier lugar y en cualquier momento.",
      icon: "✍️"
    },
    {
      title: "Monitoreo y Gestión",
      description: "Mantente al tanto de cada etapa del proceso con nuestras herramientas de monitoreo y gestión. Recibe notificaciones en tiempo real y accede a informes detallados sobre el progreso de tus documentos. Así, siempre tendrás el control y la visibilidad que necesitas.",
      icon: "📊"
    },
    {
      title: "Archivo Seguro",
      description: "Una vez completado el proceso, todos tus documentos serán almacenados de manera segura en nuestra plataforma. Accede a ellos cuando los necesites y disfruta de la tranquilidad de saber que están protegidos y organizados.",
      icon: "🔒"
    }
  ];

  const features = [
    {
      title: "Automatización Inteligente",
      description: "Optimiza y acelera tus procesos con flujos de trabajo automatizados.",
      icon: <HiOutlineCog className="text-4xl text-blue-400" />
    },
    {
      title: "Personalización Total",
      description: "Adapta cada flujo de trabajo a las necesidades específicas de tu negocio.",
      icon: <HiOutlineSparkles className="text-4xl text-purple-400" />
    },
    {
      title: "Integración Seamless",
      description: "Conecta sin problemas con tus herramientas y sistemas existentes.",
      icon: <HiOutlinePuzzle className="text-4xl text-green-400" />
    }
  ];

  const benefits = [
    {
      title: "Revoluciona tu flujo de trabajo",
      description: "Gestiona documentos con rapidez y eficiencia, desde su creación hasta la aprobación final.",
      icon: <IoRocketOutline className="text-4xl text-blue-400" />
    },
    {
      title: "Fluidez en cada paso",
      description: "Proceso simplificado y claro que elimina cuellos de botella y complicaciones.",
      icon: <IoFlashOutline className="text-4xl text-purple-400" />
    }
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s ease infinite;
        }

        .glow-effect {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56, 189, 248, 0.15), transparent 40%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .group:hover .glow-effect {
          opacity: 1;
        }
      `}</style>
      <main className="min-h-screen bg-[#000000] text-white">
        <MegaMenu />
        

       {/* Hero Section */}
       <section ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/PORTADA FLUJO.jpg"
            alt="Flujos de Trabajo Background"
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
                        <span className="text-sm font-medium text-blue-300">Flujos de Trabajo Inteligentes</span>
                      </div>
                      
                      {/* Main Title */}
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          <span className="block text-white mb-2 relative inline-block">
                            <span 
                              className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                              data-text=""
                            >
                              Flujos de Trabajo
                            </span>
                          </span>
                          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">
                            Simplifica y Optimiza Cada Paso
                          </span>
                                   </h1>
                      </div>
                                 
                      {/* Description */}
                      <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                                     Digitaliza y automatiza tus procesos internos con una solución diseñada para mejorar la eficiencia y colaboración en tu organización.
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
             
       
       {/* Benefits Section */}
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
               <span className="block text-white">Beneficios</span>
               <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Principales</span>
            </h2>
             <div className="mt-4 flex justify-center">
               <div className="w-24 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                  </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
               <div key={index} className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20">
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                  <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                     <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {benefit.icon}
                      </div>
                     <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{benefit.title}</h3>
                    </div>
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                     <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {benefit.icon}
                      </div>
                     <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">{benefit.description}</p>
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
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 rounded-full border border-indigo-400/30 mb-6">
                 <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                 <span className="text-sm font-medium text-indigo-300">Casos de Uso</span>
               </div>
               <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                 <span className="block text-white">Casos de Uso de</span>
                 <span className="block bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Flujos de Trabajo</span>
               </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Diseñado para profesionales y empresas en cualquier industria</p>
               <div className="mt-4 flex justify-center">
                 <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-full"></div>
               </div>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
               {[
                 { key: 'rrhh', label: 'Recursos Humanos', gradient: 'from-blue-500 to-blue-600' },
                 { key: 'gobierno', label: 'Sector Gobierno', gradient: 'from-purple-500 to-purple-600' },
                 { key: 'contadores', label: 'Contadores', gradient: 'from-indigo-500 to-indigo-600' },
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
              {/* Caso de uso para Recursos Humanos */}
              {activeFilter === 'rrhh' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Flujos de trabajo para Recursos Humanos</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Automatización del proceso de reclutamiento y selección con aprobaciones secuenciales</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de solicitudes de vacaciones y permisos con notificaciones automáticas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Procesos de evaluación de desempeño con múltiples niveles de revisión y retroalimentación</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Onboarding de nuevos empleados con seguimiento de tareas y documentación requerida</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo para RRHH
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/rrhhh.webp"
                      alt="Flujos de trabajo para recursos humanos"
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
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Flujos de trabajo para el Sector Gobierno</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de trámites ciudadanos con seguimiento en tiempo real y notificaciones de estado</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Automatización de procesos de aprobación de licencias y permisos con múltiples departamentos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Coordinación de proyectos interinstitucionales con asignación de tareas y seguimiento de avances</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de contrataciones públicas con flujos de aprobación transparentes y auditables</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo Gubernamentales
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/gobiernoss.webp"
                      alt="Flujos de trabajo para el sector gobierno"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Contadores */}
              {activeFilter === 'contadores' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Flujos de trabajo para Contadores</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Automatización de ciclos de aprobación de facturas con múltiples niveles de validación</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de procesos de cierre contable con asignación de tareas y recordatorios automáticos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Coordinación de auditorías con flujos de revisión y aprobación de documentos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Flujos de aprobación de presupuestos con notificaciones y seguimiento de modificaciones</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo Contables
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/contable.webp"
                      alt="Flujos de trabajo para contadores"
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
                      <Link href="https://app.firmedigital.com/auth/signup/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo para Salud
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/saludd.webp"
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
      
        {/* Testimonios Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Testimonios de Clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  client: "Dohmi",
                  quote: "La implementación de flujos de trabajo con FIRMEDIGITAL ha optimizado nuestros procesos internos, reduciendo tiempos de gestión y mejorando la colaboración entre equipos.",
                  role: "Director de Innovación"
                },
                {
                  client: "IUTCM",
                  quote: "Gracias a los flujos de trabajo personalizados de FIRMEDIGITAL, hemos logrado digitalizar y agilizar todos nuestros procesos administrativos y académicos.",
                  role: "Coordinador de Tecnología"
                },
                {
                  client: "CIDEZ",
                  quote: "La automatización de flujos documentales con FIRMEDIGITAL nos ha permitido reducir errores y aumentar la productividad en todas nuestras áreas operativas.",
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

        {/* Recursos Adicionales Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-black to-blue-950 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aprende Más sobre Flujos de Trabajo
            </h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : blogArticles && blogArticles.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Flujo de Trabajo.</p>
                <p className="text-gray-500 mt-4">Estamos trabajando para añadir más contenido pronto.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>

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
    </>
  );
}
