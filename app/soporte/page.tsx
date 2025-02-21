'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaQuestionCircle, FaClipboardList, FaComments, FaArrowRight } from 'react-icons/fa';

export default function Soporte() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    pregunta: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log(formData);
  };

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

  const requerimientos = [
    "Documento de identidad vigente",
    "Correo electrónico personal",
    "Dispositivo con conexión a internet",
    "Cámara web para verificación biométrica",
    "Documentación adicional según el tipo de certificado"
  ];

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
            <div className="flex items-center mb-8">
              <FaQuestionCircle className="text-4xl text-blue-500 mr-4" />
              <h2 className="text-3xl font-bold">Preguntas Frecuentes</h2>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">{faq.pregunta}</h3>
                  <p className="text-gray-300">{faq.respuesta}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Requirements Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <FaClipboardList className="text-4xl text-green-500 mr-4" />
              <h2 className="text-3xl font-bold">Requerimientos</h2>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl">
              <ul className="space-y-4">
                {requerimientos.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <FaArrowRight className="text-green-500 mr-3" />
                    {req}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <FaComments className="text-4xl text-purple-500 mr-4" />
              <h2 className="text-3xl font-bold">Preguntas y Asistencia</h2>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-300 mb-2">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pregunta" className="block text-sm font-medium text-gray-300 mb-2">
                    Tu pregunta
                  </label>
                  <textarea
                    id="pregunta"
                    name="pregunta"
                    value={formData.pregunta}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Enviar consulta
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
