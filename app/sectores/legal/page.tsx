'use client';

import React, { useEffect, useRef } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsBuildings, BsShieldLockFill, BsClockHistory } from 'react-icons/bs';
import { FaBalanceScale, FaFileContract, FaFileSignature, FaClipboardList, FaUserTie, FaChartLine, FaFileAlt } from 'react-icons/fa';
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
          <div className="flex items-center gap-4 mb-8">
            <FaBalanceScale className="hero-icon text-6xl bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg" />
            <h1 className="hero-title text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Sector Legal y Jurídico
            </h1>
          </div>
          <p className="hero-description text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para profesionales y organizaciones del sector legal.
          </p>
          <button className="hero-button bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/50">
            Solicitar Información
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section ref={benefitsRef} className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Beneficios Clave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaChartLine className="text-4xl text-blue-400" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Eficiencia Operativa
                </h3>
              </div>
              <p className="text-gray-300">
                Optimiza los procesos legales y reduce los tiempos de gestión documental.
              </p>
            </div>

            <div className="benefit-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <BsShieldLockFill className="text-4xl text-blue-400" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Seguridad Legal
                </h3>
              </div>
              <p className="text-gray-300">
                Garantiza la validez legal de todos los documentos firmados digitalmente.
              </p>
            </div>

            <div className="benefit-card bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <BsClockHistory className="text-4xl text-blue-400" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Trazabilidad
                </h3>
              </div>
              <p className="text-gray-300">
                Seguimiento completo de documentos y procesos legales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section ref={casesRef} className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Casos de Uso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="case-card bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaFileContract className="text-4xl text-blue-400" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Contratos Digitales
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="list-item flex items-center gap-2">
                  <FaFileSignature className="text-blue-400" />
                  Firma de contratos remotos
                </li>
                <li className="list-item flex items-center gap-2">
                  <FaClipboardList className="text-blue-400" />
                  Gestión de versiones
                </li>
                <li className="list-item flex items-center gap-2">
                  <BsShieldLockFill className="text-blue-400" />
                  Almacenamiento seguro
                </li>
                <li className="list-item flex items-center gap-2">
                  <FaBalanceScale className="text-blue-400" />
                  Validación legal
                </li>
              </ul>
            </div>

            <div className="case-card bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaFileAlt className="text-4xl text-blue-400" />
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Documentos Legales
                </h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="list-item flex items-center gap-2">
                  <FaUserTie className="text-blue-400" />
                  Poderes notariales
                </li>
                <li className="list-item flex items-center gap-2">
                  <FaFileSignature className="text-blue-400" />
                  Actas y certificaciones
                </li>
                <li className="list-item flex items-center gap-2">
                  <FaFileContract className="text-blue-400" />
                  Documentos judiciales
                </li>
                <li className="list-item flex items-center gap-2">
                  <FaClipboardList className="text-blue-400" />
                  Expedientes digitales
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Características Específicas */}
      <section ref={characteristicsRef} className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Características Específicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="characteristic-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaBalanceScale className="text-4xl text-blue-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Plantillas Legales
                </h3>
              </div>
              <p className="text-gray-300">
                Biblioteca de plantillas personalizables para diferentes tipos de documentos legales.
              </p>
            </div>

            <div className="characteristic-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <BsShieldLockFill className="text-4xl text-blue-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Workflow Legal
                </h3>
              </div>
              <p className="text-gray-300">
                Flujos de trabajo específicos para procesos legales y aprobaciones.
              </p>
            </div>

            <div className="characteristic-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaFileContract className="text-4xl text-blue-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Cumplimiento
                </h3>
              </div>
              <p className="text-gray-300">
                Conformidad con regulaciones y estándares legales vigentes.
              </p>
            </div>

            <div className="characteristic-card bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl backdrop-blur-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <FaClipboardList className="text-4xl text-blue-400" />
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Auditoría
              </h3>
              </div>
              <p className="text-gray-300">
                Registro detallado de todas las acciones para fines de auditoría.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
