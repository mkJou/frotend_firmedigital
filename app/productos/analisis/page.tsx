'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineChartBar, HiOutlineAdjustments, HiOutlineDocumentReport, HiOutlineClock } from 'react-icons/hi';
import { IoAnalyticsOutline, IoSpeedometerOutline, IoExtensionPuzzleOutline, IoEyeOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { FaChartLine, FaDatabase, FaCogs, FaChartBar } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../styles/FlipCard.module.css';

export default function Analisis() {
  const timelineSteps = [
    {
      icon: <FaDatabase className="text-3xl text-blue-500" />,
      title: "Recopilación de Datos",
      description: "Gestión de grandes volúmenes de datos financieros"
    },
    {
      icon: <FaCogs className="text-3xl text-purple-500" />,
      title: "Procesamiento",
      description: "Algoritmos avanzados y aprendizaje automático"
    },
    {
      icon: <FaChartLine className="text-3xl text-blue-500" />,
      title: "Análisis en Tiempo Real",
      description: "Procesamiento y análisis instantáneo"
    },
    {
      icon: <FaChartBar className="text-3xl text-purple-500" />,
      title: "Insights Personalizados",
      description: "Informes detallados y recomendaciones"
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">
                <HiOutlineChartBar className="text-4xl md:text-5xl text-blue-500" />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                  Análisis Personalizable
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 md:mb-8">
                Análisis inteligente adaptado a tu negocio
              </p>
              <div className="text-sm md:text-base text-gray-300 max-w-3xl mb-6 md:mb-8">
                <p className="mb-4">
                  Personaliza tus análisis según las necesidades específicas de tu empresa. Configura parámetros, crea informes detallados y visualiza datos de forma clara y efectiva.
                </p>
                <p>
                  Obtén insights valiosos con dashboards personalizables que te permiten monitorear el rendimiento y tomar decisiones informadas en tiempo real.
                </p>
              </div>
              <div className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-blue-500/20 mb-6 md:mb-8">
                <p className="text-xl md:text-2xl text-blue-400 font-semibold italic text-center">
                  "Descubre el poder del análisis personalizable: Datos que hablan, decisiones que brillan."
                </p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[300px] md:h-[400px] mt-4 md:mt-0 pb-16 md:pb-24"
              style={{ opacity: 1, transform: 'none' }}
            >
              <Image
                src="/images/ap.svg"
                alt="Análisis Personalizable"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Ventajas del Análisis Personalizable</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-blue-500/10 p-4 rounded-full mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
                <HiOutlineAdjustments className="text-4xl text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Flexibilidad Total</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-purple-500/10 p-4 rounded-full mb-4 group-hover:bg-purple-500/20 transition-all duration-300">
                <HiOutlineDocumentReport className="text-4xl text-purple-400" />
              </div>
              <h3 className="text-xl font-bold">Informes Detallados</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-green-500/10 p-4 rounded-full mb-4 group-hover:bg-green-500/20 transition-all duration-300">
                <HiOutlineClock className="text-4xl text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Monitoreo en Tiempo Real</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-red-500/10 p-4 rounded-full mb-4 group-hover:bg-red-500/20 transition-all duration-300">
                <IoAnalyticsOutline className="text-4xl text-red-400" />
              </div>
              <h3 className="text-xl font-bold">Evaluación de Riesgos</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-yellow-500/10 p-4 rounded-full mb-4 group-hover:bg-yellow-500/20 transition-all duration-300">
                <IoSpeedometerOutline className="text-4xl text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold">Mejora de la Productividad</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-indigo-500/10 p-4 rounded-full mb-4 group-hover:bg-indigo-500/20 transition-all duration-300">
                <IoExtensionPuzzleOutline className="text-4xl text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold">Integración Sencilla</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-cyan-500/10 p-4 rounded-full mb-4 group-hover:bg-cyan-500/20 transition-all duration-300">
                <IoEyeOutline className="text-4xl text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold">Visión Global</h3>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl hover:bg-gray-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="bg-pink-500/10 p-4 rounded-full mb-4 group-hover:bg-pink-500/20 transition-all duration-300">
                <HiOutlineChartBar className="text-4xl text-pink-400" />
              </div>
              <h3 className="text-xl font-bold">Adaptabilidad</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Análisis Personalizable
            </h1>
            <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto px-4">
              Transforme sus datos financieros en insights accionables con nuestra plataforma de análisis avanzado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className="group relative h-[160px] md:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{step.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {step.icon}
                    </div>
                    <p className="text-gray-300 text-center">{step.description}</p>
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
