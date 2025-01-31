'use client';

import React, { useEffect, useLayoutEffect, useRef } from 'react';
import MegaMenu from '@/components/MegaMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
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

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#000000] text-white overflow-hidden">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-500/20 rounded-full mix-blend-normal filter blur-[128px]" />
          <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-purple-500/20 rounded-full mix-blend-normal filter blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
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
            </div>

            {/* Right Content */}
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
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Essential',
                description: 'Perfect for small businesses',
                features: [
                  'Managed IT Support',
                  '24/7 Monitoring',
                  'Cloud Backup',
                  'Security Essentials'
                ]
              },
              {
                title: 'Advanced',
                description: 'For growing companies',
                features: [
                  'Everything in Essential',
                  'Advanced Security',
                  'Priority Support',
                  'Compliance Management'
                ]
              },
              {
                title: 'Enterprise',
                description: 'Full-scale solutions',
                features: [
                  'Everything in Advanced',
                  'Custom Solutions',
                  'Dedicated Support Team',
                  'Advanced Analytics'
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className="relative group feature-card"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                    <ul className="space-y-3 pt-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-3 text-gray-300">
                          <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
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
            </div>

            {/* Valor del Bloque */}
            <div className="relative group pricing-card">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Más Popular
                </div>
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
            </div>

            {/* Renovación de Certificados */}
            <div className="relative group pricing-card">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
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
            </div>

            {/* Corporativo */}
            <div className="relative group pricing-card">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
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
            </div>
          </div>
        </div>
      </section>

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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    {feature.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative border-t border-white/5 contact-section">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 lg:p-12">
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
                      <span className="text-gray-300">contact@cryptonext.com</span>
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