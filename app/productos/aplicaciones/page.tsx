'use client';

import React, { useState } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlinePuzzle, HiOutlineDesktopComputer } from 'react-icons/hi';
import { IoRocketOutline, IoShieldCheckmarkOutline, IoHeadsetOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

export default function AplicacionesAcceso() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      pregunta: "¿Qué son las Aplicaciones de Acceso de Firmedigital?",
      respuesta: "Las Aplicaciones de Acceso de Firmedigital son soluciones de seguridad digital que permiten gestionar y controlar el acceso a sistemas, aplicaciones y datos sensibles de tu organización, implementando autenticación multifactor y encriptación avanzada para garantizar que solo usuarios autorizados puedan acceder a la información."
    },
    {
      pregunta: "¿Cómo se implementan las Aplicaciones de Acceso en mi empresa?",
      respuesta: "La implementación es sencilla y adaptable a tus necesidades. Nuestro equipo realiza un análisis inicial de tu infraestructura, configura la solución según tus requerimientos específicos, integra el sistema con tus plataformas existentes y proporciona capacitación a tus usuarios. Todo el proceso está diseñado para minimizar interrupciones en tus operaciones diarias."
    },
    {
      pregunta: "¿Con qué sistemas son compatibles estas aplicaciones?",
      respuesta: "Nuestras Aplicaciones de Acceso son compatibles con una amplia gama de sistemas operativos, plataformas cloud, aplicaciones empresariales y dispositivos. Funcionan perfectamente con Windows, macOS, Linux, iOS y Android, así como con servicios cloud como AWS, Azure y Google Cloud, y se integran con aplicaciones empresariales como Microsoft 365, Salesforce, SAP y muchas más."
    },
    {
      pregunta: "¿Qué nivel de seguridad ofrecen las Aplicaciones de Acceso?",
      respuesta: "Ofrecemos el más alto nivel de seguridad disponible en el mercado, con autenticación multifactor (MFA), encriptación de extremo a extremo, políticas de acceso basadas en roles, detección de amenazas en tiempo real, y cumplimiento con estándares internacionales como ISO 27001, GDPR, y otras regulaciones específicas de cada industria."
    },
    {
      pregunta: "¿Qué soporte técnico incluye la solución?",
      respuesta: "Proporcionamos soporte técnico completo 24/7 a través de múltiples canales (teléfono, email, chat), actualizaciones regulares de seguridad, monitoreo proactivo de sistemas, resolución rápida de incidencias, y un portal de conocimiento con recursos de autoservicio. Además, ofrecemos planes de soporte personalizados según las necesidades específicas de tu organización."
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div className="pt-16 md:pt-24">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">
                <HiOutlineLockClosed className="text-4xl md:text-5xl text-blue-500" />
                <motion
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h1>Aplicaciones de Acceso</h1>
                </motion>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 md:mb-8">
                Gestiona de forma segura y eficiente el acceso a tus sistemas con Firmedigital. Nuestra solución simplifica la autenticación mientras mantiene los más altos estándares de seguridad.
              </p>
              <div className="text-sm md:text-base text-gray-300 max-w-3xl mb-6 md:mb-8">
                <p className="leading-relaxed">
                  Protege tus recursos digitales con nuestra plataforma de control de accesos. Implementamos autenticación multifactor y encriptación avanzada para garantizar que solo usuarios autorizados accedan a tu información sensible.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0 pt-16 md:pt-24">
              <svg
                viewBox="0 0 800 600"
                className="w-full max-w-[400px] sm:max-w-2xl h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 0.3 }} />
                  </linearGradient>
                  <linearGradient id="deviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#111827', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Dispositivo principal */}
                <g transform="translate(200, 100)">
                  {/* Marco del dispositivo */}
                  <rect
                    x="0"
                    y="0"
                    width="400"
                    height="300"
                    rx="20"
                    fill="url(#deviceGrad)"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Pantalla */}
                  <rect
                    x="20"
                    y="20"
                    width="360"
                    height="260"
                    rx="10"
                    fill="url(#screenGlow)"
                  />

                  {/* Elementos de interfaz */}
                  <g transform="translate(60, 60)">
                    {/* Círculo central de autenticación */}
                    <circle
                      cx="140"
                      cy="80"
                      r="50"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      filter="url(#glow)"
                    />
                    <circle
                      cx="140"
                      cy="80"
                      r="35"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      opacity="0.2"
                    />

                    {/* Candado mejorado */}
                    <g transform="translate(100, 45)">
                      {/* Círculo de fondo para el candado */}
                      <circle
                        cx="80"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="1"
                        opacity="0.2"
                      />
                      
                      {/* Arco superior del candado */}
                      <path
                        d="M65 35 V20 C65 5 80 -5 95 -5 C110 -5 125 5 125 20 V35"
                        fill="none"
                        stroke="url(#lockGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />
                      
                      {/* Cuerpo del candado */}
                      <path
                        d="M55 35 H135 V75 C95 85 55 75 55 35"
                        fill="none"
                        stroke="url(#lockGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                      />
                      
                      {/* Detalles del candado */}
                      <circle
                        cx="95"
                        cy="50"
                        r="8"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="4"
                      />
                      <path
                        d="M95 54 L95 65"
                        stroke="#60A5FA"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      
                      {/* Detalles de brillo */}
                      <path
                        d="M65 35 C75 35 115 35 125 35"
                        stroke="#93C5FD"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </g>

                    {/* Líneas de datos */}
                    <g>
                      {[0, 1, 2].map((i) => (
                        <path
                          key={i}
                          d={`M40 ${150 + i * 20} L240 ${150 + i * 20}`}
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray="8 4"
                          opacity="0.6"
                        />
                      ))}
                    </g>

                    {/* Puntos de conexión */}
                    {[0, 60, 120, 180].map((x) => (
                      <circle
                        key={x}
                        cx={x + 40}
                        cy="80"
                        r="4"
                        fill="#3B82F6"
                      />
                    ))}
                  </g>
                </g>

                {/* Elementos flotantes de seguridad */}
                <g transform="translate(150, 450)">
                  {[0, 1, 2].map((i) => (
                    <g key={i} transform={`translate(${i * 200}, 0)`}>
                      <rect
                        x="0"
                        y="0"
                        width="150"
                        height="40"
                        rx="20"
                        fill="#1F2937"
                        stroke="#3B82F6"
                        strokeWidth="1"
                      />
                      <circle
                        cx="30"
                        cy="20"
                        r="10"
                        fill="#3B82F6"
                        opacity="0.5"
                      />
                      <line
                        x1="50"
                        y1="20"
                        x2="130"
                        y2="20"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>
          
          {/* Quote section moved outside the grid */}
          <div className="w-full mt-12 md:mt-16">
            <div className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-blue-500/20">
              <p className="text-2xl md:text-3xl text-blue-400 font-semibold italic text-center">
                "Seguridad sin complicaciones: Tu acceso digital confiable"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-blue-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <HiOutlineShieldCheck className="text-3xl text-blue-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Seguridad Avanzada</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Implementa múltiples capas de seguridad con autenticación multifactor y encriptación de última generación.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <HiOutlinePuzzle className="text-3xl text-purple-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Integración Flexible</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Se adapta perfectamente a tus sistemas existentes sin interrumpir los flujos de trabajo actuales.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-green-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <HiOutlineDesktopComputer className="text-3xl text-green-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Interfaz Intuitiva</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Panel de control fácil de usar que simplifica la gestión de accesos y permisos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Beneficios Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-6 rounded-xl border border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-500/10 p-4 rounded-full mb-6">
                  <IoRocketOutline className="text-5xl text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Implementación Rápida</h3>
                <p className="text-gray-300">
                  Integración sencilla y rápida con tus sistemas actuales, permitiéndote estar operativo en cuestión de días, no meses.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-6 rounded-xl border border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-500/10 p-4 rounded-full mb-6">
                  <IoShieldCheckmarkOutline className="text-5xl text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Cumplimiento Normativo</h3>
                <p className="text-gray-300">
                  Garantiza el cumplimiento de regulaciones de seguridad y privacidad de datos, evitando sanciones y protegiendo la reputación de tu empresa.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-green-900/30 to-green-800/10 p-6 rounded-xl border border-green-500/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-500/10 p-4 rounded-full mb-6">
                  <IoHeadsetOutline className="text-5xl text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Soporte Especializado</h3>
                <p className="text-gray-300">
                  Accede a un equipo de expertos dedicados a resolver tus dudas y optimizar tu experiencia con nuestras aplicaciones de acceso.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caso de Uso */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Caso de Uso: Sector de Ingeniería</h2>
          <div className="bg-gray-900 p-8 rounded-xl">
            <div className="space-y-6 text-gray-300">
              <p className="leading-relaxed">
                Las aplicaciones de acceso de Firmedigital son ideales para el sector de ingenieros, ya que permiten gestionar de manera segura y eficiente el acceso a proyectos y datos sensibles. En una firma de ingeniería, estas aplicaciones pueden asegurar que solo el personal autorizado pueda acceder a planos, especificaciones técnicas y documentos confidenciales, mejorando la colaboración mientras se protege la propiedad intelectual.
              </p>
              <p className="leading-relaxed">
                La autenticación multifactor y la encriptación avanzada garantizan que los datos críticos estén siempre seguros, permitiendo a los ingenieros centrarse en innovar y ejecutar proyectos con total confianza.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative">
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
                quote: "Las aplicaciones de acceso de Firmedigital han mejorado significativamente la seguridad de nuestra información sensible, permitiéndonos controlar de manera precisa quién accede a cada recurso.",
                role: "Director de Tecnología"
              },
              {
                client: "IUTCM",
                quote: "La implementación de las aplicaciones de acceso ha simplificado enormemente la gestión de permisos en nuestra institución, mejorando la eficiencia administrativa y la seguridad de datos.",
                role: "Coordinador de Sistemas"
              },
              {
                client: "CIDEZ",
                quote: "Gracias a las aplicaciones de acceso de Firmedigital, hemos logrado un control total sobre nuestros recursos digitales, con una interfaz intuitiva que facilita la administración de usuarios.",
                role: "Gerente de Seguridad"
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
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
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
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700/50"
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
