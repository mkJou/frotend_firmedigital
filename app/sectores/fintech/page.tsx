'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsCpu } from 'react-icons/bs';

export default function SectorFintech() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsCpu className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Tecnología Financiera
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales avanzadas para empresas fintech e instituciones financieras.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Explorar Soluciones
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad Avanzada</h3>
              <p className="text-gray-300">
                Protección de primer nivel para transacciones y datos financieros.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Cumplimiento Regulatorio</h3>
              <p className="text-gray-300">
                Conformidad con normativas financieras y estándares del sector.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Escalabilidad</h3>
              <p className="text-gray-300">
                Soluciones que crecen con tu negocio y se adaptan a tus necesidades.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Financiera</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Contratos financieros</li>
                <li>• Documentos de apertura de cuenta</li>
                <li>• Acuerdos de préstamo</li>
                <li>• Documentación KYC</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Procesos Digitales</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Onboarding digital</li>
                <li>• Verificación de identidad</li>
                <li>• Autorizaciones electrónicas</li>
                <li>• Gestión de transacciones</li>
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
              <h3 className="text-xl font-bold mb-4">KYC Digital</h3>
              <p className="text-gray-300">
                Proceso de verificación de identidad totalmente digital.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Smart Contracts</h3>
              <p className="text-gray-300">
                Contratos inteligentes y automatización de procesos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">API Banking</h3>
              <p className="text-gray-300">
                Integración con servicios bancarios y financieros.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Análisis de Riesgo</h3>
              <p className="text-gray-300">
                Evaluación automatizada de riesgos financieros.
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
                <li>• PCI DSS</li>
                <li>• ISO 27001</li>
                <li>• SOC 2</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Encriptación</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• End-to-end</li>
                <li>• En reposo</li>
                <li>• En tránsito</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Monitoreo</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 24/7 en tiempo real</li>
                <li>• Detección de fraude</li>
                <li>• Alertas automáticas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
