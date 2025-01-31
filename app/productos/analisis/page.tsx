'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineChartBar } from 'react-icons/hi';

export default function Analisis() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <HiOutlineChartBar className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Análisis Personalizable
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Obtén insights valiosos con nuestras herramientas de análisis adaptadas a tus necesidades específicas.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Comenzar Análisis
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características del Análisis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Dashboards Personalizados</h3>
              <p className="text-gray-300">
                Crea paneles de control adaptados a tus métricas clave.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Reportes Automáticos</h3>
              <p className="text-gray-300">
                Genera y programa informes detallados de forma automática.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Análisis Predictivo</h3>
              <p className="text-gray-300">
                Anticipa tendencias y comportamientos con IA avanzada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Clave */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Métricas Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">98%</div>
              <h3 className="text-xl font-bold mb-2">Precisión</h3>
              <p className="text-gray-300">En análisis de datos</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
              <h3 className="text-xl font-bold mb-2">Monitoreo</h3>
              <p className="text-gray-300">Tiempo real</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">+50</div>
              <h3 className="text-xl font-bold mb-2">Tipos de Reportes</h3>
              <p className="text-gray-300">Personalizables</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
              <h3 className="text-xl font-bold mb-2">Exportable</h3>
              <p className="text-gray-300">Múltiples formatos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Análisis */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Análisis Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Análisis de Uso</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Patrones de firma</li>
                <li>• Volumen de documentos</li>
                <li>• Tiempos de proceso</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Análisis de Rendimiento</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Eficiencia del proceso</li>
                <li>• Cuellos de botella</li>
                <li>• Optimización de recursos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
