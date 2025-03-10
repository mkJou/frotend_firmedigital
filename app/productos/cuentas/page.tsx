'use client';

import React, { useState } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaUserLock, FaUserCog, FaShieldAlt, FaChartLine, FaUsers, FaUserShield, FaHandshake, FaLock, FaChartBar, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TitleSkeleton, CardSkeleton } from '../../../components/ui/Skeletons';

export default function CuentasMultiples() {
  const isLoading = false;
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqs = [
    {
      pregunta: "¿Cómo funciona el sistema de cuentas múltiples?",
      respuesta: "El sistema permite crear y gestionar múltiples cuentas de usuario con diferentes niveles de acceso y permisos, facilitando la administración de documentos y firmas digitales en tu organización."
    },
    {
      pregunta: "¿Cuántas cuentas puedo crear?",
      respuesta: "El número de cuentas depende del plan contratado, ofreciendo flexibilidad para adaptarse a las necesidades de tu organización, desde pequeños equipos hasta grandes empresas."
    },
    {
      pregunta: "¿Cómo se gestionan los permisos?",
      respuesta: "Los permisos se administran de forma centralizada, permitiendo asignar roles específicos a cada usuario y definir sus niveles de acceso a documentos y funcionalidades."
    },
    {
      pregunta: "¿Es seguro compartir accesos entre usuarios?",
      respuesta: "Sí, el sistema cuenta con múltiples capas de seguridad y encriptación, garantizando que cada usuario solo pueda acceder a la información autorizada según su rol."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="min-h-screen bg-[#000000] text-white"
    >
      <main>
        <MegaMenu />

        {/* Cuentas Multiples Section */}
        <section className="px-4 md:px-8 py-16 pt-[10rem] bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <div className="flex items-center gap-4 mb-6">
                <HiOutlineUserGroup className="text-5xl text-blue-500" />
                <motion
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h1>Cuentas Multiples</h1>
                </motion>
              </div>
              <motion
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto"
              >
                <p>Esta herramienta te permite administrar permisos y roles con facilidad, asegurando que cada miembro del equipo tenga el acceso adecuado a documentos y procesos críticos.</p>
              </motion>
            </div>
          </div>
        </section>

        {/* Características Section */}
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="space-y-12">
                <TitleSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-12">
                  <motion
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <h2>Características Principales</h2>
                  </motion>
                  <motion
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <FaUserLock className="text-4xl text-blue-500" />,
                      title: "Acceso Simplificado",
                      description: "Control centralizado de acceso a documentos y transacciones."
                    },
                    {
                      icon: <FaUserCog className="text-4xl text-purple-500" />,
                      title: "Personalización de Permisos",
                      description: "Gestión precisa de permisos para visualización y firma de documentos."
                    },
                    {
                      icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                      title: "Seguridad en Cada Paso",
                      description: "Protección multinivel para garantizar acceso solo a usuarios autorizados."
                    },
                    {
                      icon: <FaChartLine className="text-4xl text-purple-500" />,
                      title: "Monitoreo y Control",
                      description: "Seguimiento en tiempo real de accesos y transacciones digitales."
                    }
                  ].map((feature, index) => (
                    <motion
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", damping: 12 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                      <div>
                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                          <motion.div 
                            className="mb-4"
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                          >
                            {feature.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                            {feature.title}
                          </h3>
                        </div>

                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                          <div className="flex flex-col items-center justify-center h-full">
                            <motion.div 
                              className="mb-4"
                              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                            >
                              {feature.icon}
                            </motion.div>
                            <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Beneficios Section */}
        <section className="px-4 md:px-8 py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="space-y-12">
                <TitleSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center mb-12">
                  <motion
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-white to-purple-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    <h2>Beneficios de las Cuentas Múltiples</h2>
                  </motion>
                  <motion
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100px", opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: <FaUsers className="text-4xl text-blue-500" />,
                      title: "Gestión Centralizada",
                      description: "Control unificado de usuarios y accesos desde una plataforma."
                    },
                    {
                      icon: <FaUserShield className="text-4xl text-purple-500" />,
                      title: "Asignación de Roles",
                      description: "Definición precisa de roles y permisos por usuario."
                    },
                    {
                      icon: <FaHandshake className="text-4xl text-blue-500" />,
                      title: "Colaboración Eficiente",
                      description: "Trabajo simultáneo en documentos con acceso controlado."
                    },
                    {
                      icon: <FaChartBar className="text-4xl text-purple-500" />,
                      title: "Monitoreo de Actividades",
                      description: "Registro detallado de acciones para auditoría y control."
                    }
                  ].map((feature, index) => (
                    <motion
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", damping: 12 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                      <div>
                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                          <motion.div 
                            className="mb-4"
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                          >
                            {feature.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                            {feature.title}
                          </h3>
                        </div>

                        <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                          <div className="flex flex-col items-center justify-center h-full">
                            <motion.div 
                              className="mb-4"
                              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                              transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                            >
                              {feature.icon}
                            </motion.div>
                            <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion>
                  ))}
                </div>
              </>
            )}
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
                  quote: "La gestión de cuentas múltiples ha simplificado enormemente nuestro control de accesos y permisos.",
                  role: "Director de Tecnología"
                },
                {
                  client: "IUTCM",
                  quote: "La capacidad de administrar roles y permisos de manera centralizada ha mejorado nuestra eficiencia operativa.",
                  role: "Gerente de Operaciones"
                },
                {
                  client: "CIDEZ",
                  quote: "El sistema de cuentas múltiples nos ha permitido mantener un control preciso sobre quién accede a cada documento.",
                  role: "Coordinador de Seguridad"
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
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-2">
              <div className="flex items-center">
                <FaQuestionCircle className="text-4xl text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
              </div>
              <motion.a 
                href="#"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg transition-all duration-300 text-center whitespace-nowrap"
              >
                Preguntas Personalizadas
              </motion.a>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, x: -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
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
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
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
    </motion>
  );
}

