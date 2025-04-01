'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaSignature, FaFolder, FaSyncAlt, FaPiggyBank, FaShieldAlt, FaBolt, FaUserCheck, FaUniversity, FaBuilding, FaUsers, FaCalendar } from 'react-icons/fa';
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

export default function SectorFintech() {
  const [isLoading, setIsLoading] = useState(true);
  const [fintechArticles, setFintechArticles] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);
  
  useEffect(() => {
    // Obtener artículos con categoría 'Tecnología Financiera' desde la API
    const fetchFintechArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/Tecnologia Financiera');
        const data = await response.json();
        
        if (data.success) {
          setFintechArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFintechArticles();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Construyendo un Gobierno Más Eficiente y Transparente para Todos
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl p-6 bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm">
              Acelera tus operaciones, cumple con la regulación y protege datos sensibles con firmas electrónicas seguras.
                  </p>
                  <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                  ¡Integra FIRMEDIGITAL Hoy!
              </a>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/finanzas.png"
                alt="Tecnología Financiera"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaSignature className="text-4xl text-blue-400" />,
                title: "Firma Electrónica Avanzada",
                description: "Autenticación múltiple y cumplimiento normativo para transacciones seguras."
              },
              {
                icon: <FaFolder className="text-4xl text-blue-400" />,
                title: "Gestión Documental",
                description: "Almacenamiento seguro y organizado de documentos financieros."
              },
              {
                icon: <FaSyncAlt className="text-4xl text-blue-400" />,
                title: "Flujos Automatizados",
                description: "Digitalización y seguimiento de procesos financieros en tiempo real."
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
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
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

      {/* Beneficios Section */}
      <section className="py-16 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaPiggyBank className="text-4xl text-blue-400" />,
                title: "Reducción de Costos",
                description: "Optimiza recursos eliminando papel y automatizando procesos."
              },
              {
                icon: <FaShieldAlt className="text-4xl text-blue-400" />,
                title: "Mayor Seguridad",
                description: "Protección avanzada contra fraudes y accesos no autorizados."
              },
              {
                icon: <FaBolt className="text-4xl text-blue-400" />,
                title: "Eficiencia Operativa",
                description: "Procesos ágiles y reducción de errores en operaciones."
              },
              {
                icon: <FaUserCheck className="text-4xl text-blue-400" />,
                title: "Mejor Experiencia",
                description: "Transacciones rápidas y seguras para los usuarios."
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
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
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

      {/* A Quién está Dirigido Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">¿A Quién está Dirigido?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUniversity className="text-4xl text-blue-400" />,
                title: "Entidades Financieras",
                description: "Bancos, cooperativas, fintechs y aseguradoras."
              },
              {
                icon: <FaBuilding className="text-4xl text-blue-400" />,
                title: "Empresas",
                description: "Departamentos financieros y áreas administrativas."
              },
              {
                icon: <FaUsers className="text-4xl text-blue-400" />,
                title: "Usuarios",
                description: "Personas que realizan transacciones financieras online."
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
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 bg-blue-500/10 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-center mb-4 w-16 h-16 mx-auto bg-blue-500/10 rounded-full">
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

      {/* Integración Section */}
      <section className="py-16 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">¿Cómo se Integra?</h2>
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              Tecnología Financiera se construye sobre la plataforma de FIRMEDIGITAL, aprovechando sus funcionalidades de firma electrónica, gestión documental y flujo de trabajo. Se agregan módulos y herramientas específicas para el sector financiero, creando una solución integral y personalizada que se adapta a las necesidades de cada cliente.
            </p>
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
          ) : fintechArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Tecnología Financiera.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fintechArticles.map((article, index) => (
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
