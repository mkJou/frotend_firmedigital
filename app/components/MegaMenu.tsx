'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            FirmaDigital
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/servicios" className="text-gray-300 hover:text-white transition-colors">
              Servicios
            </Link>
            <Link href="/precios" className="text-gray-300 hover:text-white transition-colors">
              Precios
            </Link>
            <Link href="/nosotros" className="text-gray-300 hover:text-white transition-colors">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
              Contacto
            </Link>
            <div className="flex space-x-4">
              <Link 
                href="/iniciar-sesion" 
                className="px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/registro" 
                className="px-6 py-2 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Registrate
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/servicios" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Servicios
              </Link>
              <Link 
                href="/precios" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Precios
              </Link>
              <Link 
                href="/nosotros" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Nosotros
              </Link>
              <Link 
                href="/contacto" 
                className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
              >
                Contacto
              </Link>
              <Link 
                href="#"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="#"
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Registrate
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MegaMenu;
