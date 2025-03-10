'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaQrcode, FaUserClock, FaShieldAlt, FaUsers, FaBell, FaPlug, FaLock, FaHistory, FaClock, FaCheckCircle, FaCalendarCheck, FaUserFriends, FaClipboardList, FaGlassCheers, FaBriefcase, FaMusic, FaTrophy } from 'react-icons/fa';

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

export default function Eventos() {
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
                    Firmedigital: Monitoreo de Eventos
                  </h1>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    En Firmedigital, entendemos la importancia de gestionar tus eventos de manera segura y eficiente. Nuestra plataforma te permite llevar un control detallado y preciso de las invitaciones y entradas, garantizando la transparencia y seguridad que necesitas.
                  </p>
                </>
              )}
            </div>
            <div className="flex-1 flex justify-center">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-[500px] h-[400px]"
              >
                <Image
                  src="/images/evento.png"
                  alt="Gestión de Eventos"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  className="drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Funciones Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Funciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCalendarCheck className="text-4xl text-blue-400" />,
                title: "Gestión de Eventos",
                description: "Organiza y coordina eventos con eficiencia y precisión."
              },
              {
                icon: <FaUserFriends className="text-4xl text-blue-400" />,
                title: "Control de Invitados",
                description: "Administra listas de invitados y confirmaciones fácilmente."
              },
              {
                icon: <FaClipboardList className="text-4xl text-blue-400" />,
                title: "Planificación Detallada",
                description: "Seguimiento completo de tareas y cronogramas."
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
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch">
            {[
              {
                icon: <FaGlassCheers className="text-4xl text-blue-400" />,
                title: "Eventos Sociales",
                description: "Gestión integral de eventos sociales."
              },
              {
                icon: <FaBriefcase className="text-4xl text-blue-400" />,
                title: "Eventos Corporativos",
                description: "Organización eficiente de conferencias y reuniones."
              },
              {
                icon: <FaMusic className="text-4xl text-blue-400" />,
                title: "Eventos Artísticos",
                description: "Coordinación de conciertos y espectáculos."
              },
              {
                icon: <FaTrophy className="text-4xl text-blue-400" />,
                title: "Eventos Deportivos",
                description: "Control de competencias y torneos deportivos."
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
    </main>
  );
}
