'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsShop, BsArrowRightCircle } from 'react-icons/bs';
import { FaCogs, FaUsers, FaChartLine, FaUserTie, FaIndustry, FaRocket, FaChartBar, FaShieldAlt, FaHandshake, FaLeaf, FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SectorIndustria() {
  const features = {
    'Automatización de Procesos': 'Optimiza tareas repetitivas y manuales, reduciendo errores y aumentando la productividad en líneas de producción y ensamblaje.',
    'Gestión de Inventarios': 'Control preciso de productos y materiales en tiempo real, previniendo falta de stock y optimizando costos de almacenamiento.',
    'Mejora de la Logística': 'Optimización de la cadena de suministro y rutas de entrega para reducir tiempos y costos operativos.',
    'Análisis de Datos': 'Toma de decisiones basada en datos para mejorar procesos productivos e identificar áreas de optimización.',
    'Integración de Sistemas': 'Conexión eficiente entre sistemas de contabilidad, CRM y gestión empresarial para una operación unificada.',
  };

  const benefits = {
    'Trazabilidad': 'Seguimiento completo del origen y movimiento de productos para garantizar transparencia y prevenir fraudes.',
    'Seguimiento de envíos': 'Monitoreo en tiempo real de ubicación y estado de envíos para mejor gestión logística.',
    'Gestión de documentos': 'Digitalización y almacenamiento seguro de contratos y documentos comerciales.',
    'Smart contracts': 'Automatización de contratos para simplificar procesos y reducir costos.',
    'Sostenibilidad': 'Transparencia en origen y procesos de productos para consumidores conscientes.',
    'Pagos transfronterizos': 'Transacciones internacionales simplificadas con mayor seguridad entre partes.',
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <BsShop className="text-5xl text-blue-500" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  La Transformación Digital en la Industria y el Comercio
                </h1>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                En la actualidad, la industria y el comercio están experimentando una transformación digital significativa. 
                La implementación de software especializado no solo optimiza los procesos internos, sino que también mejora 
                la eficiencia operativa y la competitividad en el mercado.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/industria.png"
                  alt="Transformación Digital Industrial"
                  width={400}
                  height={200}
                  className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(features).map(([title, content], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] w-[300px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-4">
                    {index === 0 && <FaCogs className="text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-4xl text-blue-500" />}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    {index === 0 && <FaCogs className="text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-4xl text-blue-500" />}
                  </div>
                  <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(benefits).map(([title, content], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] w-[300px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-4">
                    {index === 0 && <FaRocket className="text-4xl text-blue-500" />}
                    {index === 1 && <FaChartBar className="text-4xl text-blue-500" />}
                    {index === 2 && <FaShieldAlt className="text-4xl text-blue-500" />}
                    {index === 3 && <FaHandshake className="text-4xl text-blue-500" />}
                    {index === 4 && <FaLeaf className="text-4xl text-blue-500" />}
                    {index === 5 && <FaGlobe className="text-4xl text-blue-500" />}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    {index === 0 && <FaRocket className="text-4xl text-blue-500" />}
                    {index === 1 && <FaChartBar className="text-4xl text-blue-500" />}
                    {index === 2 && <FaShieldAlt className="text-4xl text-blue-500" />}
                    {index === 3 && <FaHandshake className="text-4xl text-blue-500" />}
                    {index === 4 && <FaLeaf className="text-4xl text-blue-500" />}
                    {index === 5 && <FaGlobe className="text-4xl text-blue-500" />}
                  </div>
                  <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
