'use client';

import React, { useEffect, useState } from 'react';
import MegaMenu from '@/components/MegaMenu';
import { motion } from 'framer-motion';
import { FaIdCard, FaQrcode, FaUserEdit, FaSync, FaShieldAlt, FaMobileAlt, FaTablet, FaLeaf, FaPaw } from 'react-icons/fa';
import { TitleSkeleton, CardSkeleton } from '@/components/ui/Skeletons';
import Image from 'next/image';

export default function CarnetDigital() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      {/* Carnet Digital Section */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <br />
              <br />
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Carnet Digital personalizado
              </h2>
              <p className="text-gray-300 text-lg md:text-xl">
                Un carnet digital personalizado es una identificación digital que contiene información específica de una persona, como su nombre, fotografía, cargo, empresa u organización a la que pertenece, y otros datos relevantes. Estos carnets pueden ser diseñados y adaptados según las necesidades de cada organización, permitiendo una mayor flexibilidad y funcionalidad.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  Solicitar Demo
                </button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-[400px] mt-12"
            >
              <br />
              <br />
              <Image
                src="/images/cp.svg"
                alt="Carnet Digital"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Características de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
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
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Beneficios de los Carnets Digitales
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
                    className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
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
