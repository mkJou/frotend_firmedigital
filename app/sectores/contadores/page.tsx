'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsCalculator } from 'react-icons/bs';

export default function SectorContadores() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsCalculator className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Sector Contable
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para contadores y firmas contables.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Eficiencia</h3>
              <p className="text-gray-300">
                Optimiza procesos contables y reduce tiempos de gestión documental.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Cumplimiento</h3>
              <p className="text-gray-300">
                Asegura el cumplimiento de normativas fiscales y contables.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Organización</h3>
              <p className="text-gray-300">
                Gestión centralizada de documentación contable y fiscal.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Fiscal</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Declaraciones de impuestos</li>
                <li>• Facturas electrónicas</li>
                <li>• Estados financieros</li>
                <li>• Informes tributarios</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión Contable</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Libros contables</li>
                <li>• Balances</li>
                <li>• Reportes financieros</li>
                <li>• Auditorías</li>
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
              <h3 className="text-xl font-bold mb-4">Firma Digital</h3>
              <p className="text-gray-300">
                Firma electrónica avanzada para documentos contables.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Validación</h3>
              <p className="text-gray-300">
                Verificación automática de documentos fiscales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Archivo Digital</h3>
              <p className="text-gray-300">
                Almacenamiento seguro y organizado de documentos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Colaboración</h3>
              <p className="text-gray-300">
                Trabajo en equipo y compartición segura de documentos.
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
              <h3 className="text-xl font-bold mb-4">Software Contable</h3>
              <p className="text-gray-300">
                Integración con principales sistemas de contabilidad.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">Plataformas Fiscales</h3>
              <p className="text-gray-300">
                Conexión con sistemas gubernamentales de impuestos.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">ERPs</h3>
              <p className="text-gray-300">
                Compatibilidad con sistemas de gestión empresarial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
