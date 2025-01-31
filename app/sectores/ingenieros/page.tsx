'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsTools } from 'react-icons/bs';

export default function SectorIngenieros() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsTools className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Sector Ingeniería
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para profesionales de la ingeniería y empresas constructoras.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Conocer Más
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión de Proyectos</h3>
              <p className="text-gray-300">
                Control y seguimiento eficiente de documentación técnica y aprobaciones.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Colaboración</h3>
              <p className="text-gray-300">
                Trabajo colaborativo en tiempo real con equipos distribuidos.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Cumplimiento</h3>
              <p className="text-gray-300">
                Asegura el cumplimiento de normativas y estándares de ingeniería.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Aplicaciones Específicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Documentación Técnica</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Planos y especificaciones</li>
                <li>• Memorias de cálculo</li>
                <li>• Informes técnicos</li>
                <li>• Certificaciones</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión de Contratos</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Contratos de obra</li>
                <li>• Órdenes de cambio</li>
                <li>• Actas de recepción</li>
                <li>• Documentos de licitación</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Especializadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Visualización CAD</h3>
              <p className="text-gray-300">
                Previsualización de archivos CAD y planos técnicos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Control de Versiones</h3>
              <p className="text-gray-300">
                Gestión de revisiones y cambios en documentos técnicos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Firmas Múltiples</h3>
              <p className="text-gray-300">
                Proceso de aprobación multi-nivel para documentos técnicos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Sellos Digitales</h3>
              <p className="text-gray-300">
                Sellado digital profesional para documentación técnica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Integraciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">Software CAD</h3>
              <p className="text-gray-300">
                Integración con principales programas de diseño.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">BIM</h3>
              <p className="text-gray-300">
                Compatibilidad con flujos de trabajo BIM.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">Project Management</h3>
              <p className="text-gray-300">
                Conexión con software de gestión de proyectos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
