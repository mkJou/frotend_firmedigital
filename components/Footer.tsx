"use client"
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const productos = [
  {
    name: "Firma Electrónica",
    href: "/productos/firma-electronica",
    description: "Firma digital certificada y segura"
  },
  {
    name: "Multifirma",
    href: "/productos/multifirma",
    description: "Gestión de múltiples firmas"
  },
  {
    name: "Workflow",
    href: "/productos/workflow",
    description: "Flujos de trabajo automatizados"
  },
  {
    name: "Facturación",
    href: "/productos/facturacion",
    description: "Facturación electrónica"
  }
];

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo y Descripción */}
          <div className="col-span-1 md:col-span-1">
            <Image
              src="/images/logo.webp"
              alt="Firmedigital Logo"
              width={150}
              height={40}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm">
            FirmeDigital.com es una plataforma de certificación y firma electronica desarrollada por Documentos Digitales PSC, C.A. en la República Bolivariana de Venezuela.

            </p>
          </div>

          {/* Productos */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Productos</h3>
            <ul className="space-y-3">
              {productos.map((producto) => (
                <motion.li 
                  key={producto.name}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link 
                    href={producto.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 block"
                  >
                    <span className="font-medium">{producto.name}</span>
                    <span className="block text-sm text-gray-500 group-hover:text-gray-400">
                      {producto.description}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          {/* Autoridad de Certificación */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Autoridad de Certificación</h3>
            <ul className="space-y-3 space-y-3 text-gray-400">
             <li className='hover:text-white transition-colors duration-200'>Cadena de Certificación</li>
             <li className='hover:text-white transition-colors duration-200'>Certificado Raíz SUSCERTE</li>
             <li className='hover:text-white transition-colors duration-200'>Lista de Certificados Revocados (LCR)</li>
            </ul>
          </div>
          {/*Informacion Legal */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Información Legal</h3>
            <ul className="space-y-3 space-y-3 text-gray-400">
             <li className='hover:text-white transition-colors duration-200'>Cadena de Certificación</li>
             <li className='hover:text-white transition-colors duration-200'>
               <a 
                 href="https://firmedigital.com/docs/PSC-PSC-DPC-001%20Documentos%20Digitales%20%20PSC.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 DPC
               </a>
             </li>
            
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4 text-lg">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className='hover:text-white transition-colors duration-200'>
                <a href="tel:+584247100380">Telf: +58 424-7100380</a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="mailto:info@firmedigital.com.ve">info@firmedigital.com.ve</a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="https://www.instagram.com/firmedigital" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="https://t.me/firmedigital" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Eliminar la sección de Síguenos ya que se movió a Contacto */}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-gray-400 text-sm">
            {new Date().getFullYear()} DOCUMENTOS DIGITALES PSC, C.A. RIF J-50541585-9. Todos los derechos reservados.
            www.firmedigital.com.ve
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
