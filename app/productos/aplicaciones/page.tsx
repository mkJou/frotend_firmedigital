'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLockClosed } from 'react-icons/hi';

export default function AplicacionesAcceso() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <HiOutlineLockClosed className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Aplicaciones de Acceso
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Control de acceso seguro y eficiente para todas tus aplicaciones empresariales.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Solicitar Demo
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características de Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Autenticación Múltiple</h3>
              <p className="text-gray-300">
                Múltiples capas de verificación para garantizar la seguridad del acceso.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Control Granular</h3>
              <p className="text-gray-300">
                Define permisos específicos para cada usuario y aplicación.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Monitoreo en Tiempo Real</h3>
              <p className="text-gray-300">
                Supervisa y registra toda la actividad de acceso en tiempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Métodos de Autenticación */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Métodos de Autenticación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Biométrico</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Huella digital</li>
                <li>• Reconocimiento facial</li>
                <li>• Escaneo de iris</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">2FA/MFA</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Códigos SMS</li>
                <li>• Apps autenticadoras</li>
                <li>• Email verification</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Single Sign-On</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• SAML 2.0</li>
                <li>• OAuth 2.0</li>
                <li>• OpenID Connect</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Certificados</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Certificados digitales</li>
                <li>• Smart cards</li>
                <li>• Token físicos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integración */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Integración Universal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Sistemas Soportados</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Active Directory</li>
                <li>• LDAP</li>
                <li>• Azure AD</li>
                <li>• G Suite</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">APIs y SDKs</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• REST API completa</li>
                <li>• SDKs multiplataforma</li>
                <li>• Documentación detallada</li>
                <li>• Soporte técnico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
