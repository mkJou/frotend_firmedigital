'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaUserLock, FaUserCog, FaShieldAlt, FaChartLine, FaUsers, FaUserShield, FaHandshake, FaLock, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CuentasMultiples() {
  const isLoading = false;

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />

      {/* Cuentas Multiples Section */}
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
                Cuentas Multiples
              </h2>
              <p className="text-gray-300 text-lg md:text-xl">
                Con Firmedigital, simplifica la gestión de usuarios a través de nuestra función de cuentas múltiples. Esta herramienta te permite administrar permisos y roles con facilidad, asegurando que cada miembro del equipo tenga el acceso adecuado a documentos y procesos críticos. Además de mejorar la seguridad, esto fomenta una colaboración efectiva y optimiza la productividad de tu empresa.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
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
                src="/images/cm.svg"
                alt="Cuentas Multiples"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
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
                Características Principales
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <FaUserLock className="text-4xl text-blue-500" />,
                    title: "Acceso Simplificado",
                    description: "Control centralizado de acceso a documentos y transacciones."
                  },
                  {
                    icon: <FaUserCog className="text-4xl text-purple-500" />,
                    title: "Personalización de Permisos",
                    description: "Gestión precisa de permisos para visualización y firma de documentos."
                  },
                  {
                    icon: <FaShieldAlt className="text-4xl text-blue-500" />,
                    title: "Seguridad en Cada Paso",
                    description: "Protección multinivel para garantizar acceso solo a usuarios autorizados."
                  },
                  {
                    icon: <FaChartLine className="text-4xl text-purple-500" />,
                    title: "Monitoreo y Control",
                    description: "Seguimiento en tiempo real de accesos y transacciones digitales."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-4">
                          {feature.icon}
                        </div>
                        <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                          {feature.description}
                        </p>
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
                {[...Array(4)].map((_, i) => (
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
                Beneficios de las Cuentas Múltiples
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <FaUsers className="text-4xl text-blue-500" />,
                    title: "Gestión Centralizada",
                    description: "Control unificado de usuarios y accesos desde una plataforma."
                  },
                  {
                    icon: <FaUserShield className="text-4xl text-purple-500" />,
                    title: "Asignación de Roles",
                    description: "Definición precisa de roles y permisos por usuario."
                  },
                  {
                    icon: <FaHandshake className="text-4xl text-blue-500" />,
                    title: "Colaboración Eficiente",
                    description: "Trabajo simultáneo en documentos con acceso controlado."
                  },
                  {
                    icon: <FaChartBar className="text-4xl text-purple-500" />,
                    title: "Monitoreo de Actividades",
                    description: "Registro detallado de acciones para auditoría y control."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                        {feature.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                      <div className="flex flex-col items-center justify-center h-full">
                        <div className="mb-4">
                          {feature.icon}
                        </div>
                        <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                          {feature.description}
                        </p>
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
