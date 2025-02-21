'use client';

import React from 'react';
import { FaUserTie, FaUsers, FaChartLine, FaCogs, FaClipboard, FaLock, FaMobile, FaCog, FaPlug, FaWpforms, FaLightbulb, FaCloud } from 'react-icons/fa';
import MegaMenu from '../../../components/MegaMenu';
import Image from "next/image";
import { motion } from 'framer-motion';

export default function SectorRRHH() {
  const features = {
    'Automatización de Procesos': 'Optimiza tareas repetitivas y elimina la gestión manual de documentos.',
    'Gestión del Talento': 'Centraliza información de empleados desde reclutamiento hasta desarrollo.',
    'Motivación de Equipos': 'Facilita comunicación y acceso a información de beneficios.',
    'Reducción de Costes': 'Optimiza procesos y reduce dependencia del papel.',
  };

  const benefits = {
    'Sistema Eficiente': 'Gestión digital completa de registros y flujos de RR.HH.',
    'Documentos Seguros': 'Protección y permisos personalizables para información sensible.',
    'Acceso Flexible': 'Gestión web y móvil para equipos remotos.',
    'Procesos Inteligentes': 'Análisis y optimización de flujos de trabajo.',
    'Integración Simple': 'Compatible con software existente de RR.HH.',
    'Formularios Digitales': 'Elimina entrada manual de datos con formularios digitales.',
    'Interfaz Intuitiva': 'Diseño fácil de usar con flujos personalizables.',
    'Implementación Flexible': 'Disponible en cloud o in-situ.',
  };

  const examples = {
    'Reclutamiento': 'Gestión eficiente del proceso de selección.',
    'Onboarding': 'Automatización de documentación para nuevos empleados.',
    'Evaluaciones': 'Gestión segura de evaluaciones de desempeño.',
    'Solicitudes': 'Manejo digital de vacaciones y permisos.',
    'Datos Seguros': 'Protección de información confidencial.',
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <FaUserTie className="text-5xl text-blue-500" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Firmedigital: RR.HH
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                En el competitivo entorno actual, la gestión eficiente del talento humano es crucial para el éxito empresarial. Los departamentos de RR.HH. necesitan herramientas digitales que optimicen sus procesos críticos, desde la contratación hasta la gestión del desarrollo profesional de los empleados.
              </p>
              <p className="text-xl text-gray-300 mb-8">
                Nuestra solución digital permite tomar decisiones informadas basadas en datos seguros y accesibles.
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
                  src="/images/rrhh.png"
                  alt="Recursos Humanos Digital"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <blockquote className="text-2xl lg:text-3xl font-semibold text-center italic text-gray-300">
            "Para RR. HH. y directores generales, los procesos digitales con herramientas basadas en la nube ofrecen una visión integral del ciclo de vida del empleado y las prácticas laborales de las empresas."
          </blockquote>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Características
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(features).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaUserTie className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaUserTie className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(benefits).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCog className="text-4xl text-blue-400" />}
                      {index === 1 && <FaLock className="text-4xl text-blue-400" />}
                      {index === 2 && <FaMobile className="text-4xl text-blue-400" />}
                      {index === 3 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 4 && <FaPlug className="text-4xl text-blue-400" />}
                      {index === 5 && <FaWpforms className="text-4xl text-blue-400" />}
                      {index === 6 && <FaLightbulb className="text-4xl text-blue-400" />}
                      {index === 7 && <FaCloud className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCog className="text-4xl text-blue-400" />}
                      {index === 1 && <FaLock className="text-4xl text-blue-400" />}
                      {index === 2 && <FaMobile className="text-4xl text-blue-400" />}
                      {index === 3 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 4 && <FaPlug className="text-4xl text-blue-400" />}
                      {index === 5 && <FaWpforms className="text-4xl text-blue-400" />}
                      {index === 6 && <FaLightbulb className="text-4xl text-blue-400" />}
                      {index === 7 && <FaCloud className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Ejemplos de Uso
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(examples).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] w-[300px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUserTie className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaClipboard className="text-4xl text-blue-400" />}
                      {index === 4 && <FaLock className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUserTie className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaClipboard className="text-4xl text-blue-400" />}
                      {index === 4 && <FaLock className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
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
