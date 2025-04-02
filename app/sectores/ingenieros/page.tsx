'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaProjectDiagram, FaClipboardCheck, FaCalendar, FaUsers, FaBuilding, FaHardHat, FaCheckSquare, FaUsersCog, FaCogs, FaDrawPolygon, FaTools, FaLock, FaCloudUploadAlt, FaMobile } from 'react-icons/fa';
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

const SkeletonHero = () => (
  <div className="space-y-8">
    <div className="flex justify-center">
      <div className="animate-pulse h-16 w-16 bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-6">
      <div className="animate-pulse h-14 max-w-3xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-2xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-xl mx-auto bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default function Ingenieros() {
  const [isLoading, setIsLoading] = useState(true);
  const [engineeringArticles, setEngineeringArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);
  
  useEffect(() => {
    // Obtener artículos con categoría 'ingenieria' desde la API
    const fetchEngineeringArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/ingenieria');
        const data = await response.json();
        
        if (data.success) {
          setEngineeringArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEngineeringArticles();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-b from-black via-black to-[#111827] text-white py-16 px-8 md:px-16 mt-[100px] relative overflow-hidden z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              {isLoading ? (
                <SkeletonHero />
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                  Transporta la Gestión Documental en Proyectos de Ingeniería con FIRMEDIGITAL
                  </h1>
                  <p className="text-xl bg-gradient-to-r from-gray-300 to-blue-300 bg-clip-text text-transparent font-medium leading-relaxed mb-8 px-1 border-l-4 border-blue-400 pl-4 shadow-sm">
                  Mejora tus flujos de trabajo y ofrece un servicio al cliente excepcional y seguro
                  </p>
                  <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  ¡Comienza ahora!
                  </a>
                </>
              )}
            </div>
            <div className="flex-1 flex justify-center">
              <div className="transform hover:scale-105 transition-transform duration-500">

                <Image
                  src="/images/inge.png"
                  alt="Ingeniería y Construcción"
                  width={500}
                  height={400}
                  className="drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flujo Lineal Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#111827] to-gray-900 relative overflow-hidden">
      <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
      Beneficios Clave en el Sector de Ingeniería
          </h2>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {[
              {
                icon: <FaProjectDiagram className="text-5xl text-blue-400" />,
                text: "Genera y envía transmittals de forma automática"
              },
              {
                icon: <FaUsers className="text-5xl text-blue-400" />,
                text: "Permite a todas las personas involucradas en el proyecto, tener acceso a lo que necesitan"
              },
              {
                icon: <FaClipboardCheck className="text-5xl text-blue-400" />,
                text: "Ten tus documentos e información disponibles para siempre"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex-1 flex flex-col items-center text-center group"
              >
                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <p className="text-lg text-gray-300">
                  {item.text}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-blue-400/50 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Flujo de Revisión Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Flujo de Revisión
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaHardHat className="text-4xl text-blue-400" />,
                title: "Gestión de Proyectos",
                description: "Firma digital de documentos técnicos."
              },
              {
                icon: <FaTools className="text-4xl text-blue-400" />,
                title: "Documentación Técnica",
                description: "Gestión de planos y especificaciones."
              },
              {
                icon: <FaCogs className="text-4xl text-blue-400" />,
                title: "Procesos de Ingeniería",
                description: "Control digital de operaciones."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                    <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <p className="text-gray-300 text-center">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Características */}
          <div className="mt-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaLock className="text-4xl text-blue-400" />,
                  title: "Seguridad",
                  description: "Protección de datos técnicos."
                },
                {
                  icon: <FaCloudUploadAlt className="text-4xl text-blue-400" />,
                  title: "Almacenamiento",
                  description: "Respaldo seguro en la nube."
                },
                {
                  icon: <FaMobile className="text-4xl text-blue-400" />,
                  title: "Accesibilidad",
                  description: "Acceso desde cualquier dispositivo."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                  <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                    <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <p className="text-gray-300 text-center">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Casos de Uso
          </h2>
          
          {/* Descripción de la sección */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg">
              Descubre cómo FIRMEDIGITAL transforma los procesos de ingeniería con soluciones digitales avanzadas. 
              Estos casos reales demuestran el impacto de nuestra plataforma en proyectos de ingeniería y construcción.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                icon: <FaBuilding className="text-4xl text-blue-400" />,
                title: "Gestión de Proyectos de Infraestructura",
                problem: "Una empresa constructora necesitaba coordinar documentación técnica entre 50+ profesionales en 3 países diferentes.",
                solution: "Implementación de flujos de trabajo digitales con firma electrónica y gestión documental centralizada.",
                result: "Reducción del 70% en tiempos de aprobación y eliminación completa de pérdidas documentales."
              },
              {
                icon: <FaHardHat className="text-4xl text-blue-400" />,
                title: "Supervisión Digital de Obras",
                problem: "Supervisores de obra perdían 3 horas diarias en papeleo y reportes manuales durante inspecciones.",
                solution: "Sistema de reportes digitales con validación inmediata mediante firma electrónica desde dispositivos móviles.",
                result: "Aumento del 40% en productividad y mejora significativa en la calidad de la documentación técnica."
              },
              {
                icon: <FaCheckSquare className="text-4xl text-blue-400" />,
                title: "Certificación de Calidad en Manufactura",
                problem: "Proceso de certificación ISO requería gestionar más de 200 documentos con múltiples revisiones y aprobaciones.",
                solution: "Plataforma de gestión documental con trazabilidad completa y flujos de aprobación automatizados.",
                result: "Certificación obtenida en la mitad del tiempo estimado con 100% de cumplimiento en auditorías."
              },
              {
                icon: <FaUsersCog className="text-4xl text-blue-400" />,
                title: "Colaboración Multidisciplinaria",
                problem: "Equipos de ingeniería, arquitectura y construcción con dificultades para coordinar cambios en planos y especificaciones.",
                solution: "Espacio de trabajo digital compartido con control de versiones y firma electrónica para validaciones.",
                result: "Eliminación de errores por versiones desactualizadas y reducción del 60% en tiempos de revisión."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-blue-500/20 transition-all duration-500 border border-gray-700/50 group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>
                  </div>
                  
                  <div className="space-y-4 mt-6">
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-blue-400 mb-1">DESAFÍO:</h4>
                      <p className="text-gray-300 text-sm">{item.problem}</p>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-purple-400 mb-1">SOLUCIÓN:</h4>
                      <p className="text-gray-300 text-sm">{item.solution}</p>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-green-400 mb-1">RESULTADO:</h4>
                      <p className="text-gray-300 text-sm">{item.result}</p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="mt-6 flex justify-end"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
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
          ) : engineeringArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría ingeniería.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engineeringArticles.map((article, index) => (
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
