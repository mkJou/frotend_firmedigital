'use client';

import React, { useEffect, useState } from 'react';
import MegaMenu from '@/components/MegaMenu';
import { motion } from 'framer-motion';
import { FaIdCard, FaQrcode, FaUserEdit, FaSync, FaShieldAlt, FaMobileAlt, FaTablet, FaLeaf, FaPaw } from 'react-icons/fa';
import { TitleSkeleton, CardSkeleton } from '@/components/ui/Skeletons';
import Image from 'next/image';
import Link from 'next/link';

export default function CarnetDigital() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#000000] text-white flex-1">
      <MegaMenu />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 sm:px-8 py-16 sm:py-24">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6 px-6 sm:px-8"
          >
            <br />
            <br />
            <br />

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Carnet Personalizable
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Un carnet digital personalizado es una identificación digital que contiene información específica de una persona, como su nombre, fotografía, cargo, empresa u organización a la que pertenece, y otros datos relevantes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            </div>
          </motion.div>
        </div>
      </section>

      {/* Características Section */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8 md:space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {[...Array(9)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Características de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {[
                  {
                    icon: <FaIdCard className="text-4xl text-blue-500" />,
                    title: "Identificación Digital",
                    description: "Verificación rápida y segura para control de acceso"
                  },
                  {
                    icon: <FaQrcode className="text-4xl text-purple-500" />,
                    title: "Códigos QR y NFC",
                    description: "Integración con sistemas digitales modernos"
                  },
                  {
                    icon: <FaUserEdit className="text-4xl text-blue-500" />,
                    title: "Personalización",
                    description: "Adapta la información según tus necesidades"
                  },
                  {
                    icon: <FaSync className="text-4xl text-purple-500" />,
                    title: "Actualización Inmediata",
                    description: "Cambios reflejados en tiempo real"
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                    title: "Seguridad Avanzada",
                    description: "Protección con encriptación de datos"
                  },
                  {
                    icon: <FaMobileAlt className="text-4xl text-purple-500" />,
                    title: "Acceso Móvil",
                    description: "Disponible en todos tus dispositivos"
                  },
                  {
                    icon: <FaTablet className="text-4xl text-blue-500" />,
                    title: "Multiplataforma",
                    description: "Gestión desde cualquier dispositivo"
                  },
                  {
                    icon: <FaLeaf className="text-4xl text-purple-500" />,
                    title: "Eco-Friendly",
                    description: "Sin uso de papel ni plástico"
                  },
                  {
                    icon: <FaPaw className="text-4xl text-blue-500" />,
                    title: "ID Mascotas",
                    description: "Identifica a tus mascotas digitalmente"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[160px] md:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                    <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                      <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold text-gray-200 mt-4">{feature.title}</h3>
                      </div>
                      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                        {feature.icon}
                        <p className="text-gray-300 text-center mt-4">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="px-4 md:px-8 py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-8 md:space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {[...Array(5)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Beneficios de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
                {[
                  {
                    icon: <FaSync className="text-4xl text-blue-500" />,
                    title: "Eficiencia",
                    description: "Agiliza procesos de identificación"
                  },
                  {
                    icon: <FaUserEdit className="text-4xl text-purple-500" />,
                    title: "Flexibilidad",
                    description: "Personalización según necesidades"
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                    title: "Seguridad",
                    description: "Máxima protección de datos"
                  },
                  {
                    icon: <FaMobileAlt className="text-4xl text-purple-500" />,
                    title: "Accesibilidad",
                    description: "Disponible en todo momento"
                  },
                  {
                    icon: <FaLeaf className="text-4xl text-blue-500" />,
                    title: "Sostenibilidad",
                    description: "Compromiso ambiental digital"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative h-[160px] md:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
                    <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                      <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0 flex flex-col items-center">
                        {benefit.icon}
                        <h3 className="text-xl font-semibold text-gray-200 mt-4">{benefit.title}</h3>
                      </div>
                      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center">
                        {benefit.icon}
                        <p className="text-gray-300 text-center mt-4">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
