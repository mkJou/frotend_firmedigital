'use client';

import React, { useEffect, useState } from 'react';
import MegaMenu from '@/components/MegaMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { FaIdCard, FaQrcode, FaUserEdit, FaSync, FaShieldAlt, FaMobileAlt, FaTablet, FaLeaf, FaPaw, FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { TitleSkeleton, CardSkeleton } from '@/components/ui/Skeletons';
import Image from 'next/image';
import Link from 'next/link';

export default function CarnetDigital() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#000000] text-white flex-1">
      <MegaMenu />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 sm:px-8 py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6 px-6 sm:px-8"
          >
            <br />
            <br />
            <br />

            <div className="flex justify-center mb-6">
              <FaIdCard className="text-6xl text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            </div>

            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              Carnet Personalizable
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Un carnet digital personalizado es una identificación digital que contiene información específica de una persona, como su nombre, fotografía, cargo, empresa u organización a la que pertenece, y otros datos relevantes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            </div>
          </motion.div>
        </div>
      </section>

      {/* Características Section */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8 md:space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {[...Array(9)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Características de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[
                  {
                    icon: <FaIdCard className="text-4xl text-blue-500" />,
                    title: "Identificación Digital",
                    description: "Verificación rápida y segura para control de acceso"
                  },
                  {
                    icon: <FaQrcode className="text-4xl text-purple-500" />,
                    title: "Códigos QR y NFC",
                    description: "Integración con sistemas digitales modernos"
                  },
                  {
                    icon: <FaUserEdit className="text-4xl text-blue-500" />,
                    title: "Personalización",
                    description: "Adapta la información según tus necesidades"
                  },
                  {
                    icon: <FaSync className="text-4xl text-purple-500" />,
                    title: "Actualización Inmediata",
                    description: "Cambios reflejados en tiempo real"
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                    title: "Seguridad Avanzada",
                    description: "Protección con encriptación de datos"
                  },
                  {
                    icon: <FaMobileAlt className="text-4xl text-purple-500" />,
                    title: "Acceso Móvil",
                    description: "Disponible en todos tus dispositivos"
                  },
                  {
                    icon: <FaTablet className="text-4xl text-blue-500" />,
                    title: "Multiplataforma",
                    description: "Gestión desde cualquier dispositivo"
                  },
                  {
                    icon: <FaLeaf className="text-4xl text-purple-500" />,
                    title: "Eco-Friendly",
                    description: "Sin uso de papel ni plástico"
                  },
                  {
                    icon: <FaPaw className="text-4xl text-blue-500" />,
                    title: "ID Mascotas",
                    description: "Identifica a tus mascotas digitalmente"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[160px] md:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                    <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                      <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold text-gray-200 mt-4">{feature.title}</h3>
                      </div>
                      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                        {feature.icon}
                        <p className="text-gray-300 text-center mt-4">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8 md:space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {[...Array(5)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Beneficios de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                {[
                  {
                    icon: <FaSync className="text-4xl text-blue-500" />,
                    title: "Eficiencia",
                    description: "Agiliza procesos de identificación"
                  },
                  {
                    icon: <FaUserEdit className="text-4xl text-purple-500" />,
                    title: "Flexibilidad",
                    description: "Personalización según necesidades"
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                    title: "Seguridad",
                    description: "Máxima protección de datos"
                  },
                  {
                    icon: <FaMobileAlt className="text-4xl text-purple-500" />,
                    title: "Accesibilidad",
                    description: "Disponible en todo momento"
                  },
                  {
                    icon: <FaLeaf className="text-4xl text-blue-500" />,
                    title: "Sostenibilidad",
                    description: "Compromiso ambiental digital"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[160px] md:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                    <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                      <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center">
                        {benefit.icon}
                        <h3 className="text-xl font-semibold text-gray-200 mt-4">{benefit.title}</h3>
                      </div>
                      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                        {benefit.icon}
                        <p className="text-gray-300 text-center mt-4">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
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
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                client: "Dohmi",
                quote: "Los carnets digitales de Firmedigital han revolucionado nuestra forma de gestionar las identificaciones corporativas, ofreciendo seguridad y personalización en un formato moderno.",
                role: "Director de Operaciones"
              },
              {
                client: "IUTCM",
                quote: "Implementar los carnets digitales en nuestra institución educativa ha simplificado enormemente los procesos de identificación y control de acceso para estudiantes y personal.",
                role: "Coordinador Académico"
              },
              {
                client: "CIDEZ",
                quote: "La flexibilidad y seguridad de los carnets digitales nos ha permitido crear un sistema de identificación robusto que se adapta perfectamente a nuestras necesidades organizacionales.",
                role: "Gerente de Proyectos"
              }
            ].map((testimonial, index) => (
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
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
              
            </div>
            <div className="space-y-4">
              {[
                {
                  pregunta: "¿Qué es un carnet digital?",
                  respuesta: "Un carnet digital es una identificación electrónica que contiene información personal y puede incluir fotografía, datos de contacto y credenciales de acceso, todo en formato digital accesible desde dispositivos móviles."
                },
                {
                  pregunta: "¿Qué ventajas tiene un carnet digital sobre uno físico?",
                  respuesta: "Los carnets digitales son más seguros, no se deterioran, son fáciles de actualizar, no pueden ser falsificados, permiten verificación en tiempo real y son ecológicos al reducir el uso de plástico."
                },
                {
                  pregunta: "¿Cómo se verifica la autenticidad de un carnet digital?",
                  respuesta: "La autenticidad se verifica mediante códigos QR, tecnología NFC, o sistemas de validación en línea que confirman la identidad del portador en tiempo real."
                },
                {
                  pregunta: "¿Qué seguridad ofrece un carnet digital?",
                  respuesta: "Los carnets digitales utilizan encriptación avanzada, firmas digitales y sistemas de autenticación biométrica para garantizar la máxima seguridad y prevenir falsificaciones."
                },
                {
                  pregunta: "¿En qué dispositivos puedo usar mi carnet digital?",
                  respuesta: "Los carnets digitales son compatibles con smartphones, tablets y cualquier dispositivo con capacidad para mostrar códigos QR o con tecnología NFC, permitiendo acceso en cualquier momento y lugar."
                },
                {
                  pregunta: "¿Tienen validez legal los carnets digitales?",
                  respuesta: "Sí, los carnets digitales emitidos por entidades autorizadas tienen plena validez legal, respaldados por la legislación sobre documentos electrónicos y firmas digitales."
                }
              ].map((faq, index) => (
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
