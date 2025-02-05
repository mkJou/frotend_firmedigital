'use client';

import React, { useEffect, useLayoutEffect, useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import MegaMenu from '@/components/MegaMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  TitleSkeleton, 
  TextSkeleton, 
  ButtonSkeleton,
  CardSkeleton 
} from '@/components/ui/Skeletons';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Lazy load the features card component
const FeaturesCard = dynamic(() => Promise.resolve(() => {
  return (
    <div className="relative feature-card">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl" />
      <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-6">Características Principales</h3>
        <div className="space-y-4">
          {[
            'Firma Digital Avanzada',
            'Blockchain Integrado',
            'Validación Instantánea',
            'Almacenamiento Seguro'
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}), {
  loading: () => <CardSkeleton />
});

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      if (!isLoading) {
        // Animación inicial del hero
        const heroTl = gsap.timeline({
          defaults: { duration: 1, ease: 'power3.out' }
        });
        
        heroTl
          .from('.hero-overlay', {
            opacity: 0,
          })
          .from('.hero-title', {
            y: 100,
            opacity: 0,
            ease: 'power4.out'
          })
          .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
          }, '-=0.5')
          .from('.hero-button', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
          }, '-=0.3');

        // Animación de texto typewriter
        const words = ['Segura', 'Confiable', 'Innovadora'];
        const typewriterTl = gsap.timeline({ repeat: -1 });
        
        words.forEach(word => {
          typewriterTl
            .to('.typewriter', {
              duration: 1,
              text: word,
              ease: 'none'
            })
            .to('.typewriter', {
              duration: 1,
              opacity: 1
            })
            .to('.typewriter', {
              duration: 1,
              opacity: 0
            });
        });

        // Animaciones scroll
        const scrollAnimations = () => {
          // Cards animación
          gsap.from('.feature-card', {
            scrollTrigger: {
              trigger: '.feature-card',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
          });

          // Pricing cards animación
          gsap.from('.pricing-card', {
            scrollTrigger: {
              trigger: '.pricing-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
          });

          // Features animación
          gsap.from('.feature', {
            scrollTrigger: {
              trigger: '.features-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2
          });

          // Contact section animación
          gsap.from('.contact-section', {
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1
          });
        };

        // Iniciar animaciones de scroll
        scrollAnimations();
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading]);

  useEffect(() => {
    // Efecto de seguimiento del mouse para el glow
    const cards = document.querySelectorAll('.plan-card');
    
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

  return (
    <main ref={mainRef} className="min-h-screen bg-[#000000] text-white overflow-hidden">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-[200px] pb-[100px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-normal filter blur-[128px]" />
          <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-normal filter blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {isLoading ? (
                <>
                  <div className="w-40">
                    <TextSkeleton />
                  </div>
                  <div className="space-y-4">
                    <TitleSkeleton />
                    <TitleSkeleton />
                  </div>
                  <div className="max-w-xl">
                    <TextSkeleton />
                  </div>
                  <div className="w-40">
                    <ButtonSkeleton />
                  </div>
                </>
              ) : (
                <>
                  <div className="hero-overlay inline-flex items-center space-x-2 bg-white/5 rounded-full px-3 py-1">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-sm text-gray-400">Firma Digital Segura</span>
                  </div>
                  
                  <h1 className="hero-title text-4xl lg:text-6xl font-bold tracking-tight">
                    Firma Digital
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Simple y Segura
                    </span>
                  </h1>

                  <p className="hero-subtitle text-lg text-gray-400 max-w-xl">
                    La solución perfecta para todas las empresas que necesitan una firma digital
                    <span className="typewriter ml-2 inline-block min-w-[150px]"></span>
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="hero-button w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Comenzar Ahora
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Right Content */}
            <Suspense fallback={<CardSkeleton />}>
              <FeaturesCard />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Básico",
                description: "Perfecto para pequeñas empresas",
                features: [
                  "Soporte TI Gestionado",
                  "Monitoreo 24/7",
                  "Respaldo en la Nube",
                  "Seguridad Básica"
                ],
                icon: "",
                color: "from-blue-400 to-cyan-400"
              },
              {
                name: "Avanzado",
                description: "Para empresas en crecimiento",
                features: [
                  "Todo lo de Básico",
                  "Seguridad Avanzada",
                  "Soporte Prioritario",
                  "Gestión de Cumplimiento"
                ],
                icon: "",
                color: "from-purple-400 to-pink-400"
              },
              {
                name: "Empresarial",
                description: "Soluciones a gran escala",
                features: [
                  "Todo lo de Avanzado",
                  "Soluciones Personalizadas",
                  "Equipo de Soporte Dedicado",
                  "Análisis Avanzado"
                ],
                icon: "",
                color: "from-amber-400 to-orange-400"
              }
            ].map((plan, index) => (
              <div key={index} className="plan-card group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-xy"></div>
                <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full flex flex-col overflow-hidden group-hover:border-white/20 transition-all duration-500">
                  <div className="glow-effect"></div>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{plan.icon}</span>
                      <h3 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${plan.color}`}>
                        {plan.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="space-y-4 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="feature-item flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r {plan.color} flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`mt-8 w-full px-6 py-3 bg-gradient-to-r ${plan.color} text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]`}>
                    Empezar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative border-t border-white/5 pricing-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Planes y Precios
            </h2>
            <p className="mt-4 text-xl text-gray-400">Soluciones flexibles para todas tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className="relative group pricing-card">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Emisión de Firma Electrónica</h3>
                    <p className="text-gray-400 text-sm mb-4">Carga, publica y gestiona miles de docs.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">$10</span>
                    </div>
                  </div>

                  <div className="mb-8 flex-grow">
                    <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Tecnología BlockChain</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Envío masivo</span>
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
                        <span>Editor interno</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Comenzar Ahora
                  </button>
                </div>
              )}
            </div>

            {/* Valor del Bloque */}
            <div className="relative group pricing-card">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Valor del Bloque</h3>
                    <p className="text-gray-400 text-sm mb-4">Hasta 100 Bloques. Después $1 por bloque.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">$1</span>
                    </div>
                  </div>

                  <div className="mb-8 flex-grow">
                    <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Almacenamiento de datos</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Transacciones seguras</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Soporte técnico básico</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Acceso a la plataforma de gestión</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Comenzar Ahora
                  </button>
                </div>
              )}
            </div>

            {/* Renovación de Certificados */}
            <div className="relative group pricing-card">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Renovación de Certificados</h3>
                    <p className="text-gray-400 text-sm mb-4">Mantén tus certificados emitidos al día.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">$10</span>
                    </div>
                  </div>

                  <div className="mb-8 flex-grow">
                    <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Validez continua</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Encriptación en la Blockchain</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Protección de Datos digitales</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Trazabilidad</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Comenzar Ahora
                  </button>
                </div>
              )}
            </div>

            {/* Corporativo */}
            <div className="relative group pricing-card">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Corporativo</h3>
                    <p className="text-gray-400 text-sm mb-4">Planes a la medida de tus necesidades.</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">Contáctanos</span>
                    </div>
                  </div>

                  <div className="mb-8 flex-grow">
                    <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Página de Verificación</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Bloques Al Mayor</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Multifirmas</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                    Contactar Ventas
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scroll Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
            Nuestras Soluciones Digitales
          </h2>
          <div className="tag-list mx-auto">
            <div className="loop-slider" style={{"--duration": "15951ms", "--direction": "normal"} as React.CSSProperties}>
              <div className="inner">
                <div className="tag"><span>#</span> Firma Digital</div>
                <div className="tag"><span>#</span> Certificados</div>
                <div className="tag"><span>#</span> Seguridad</div>
                <div className="tag"><span>#</span> Blockchain</div>
                <div className="tag"><span>#</span> Trazabilidad</div>
                {/* Duplicado para el loop */}
                <div className="tag"><span>#</span> Firma Digital</div>
                <div className="tag"><span>#</span> Certificados</div>
                <div className="tag"><span>#</span> Seguridad</div>
                <div className="tag"><span>#</span> Blockchain</div>
                <div className="tag"><span>#</span> Trazabilidad</div>
              </div>
            </div>
            <div className="loop-slider" style={{"--duration": "19260ms", "--direction": "reverse"} as React.CSSProperties}>
              <div className="inner">
                <div className="tag"><span>#</span> Autenticación</div>
                <div className="tag"><span>#</span> Validación</div>
                <div className="tag"><span>#</span> Documentos</div>
                <div className="tag"><span>#</span> Encriptación</div>
                <div className="tag"><span>#</span> Seguridad</div>
                {/* Duplicado para el loop */}
                <div className="tag"><span>#</span> Autenticación</div>
                <div className="tag"><span>#</span> Validación</div>
                <div className="tag"><span>#</span> Documentos</div>
                <div className="tag"><span>#</span> Encriptación</div>
                <div className="tag"><span>#</span> Seguridad</div>
              </div>
            </div>
            <div className="loop-slider" style={{"--duration": "10449ms", "--direction": "normal"} as React.CSSProperties}>
              <div className="inner">
                <div className="tag"><span>#</span> Innovación</div>
                <div className="tag"><span>#</span> Digital</div>
                <div className="tag"><span>#</span> Confianza</div>
                <div className="tag"><span>#</span> Eficiencia</div>
                <div className="tag"><span>#</span> Futuro</div>
                {/* Duplicado para el loop */}
                <div className="tag"><span>#</span> Innovación</div>
                <div className="tag"><span>#</span> Digital</div>
                <div className="tag"><span>#</span> Confianza</div>
                <div className="tag"><span>#</span> Eficiencia</div>
                <div className="tag"><span>#</span> Futuro</div>
              </div>
            </div>
            <div className="fade"></div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tag-list {
          width: 90%;
          max-width: 1200px;
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          gap: 1rem 0;
          position: relative;
          padding: 1.5rem 0;
          overflow: hidden;
          mask-image: linear-gradient(to bottom, 
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,1) 85%,
            rgba(0,0,0,0) 100%
          );
        }

        .loop-slider .inner {
          display: flex;
          width: fit-content;
          animation-name: loop;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--direction);
          animation-duration: var(--duration);
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 0 0.2rem;
          color: #e2e8f0;
          font-size: 1rem;
          background-color: rgba(15, 23, 42, 0.5);
          border-radius: 0.4rem;
          padding: 0.7rem 1rem;
          margin-right: 1rem;
          box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2),
                     0 0.1rem 0.5rem rgba(0, 0, 0, 0.3),
                     0 0.2rem 1.5rem rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .tag::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(96, 165, 250, 0.1), 
            rgba(168, 85, 247, 0.1), 
            transparent
          );
          z-index: -1;
          animation: border-glow 3s linear infinite;
        }

        .tag::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 0.4rem;
          z-index: -1;
        }

        .tag:hover {
          transform: translateY(-2px);
          background-color: rgba(15, 23, 42, 0.7);
          box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3),
                     0 0.2rem 1rem rgba(0, 0, 0, 0.4),
                     0 0.4rem 2rem rgba(0, 0, 0, 0.5);
        }

        .tag:hover::before {
          animation: border-glow 1.5s linear infinite;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(96, 165, 250, 0.2), 
            rgba(168, 85, 247, 0.2), 
            transparent
          );
        }

        .tag span {
          font-size: 1.2rem;
          color: #60a5fa;
          position: relative;
          z-index: 1;
        }

        .fade {
          pointer-events: none;
          background: linear-gradient(to bottom, #000, transparent 30%, transparent 70%, #000),
                      linear-gradient(to right, transparent 0%, transparent 85%, #000);
          position: absolute;
          inset: 0;
        }

        @keyframes border-glow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <style jsx>{`
        .pricing-card {
          position: relative;
          isolation: isolate;
        }

        .pricing-card > div {
          position: relative;
          background: #0A0A0A;
          border-radius: 1rem;
          transition: transform 0.3s ease;
        }

        .pricing-card > div::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(90deg, #60a5fa, #a855f7, #60a5fa);
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 200% auto;
          animation: shine 3s linear infinite;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .pricing-card > div:hover {
          transform: translateY(-8px);
        }

        .pricing-card > div:hover::before {
          opacity: 1;
        }

        @keyframes shine {
          0% {
            background-position: 0% center;
          }
          
          100% {
            background-position: 200% center;
          }
        }
      `}</style>

      <style jsx>{`
        .plan-card {
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .plan-card:hover {
          transform: translateY(-8px);
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
        
        .feature-item {
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(5px);
        }
      `}</style>

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
      `}</style>

      {/* Features Grid */}
      <section className="py-24 relative border-t border-white/5 features-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">How Does It Work?</h2>
            <p className="mt-4 text-gray-400">Simple steps to get started with our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'Schedule a free consultation with our IT experts.'
              },
              {
                step: '02',
                title: 'Custom Solution',
                description: 'We design a solution tailored to your needs.'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Quick and efficient implementation of services.'
              }
            ].map((feature, index) => (
              <div key={index} className="relative group feature">
                {isLoading ? (
                  <CardSkeleton />
                ) : (
                  <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      {feature.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative border-t border-white/5 contact-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-xl" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                  <p className="text-gray-400 mb-8">
                    Contact us today for a free consultation and let us help you transform your IT infrastructure.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-300">info@firmedigital.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="text-gray-300">(403) 215-7506</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-xl" />
                  <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-6">
                    <form className="space-y-4">
                      {isLoading ? (
                        <>
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                            disabled
                          >
                            Send Message
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <textarea
                            placeholder="Message"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                          >
                            Send Message
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold mb-4">CryptoNext</div>
              <p className="text-gray-400 max-w-md">
                Leading IT services provider in Calgary. Security and efficiency for your digital infrastructure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {['Managed IT', 'Cloud Solutions', 'Cyber Security', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'Blog', 'Careers'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-400">
            <p>&copy; 2025 CryptoNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}