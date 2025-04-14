'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OptimizedScrollAnimations from '../components/OptimizedScrollAnimations';
import ScrollTriggerComponent from '../utils/ScrollTriggerComponent';
import { loadTextPlugin } from '../utils/gsapUtils';

export default function OptimizedHomePage() {
  const heroRef = useRef<HTMLElement>(null);
  
  // Inicializar animaciones que no dependen de ScrollTrigger
  const initializeHeroAnimations = async (gsap: any) => {
    // Cargar TextPlugin solo cuando sea necesario
    const TextPlugin = await loadTextPlugin();
    
    // Animación inicial del hero
    const heroTl = gsap.timeline({
      defaults: { duration: 1, ease: 'power3.out' }
    });
    
    if (document.querySelector('.hero-overlay')) {
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
    }

    // Animación de texto typewriter
    if (document.querySelector('.typewriter')) {
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
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section - No usa ScrollTrigger, solo GSAP básico */}
      <ScrollTriggerComponent
        onInitialize={(gsap) => initializeHeroAnimations(gsap)}
        lazyLoad={false} // Cargar inmediatamente para la sección hero
      >
        <section ref={heroRef} className="hero-section w-full h-screen relative">
          <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6">
              Firma Digital <span className="typewriter text-blue-400">Segura</span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
              Soluciones digitales seguras y confiables para tu empresa
            </p>
            <div className="hero-button">
              <Link href="/productos/firma-electronica" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                Conoce Nuestros Productos
              </Link>
            </div>
          </div>
        </section>
      </ScrollTriggerComponent>

      {/* Features Section - Usa ScrollTrigger con carga diferida */}
      <OptimizedScrollAnimations
        sectionId="features-section"
        className="py-20 bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Estas cards se animarán automáticamente con OptimizedScrollAnimations */}
            <div className="feature-card bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Firma Electrónica</h3>
              <p className="text-gray-400">Firma documentos de manera segura y legal desde cualquier dispositivo.</p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Gestor de Documentos</h3>
              <p className="text-gray-400">Organiza y gestiona todos tus documentos en un solo lugar.</p>
            </div>
            
            <div className="feature-card bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Verificación de Identidad</h3>
              <p className="text-gray-400">Verifica la identidad de tus clientes de manera segura y confiable.</p>
            </div>
          </div>
        </div>
      </OptimizedScrollAnimations>

      {/* Mission & Vision Section - También usa ScrollTrigger con carga diferida */}
      <OptimizedScrollAnimations
        sectionId="mission-vision-section"
        className="py-20 bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="mission-card bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Nuestra Misión</h3>
              <p className="text-gray-400 mb-4">
                Proporcionar soluciones digitales seguras y confiables que simplifiquen
                los procesos empresariales y mejoren la eficiencia operativa.
              </p>
              <p className="text-gray-400">
                Nos comprometemos a ofrecer tecnología de vanguardia que cumpla con
                los más altos estándares de seguridad y cumplimiento normativo.
              </p>
            </div>
            
            <div className="vision-card bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Nuestra Visión</h3>
              <p className="text-gray-400 mb-4">
                Ser líderes en la transformación digital de las empresas, facilitando
                la adopción de tecnologías que impulsen su crecimiento y competitividad.
              </p>
              <p className="text-gray-400">
                Aspiramos a crear un mundo donde la seguridad digital sea accesible
                para todas las organizaciones, independientemente de su tamaño.
              </p>
            </div>
          </div>
        </div>
      </OptimizedScrollAnimations>
    </main>
  );
}