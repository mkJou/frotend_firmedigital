'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsGlobe, BsShieldCheck, BsPeople, BsGear, BsFolder, BsFileEarmark, BsPerson } from 'react-icons/bs';
import { FaLandmark, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

const characteristics = [
  {
    icon: <BsGear className="text-4xl text-blue-500" />,
    title: "Impulsa la Eficiencia",
    description: "Automatiza las tareas manuales de gestión documental con soluciones fáciles de implementar e integrar con tus sistemas existentes."
  },
  {
    icon: <BsPeople className="text-4xl text-blue-500" />,
    title: "Involucra a los Electores",
    description: "Ofrece servicios digitales 24/7 con herramientas móviles que mejoran la experiencia ciudadana."
  },
  {
    icon: <BsShieldCheck className="text-4xl text-blue-500" />,
    title: "Priorizar la Seguridad",
    description: "Protege los datos con soluciones autorizadas por SUSCERTE, garantizando la máxima seguridad en cada proceso."
  },
  {
    icon: <BsFolder className="text-4xl text-blue-500" />,
    title: "Gestión de Casos",
    description: "Gestiona eficientemente grandes volúmenes de documentación con nuestra plataforma segura y conveniente."
  },
  {
    icon: <BsFileEarmark className="text-4xl text-blue-500" />,
    title: "Permisos y Licencias",
    description: "Simplifica la emisión de permisos y licencias manteniendo registros de auditoría completos y seguros."
  },
  {
    icon: <BsPerson className="text-4xl text-blue-500" />,
    title: "Gestión del Capital Humano",
    description: "Moderniza los procesos de RR.HH. con herramientas automatizadas para mejor reclutamiento y retención."
  }
];

const benefits = [
  {
    icon: <FaLandmark className="text-4xl text-blue-400" />,
    title: "Gestión Gubernamental",
    description: "Firma digital de documentos oficiales."
  },
  {
    icon: <FaUserTie className="text-4xl text-blue-400" />,
    title: "Trámites Ciudadanos",
    description: "Servicios digitales para la ciudadanía."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-blue-400" />,
    title: "Seguridad Estatal",
    description: "Protección de documentos gubernamentales."
  }
];

const Card = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
      <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
        <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
            {icon}
          </div>
          <p className="text-gray-300 text-center">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function SectorGobierno() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <BsGlobe className="text-5xl text-blue-500" />
                <h1 className="text-4xl md:text-6xl font-bold">
                  Reimaginar las Experiencias Gubernamentales
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                Transforma y agiliza de manera segura documentos, formularios y contratos, asegurando que los servicios sean fácilmente accesibles y que los procesos se ejecuten sin contratiempos. Con Firmedigital, proporcionamos soluciones que permiten a las entidades gubernamentales ofrecer experiencias fluidas y eficientes.
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
                  src="/images/gov.png"
                  alt="Gobierno Digital"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {characteristics.map((feature, index) => (
              <Card key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 px-4 md:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Beneficios</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
