'use client';

import React, { useState } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineChartBar, HiOutlineAdjustments, HiOutlineDocumentReport, HiOutlineClock } from 'react-icons/hi';
import { IoAnalyticsOutline, IoSpeedometerOutline, IoExtensionPuzzleOutline, IoEyeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowRight } from 'react-icons/bs';
import { FaChartLine, FaDatabase, FaCogs, FaChartBar, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../../styles/FlipCard.module.css';

export default function Analisis() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const testimonials = [
    {
      client: "Dohmi",
      role: "Instituto Culinario",
      quote: "La implementación del análisis personalizable ha transformado nuestra gestión de datos, permitiéndonos tomar decisiones más informadas y mejorar nuestros procesos educativos."
    },
    {
      client: "IUTCM",
      role: "Instituto Universitario",
      quote: "Gracias a las herramientas de análisis de Firmedigital, hemos optimizado nuestros recursos y mejorado significativamente la experiencia educativa de nuestros estudiantes."
    },
    {
      client: "CIDEZ",
      role: "Colegio de Ingenieros",
      quote: "El análisis personalizable nos ha permitido identificar tendencias y patrones que antes pasaban desapercibidos, mejorando nuestra toma de decisiones estratégicas."
    }
  ];

  const faqs = [
    {
      pregunta: "¿Qué es el Análisis Personalizable de Firmedigital?",
      respuesta: "Es una solución avanzada que permite configurar y adaptar análisis de datos según las necesidades específicas de tu empresa, ofreciendo insights valiosos y visualizaciones claras para mejorar la toma de decisiones."
    },
    {
      pregunta: "¿Qué tipos de datos puedo analizar con esta herramienta?",
      respuesta: "Nuestra plataforma es versátil y permite analizar diversos tipos de datos: financieros, operativos, de rendimiento, de ventas, de recursos humanos, y cualquier otro dato estructurado que tu empresa necesite evaluar para mejorar su desempeño."
    },
    {
      pregunta: "¿Qué nivel de conocimiento técnico se requiere para usar el Análisis Personalizable?",
      respuesta: "Nuestra solución está diseñada para ser intuitiva y accesible para usuarios con diferentes niveles de experiencia técnica. Ofrecemos interfaces amigables con opciones de arrastrar y soltar, así como plantillas predefinidas que facilitan la creación de análisis sin necesidad de conocimientos avanzados."
    },
    {
      pregunta: "¿Cómo se integra esta solución con otros sistemas de mi empresa?",
      respuesta: "El Análisis Personalizable de Firmedigital cuenta con conectores estándar para las principales plataformas empresariales, bases de datos y servicios en la nube. Nuestro equipo técnico te asistirá en la configuración de integraciones personalizadas para garantizar un flujo de datos eficiente con tus sistemas existentes."
    },
    {
      pregunta: "¿Qué medidas de seguridad implementa Firmedigital para proteger mis datos?",
      respuesta: "Implementamos múltiples capas de seguridad, incluyendo cifrado de datos en reposo y en tránsito, autenticación multifactor, controles de acceso basados en roles, auditorías regulares de seguridad y cumplimiento con estándares internacionales como ISO 27001 y GDPR para garantizar la protección total de tu información."
    }
  ];

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
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="flex items-center gap-4 mb-6">
              <FaChartLine className="text-4xl md:text-5xl text-blue-500" />
              <motion
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                <h1>Análisis Personalizable</h1>
              </motion>
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
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">Beneficios del Análisis Personalizable</h2>
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
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
  );
}
