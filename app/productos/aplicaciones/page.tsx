'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLockClosed, HiOutlineShieldCheck, HiOutlinePuzzle, HiOutlineDesktopComputer } from 'react-icons/hi';
import { IoRocketOutline, IoShieldCheckmarkOutline, IoHeadsetOutline } from 'react-icons/io5';

export default function AplicacionesAcceso() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-12 md:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div className="pt-16 md:pt-24">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8">
                <HiOutlineLockClosed className="text-4xl md:text-5xl text-blue-500" />
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                  Aplicaciones de Acceso
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-6 md:mb-8">
                Gestiona de forma segura y eficiente el acceso a tus sistemas con Firmedigital. Nuestra solución simplifica la autenticación mientras mantiene los más altos estándares de seguridad.
              </p>
              <div className="text-sm md:text-base text-gray-300 max-w-3xl mb-6 md:mb-8">
                <p className="leading-relaxed">
                  Protege tus recursos digitales con nuestra plataforma de control de accesos. Implementamos autenticación multifactor y encriptación avanzada para garantizar que solo usuarios autorizados accedan a tu información sensible.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-4 md:mt-0 pt-16 md:pt-24">
              <svg
                viewBox="0 0 800 600"
                className="w-full max-w-[400px] sm:max-w-2xl h-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.1 }} />
                    <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 0.3 }} />
                  </linearGradient>
                  <linearGradient id="deviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#1F2937', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#111827', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#2563EB', stopOpacity: 1 }} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Dispositivo principal */}
                <g transform="translate(200, 100)">
                  {/* Marco del dispositivo */}
                  <rect
                    x="0"
                    y="0"
                    width="400"
                    height="300"
                    rx="20"
                    fill="url(#deviceGrad)"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />

                  {/* Pantalla */}
                  <rect
                    x="20"
                    y="20"
                    width="360"
                    height="260"
                    rx="10"
                    fill="url(#screenGlow)"
                  />

                  {/* Elementos de interfaz */}
                  <g transform="translate(60, 60)">
                    {/* Círculo central de autenticación */}
                    <circle
                      cx="140"
                      cy="80"
                      r="50"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="4"
                      filter="url(#glow)"
                    />
                    <circle
                      cx="140"
                      cy="80"
                      r="35"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      opacity="0.2"
                    />

                    {/* Candado mejorado */}
                    <g transform="translate(100, 45)">
                      {/* Círculo de fondo para el candado */}
                      <circle
                        cx="80"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="1"
                        opacity="0.2"
                      />
                      
                      {/* Arco superior del candado */}
                      <path
                        d="M65 35 V20 C65 5 80 -5 95 -5 C110 -5 125 5 125 20 V35"
                        fill="none"
                        stroke="url(#lockGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />
                      
                      {/* Cuerpo del candado */}
                      <path
                        d="M55 35 H135 V75 C95 85 55 75 55 35"
                        fill="none"
                        stroke="url(#lockGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                      />
                      
                      {/* Detalles del candado */}
                      <circle
                        cx="95"
                        cy="50"
                        r="8"
                        fill="none"
                        stroke="#60A5FA"
                        strokeWidth="4"
                      />
                      <path
                        d="M95 54 L95 65"
                        stroke="#60A5FA"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      
                      {/* Detalles de brillo */}
                      <path
                        d="M65 35 C75 35 115 35 125 35"
                        stroke="#93C5FD"
                        strokeWidth="2"
                        opacity="0.5"
                      />
                    </g>

                    {/* Líneas de datos */}
                    <g>
                      {[0, 1, 2].map((i) => (
                        <path
                          key={i}
                          d={`M40 ${150 + i * 20} L240 ${150 + i * 20}`}
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray="8 4"
                          opacity="0.6"
                        />
                      ))}
                    </g>

                    {/* Puntos de conexión */}
                    {[0, 60, 120, 180].map((x) => (
                      <circle
                        key={x}
                        cx={x + 40}
                        cy="80"
                        r="4"
                        fill="#3B82F6"
                      />
                    ))}
                  </g>
                </g>

                {/* Elementos flotantes de seguridad */}
                <g transform="translate(150, 450)">
                  {[0, 1, 2].map((i) => (
                    <g key={i} transform={`translate(${i * 200}, 0)`}>
                      <rect
                        x="0"
                        y="0"
                        width="150"
                        height="40"
                        rx="20"
                        fill="#1F2937"
                        stroke="#3B82F6"
                        strokeWidth="1"
                      />
                      <circle
                        cx="30"
                        cy="20"
                        r="10"
                        fill="#3B82F6"
                        opacity="0.5"
                      />
                      <line
                        x1="50"
                        y1="20"
                        x2="130"
                        y2="20"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          </div>
          
          {/* Quote section moved outside the grid */}
          <div className="w-full mt-12 md:mt-16">
            <div className="bg-gray-900/50 p-6 md:p-8 rounded-xl border border-blue-500/20">
              <p className="text-2xl md:text-3xl text-blue-400 font-semibold italic text-center">
                "Seguridad sin complicaciones: Tu acceso digital confiable"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-blue-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <HiOutlineShieldCheck className="text-3xl text-blue-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Seguridad Avanzada</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Implementa múltiples capas de seguridad con autenticación multifactor y encriptación de última generación.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <HiOutlinePuzzle className="text-3xl text-purple-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Integración Flexible</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Se adapta perfectamente a tus sistemas existentes sin interrumpir los flujos de trabajo actuales.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-green-500/20 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <HiOutlineDesktopComputer className="text-3xl text-green-500" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold">Interfaz Intuitiva</h3>
              </div>
              <p className="text-sm md:text-base text-gray-300">
                Panel de control fácil de usar que simplifica la gestión de accesos y permisos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Por qué Elegir Firmedigital</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <IoShieldCheckmarkOutline className="text-4xl text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Tecnología Avanzada</h3>
                </div>
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                    <IoShieldCheckmarkOutline className="text-4xl text-blue-400" />
                  </div>
                  <p className="text-gray-300 text-center">Tecnología de punta para máxima seguridad.</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineLockClosed className="text-4xl text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Confianza y Confiabilidad</h3>
                </div>
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                    <HiOutlineLockClosed className="text-4xl text-purple-400" />
                  </div>
                  <p className="text-gray-300 text-center">Años de experiencia y éxito comprobado.</p>
                </div>
              </div>
            </div>
            <div className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <IoHeadsetOutline className="text-4xl text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Soporte Dedicado</h3>
                </div>
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                    <IoHeadsetOutline className="text-4xl text-green-400" />
                  </div>
                  <p className="text-gray-300 text-center">Soporte experto disponible cuando lo necesites.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caso de Uso */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Caso de Uso: Sector de Ingeniería</h2>
          <div className="bg-gray-900 p-8 rounded-xl">
            <div className="space-y-6 text-gray-300">
              <p className="leading-relaxed">
                Las aplicaciones de acceso de Firmedigital son ideales para el sector de ingenieros, ya que permiten gestionar de manera segura y eficiente el acceso a proyectos y datos sensibles. En una firma de ingeniería, estas aplicaciones pueden asegurar que solo el personal autorizado pueda acceder a planos, especificaciones técnicas y documentos confidenciales, mejorando la colaboración mientras se protege la propiedad intelectual.
              </p>
              <p className="leading-relaxed">
                La autenticación multifactor y la encriptación avanzada garantizan que los datos críticos estén siempre seguros, permitiendo a los ingenieros centrarse en innovar y ejecutar proyectos con total confianza.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
