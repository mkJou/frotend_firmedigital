'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsGlobe } from 'react-icons/bs';

export default function SectorGobierno() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsGlobe className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Sector Gubernamental
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para entidades gubernamentales y servicios públicos.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Solicitar Información
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Transparencia</h3>
              <p className="text-gray-300">
                Gestión transparente y trazable de documentos y procesos gubernamentales.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
              <p className="text-gray-300">
                Máxima protección para información sensible y documentos oficiales.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Eficiencia</h3>
              <p className="text-gray-300">
                Optimización de procesos administrativos y reducción de tiempos de gestión.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Oficial</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Resoluciones administrativas</li>
                <li>• Documentos oficiales</li>
                <li>• Contratos públicos</li>
                <li>• Certificaciones gubernamentales</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión Administrativa</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Expedientes digitales</li>
                <li>• Trámites ciudadanos</li>
                <li>• Procesos internos</li>
                <li>• Comunicaciones oficiales</li>
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
              <h3 className="text-xl font-bold mb-4">Firma Cualificada</h3>
              <p className="text-gray-300">
                Firma electrónica con máximo valor legal para documentos oficiales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Trazabilidad</h3>
              <p className="text-gray-300">
                Seguimiento completo de documentos y acciones administrativas.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Cumplimiento</h3>
              <p className="text-gray-300">
                Conformidad con normativas y regulaciones gubernamentales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Interoperabilidad</h3>
              <p className="text-gray-300">
                Integración con otros sistemas y plataformas gubernamentales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seguridad y Cumplimiento */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Seguridad y Cumplimiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Certificaciones</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• ISO 27001</li>
                <li>• Esquema Nacional de Seguridad</li>
                <li>• Certificaciones específicas del sector</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Protección de Datos</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Encriptación avanzada</li>
                <li>• Control de acceso granular</li>
                <li>• Auditoría de seguridad</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Disponibilidad</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Alta disponibilidad 24/7</li>
                <li>• Respaldo continuo</li>
                <li>• Plan de continuidad</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
