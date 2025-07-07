'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

interface HeaderProps {
  variant?: 'default' | 'simple' | 'transparent';
  showAuthButtons?: boolean;
  currentPage?: string;
}

export default function Header({ 
  variant = 'default', 
  showAuthButtons = true,
  currentPage 
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300";
  
  const variantClasses = {
    default: "bg-gradient-to-b from-black via-black to-[#111827] border-b border-gray-800/50 shadow-lg",
    simple: "bg-black/90 backdrop-blur-sm border-b border-gray-800/30",
    transparent: "bg-gradient-to-b from-black/90 to-transparent"
  };

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos/firma-electronica' },
    { name: 'Academia', href: '/academia' },
    { name: 'Blog', href: '/blog' },
    { name: 'Soporte', href: '/soporte' },
  ];

  return (
    <header className={`${baseClasses} ${variantClasses[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.webp"
              alt="FIRMEDIGITAL Logo"
              width={150}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-300 hover:text-white transition-colors duration-200 font-medium ${
                  currentPage === item.name ? 'text-white border-b-2 border-blue-400' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons Desktop */}
          {showAuthButtons && (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="https://appdev.firmedigital.com.ve/api/auth/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="https://appdev.firmedigital.com.ve/api/auth/signup"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                Registrarse
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800/50">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white/5 ${
                    currentPage === item.name ? 'text-white bg-white/10' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {showAuthButtons && (
                <>
                  <Link
                    href="https://appdev.firmedigital.com.ve/api/auth/login"
                    className="mx-4 px-4 py-2 text-center text-gray-300 hover:text-white transition-colors duration-200 font-medium border border-gray-600 rounded-lg hover:border-gray-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    href="https://appdev.firmedigital.com.ve/api/auth/signup"
                    className="mx-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 