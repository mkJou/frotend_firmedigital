'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';

export default function Soporte() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const faqs = [
    {
      pregunta: "¿Qué es la firma digital?",
      respuesta: "La firma digital es un mecanismo criptográfico que permite autenticar la identidad del firmante y garantizar la integridad de los documentos electrónicos."
    },
    {
      pregunta: "¿Cómo puedo obtener una firma digital?",
      respuesta: "Para obtener una firma digital, debe completar el proceso de solicitud en nuestra plataforma y cumplir con los requisitos de verificación de identidad."
    },
    {
      pregunta: "¿Qué validez legal tiene la firma digital?",
      respuesta: "La firma digital tiene la misma validez legal que una firma manuscrita según la legislación vigente en materia de documentos electrónicos."
    },
    {
      pregunta: "¿En qué dispositivos puedo usar la firma digital?",
      respuesta: "Nuestra solución de firma digital es compatible con computadoras, tablets y smartphones, permitiendo firmar documentos desde cualquier dispositivo."
    }
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Centro de Soporte
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Encuentra respuestas a tus preguntas y obtén la ayuda que necesitas para aprovechar al máximo nuestra plataforma.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-2">
              <div className="flex items-center">
                <FaQuestionCircle className="text-4xl text-blue-500 mr-4" />
                <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
              </div>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-400">{faq.pregunta}</h3>
                    <FaChevronDown 
                      className={`text-blue-400 transition-transform duration-300 ${
                        activeQuestion === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-300">{faq.respuesta}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
