'use client';

import React, { useEffect, useRef, useState } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLightningBolt, HiOutlineCog, HiOutlineChartBar, HiOutlinePuzzle, HiOutlineDocumentText, HiOutlineSparkles } from 'react-icons/hi';
import { IoRocketOutline, IoFlashOutline } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function WorkflowPage() {
  const timelineRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const numbersRef = useRef([]);
  const titleRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      pregunta: "¿Qué es un flujo de trabajo digital?",
      respuesta: "Un flujo de trabajo digital es un sistema automatizado que organiza y controla tareas, procedimientos y procesos de negocio. Con Firmedigital, puedes crear flujos personalizados que optimizan la gestión documental y agilizan la toma de decisiones."
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
      const text = mainTitle.textContent;
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

  useEffect(() => {
    // Efecto de seguimiento del mouse para el glow
    const cards = document.querySelectorAll('.timeline-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
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
      description: "Cuando tus documentos estén listos, es el momento de firmarlos electrónicamente. Con Firmedigital PSC, puedes estar seguro de que cada firma es legalmente vinculante y está protegida con la tecnología más avanzada. Firma desde cualquier dispositivo, en cualquier lugar y en cualquier momento.",
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
        <section className="relative overflow-hidden mt-30">
          <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <object
                type="image/svg+xml"
                data="/images/workflow.svg"
                className="w-full h-full"
                aria-label="Workflow Animation"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent opacity-90" />
            </div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center" style={{ marginTop: '60vh' }}>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Optimiza tus procesos con nuestro sistema de workflow inteligente.
                Automatiza, controla y mejora la eficiencia de tu negocio.
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
            
            <div className="mapa relative py-20 overflow-hidden bg-black">
              <div className="timeline-container relative max-w-5xl mx-auto px-4">
                <div className="absolute left-1/2 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 transform -translate-x-1/2 hidden md:block"></div>
                {/* Línea del timeline para móvil */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50 md:hidden"></div>
                
                {steps.map((step, index) => (
                  <div key={index} className="timeline-card group relative flex md:items-center mb-16">
                    {/* Vista Desktop */}
                    <div className="hidden md:flex w-full">
                      {index % 2 === 0 ? (
                        <>
                          <div className="w-[45%]">
                            <div className="relative max-w-md ml-auto mr-6">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy"></div>
                              <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all duration-500 text-right">
                                <div className="glow-effect"></div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                              </div>
                            </div>
                          </div>
                          <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 relative z-10 flex items-center justify-center">
                              <span className="timeline-number text-xl font-bold text-white">{index + 1}</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                            </div>
                          </div>
                          <div className="w-[45%]"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-[45%]"></div>
                          <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 relative z-10 flex items-center justify-center">
                              <span className="timeline-number text-xl font-bold text-white">{index + 1}</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                            </div>
                          </div>
                          <div className="w-[45%]">
                            <div className="relative max-w-md ml-24">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy"></div>
                              <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all duration-500">
                                <div className="glow-effect"></div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Vista Mobile */}
                    <div className="flex md:hidden w-full">
                      <div className="timeline-dot absolute left-8 transform -translate-x-1/2 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 relative z-10 flex items-center justify-center">
                          <span className="timeline-number text-lg font-bold text-white">{index + 1}</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-purple-400/50 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
                        </div>
                      </div>
                      <div className="flex-1 ml-16">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl rounded-2xl"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy rounded-2xl"></div>
                          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-white/20 transition-all duration-500">
                            <div className="glow-effect"></div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Caracteristicas Principales
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <p className="text-gray-300 text-center">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios principales
          </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                    </div>
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <p className="text-gray-300 text-center">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Testimonios de Clientes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  client: "Dohmi",
                  quote: "La implementación de flujos de trabajo con Firmedigital ha optimizado nuestros procesos internos, reduciendo tiempos de gestión y mejorando la colaboración entre equipos.",
                  role: "Director de Innovación"
                },
                {
                  client: "IUTCM",
                  quote: "Gracias a los flujos de trabajo personalizados de Firmedigital, hemos logrado digitalizar y agilizar todos nuestros procesos administrativos y académicos.",
                  role: "Coordinador de Tecnología"
                },
                {
                  client: "CIDEZ",
                  quote: "La automatización de flujos documentales con Firmedigital nos ha permitido reducir errores y aumentar la productividad en todas nuestras áreas operativas.",
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
              <a 
                href="#"
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 text-center whitespace-nowrap"
              >
                Preguntas Personalizadas
              </a>
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
