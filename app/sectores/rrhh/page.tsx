'use client';

import React, { useState, useEffect } from 'react';
import { FaUserTie, FaUsers, FaChartLine, FaCogs, FaClipboard, FaLock, FaMobile, FaCog, FaPlug, FaWpforms, FaLightbulb, FaCloud, FaCalendar } from 'react-icons/fa';
import MegaMenu from '../../../components/MegaMenu';
import Image from "next/image";
import { motion } from 'framer-motion';
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

export default function SectorRRHH() {
  const [isLoading, setIsLoading] = useState(true);
  const [educationArticles, setEducationArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
  
  useEffect(() => {
    // Obtener artículos con categoría 'RRHH' desde la API
    const fetchRRHHArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/RRHH');
        const data = await response.json();
        
        if (data.success) {
          setEducationArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRRHHArticles();
  }, []);
  const features = {
    'Automatización de Procesos': 'Optimiza tareas repetitivas y elimina la gestión manual de documentos.',
    'Gestión del Talento': 'Centraliza información de empleados desde reclutamiento hasta desarrollo.',
    'Motivación de Equipos': 'Facilita comunicación y acceso a información de beneficios.',
    'Reducción de Costes': 'Optimiza procesos y reduce dependencia del papel.',
  };

  const benefits = {
    'Sistema Eficiente': 'Gestión digital completa de registros y flujos de RR.HH.',
    'Documentos Seguros': 'Protección y permisos personalizables para información sensible.',
    'Acceso Flexible': 'Gestión web y móvil para equipos remotos.',
    'Procesos Inteligentes': 'Análisis y optimización de flujos de trabajo.',
    'Integración Simple': 'Compatible con software existente de RR.HH.',
    'Formularios Digitales': 'Elimina entrada manual de datos con formularios digitales.',
    'Interfaz Intuitiva': 'Diseño fácil de usar con flujos personalizables.',
    'Implementación Flexible': 'Disponible en cloud o in-situ.',
  };

  const examples = {
    'Reclutamiento': 'Gestión eficiente del proceso de selección.',
    'Onboarding': 'Automatización de documentación para nuevos empleados.',
    'Evaluaciones': 'Gestión segura de evaluaciones de desempeño.',
    'Solicitudes': 'Manejo digital de vacaciones y permisos.',
    'Datos Seguros': 'Protección de información confidencial.',
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto" style={{ paddingTop: '5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Optimiza la Gestión de Talento con FIRMEDIGITAL: Tu Firma Electrónica Confiable y Segura
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl p-6 bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm">
              Simplifica procesos, garantiza la seguridad documental y mejora la experiencia de tus colaboradores. ¡Digitaliza el área de Recursos Humanos con facilidad!
                  </p>
                  <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                  ¡Comienza ahora!
              </a>
            </div>
            <div className="relative h-[400px] w-full">
            <div className="relative w-full max-w-[400px] md:max-w-[500px] h-[300px] md:h-[400px] transition-transform duration-300 hover:scale-105">
                <Image
                  src="/images/rrhh.png"
                  alt="Recursos Humanos Digital"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <blockquote className="text-2xl lg:text-3xl font-semibold text-center italic text-gray-300">
            "Para RR. HH. y directores generales, los procesos digitales con herramientas basadas en la nube ofrecen una visión integral del ciclo de vida del empleado y las prácticas laborales de las empresas."
          </blockquote>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Características
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(features).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaUserTie className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaUserTie className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(benefits).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCog className="text-4xl text-blue-400" />}
                      {index === 1 && <FaLock className="text-4xl text-blue-400" />}
                      {index === 2 && <FaMobile className="text-4xl text-blue-400" />}
                      {index === 3 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 4 && <FaPlug className="text-4xl text-blue-400" />}
                      {index === 5 && <FaWpforms className="text-4xl text-blue-400" />}
                      {index === 6 && <FaLightbulb className="text-4xl text-blue-400" />}
                      {index === 7 && <FaCloud className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaCog className="text-4xl text-blue-400" />}
                      {index === 1 && <FaLock className="text-4xl text-blue-400" />}
                      {index === 2 && <FaMobile className="text-4xl text-blue-400" />}
                      {index === 3 && <FaCogs className="text-4xl text-blue-400" />}
                      {index === 4 && <FaPlug className="text-4xl text-blue-400" />}
                      {index === 5 && <FaWpforms className="text-4xl text-blue-400" />}
                      {index === 6 && <FaLightbulb className="text-4xl text-blue-400" />}
                      {index === 7 && <FaCloud className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          Casos de uso
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(examples).map(([title, description], index) => (
              <div
                key={index}
                className="group relative h-[180px] w-[300px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {index === 0 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUserTie className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaClipboard className="text-4xl text-blue-400" />}
                      {index === 4 && <FaLock className="text-4xl text-blue-400" />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
                      {index === 0 && <FaUsers className="text-4xl text-blue-400" />}
                      {index === 1 && <FaUserTie className="text-4xl text-blue-400" />}
                      {index === 2 && <FaChartLine className="text-4xl text-blue-400" />}
                      {index === 3 && <FaClipboard className="text-4xl text-blue-400" />}
                      {index === 4 && <FaLock className="text-4xl text-blue-400" />}
                    </div>
                    <p className="text-gray-300 text-center">{description}</p>
                  </div>
                </div>
              </div>
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
          ) : educationArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría RRHH.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {educationArticles.map((article, index) => (
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
