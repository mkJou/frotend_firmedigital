'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaUserPlus, FaRocket, FaShieldAlt, FaLock, FaUserMd, FaBuilding, FaShoppingCart, FaHospital, FaNotesMedical, FaPrescriptionBottleAlt, FaCloudUploadAlt, FaMobile, FaCalendar, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import Link from 'next/link';
import MegaMenu from '../../../components/MegaMenu';
import Image from "next/image";
import { motion } from 'framer-motion';

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

export default function SectorSalud() {
  const [isLoading, setIsLoading] = useState(true);
  const [healthArticles, setHealthArticles] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success?: boolean; message?: string} | null>(null);

  // Referencias para las secciones
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    // Obtener artículos con categoría 'salud' desde la API
    const fetchHealthArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/salud');
        const data = await response.json();
        
        if (data.success) {
          setHealthArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHealthArticles();
  }, []);
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, companyName, section: 'Salud' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: 'Información recibida correctamente. Nos pondremos en contacto pronto.' });
        setEmail('');
        setCompanyName('');
      } else {
        setFormStatus({ success: false, message: data.message || 'Ocurrió un error al enviar el formulario.' });
      }
    } catch (error) {
      setFormStatus({ success: false, message: 'Error de conexión. Por favor, inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <MegaMenu />

       {/* Hero Section */}
       <section ref={heroRef} className="relative py-16 px-4 md:px-8 overflow-hidden mt-[120px] min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        
        {/* Fondo oscuro */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Columna izquierda: Título y subtítulo */}
            <div className="flex flex-col">
              <div className="flex flex-col mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] leading-tight p-4 rounded-lg backdrop-blur-sm bg-black/30 shadow-xl text-left">
                ¡Revoluciona la gestión<br /> documental en tu<br /> centro de salud!
                </h1>
              
                <div className="bg-gradient-to-r from-gray-800/50 to-blue-900/10 border-l-4 border-blue-500 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:border-blue-400 transition-all duration-300 backdrop-blur-sm p-6 mb-8">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-left">
                  Optimiza la gestión de documentos clínicos, recetas médicas y consentimientos informados con nuestra solución digital.
                  </p>
                </div>
                
                {/* Formulario de contacto */}
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-8 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">Solicita más información</h3>
                  </div>
                  
                  {formStatus && (
                    <div className={`mb-4 p-3 rounded-lg ${formStatus.success ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                      {formStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre del Centro de Salud</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaBuilding className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="companyName"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                          placeholder="Nombre de tu centro médico"
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20 border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed h-[42px]"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="mr-2" /> Enviar
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            {/* Columna derecha: Imagen */}
            <div className="relative h-[300px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30 transform hover:scale-[1.02] transition-all duration-500">
              <Image
                src="/images/saludd.webp"
                alt="Sector Salud"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo se integra Section */}
      <section className="py-16 px-4 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">¿Cómo se Integra?</h2>
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed mb-8">
              El sector salud se integra perfectamente con la plataforma de FIRMEDIGITAL, aprovechando sus funcionalidades de firma electrónica, gestión documental y flujo de trabajo. Se implementan módulos específicos para historias clínicas, recetas médicas y consentimientos informados, creando una solución integral que se adapta a las necesidades de cada institución sanitaria.
            </p>
            <div className="flex justify-center">
              <a href="https://appdev.firmedigital.com.ve/api/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                ¡Comienza ahora!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section ref={benefitsRef} className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios Clave en el Sector Salud
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-5 order-2 lg:order-1 relative mx-auto w-full">
              <div className="w-full h-[500px] md:h-[550px] lg:h-[600px] relative">
                <img 
                  src="/images/benesalud.jpg" 
                  alt="Beneficios Salud" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            

            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    icon: <FaHospital className="text-4xl text-blue-400" />,
                    title: "Gestión Hospitalaria",
                    description: "Firma digital de historias clínicas y documentación médica con validez legal."
                  },
                  {
                    icon: <FaUserMd className="text-4xl text-blue-400" />,
                    title: "Atención Médica",
                    description: "Documentación clínica segura y accesible para mejorar la atención al paciente."
                  },
                  {
                    icon: <FaNotesMedical className="text-4xl text-blue-400" />,
                    title: "Registros Médicos",
                    description: "Gestión digital de expedientes médicos con acceso controlado y seguro."
                  },
                  {
                    icon: <FaPrescriptionBottleAlt className="text-4xl text-blue-400" />,
                    title: "Prescripciones Digitales",
                    description: "Emisión y control de recetas médicas con firma electrónica certificada."
                  },
                  {
                    icon: <FaLock className="text-4xl text-blue-400" />,
                    title: "Protección de Datos",
                    description: "Cumplimiento de normativas de protección de información sensible de pacientes."
                  },
                  {
                    icon: <FaCloudUploadAlt className="text-4xl text-blue-400" />,
                    title: "Almacenamiento Seguro",
                    description: "Acceso a documentos médicos desde cualquier lugar con total seguridad."
                  }
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="group relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500 hover:border-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                    <div className="flex items-start gap-3 md:gap-4 relative z-10">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{benefit.title}</h3>
                        <p className="text-sm md:text-base text-gray-300">{benefit.description}</p>
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaLock className="text-4xl text-blue-400" />,
                title: "Seguridad",
                description: "Protección de datos sensibles."
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
              <div
                key={index}
                className="group relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500 hover:border-blue-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex items-start gap-3 md:gap-4 relative z-10">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-300">{item.description}</p>
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
          ) : healthArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría salud.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthArticles.map((article, index) => (
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
