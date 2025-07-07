import React from 'react';
import { Metadata } from 'next';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import MegaMenu from '@/components/MegaMenu';

export const metadata: Metadata = {
  title: 'Términos y Condiciones - FIRMEDIGITAL',
  description: 'Términos de servicio para el uso de la plataforma de certificación y firma electrónica FIRMEDIGITAL, conforme a la Ley de Firmas Electrónicas de Venezuela.',
  keywords: 'términos, condiciones, servicio, firma electrónica, certificación digital, SUSCERTE, Venezuela, PSC',
  openGraph: {
    title: 'Términos y Condiciones - FIRMEDIGITAL',
    description: 'Términos de servicio para el uso de nuestra plataforma de certificación digital en Venezuela.',
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      
      {/* MegaMenu */}
      <MegaMenu />
      
      {/* Contenido principal */}
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header con ícono centrado */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                <IoShieldCheckmarkOutline className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Términos de servicio para el uso de la plataforma de certificación y firma electrónica FIRMEDIGITAL
            </p>
          </div>

          {/* Contenido de términos */}
          <section className="space-y-12">
            {/* Sección 1: Alcance */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                1. Alcance
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Estos Términos rigen el uso del Servicio de firma y certificación digital, conforme a la{' '}
                <span className="text-blue-400 font-medium">Ley de Firmas Electrónicas (Gaceta Oficial N° 37.148)</span>.
              </p>
            </div>

            {/* Sección 2: Requisitos */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                2. Requisitos
              </h2>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Ser mayor de 18 años o representado legalmente.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Proporcionar información veraz y actualizada.
                </li>
              </ul>
            </div>

            {/* Sección 3: Certificados Digitales */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                3. Certificados Digitales
              </h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  FIRMEDIGITAL actúa como{' '}
                  <span className="text-blue-400 font-medium">Prestador de Servicios de Certificación (PSC)</span>{' '}
                  autorizado por <span className="text-blue-400 font-medium">SUSCERTE</span>.
                </p>
                <p>
                  Los certificados tienen validez legal en Venezuela y se emiten bajo estándares internacionales.
                </p>
                <p>
                  No conservamos copias de los certificados después de su generación.
                </p>
              </div>
            </div>

            {/* Sección 4: Responsabilidades del Usuario */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                4. Responsabilidades del Usuario
              </h2>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Guardar de manera segura su clave privada y certificado.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Reportar cualquier uso no autorizado dentro de las 24 horas.
                </li>
              </ul>
            </div>

            {/* Sección 5: Limitación de Responsabilidad */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                5. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-300 text-lg mb-4">
                No nos hacemos responsables por:
              </p>
              <ul className="space-y-3 text-gray-300 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Pérdida de certificados por negligencia del usuario.
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">•</span>
                  Interrupciones del Servicio por casos fortuitos (ej. fallas eléctricas).
                </li>
              </ul>
            </div>

            {/* Sección 6: Ley Aplicable */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white border-b border-blue-500/30 pb-4">
                6. Ley Aplicable
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Estos Términos se rigen por las leyes de la{' '}
                <span className="text-blue-400 font-medium">República Bolivariana de Venezuela</span>.{' '}
                Cualquier disputa se resolverá en los tribunales competentes de Caracas.
              </p>
            </div>

            {/* Información de contacto */}
            <div className="mt-16 pt-8 border-t border-gray-700">
              <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30 backdrop-blur-sm">
                <p className="text-center text-lg">
                  <strong className="text-white">Contacto:</strong>{' '}
                  <a href="mailto:info@firmedigital.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                    info@firmedigital.com
                  </a>
                  {' '} │ Teléfono: <span className="text-blue-400">+58 424-7100380</span>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 