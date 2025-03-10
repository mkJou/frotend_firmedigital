'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaCogs, FaFileAlt, FaChartLine, FaShieldAlt, FaHeadset, FaExpandArrowsAlt, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
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
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      pregunta: "¿Qué es la Inteligencia Artificial de Firmedigital?",
      respuesta: "La Inteligencia Artificial de Firmedigital es una tecnología avanzada que automatiza y optimiza los procesos de gestión documental, clasificación, análisis y workflow en tu empresa, permitiendo mayor eficiencia y precisión en todas las operaciones relacionadas con documentos digitales."
    },
    {
      pregunta: "¿Cómo puede la IA mejorar mis procesos documentales?",
      respuesta: "Nuestra IA mejora tus procesos documentales mediante la automatización de tareas repetitivas, clasificación inteligente de documentos, extracción de datos clave, detección de anomalías, y optimización continua del workflow, reduciendo errores humanos y acelerando significativamente los tiempos de procesamiento."
    },
    {
      pregunta: "¿Es seguro utilizar IA para gestionar documentos confidenciales?",
      respuesta: "Sí, nuestra solución de IA implementa múltiples capas de seguridad, incluyendo encriptación avanzada, control de acceso granular, y cumplimiento con regulaciones de protección de datos. Además, todos los procesos son auditables y trazables para garantizar la integridad de la información."
    },
    {
      pregunta: "¿Qué nivel de personalización ofrece la IA de Firmedigital?",
      respuesta: "Nuestra IA es altamente personalizable y se adapta a las necesidades específicas de tu organización. Puede ser configurada para reconocer y procesar documentos específicos de tu industria, aplicar reglas de negocio particulares, e integrarse con tus sistemas existentes."
    },
    {
      pregunta: "¿Qué soporte técnico ofrecen para la implementación de IA?",
      respuesta: "Ofrecemos soporte técnico completo durante todo el proceso de implementación, incluyendo análisis inicial, configuración, entrenamiento del sistema, integración con tus plataformas existentes, capacitación de usuarios, y soporte continuo 24/7 para resolver cualquier incidencia."
    }
  ];

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
                <motion
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h1>Inteligencia Artificial</h1>
                </motion>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                IA es una inteligencia artificial avanzada creada para integrarse perfectamente en todos los procesos de gestión documental y workflow de tu empresa.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.slice(0, 3).map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8">
            {features.slice(3).map((feature, index) => (
              <Card key={index + 3} {...feature} />
            ))}
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

      {/* Testimonios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Testimonios de Clientes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                client: "Dohmi",
                quote: "La implementación de IA en nuestros procesos ha revolucionado nuestra gestión documental, permitiéndonos automatizar tareas repetitivas y enfocarnos en lo que realmente importa.",
                role: "Empresa de Desarrollo"
              },
              {
                client: "IUTCM",
                quote: "Gracias a la IA de Firmedigital hemos optimizado la gestión de expedientes académicos, reduciendo errores y mejorando significativamente los tiempos de respuesta a nuestros estudiantes.",
                role: "Instituto Universitario"
              },
              {
                client: "CIDEZ",
                quote: "La capacidad de análisis y clasificación automática de documentos científicos nos ha permitido acelerar nuestros procesos de investigación y colaboración internacional.",
                role: "Centro de Investigación"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotateY: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2, type: "spring", damping: 15 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.3)", transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm transition-all duration-300"
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
                    {[1, 2, 3, 4, 5].map((star, i) => (
                      <motion.svg 
                        key={star} 
                        className="w-5 h-5 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + (i * 0.1), type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.2 } }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-2">
              <div className="flex items-center">
                <FaQuestionCircle className="text-4xl text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Preguntas Frecuentes</h2>
              </div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 shadow-lg"
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
