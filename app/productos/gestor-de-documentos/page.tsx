'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineCloud } from 'react-icons/hi';
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
                Sistema de Gestión Documental con Firmedigital
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Firmedigital es un software de gestión documental que integra todo lo esencial para la gestión de los documentos, 
                la colaboración entre usuarios y las funcionalidades de búsqueda avanzada, en una única solución fácil de usar.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                  >
                    <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </motion.div>
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

      {/* IA Integration Section */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Incorporando el Poder de la IA al Software de Gestión de documentos
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Aumente la eficiencia de contratación en un 80% en toda su empresa con la solución de gestión 
              de documentos intuitiva, personalizable y basada en inteligencia artificial de Firmedigital.
            </p>
          </div>
          
          {/* Formatos Soportados */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-6">Formatos de Archivo Soportados</h3>
              <div className="grid gap-6">
                {formatosArchivo.map((categoria, index) => (
                  <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h4 className="font-semibold mb-4 text-blue-400">{categoria.categoria}</h4>
                    <div className="flex flex-wrap gap-2">
                      {categoria.formatos.map((formato, i) => (
                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          .{formato}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Características Principales</h3>
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="font-semibold mb-4">Gestión del Conocimiento</h4>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Búsqueda de Texto Completa
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Ingesta Automática de Datos
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      Seguimiento de Operaciones
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="font-semibold mb-4">Diseñador de Flujo de Trabajo</h4>
                  <p className="text-gray-400">
                    Diseña y Valida documentos desde una interfaz única e intuitiva. Centralice los procesos,
                    como la admisión, la revisión y la ruta de aprobación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
            Casos de Aplicabilidad
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Empresas de Construcción",
                description: "Gestión de contratos con subcontratistas y proveedores, asegurando cumplimiento y puntualidad."
              },
              {
                title: "Firmas Legales",
                description: "Análisis y comparación de versiones de contratos, marcado de cláusulas importantes."
              },
              {
                title: "Corporaciones Financieras",
                description: "Centralización y gestión eficiente de contratos, minimizando riesgos financieros."
              },
              {
                title: "Sector Salud",
                description: "Control sobre contratos con proveedores de servicios y equipos médicos."
              },
              {
                title: "Industria de Tecnología",
                description: "Gestión de contratos de licencias y acuerdos de colaboración."
              }
            ].map((caso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="font-semibold mb-4">{caso.title}</h3>
                <p className="text-gray-400 text-sm">{caso.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
