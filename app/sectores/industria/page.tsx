'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsShop } from 'react-icons/bs';

export default function SectorIndustria() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsShop className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Industria y Comercio
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para el sector industrial y comercial.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Contactar Ahora
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Eficiencia Operativa</h3>
              <p className="text-gray-300">
                Optimización de procesos y reducción de tiempos de gestión.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Control Total</h3>
              <p className="text-gray-300">
                Gestión centralizada de documentos y procesos comerciales.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Trazabilidad</h3>
              <p className="text-gray-300">
                Seguimiento completo de documentación y transacciones.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Comercial</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Contratos comerciales</li>
                <li>• Órdenes de compra</li>
                <li>• Facturas electrónicas</li>
                <li>• Documentos de exportación</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión Interna</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Políticas y procedimientos</li>
                <li>• Documentación de calidad</li>
                <li>• Registros de producción</li>
                <li>• Informes de inventario</li>
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
                Firma electrónica segura para documentos comerciales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Automatización</h3>
              <p className="text-gray-300">
                Flujos de trabajo automatizados para procesos comerciales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Integración</h3>
              <p className="text-gray-300">
                Conexión con sistemas ERP y software de gestión.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Reportes</h3>
              <p className="text-gray-300">
                Informes detallados y análisis de datos comerciales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectores Específicos */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Sectores Específicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Manufactura</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Control de calidad</li>
                <li>• Gestión de producción</li>
                <li>• Cadena de suministro</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Comercio Minorista</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Gestión de inventario</li>
                <li>• Contratos con proveedores</li>
                <li>• Documentación de ventas</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Distribución</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Logística</li>
                <li>• Documentos de transporte</li>
                <li>• Gestión de pedidos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
