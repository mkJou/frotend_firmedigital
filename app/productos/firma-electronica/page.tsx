'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { AiOutlineFileDone } from 'react-icons/ai';

export default function FirmaElectronica() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <AiOutlineFileDone className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Firma Electrónica
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Solución de firma digital segura y legal que garantiza la autenticidad e integridad de tus documentos electrónicos.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Comenzar Ahora
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Validez Legal</h3>
              <p className="text-gray-300">
                Firma electrónica con pleno valor legal conforme a la normativa vigente.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Seguridad Avanzada</h3>
              <p className="text-gray-300">
                Certificados digitales y encriptación de última generación.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Fácil Integración</h3>
              <p className="text-gray-300">
                API robusta para integrar la firma electrónica en tus sistemas existentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Firma */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Proceso Simple y Seguro</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">1</div>
              <h3 className="text-xl font-bold mb-4">Sube tu Documento</h3>
              <p className="text-gray-300">Carga el documento que necesitas firmar</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">2</div>
              <h3 className="text-xl font-bold mb-4">Selecciona Firmantes</h3>
              <p className="text-gray-300">Elige quién debe firmar el documento</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">3</div>
              <h3 className="text-xl font-bold mb-4">Firma Digital</h3>
              <p className="text-gray-300">Firma con tu certificado digital</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">4</div>
              <h3 className="text-xl font-bold mb-4">Documento Firmado</h3>
              <p className="text-gray-300">Recibe tu documento firmado y verificado</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
