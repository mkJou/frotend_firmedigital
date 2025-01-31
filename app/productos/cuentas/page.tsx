'use client';

import React from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineUserGroup } from 'react-icons/hi';

export default function CuentasMultiples() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <HiOutlineUserGroup className="text-5xl text-blue-500" />
            <h1 className="text-4xl md:text-6xl font-bold">
              Cuentas Múltiples
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mb-8">
            Gestiona múltiples usuarios y roles con nuestro sistema avanzado de administración de cuentas.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Crear Cuenta
          </button>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Gestión de Roles</h3>
              <p className="text-gray-300">
                Define y personaliza roles con diferentes niveles de acceso y permisos.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Jerarquías</h3>
              <p className="text-gray-300">
                Establece estructuras organizativas claras y eficientes.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Control de Acceso</h3>
              <p className="text-gray-300">
                Gestiona permisos granulares para cada usuario y grupo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Cuentas */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Cuentas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Administrador</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Control total del sistema</li>
                <li>• Gestión de usuarios</li>
                <li>• Configuración avanzada</li>
                <li>• Reportes completos</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Supervisor</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Monitoreo de actividades</li>
                <li>• Aprobación de documentos</li>
                <li>• Gestión de equipos</li>
                <li>• Reportes básicos</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Usuario</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Firma de documentos</li>
                <li>• Vista de documentos asignados</li>
                <li>• Perfil personal</li>
                <li>• Notificaciones</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seguridad */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Seguridad Avanzada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Autenticación</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Autenticación de dos factores</li>
                <li>• Single Sign-On (SSO)</li>
                <li>• Integración con Active Directory</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Monitoreo</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Registro de actividades</li>
                <li>• Alertas de seguridad</li>
                <li>• Auditoría de accesos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
