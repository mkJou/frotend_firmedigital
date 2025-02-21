'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineCloud, HiOutlineDatabase, HiOutlinePencil, HiOutlineEye } from 'react-icons/hi';
import { FaRocket, FaPiggyBank, FaShieldAlt, FaUsers, FaFolderOpen, FaSearch, FaUserFriends, FaArchive } from 'react-icons/fa';
import Link from 'next/link';

export default function GestorDocumentos() {
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-gray-400 hover:text-white">
                    Inicio
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-gray-400 mx-2">/</span>
                    <Link href="/productos" className="text-gray-400 hover:text-white">
                      Productos
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-white">Gestor de Documentos</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                ¿Sabes qué es un gestor de documentos?
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Es una herramienta que te ayuda a manejar toda la documentación de una organización de forma accesible, organizada y segura, desde su creación hasta su archivo o eliminación. Imagina poder administrar y controlar todos los documentos de tu empresa de manera eficiente y sin complicaciones. Eso es exactamente lo que hacemos en Firmedigital.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl" />
              <motion.div
                className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-1 rounded-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/GestiónDocumental.svg"
                  alt="Gestor de Documentos Interface"
                  width={600}
                  height={400}
                  className="rounded-xl"
                  priority
                  quality={100}
                  style={{
                    shapeRendering: 'geometricPrecision',
                    textRendering: 'geometricPrecision'
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Características Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
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

    </div>
  );
}
