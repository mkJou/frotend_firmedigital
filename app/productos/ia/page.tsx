'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCogs, FaFileAlt, FaChartLine, FaShieldAlt, FaHeadset, FaExpandArrowsAlt } from 'react-icons/fa';
import MegaMenu from '../../../components/MegaMenu';
import Image from "next/image";

const features = [
  {
    title: "Automatización de Tareas",
    icon: <FaCogs className="text-4xl text-blue-500" />,
    description: "Automatización inteligente de clasificación y etiquetado de documentos."
  },
  {
    title: "Gestión Documental",
    icon: <FaFileAlt className="text-4xl text-purple-500" />,
    description: "Organización y recuperación instantánea de documentos con IA."
  },
  {
    title: "Optimización del Workflow",
    icon: <FaChartLine className="text-4xl text-blue-500" />,
    description: "Análisis y mejora continua de procesos documentales."
  },
  {
    title: "Seguridad Inteligente",
    icon: <FaShieldAlt className="text-4xl text-purple-500" />,
    description: "Protección automatizada y cumplimiento normativo continuo."
  },
  {
    title: "Asistente Virtual",
    icon: <FaHeadset className="text-4xl text-blue-500" />,
    description: "Soporte instantáneo y asistencia personalizada 24/7."
  }
];

const benefits = [
  {
    title: "Ahorro de Tiempo",
    icon: <FaCogs className="text-4xl text-blue-500" />,
    description: "Automatización que reduce horas de trabajo manual."
  },
  {
    title: "Mayor Precisión",
    icon: <FaShieldAlt className="text-4xl text-purple-500" />,
    description: "Eliminación de errores en procesos documentales."
  },
  {
    title: "Alta Productividad",
    icon: <FaChartLine className="text-4xl text-blue-500" />,
    description: "Optimización continua del rendimiento laboral."
  },
  {
    title: "Cumplimiento Total",
    icon: <FaFileAlt className="text-4xl text-purple-500" />,
    description: "Garantía de conformidad con regulaciones vigentes."
  },
  {
    title: "Soporte 24/7",
    icon: <FaHeadset className="text-4xl text-blue-500" />,
    description: "Asistencia experta disponible en todo momento."
  },
  {
    title: "Escalabilidad Total",
    icon: <FaExpandArrowsAlt className="text-4xl text-purple-500" />,
    description: "Adaptación perfecta al crecimiento empresarial."
  }
];

const Card = ({ title, icon, description }) => {
  return (
    <motion.div
      className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
      </div>

      <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            {icon}
          </div>
          <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function IAPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <FaRobot className="text-5xl text-blue-500" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Inteligencia Artificial
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                IA es una inteligencia artificial avanzada creada para integrarse perfectamente en todos los procesos de gestión documental y workflow de tu empresa. Con capacidades de aprendizaje automático y procesamiento del lenguaje natural, IA no solo automatiza tareas repetitivas, sino que también ofrece soluciones inteligentes y personalizadas.
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
                  src="/images/ia.png"
                  alt="Inteligencia Artificial"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características
          </h2>
          <div className="relative">
            {/* Scroll Indicators */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-full bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-full bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
              {features.map((feature, index) => (
                <div key={index} className="flex-none w-[300px] snap-center first:ml-[10%] last:mr-[10%]">
                  <Card {...feature} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
