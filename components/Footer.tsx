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
    name: "Gestor de Documentos",
    href: "/productos/gestor-de-documentos",
    description: "Gestión de documentos electronicos"
  },
 // {
   // name: "IA",
    //href: "/productos/ia",
    //description: "Inteligencia artificial avanzada"
  //},
  {
    name: "Multifirma",
    href: "/productos/multifirma",
    description: "Gestión de múltiples firmas"
  },
  
  
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo y Descripción */}
          <div className="text-center md:text-left">
            <Image
              src="/images/logo.webp"
              alt="Firmedigital Logo"
              width={150}
              height={40}
              className="mx-auto md:mx-0 mb-4"
            />
            <p className="text-gray-400 text-sm">
            FirmeDigital.com es una plataforma de certificación y firma electronica desarrollada por Documentos Digitales PSC, C.A. en la República Bolivariana de Venezuela.

            </p>
          </div>

          {/* Productos */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
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
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Autoridad de Certificación</h3>
            <ul className="space-y-2 space-y-3 text-gray-400">
             <li className='hover:text-white transition-colors duration-200'>
             <a 
                 href="https://ca.firmedigital.com/public/ca/intermediate/chain"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Cadena de Certificación
               </a>
             </li>          
             <li className='hover:text-white transition-colors duration-200'>
             <a 
                 href="https://acraiz.suscerte.gob.ve/CERTIFICADO-RAIZ-SHA512-ECC.pem"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Certificado Raíz SUSCERTE
               </a>
             </li>
             <li className='hover:text-white transition-colors duration-200'>
             <a 
                 href="https://ca.firmedigital.com/public/ca/crl"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Lista de Certificados Revocados
               </a>
             </li>
            </ul>
          </div>
          {/*Informacion Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Información Legal</h3>
            <ul className="space-y-2 space-y-3 text-gray-400">
             <li className='hover:text-white transition-colors duration-200'>
             <a 
                 href="https://www.suscerte.gob.ve/"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 SUSCERTE
               </a>
             </li>           
             <li className='hover:text-white transition-colors duration-200'>
               <a 
                 href="https://firmedigital.com/docs/PSC-PSC-DPC-001%20Documentos%20Digitales%20%20PSC.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Declaración de Prácticas de Certificación
               </a>
             </li>
             <li className='hover:text-white transition-colors duration-200'>
               <a 
                 href="https://www.suscerte.gob.ve/wp-content/uploads/2025/02/Gaceta-Oficial.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Gaceta Oficial
               </a>
             </li>
            </ul>
          </div>

          {/* Contacto */}
          <div id="footer-contacto" className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className='hover:text-white transition-colors duration-200'>
                <a href="tel:+584247100380">Telf: +58 424-7100380</a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="mailto:info@firmedigital.com">info@firmedigital.com</a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="https://www.instagram.com/firmedigitalve" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="https://t.me/firmedigital" target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>
              </li>
              <li className='hover:text-white transition-colors duration-200'>
                <a href="https://www.linkedin.com/company/firmedigitalve/" target="_blank" rel="noopener noreferrer">
                Linkedin
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            {new Date().getFullYear()} DOCUMENTOS DIGITALES PSC, C.A. RIF J-50541585-9. Todos los derechos reservados.
            www.firmedigital.com.ve
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
