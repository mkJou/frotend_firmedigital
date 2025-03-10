'use client';

import React from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaUserPlus, FaRocket, FaShieldAlt, FaLock, FaUserMd, FaBuilding, FaShoppingCart, FaHospital, FaNotesMedical, FaPrescriptionBottleAlt, FaCloudUploadAlt, FaMobile } from 'react-icons/fa';
import MegaMenu from '../../../components/MegaMenu';
import Image from "next/image";
import { motion } from 'framer-motion';

export default function SectorSalud() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <BsHospital className="text-5xl text-blue-500" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Sector Salud
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                El sector salud está experimentando una transformación digital significativa. La E-salud representa una oportunidad para modernizar y optimizar los procesos hospitalarios en Venezuela. La gestión digital segura de datos médicos es clave para mejorar la eficiencia y competitividad de los centros de salud, cumpliendo con los requisitos legales y preparándose para el futuro digital.
              </p>
            </div>
            <div className="relative h-[400px] w-full">
              <motion.div
                className="w-full h-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/salud.png"
                  alt="Sector Salud"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Beneficios Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaHospital className="text-4xl text-blue-400" />,
                title: "Gestión Hospitalaria",
                description: "Firma digital de historias clínicas."
              },
              {
                icon: <FaUserMd className="text-4xl text-blue-400" />,
                title: "Atención Médica",
                description: "Documentación clínica segura."
              },
              {
                icon: <FaNotesMedical className="text-4xl text-blue-400" />,
                title: "Registros Médicos",
                description: "Gestión digital de expedientes."
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

      {/* Características Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Características</h2>
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
    </main>
  );
}
