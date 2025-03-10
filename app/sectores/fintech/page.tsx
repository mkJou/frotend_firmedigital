'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaSignature, FaFolder, FaSyncAlt, FaPiggyBank, FaShieldAlt, FaBolt, FaUserCheck, FaUniversity, FaBuilding, FaUsers } from 'react-icons/fa';

export default function SectorFintech() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                ¿Qué es Tecnología Financiera?
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Es una plataforma innovadora que combina la potencia de la firma electrónica, la gestión documental inteligente y el flujo de trabajo automatizado de Firmedigital con funcionalidades especializadas para el sector financiero. Su objetivo es impulsar la transformación digital de instituciones financieras, empresas fintech y usuarios, brindando una experiencia más eficiente, segura y conveniente en sus operaciones.
              </p>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">Funcionalidades</h2>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">Beneficios</h2>
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
          <h2 className="text-3xl font-bold text-white text-center mb-12">¿A Quién está Dirigido?</h2>
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
          <h2 className="text-3xl font-bold text-white text-center mb-8">¿Cómo se Integra?</h2>
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <p className="text-gray-300 text-lg text-center leading-relaxed">
              Tecnología Financiera se construye sobre la plataforma de Firmedigital, aprovechando sus funcionalidades de firma electrónica, gestión documental y flujo de trabajo. Se agregan módulos y herramientas específicas para el sector financiero, creando una solución integral y personalizada que se adapta a las necesidades de cada cliente.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
