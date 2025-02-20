'use client';
import { useEffect, useState } from 'react';
import { HiOutlineDocumentText } from 'react-icons/hi';
import MegaMenu from '@/components/MegaMenu';
import { BsFillShieldLockFill, BsSpeedometer2 } from 'react-icons/bs';
import { FaUserShield, FaMoneyBillWave, FaDatabase, FaHistory, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const SkeletonCard = () => (
  <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-2/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

export default function FirmaElectronica() {
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
      <section className="hero-section bg-gradient-to-b from-black via-black to-[#111827] text-white py-24 px-4 mt-[100px] relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {isLoading ? (
            <SkeletonHero />
          ) : (
            <>
              <HiOutlineDocumentText className="hero-icon text-6xl mx-auto mb-4 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <h1 
                className="hero-title text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              >
                ¿Qué es la Firma Electrónica de Firmedigital?
              </h1>
              <p className="hero-text text-xl max-w-3xl mx-auto text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                La firma electrónica de Firmedigital permite a las personas firmar documentos electrónicamente, sin necesidad de papel ni tinta. A diferencia de la firma tradicional, la firma electrónica se realiza a través de dispositivos electrónicos como ordenadores, tabletas o smartphones, y tiene la misma validez legal que una firma manuscrita.
              </p>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
      </section>

      {/* Características Section */}
      <section className="features-section py-20 px-4 bg-gradient-to-b from-[#111827] to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              <>
                {[
                  {
                    icon: <BsFillShieldLockFill className="text-4xl text-blue-500" />,
                    title: "Autenticidad",
                    description: "Verificación segura de identidad mediante contraseñas, códigos SMS o biometría."
                  },
                  {
                    icon: <FaUserShield className="text-4xl text-purple-500" />,
                    title: "Integridad",
                    description: "Garantía de que el documento permanece inalterado desde su firma."
                  },
                  {
                    icon: <BsSpeedometer2 className="text-4xl text-blue-500" />,
                    title: "No Repudio",
                    description: "Registro verificable de cada firma con identidad y tiempo de ejecución."
                  },
                  {
                    icon: <FaUserShield className="text-4xl text-purple-500" />,
                    title: "Eficiencia",
                    description: "Firma de documentos desde cualquier lugar y dispositivo, sin papel."
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
              </>
            )}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <BsSpeedometer2 className="text-4xl text-blue-500" />,
                title: "Eficiencia Inmediata",
                description: "Firma documentos al instante desde cualquier lugar, ahorrando tiempo valioso."
              },
              {
                icon: <BsFillShieldLockFill className="text-4xl text-purple-500" />,
                title: "Seguridad Inquebrantable",
                description: "Protección avanzada con validez legal y cumplimiento normativo."
              },
              {
                icon: <FaMoneyBillWave className="text-4xl text-blue-500" />,
                title: "Ahorro de Costos",
                description: "Elimina gastos de papel, impresión y almacenamiento físico."
              },
              {
                icon: <FaDatabase className="text-4xl text-purple-500" />,
                title: "Acceso y Almacenamiento",
                description: "Gestión centralizada y acceso inmediato a documentos firmados."
              },
              {
                icon: <FaHistory className="text-4xl text-blue-500" />,
                title: "Trazabilidad Completa",
                description: "Seguimiento detallado de firmas, fechas y participantes."
              },
              {
                icon: <FaLeaf className="text-4xl text-purple-500" />,
                title: "Sostenibilidad Ambiental",
                description: "Reduce el impacto ambiental eliminando el uso de papel."
              }
            ].map((benefit, index) => (
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
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {benefit.title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                      {benefit.description}
                    </p>
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
