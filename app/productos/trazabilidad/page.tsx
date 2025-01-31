'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineSearchCircle } from 'react-icons/hi';

export default function Trazabilidad() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <HiOutlineSearchCircle className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Trazabilidad
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Seguimiento detallado y transparente de todos tus procesos de firma digital.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Explorar Ahora
          </button>
        </div>
      </section>

      {/* Características Principales */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Registro Completo</h3>
              <p className="text-gray-300">
                Historial detallado de todas las acciones realizadas en cada documento.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Búsqueda Avanzada</h3>
              <p className="text-gray-300">
                Localiza rápidamente cualquier documento o acción mediante filtros personalizados.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Reportes Detallados</h3>
              <p className="text-gray-300">
                Genera informes personalizados sobre el estado y progreso de los documentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Seguimiento en Tiempo Real</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="min-w-[100px] text-blue-500 font-bold">Creación</div>
              <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Documento Creado</h3>
                <p className="text-gray-300">Registro de fecha, hora y usuario que crea el documento</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="min-w-[100px] text-blue-500 font-bold">Envío</div>
              <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Solicitud de Firma</h3>
                <p className="text-gray-300">Notificaciones enviadas a los firmantes designados</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="min-w-[100px] text-blue-500 font-bold">Firma</div>
              <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Proceso de Firma</h3>
                <p className="text-gray-300">Registro de cada firma realizada con timestamp y metadata</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="min-w-[100px] text-blue-500 font-bold">Completado</div>
              <div className="flex-1 bg-gray-800 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-2">Documento Finalizado</h3>
                <p className="text-gray-300">Confirmación de proceso completado y archivo final disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
