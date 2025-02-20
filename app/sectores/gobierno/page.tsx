'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsGlobe, BsShieldCheck, BsPeople, BsGear, BsFolder, BsFileEarmark, BsPerson } from 'react-icons/bs';
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
    icon: <BsGear className="text-4xl text-blue-500" />,
    title: "Eficiencia Administrativa",
    description: "Reduce significativamente el tiempo de procesamiento de documentos y optimiza recursos."
  },
  {
    icon: <BsShieldCheck className="text-4xl text-blue-500" />,
    title: "Seguridad y Confidencialidad",
    description: "Garantiza la integridad de los documentos con acceso controlado y verificación de autenticidad."
  },
  {
    icon: <BsPeople className="text-4xl text-blue-500" />,
    title: "Accesibilidad",
    description: "Firma documentos desde cualquier lugar y dispositivo, sin necesidad de presencia física."
  },
  {
    icon: <BsFileEarmark className="text-4xl text-blue-500" />,
    title: "Transparencia",
    description: "Facilita la trazabilidad y auditoría de procesos para una gestión más transparente."
  },
  {
    icon: <BsGlobe className="text-4xl text-blue-500" />,
    title: "Sostenibilidad",
    description: "Reduce el uso de papel contribuyendo a prácticas más sostenibles y ecológicas."
  }
];

const Card = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-xl h-[250px] flex flex-col items-center justify-center text-center cursor-pointer group relative"
      whileHover={{ y: -5 }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 opacity-100 group-hover:opacity-0">
        <motion.div className="mb-4">
          {icon}
        </motion.div>
        <motion.h3 className="text-xl font-bold">
          {title}
        </motion.h3>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.div className="mb-4">
          {icon}
        </motion.div>
        <motion.p className="text-gray-300 w-[80%]">
          {description}
        </motion.p>
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Solicitar Demo
              </button>
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
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex-none w-[300px] snap-center">
                  <Card {...benefit} />
                </div>
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
