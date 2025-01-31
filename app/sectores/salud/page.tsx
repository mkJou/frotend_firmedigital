'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsHospital } from 'react-icons/bs';

export default function SectorSalud() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsHospital className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Sector Salud
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para instituciones de salud y profesionales médicos.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Solicitar Demo
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad de Datos</h3>
              <p className="text-gray-300">
                Protección de información sensible de pacientes según normativas HIPAA.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Eficiencia Clínica</h3>
              <p className="text-gray-300">
                Optimización de procesos administrativos y clínicos.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Accesibilidad</h3>
              <p className="text-gray-300">
                Acceso seguro a documentación médica desde cualquier lugar.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Clínica</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Historias clínicas electrónicas</li>
                <li>• Consentimientos informados</li>
                <li>• Recetas médicas digitales</li>
                <li>• Informes de laboratorio</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión Administrativa</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Documentos de seguros</li>
                <li>• Facturación médica</li>
                <li>• Autorizaciones de tratamiento</li>
                <li>• Registros de personal</li>
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
              <h3 className="text-xl font-bold mb-4">Firma Biométrica</h3>
              <p className="text-gray-300">
                Autenticación segura para profesionales de la salud.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Encriptación</h3>
              <p className="text-gray-300">
                Protección avanzada de datos sensibles de pacientes.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Trazabilidad</h3>
              <p className="text-gray-300">
                Seguimiento completo de documentos y accesos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Cumplimiento</h3>
              <p className="text-gray-300">
                Conformidad con regulaciones de salud.
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
              <h3 className="text-xl font-bold mb-4">Sistemas HIS</h3>
              <p className="text-gray-300">
                Integración con sistemas de información hospitalaria.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">EMR/EHR</h3>
              <p className="text-gray-300">
                Conexión con registros médicos electrónicos.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold mb-4">PACS</h3>
              <p className="text-gray-300">
                Compatibilidad con sistemas de archivo y comunicación de imágenes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
