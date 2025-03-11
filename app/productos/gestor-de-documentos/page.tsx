'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineCloud, HiOutlineDatabase, HiOutlinePencil, HiOutlineEye } from 'react-icons/hi';
import { FaRocket, FaPiggyBank, FaShieldAlt, FaUsers, FaFolderOpen, FaSearch, FaUserFriends, FaArchive, FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function GestorDocumentos() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const features = [
    {
      title: "Resultados más rápidos",
      description: "Obtén la información que necesitas de manera ágil y eficiente.",
      icon: HiOutlineLightningBolt
    },
    {
      title: "Todo en un solo sistema",
      description: "Centraliza la gestión de documentos y la colaboración en una única plataforma.",
      icon: HiOutlineDocumentText
    },
    {
      title: "Personalización potente",
      description: "Adapta el software a las necesidades específicas de tu empresa.",
      icon: HiOutlineCloud
    },
    {
      title: "Seguridad de datos",
      description: "Asegura la protección de tu información con niveles avanzados de seguridad.",
      icon: HiOutlineShieldCheck
    }
  ];

  const formatosArchivo = [
    { categoria: "Documentos de Texto", formatos: ["txt", "doc", "docx", "pdf", "odt", "rtf", "html"] },
    { categoria: "Hojas de Cálculo", formatos: ["xls", "xlsx", "ods", "csv"] },
    { categoria: "Presentaciones", formatos: ["ppt", "pptx", "odp"] },
    { categoria: "Imágenes", formatos: ["jpg", "jpeg", "png", "gif", "bmp"] }
  ];

  const faqs = [
    {
      pregunta: "¿Qué es un gestor de documentos?",
      respuesta: "Un gestor de documentos es una herramienta que permite organizar, almacenar y gestionar documentos digitales de manera eficiente, facilitando su búsqueda, acceso y colaboración."
    },
    {
      pregunta: "¿Qué ventajas tiene usar un gestor de documentos?",
      respuesta: "Las ventajas incluyen mayor eficiencia en la gestión documental, reducción de costos de almacenamiento físico, mejor seguridad de la información, facilidad para compartir y colaborar, y cumplimiento normativo."
    },
    {
      pregunta: "¿Qué tipos de documentos puedo gestionar?",
      respuesta: "Puedes gestionar prácticamente cualquier tipo de documento digital, incluyendo documentos de texto, hojas de cálculo, presentaciones, imágenes, PDFs, archivos CAD, correos electrónicos y más."
    },
    {
      pregunta: "¿Es seguro almacenar documentos sensibles?",
      respuesta: "Sí, nuestro gestor de documentos cuenta con múltiples capas de seguridad, incluyendo cifrado de datos, control de acceso basado en roles, autenticación de dos factores y registros de auditoría."
    },
    {
      pregunta: "¿Puedo acceder a mis documentos desde cualquier lugar?",
      respuesta: "Sí, al ser una solución basada en la nube, puedes acceder a tus documentos desde cualquier dispositivo con conexión a internet, ya sea un ordenador, tablet o smartphone."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mb-8">
            
          </div>
          <div className="flex flex-col items-center justify-center gap-12"  style={{ paddingTop: '3rem' }}>
            <div className="text-center">
              <div className="flex flex-col items-center justify-center gap-4 mb-6 md:mb-8">
                <HiOutlineDocumentText className="text-4xl md:text-5xl text-blue-500" />
                <motion
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h1>¿Sabes qué es un gestor de documentos?</h1>
                </motion>
              </div>
              <p className="text-gray-400 text-lg mb-8 max-w-3xl mx-auto text-center">
                Es una herramienta que te ayuda a manejar toda la documentación de una organización de forma accesible, organizada y segura, desde su creación hasta su archivo o eliminación. Imagina poder administrar y controlar todos los documentos de tu empresa de manera eficiente y sin complicaciones. Eso es exactamente lo que hacemos en Firmedigital.
              </p>

              <h2 className="text-3xl font-bold mb-8 mt-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Beneficios
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                {[
                  {
                    icon: <FaRocket className="text-3xl md:text-4xl text-blue-400" />,
                    title: "Eficiencia",
                    description: "Automatización de tareas y optimización de procesos documentales."
                  },
                  {
                    icon: <FaPiggyBank className="text-3xl md:text-4xl text-blue-400" />,
                    title: "Reducción de Costos",
                    description: "Minimiza gastos de impresión y almacenamiento físico."
                  },
                  {
                    icon: <FaShieldAlt className="text-3xl md:text-4xl text-blue-400" />,
                    title: "Seguridad",
                    description: "Protección avanzada y control de acceso a la información."
                  },
                  {
                    icon: <FaUsers className="text-3xl md:text-4xl text-blue-400" />,
                    title: "Colaboración",
                    description: "Trabajo en equipo eficiente con acceso compartido."
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative h-[140px] sm:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
                  > 
                  
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                    <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                      <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                          {benefit.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold">{benefit.title}</h3>
                      </div>
                      <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                          {benefit.icon}
                        </div>
                        <p className="text-sm sm:text-base text-gray-300 text-center">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Características Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <HiOutlineDocumentText className="text-3xl md:text-4xl text-blue-400" />,
                title: "Creación y Captura",
                description: "Crea y digitaliza documentos en múltiples formatos."
              },
              {
                icon: <FaFolderOpen className="text-3xl md:text-4xl text-blue-400" />,
                title: "Organización",
                description: "Estructura y almacenamiento inteligente de documentos."
              },
              {
                icon: <FaSearch className="text-3xl md:text-4xl text-blue-400" />,
                title: "Búsqueda Rápida",
                description: "Localiza documentos al instante con búsqueda avanzada."
              },
              {
                icon: <HiOutlineShieldCheck className="text-3xl md:text-4xl text-blue-400" />,
                title: "Control de Acceso",
                description: "Gestión de permisos y protección de documentos."
              },
              {
                icon: <FaUserFriends className="text-3xl md:text-4xl text-blue-400" />,
                title: "Colaboración",
                description: "Edición y comentarios en tiempo real con tu equipo."
              },
              {
                icon: <FaArchive className="text-3xl md:text-4xl text-blue-400" />,
                title: "Gestión de Archivo",
                description: "Políticas de retención y eliminación segura."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative h-[140px] sm:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{feature.title}</h3>
                  </div>
                  <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                      {feature.icon}
                    </div>
                    <p className="text-sm sm:text-base text-gray-300 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formatos Soportados Section */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Formatos Soportados
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Documentos de Texto",
                formats: [
                  { ext: "txt", desc: "Archivo de texto sin formato" },
                  { ext: "doc", desc: "Documento de Microsoft Word (versiones antiguas)" },
                  { ext: "docx", desc: "Documento de Microsoft Word (versiones modernas)" },
                  { ext: "pdf", desc: "Formato de documento portátil, creado por Adobe" },
                  { ext: "odt", desc: "Documento de OpenDocument, un formato abierto y estándar" },
                  { ext: "rtf", desc: "Archivo de texto enriquecido" },
                  { ext: "html", desc: "Página web en formato HTML" }
                ]
              },
              {
                title: "Hojas de Cálculo",
                formats: [
                  { ext: "xls", desc: "Hoja de cálculo de Microsoft Excel (versiones antiguas)" },
                  { ext: "xlsx", desc: "Hoja de cálculo de Microsoft Excel (versiones modernas)" },
                  { ext: "ods", desc: "Hoja de cálculo de OpenDocument" },
                  { ext: "csv", desc: "Archivo de valores separados por comas" }
                ]
              },
              {
                title: "Presentaciones",
                formats: [
                  { ext: "ppt", desc: "Presentación de Microsoft PowerPoint (versiones antiguas)" },
                  { ext: "pptx", desc: "Presentación de Microsoft PowerPoint (versiones modernas)" },
                  { ext: "odp", desc: "Presentación de OpenDocument" }
                ]
              },
              {
                title: "Imágenes",
                formats: [
                  { ext: "jpg/jpeg", desc: "Formato de imagen comprimido, ideal para fotografías" },
                  { ext: "png", desc: "Formato de imagen sin compresión, ideal para gráficos" },
                  { ext: "gif", desc: "Formato de imagen animada" },
                  { ext: "bmp", desc: "Formato de imagen sin compresión" }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{category.title}</h3>
                <div className="space-y-3">
                  {category.formats.map((format, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-400 text-sm font-mono">
                        .{format.ext}
                      </span>
                      <span className="text-gray-400 text-sm">{format.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                quote: "El gestor de documentos de Firmedigital ha revolucionado nuestra forma de organizar la información, permitiéndonos acceder rápidamente a cualquier documento y mejorar la colaboración entre departamentos.",
                role: "Director de Tecnología"
              },
              {
                client: "IUTCM",
                quote: "Desde que implementamos el gestor de documentos, hemos reducido drásticamente el tiempo de búsqueda y recuperación de archivos, optimizando nuestros procesos administrativos y académicos.",
                role: "Coordinador de Sistemas"
              },
              {
                client: "CIDEZ",
                quote: "El gestor de documentos de Firmedigital nos ha permitido centralizar toda nuestra documentación técnica, facilitando el acceso seguro y controlado a información crítica para nuestros proyectos de ingeniería.",
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
    </div>
  );
}
