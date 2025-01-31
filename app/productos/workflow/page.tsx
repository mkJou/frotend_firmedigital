'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLightningBolt } from 'react-icons/hi';

export default function Workflow() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <HiOutlineLightningBolt className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Workflow
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Automatiza y optimiza tus flujos de trabajo con nuestra solución integral de gestión de procesos.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Empezar Ahora
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Automatización</h3>
              <p className="text-gray-300">
                Automatiza tareas repetitivas y procesos complejos con facilidad.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Personalización</h3>
              <p className="text-gray-300">
                Adapta los flujos de trabajo a tus necesidades específicas.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Integración</h3>
              <p className="text-gray-300">
                Conecta con tus herramientas y sistemas existentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Workflow */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Proceso de Workflow</h2>
          <div className="relative">
            {/* Línea de conexión */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Diseño</h3>
                <p className="text-gray-300">Crea flujos de trabajo personalizados</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Asignación</h3>
                <p className="text-gray-300">Define roles y responsabilidades</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Ejecución</h3>
                <p className="text-gray-300">Implementa y monitorea el proceso</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">4</div>
                <h3 className="text-xl font-bold mb-2">Optimización</h3>
                <p className="text-gray-300">Analiza y mejora continuamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Workflow */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Secuencial</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Procesos paso a paso</li>
                <li>• Aprobaciones en cadena</li>
                <li>• Seguimiento lineal</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Paralelo</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Tareas simultáneas</li>
                <li>• Múltiples aprobadores</li>
                <li>• Procesos concurrentes</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Condicional</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Rutas dinámicas</li>
                <li>• Decisiones automatizadas</li>
                <li>• Reglas personalizadas</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow de Estado</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Control de estados</li>
                <li>• Transiciones definidas</li>
                <li>• Seguimiento de progreso</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
