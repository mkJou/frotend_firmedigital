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
import styles from './styles/FlipCard.module.css';
import Image from 'next/image';

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
  const [showFeatures, setShowFeatures] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

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
                    <span className="text-sm text-gray-400">Firma Digital Avanzada</span>
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


      {/* Pricing Section */}
      <section className="relative border-t border-white/5 pricing-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Planes y Precios
            </h2>
            <p className="mt-4 text-xl text-gray-400">Soluciones flexibles para todas tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <p className="text-gray-400 text-sm">Impulsa tu negocio al siguiente nivel</p>
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
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                  $1
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400/80 text-base">al mes</span>
                                <span className="text-xs text-gray-500">precio regular</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                  $10
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400 text-base">anual</span>
                                <span className="text-green-400 text-sm">¡Ahorra con el plan anual!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firma Electrónica</span>
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
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                         
                          
                        </ul>
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </button>
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
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Elite</h3>
                    <p className="text-gray-400 text-sm">Hasta 100 Bloques. Después $1 por bloque.</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Plan Elite</h3>
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                  $1
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400/80 text-base">al mes</span>
                                <span className="text-xs text-gray-500">precio regular</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                  $10
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400 text-base">anual</span>
                                <span className="text-green-400 text-sm">¡Ahorra con el plan anual!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firma Electrónica</span>
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
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                        </ul>
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </button>
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
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Renovación de Certificados</h3>
                    <p className="text-gray-400 text-sm">Mantén tus certificados emitidos al día.</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Renovación de Certificados</h3>
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                  $1
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400/80 text-base">al mes</span>
                                <span className="text-xs text-gray-500">precio regular</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                  $10
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400 text-base">anual</span>
                                <span className="text-green-400 text-sm">¡Ahorra con el plan anual!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firma Electrónica</span>
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
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                        </ul>
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Corporativo */}
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
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Corporativo</h3>
                    <p className="text-gray-400 text-sm">Planes a la medida de tus necesidades.</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15 8L20 8.2L16 12.2L17 17.8L12 15.2L7 17.8L8 12.2L4 8.2L9.6 8L12 2Z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="10" r="3" stroke="url(#grad1)" strokeWidth="1.5" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Corporativo</h3>
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                  $1
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400/80 text-base">al mes</span>
                                <span className="text-xs text-gray-500">precio regular</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                  $10
                                </span>
                              </div>
                              <div className="ml-2 flex flex-col">
                                <span className="text-gray-400 text-base">anual</span>
                                <span className="text-green-400 text-sm">¡Ahorra con el plan anual!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firma Electrónica</span>
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
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                        </ul>
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de características detalladas */}
      <div className="mt-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] hover:from-blue-500/10 hover:via-purple-500/10 hover:to-blue-500/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {showFeatures ? 'Ocultar' : 'Mostrar'} todas las características
            </span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                showFeatures ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="url(#arrow-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="arrow-gradient" x1="6" y1="9" x2="18" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            showFeatures ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="w-full overflow-x-auto rounded-xl border border-white/10">
          
            <table className="w-full min-w-[800px] border-collapse">
              
              <thead>
              <tr>
                  <td colSpan={5} className="py-4 px-4 text-lg font-semibold text-white bg-[#1A1A1A] border-b border-white/10">
                  Caracteristicas principales de FIRMEDIGITAL
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left text-base font-semibold">Características principales de Planes</th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Personal</span>
                      <span className="text-base font-semibold">$170</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center bg-[#1A1A1A]/50">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Standard</span>
                      <span className="text-base font-semibold">$425</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Business Pro</span>
                      <span className="text-base font-semibold">$680</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Planes Mejorados</span>
                      <span className="text-base font-semibold">Personalizado</span>
                      <span className="text-xs text-gray-400">Contactar</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm titulo">
               
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Envía acuerdos para firma electrónica</td>
                  <td className="py-3 px-4 text-center">5 al mes</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">Plan anual: 100 por usuario | Plan mensual: 10 por usuario</td>
                  <td className="py-3 px-4 text-center">Plan anual: 100 por usuario | Plan mensual: 10 por usuario</td>
                  <td className="py-3 px-4 text-center">Límites personalizados</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Flujo de trabajo de la firma</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Campos básicos</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Registro de auditoría en tiempo real</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Varios idiomas (firma en 44)</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Notificaciones y recordatorios</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Las aplicaciones móviles mejor valoradas</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Firma responsiva</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Informes</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Plantillas reutilizables</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left text-base font-semibold">Características principales de Planes</th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Personal</span>
                      <span className="text-base font-semibold">$170</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center bg-[#1A1A1A]/50">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Standard</span>
                      <span className="text-base font-semibold">$425</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Business Pro</span>
                      <span className="text-base font-semibold">$680</span>
                      <span className="text-xs text-gray-400">al mes</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400">Planes Mejorados</span>
                      <span className="text-base font-semibold">Personalizado</span>
                      <span className="text-xs text-gray-400">Contactar</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm titulo">
                <tr>
                  <td colSpan={5} className="py-4 px-4 text-lg font-semibold text-white bg-[#1A1A1A] border-b border-white/10">
                  Flujos de trabajo y documentos simplificados
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Envía acuerdos para firma electrónica</td>
                  <td className="py-3 px-4 text-center">5 al mes</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">Plan anual: 100 por usuario | Plan mensual: 10 por usuario</td>
                  <td className="py-3 px-4 text-center">Plan anual: 100 por usuario | Plan mensual: 10 por usuario</td>
                  <td className="py-3 px-4 text-center">Límites personalizados</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Flujo de trabajo de la firma</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Campos básicos</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Registro de auditoría en tiempo real</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Varios idiomas (firma en 44)</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Notificaciones y recordatorios</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Las aplicaciones móviles mejor valoradas</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Firma responsiva</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Informes</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-4">Plantillas reutilizables</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                  <td className="py-3 px-4 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Nuestras Soluciones Digitales Section */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
          Nuestras Soluciones Digitales
        </h2>
        <div className="tag-list mx-auto">
          <div className="loop-slider" style={{ "--duration": "15951ms", "--direction": "normal" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag"><span>#</span> Firma Digital</div>
              <div className="tag"><span>#</span> Certificados</div>
              <div className="tag"><span>#</span> Seguridad</div>
              <div className="tag"><span>#</span> Blockchain</div>
              <div className="tag"><span>#</span> Trazabilidad</div>
              <div className="tag"><span>#</span> Firma Digital</div>
              <div className="tag"><span>#</span> Certificados</div>
              <div className="tag"><span>#</span> Seguridad</div>
              <div className="tag"><span>#</span> Blockchain</div>
              <div className="tag"><span>#</span> Trazabilidad</div>
            </div>
          </div>
          <div className="loop-slider" style={{ "--duration": "19260ms", "--direction": "reverse" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag"><span>#</span> Autenticación</div>
              <div className="tag"><span>#</span> Validación</div>
              <div className="tag"><span>#</span> Documentos</div>
              <div className="tag"><span>#</span> Encriptación</div>
              <div className="tag"><span>#</span> Seguridad</div>
              <div className="tag"><span>#</span> Autenticación</div>
              <div className="tag"><span>#</span> Validación</div>
              <div className="tag"><span>#</span> Documentos</div>
              <div className="tag"><span>#</span> Encriptación</div>
              <div className="tag"><span>#</span> Seguridad</div>
            </div>
          </div>
          <div className="loop-slider" style={{ "--duration": "10449ms", "--direction": "normal" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag"><span>#</span> Innovación</div>
              <div className="tag"><span>#</span> Digital</div>
              <div className="tag"><span>#</span> Confianza</div>
              <div className="tag"><span>#</span> Eficiencia</div>
              <div className="tag"><span>#</span> Futuro</div>
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
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 85%,
            rgba(0, 0, 0, 0) 100%
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
          background: linear-gradient(
            90deg,
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
          background: linear-gradient(
            90deg,
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
          background: linear-gradient(
              to bottom,
              #000,
              transparent 30%,
              transparent 70%,
              #000
            ),
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

      {/* Contact Section */}
      <section className="relative border-t border-white/5 contact-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl blur-xl" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Conecta con nosotros</h2>
                  <p className="text-gray-400 mb-8">
                    Cuéntanos tus necesidades.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
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
                      <span className="text-gray-300">(+58) 424-7100380</span>
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
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="email"
                            placeholder="Correo Electronico"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <textarea
                            placeholder="Mensaje"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                            disabled
                          >
                            Enviar Mensaje
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Correo Electronico"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <textarea
                            placeholder="Mensaje"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                          >
                            Enviar Mensaje
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
 
    </main>
  );
}