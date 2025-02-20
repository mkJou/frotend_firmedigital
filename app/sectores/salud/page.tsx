'use client';

import React from 'react';
import { BsHospital } from 'react-icons/bs';
import { FaUserPlus, FaRocket, FaShieldAlt, FaLock, FaUserMd, FaBuilding, FaShoppingCart } from 'react-icons/fa';
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
                Un hospital es un centro sanitario al servicio de las personas. Sin embargo, también es una organización compleja con innumerables procesos internos y externos. En Venezuela, se observa un cambio de paradigma. La E-salud o cibermedicina se ve cada vez más como una oportunidad. La transmisión y el almacenamiento seguros de datos personales en ecosistemas digitales se consideran una oportunidad para ser competitivos y estar preparados para el futuro. Por ley, todos los hospitales están obligados a impulsar la transformación digital en favor de la seguridad y la eficiencia.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                icon: <div className="flex justify-center"><FaUserPlus className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Experiencia del Paciente Mejorada",
                description: "La implementación de la firma electrónica mejora significativamente la experiencia del paciente, ofreciendo una interacción más moderna y eficiente. Los pacientes pueden gestionar sus trámites de manera digital."
              },
              {
                icon: <div className="flex justify-center"><FaRocket className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Máxima Velocidad y Eficacia",
                description: "Nuestra solución se integra rápidamente en cualquier infraestructura informática. Con una interfaz intuitiva, no se necesita formación adicional para su equipo, externos o pacientes."
              },
              {
                icon: <div className="flex justify-center"><FaShieldAlt className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Máxima Seguridad y Conformidad",
                description: "El personal de la clínica, los pacientes y todas las partes interesadas firman con un efecto jurídicamente vinculante del 100%. Las firmas electrónicas cualificadas son legalmente equivalentes a las firmas manuscritas."
              },
              {
                icon: <div className="flex justify-center"><FaLock className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Máxima Protección de Datos",
                description: "Todos los servicios se alojan dentro de la UE y sin intervención de terceros países. El tratamiento de los datos sanitarios sensibles cumple las normas más estrictas."
              }
            ].map((benefit, index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                    {benefit.icon}
                    <h3 className="text-xl font-semibold text-gray-200">{benefit.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 text-center">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Características
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="flex justify-center"><FaUserMd className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Gestión de Pacientes",
                description: "Declaraciones de consentimiento, contratos de tratamiento, ingresos, altas, a través de un portal digital del paciente."
              },
              {
                icon: <div className="flex justify-center"><FaBuilding className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Procesos Internos",
                description: "Contratos de personal, referencias, resoluciones, acuerdos de accionistas, entre otros."
              },
              {
                icon: <div className="flex justify-center"><FaShoppingCart className="text-4xl text-blue-400 mb-4" /></div>,
                title: "Compras",
                description: "Contratos de compra, contratos de préstamo, adquisiciones, albaranes, etc."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                  <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-200">{feature.title}</h3>
                  </div>
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-gray-300 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-300 mt-12 text-lg italic">
            "Integración rápida, uso intuitivo y eficiencia mejorada."
          </p>
        </div>
      </section>
    </main>
  );
}
