'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import MegaMenu from '../../../components/MegaMenu';
import { BsBuildings, BsShieldLockFill, BsClockHistory } from 'react-icons/bs';
import { FaFileContract, FaBalanceScale, FaStamp, FaBuilding, FaShieldAlt, FaMobileAlt, FaStar, FaFileSignature, FaClipboardList, FaUserTie, FaChartLine, FaFileAlt, FaBook, FaBullseye, FaBrain, FaMagic } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectorLegal() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const casesRef = useRef(null);
  const characteristicsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(".hero-icon", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });

      gsap.from(".hero-title", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power4.out"
      });

      gsap.from(".hero-description", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
      });

      gsap.from(".hero-button", {
        scale: 0,
        opacity: 0,
        duration: 1,
        delay: 0.7,
        ease: "elastic.out(1, 0.5)"
      });

      // Benefits Section Animation
      gsap.from(".benefit-card", {
        scrollTrigger: {
          trigger: benefitsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Cases Section Animation
      gsap.from(".case-card", {
        scrollTrigger: {
          trigger: casesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      // Characteristics Section Animation
      gsap.from(".characteristic-card", {
        scrollTrigger: {
          trigger: characteristicsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      // Animate list items
      gsap.from(".list-item", {
        scrollTrigger: {
          trigger: ".list-item",
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      });

      // Section titles animation
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <FaBalanceScale className="hero-icon text-6xl bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg" />
                <h1 className="hero-title text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Sector Legal y Jurídico
                </h1>
              </div>
              <p className="hero-description text-xl text-gray-300 max-w-3xl mb-8">
                Imagina tener un despacho legal a tu disposición las 24 horas del día, los 7 días de la semana, sin importar dónde te encuentras. Firmedigital  transforma esta visión en realidad, ofreciéndote una plataforma integral que optimiza y automatiza todos los aspectos de la gestión legal
              </p>
            </div>
            <div className="relative h-[400px] w-full">
              <motion.div
                className="w-full h-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/lega.png"
                  alt="Sector Legal"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section */}
      <section ref={benefitsRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <FaFileContract className="text-4xl text-blue-400" />,
                title: "Gestión de Contratos",
                description: "Creación y firma electrónica de documentos legales con validez garantizada."
              },
              {
                icon: <FaBalanceScale className="text-4xl text-blue-400" />,
                title: "Procesos Judiciales",
                description: "Agilización de trámites legales eliminando barreras geográficas."
              },
              {
                icon: <FaStamp className="text-4xl text-blue-400" />,
                title: "Certificación Digital",
                description: "Autenticación rápida y segura de documentos legales."
              },
              {
                icon: <FaBuilding className="text-4xl text-blue-400" />,
                title: "Gestión Corporativa",
                description: "Administración centralizada de documentos corporativos."
              },
              {
                icon: <FaShieldAlt className="text-4xl text-blue-400" />,
                title: "Cumplimiento Legal",
                description: "Protección y seguridad de información sensible."
              },
              {
                icon: <FaMobileAlt className="text-4xl text-blue-400" />,
                title: "Accesibilidad Total",
                description: "Gestión legal desde cualquier dispositivo y ubicación."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
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
      <section ref={heroRef} className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <FaBalanceScale className="hero-icon text-6xl bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg" />
            <h1 className="hero-title text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Gestión Documental Integral
            </h1>
          </div>
          <p className="hero-description text-xl text-gray-300 max-w-3xl mb-8">
          Ofrecemos soluciones estándar y personalizadas para la Gestión Documental Digital, que incluyen sincronización de datos locales y en la nube, así como una Intranet corporativa para facilitar el intercambio de información. Con Firmedigital, su organización puede optimizar la administración y el acceso a documentos, asegurando seguridad y eficiencia. Mejore su gestión documental con nuestras soluciones avanzadas y logre una operatividad fluida en toda su infraestructura.
          </p>
        </div>
      </section>      
      {/* Características Section */}
      <section ref={characteristicsRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Características
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: <FaBook className="text-4xl text-blue-400" />,
                title: "Conocimiento Legal",
                description: "Acceso completo a nuestra base de conocimiento jurídico."
              },
              {
                icon: <FaBullseye className="text-4xl text-blue-400" />,
                title: "Búsqueda Precisa",
                description: "Herramientas avanzadas para encontrar respuestas exactas."
              },
              {
                icon: <FaBrain className="text-4xl text-blue-400" />,
                title: "IA Integrada",
                description: "Funciones innovadoras basadas en inteligencia artificial."
              },
              {
                icon: <FaMagic className="text-4xl text-blue-400" />,
                title: "Interfaz Intuitiva",
                description: "Diseño fácil de usar, sin importar el nivel técnico."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
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

      
    </main>
  );
}
