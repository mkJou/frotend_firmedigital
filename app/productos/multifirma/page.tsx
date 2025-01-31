'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { AiOutlineFileSync } from 'react-icons/ai';

export default function Multifirma() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <AiOutlineFileSync className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Multifirma
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Solución avanzada para la firma múltiple de documentos, perfecta para equipos y organizaciones.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Probar Ahora
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Firma en Lote</h3>
              <p className="text-gray-300">
                Firma múltiples documentos simultáneamente, ahorrando tiempo y esfuerzo.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Flujos Personalizados</h3>
              <p className="text-gray-300">
                Define el orden y las condiciones de firma según tus necesidades.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Control Total</h3>
              <p className="text-gray-300">
                Monitorea el estado de cada firma y gestiona los documentos en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características Avanzadas */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Avanzadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión de Grupos</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Crea grupos de firmantes</li>
                <li>• Asigna roles y permisos</li>
                <li>• Gestiona accesos y visibilidad</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Notificaciones</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Alertas automáticas</li>
                <li>• Recordatorios programados</li>
                <li>• Seguimiento en tiempo real</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Encriptación de extremo a extremo</li>
                <li>• Verificación en dos pasos</li>
                <li>• Registro de auditoría</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Integración</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• API REST completa</li>
                <li>• Webhooks personalizables</li>
                <li>• SDKs para múltiples plataformas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
