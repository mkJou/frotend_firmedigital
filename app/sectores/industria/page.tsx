'use client';

import React, { useState, useEffect } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsShop, BsArrowRightCircle } from 'react-icons/bs';
import { FaCogs, FaUsers, FaChartLine, FaUserTie, FaIndustry, FaRocket, FaChartBar, FaShieldAlt, FaHandshake, FaLeaf, FaGlobe, FaCalendar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  isVisible: boolean;
  isFeatured: boolean;
  tags?: string[];
}

export default function SectorIndustria() {
  const [isLoading, setIsLoading] = useState(true);
  const [industryArticles, setIndustryArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Obtener artículos con categoría 'Industria y comercio' desde la API
    const fetchIndustryArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/Industria y comercio');
        const data = await response.json();
        
        if (data.success) {
          setIndustryArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIndustryArticles();
  }, []);
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
      <section className="relative pt-16 md:pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto" style={{ paddingTop: '5rem' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                FIRMEDIGITAL: Simplifica la Gestión Empresarial en la Industria y el Comercio
                </h1>
              </div>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl p-4 md:p-6 bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm">
              Firma, organiza y protege tus documentos clave para optimizar tus procesos industriales y comerciales
              </p>
              <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="hero-button inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
              ¡Comienza ahora!
              </a>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[300px] md:h-[400px] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/industria.png"
                  alt="Transformación Digital Industrial"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Características</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(features).map(([title, content], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[200px] md:h-[180px] w-full cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaCogs className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaCogs className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaUsers className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaChartLine className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaUserTie className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaIndustry className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <p className="text-sm md:text-base text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Beneficios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Object.entries(benefits).map(([title, content], index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[200px] md:h-[180px] w-full cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaRocket className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaChartBar className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaShieldAlt className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaHandshake className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaLeaf className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 5 && <FaGlobe className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-4 md:p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                  <div className="mb-3 md:mb-4">
                    {index === 0 && <FaRocket className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 1 && <FaChartBar className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 2 && <FaShieldAlt className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 3 && <FaHandshake className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 4 && <FaLeaf className="text-3xl md:text-4xl text-blue-500" />}
                    {index === 5 && <FaGlobe className="text-3xl md:text-4xl text-blue-500" />}
                  </div>
                  <p className="text-sm md:text-base text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                    {content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
       {/* Recursos Adicionales Section */}
       <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aprende Más con Nuestros Recursos
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : industryArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Industria y comercio.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industryArticles.map((article, index) => (
              <Link href={`/blog/${article._id}`} key={article._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 absolute z-10"></div>
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-blue-400" />
                        {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Por {article.author}</span>
                      <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    </main>
  );
}
