'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { BsBook } from 'react-icons/bs';

export default function SectorEducacion() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BsBook className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Sector Educativo
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Soluciones digitales especializadas para instituciones educativas y centros de formación.
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
              <h3 className="text-2xl font-bold mb-4">Eficiencia Administrativa</h3>
              <p className="text-gray-300">
                Optimización de procesos académicos y administrativos.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
              <p className="text-gray-300">
                Protección de datos académicos y documentación sensible.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Accesibilidad</h3>
              <p className="text-gray-300">
                Acceso remoto a documentos y servicios educativos.
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
              <h3 className="text-2xl font-bold mb-4">Documentación Académica</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Títulos y certificados</li>
                <li>• Expedientes académicos</li>
                <li>• Planes de estudio</li>
                <li>• Evaluaciones y calificaciones</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión Administrativa</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Matrículas y inscripciones</li>
                <li>• Contratos educativos</li>
                <li>• Documentación del personal</li>
                <li>• Políticas institucionales</li>
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
                Firma electrónica para documentos académicos oficiales.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Verificación</h3>
              <p className="text-gray-300">
                Sistema de validación de documentos académicos.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Colaboración</h3>
              <p className="text-gray-300">
                Herramientas para trabajo colaborativo educativo.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Integración</h3>
              <p className="text-gray-300">
                Conexión con sistemas de gestión educativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Niveles Educativos */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Soluciones por Nivel Educativo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Educación Superior</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Gestión de títulos universitarios</li>
                <li>• Certificaciones académicas</li>
                <li>• Investigación y desarrollo</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Educación Media</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Expedientes escolares</li>
                <li>• Boletines de calificaciones</li>
                <li>• Certificados de estudios</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Formación Continua</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Certificados profesionales</li>
                <li>• Diplomas de cursos</li>
                <li>• Acreditaciones especiales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
