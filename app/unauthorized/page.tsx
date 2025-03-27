'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="bg-red-600 p-6 flex justify-center">
          <FaLock className="text-white text-6xl" />
        </div>
        
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Acceso No Autorizado</h1>
          
          <p className="text-gray-600 text-center mb-6">
            Lo sentimos, no tienes permiso para acceder a esta sección. 
            Esta área está restringida a direcciones IP autorizadas.
          </p>
          
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              <FaArrowLeft /> Volver al inicio
            </button>
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-sm text-gray-500 text-center">
        Si crees que esto es un error, por favor contacta al administrador del sistema.
      </p>
    </div>
  );
}