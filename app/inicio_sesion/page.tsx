'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import Link from 'next/link';

export default function InicioSesion() {
  const [formData, setFormData] = useState({
    usuario: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de inicio de sesión
    console.log('Datos del formulario:', formData);
  };

  const handleReset = () => {
    setFormData({
      usuario: '',
      password: ''
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <MegaMenu />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-gray-300 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Ingrese su usuario"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Ingrese su contraseña"
                  required
                />
              </div>

              <Link
                href="#"
                className="block text-sm text-blue-400 hover:text-blue-300 transition-colors text-right"
              >
                ¿Olvidaste tu contraseña?
              </Link>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}