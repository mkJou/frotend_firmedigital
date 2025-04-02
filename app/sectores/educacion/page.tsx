'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaCalendar,FaGraduationCap, FaBook, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaClipboardCheck, FaUsers, FaShieldAlt, FaClock, FaAward, FaTrophy, FaLock, FaCloudUploadAlt, FaMobile } from 'react-icons/fa';
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

export default function Educacion() {
  const [isLoading, setIsLoading] = useState(true);
  const [educationArticles, setEducationArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);
  
  useEffect(() => {
    // Obtener artículos con categoría 'Educativo' desde la API
    const fetchEducationArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/Educativo');
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
    
    fetchEducationArticles();
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
                  Transforma la Gestión Educativa con FIRMEDIGITAL
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl p-6 bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm">
                  Eficiencia, seguridad y sostenibilidad para procesos académicos y administrativos. ¡Lleva la transformación digital a tu institución educativa!
                  </p>
                  <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                  ¡Comienza ahora!
              </a>
                </>
              )}
            </div>
            <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-[300px] md:max-w-[400px] h-[250px] md:h-[400px] mx-auto">
                <Image
                  src="/images/educativo.png"
                  alt="Educación Digital"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-gradient-to-b from-[#111827] to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <blockquote className="text-2xl lg:text-3xl font-semibold text-center italic text-gray-300">
            "Transformando la educación con seguridad, eficiencia y modernidad digital."
          </blockquote>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaGraduationCap className="text-4xl text-blue-400" />,
                title: "Gestión Académica",
                description: "Firma digital de documentos en minutos."
              },
              {
                icon: <FaChalkboardTeacher className="text-4xl text-blue-400" />,
                title: "Docencia Digital",
                description: "Documentación académica segura."
              },
              {
                icon: <FaUserGraduate className="text-4xl text-blue-400" />,
                title: "Servicios Estudiantiles",
                description: "Gestión digital de certificados."
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
      </section>

      {/* Características */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaLock className="text-4xl text-blue-400" />,
                title: "Seguridad",
                description: "Protección de datos académicos."
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
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Educativo.</p>
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
