"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MegaMenu from '../../../components/MegaMenu';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaChevronDown, FaCertificate } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const faqs = [
  {
    pregunta: "¿Qué es la verificación de certificados digitales?",
    respuesta: "La verificación de certificados digitales es un proceso que permite comprobar la autenticidad y validez de un certificado digital emitido por una Autoridad de Certificación acreditada. Este proceso garantiza que el certificado no ha sido revocado y que pertenece a la persona o entidad que dice ser."
  },
  {
    pregunta: "¿Cómo puedo verificar un certificado digital?",
    respuesta: "Para verificar un certificado digital, simplemente selecciona el tipo de búsqueda (por cédula, nombre, serial o correo electrónico) e introduce el código correspondiente en el formulario de verificación. El sistema comprobará automáticamente la validez del certificado y mostrará la información relevante."
  },
  {
    pregunta: "¿Qué información puedo obtener al verificar un certificado?",
    respuesta: "Al verificar un certificado, podrás obtener información como el nombre del titular, la fecha de emisión y caducidad, el estado actual del certificado (válido, revocado o expirado), el tipo de certificado y la Autoridad de Certificación emisora."
  },
  {
    pregunta: "¿Por qué es importante verificar los certificados digitales?",
    respuesta: "Verificar los certificados digitales es fundamental para garantizar la seguridad en las transacciones electrónicas. Permite confirmar que estás interactuando con la persona o entidad correcta y que sus credenciales digitales son válidas y no han sido comprometidas."
  },
  {
    pregunta: "¿Los certificados verificados tienen validez legal?",
    respuesta: "Sí, los certificados digitales emitidos por FIRMEDIGITAL tienen plena validez legal según la legislación vigente sobre firma electrónica. La verificación confirma esta validez y proporciona evidencia de la autenticidad del certificado para su uso en procedimientos legales y administrativos."
  }
];

export default function VerificacionCertificados() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchType, setSearchType] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [searchResult, setSearchResult] = useState<null | { valid: boolean; message: string; details?: any }>(null);
  const [isSearching, setIsSearching] = useState(false);

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleSearch = async () => {
    if (!searchType || !searchCode) {
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    const queryTypes = {
      '0': 'ci',
      '1': 'name',
      '2': 'serial',
      '3': 'email'
    };

    try {
      const queryParam = queryTypes[searchType];
      console.log('Search Parameters:', { type: queryTypes[searchType], code: searchCode });
      const apiUrl = `https://ca.firmedigital.com/api/v1/certificate/list?${queryParam}=${encodeURIComponent(searchCode.toLowerCase())}`;
      console.log('API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:4200'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Error:', { status: response.status, statusText: response.statusText, body: errorText });
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Raw API Response:', data);

      let certificates = [];
      if (data && data.certificates && data.certificates.certs) {
        certificates = data.certificates.certs;
      }
      console.log(data.certs.length)
      let certificateDetails = []
      var i
      if (data.certs.length > 0) {
        for (i=0; i<data.certs.length; i++) {
          for (var j = 0; j < data.certs[i].aditional.length; j++) {
            if (data.certs[i].aditional[j].O) { // Verifica si la clave 'O' existe
              var name = data.certs[i].aditional[j].O; // Captura el valor de 'O'
              console.log("El valor de O es:", name);
              break; // Salir del bucle si se encuentra
            }
          }
          for (var j = 0; j < data.certs[i].aditional.length; j++) {
            if (data.certs[i].aditional[j].serialNumber) { // Verifica si la clave 'O' existe
              var serial = data.certs[i].aditional[j].serialNumber; // Captura el valor de 'O'
              console.log("El valor de O es:", name);
              break; // Salir del bucle si se encuentra
            }
          }
          if(data.certs[i].state=="V"){
            var s="Vigente"
          }else{
            var s="Revocado"
          }
          certificateDetails.push({
            state: s || 'No disponible',
            expirationTime: data.certs[i].expirationTime || 'No disponible',
            serial: data.certs[i].serial || 'No disponible',
            name: name || 'No disponible'
          });
      }
      console.log(certificateDetails)
        setSearchResult({
          valid: true,
          message: `Certificados encontrados (${certificateDetails.length})`,
          details: certificateDetails
        });
      } else {
        setSearchResult({
          valid: false,
          message: 'No se encontraron certificados',
          details: null
        });
      }
    } catch (error) {
      console.error('Error en la verificación:', error);
      setSearchResult({
        valid: false,
        message: `Error al verificar el certificado`
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto"  style={{ paddingTop: '5rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <FaCertificate className="text-5xl text-blue-500" />
                <motion
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                >
                  <h1>Verificación de Certificados</h1>
                </motion>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mb-8">
                Verifica la autenticidad y validez de los certificados digitales emitidos por Firmedigital de manera rápida y segura.
              </p>
            </div>
            <div className="relative h-[300px] w-full hidden md:block">
              <motion.div
                className="w-full h-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/images/Validador de documentos.jpeg"
                  alt="Verificación de Certificados"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Verificador Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-lg shadow-lg shadow-blue-500/10" id="validadorfirmas">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
              <div className="px-6 py-6 bg-gradient-to-br from-blue-900/40 via-gray-900/60 to-purple-900/40 rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center border border-white/10">
                <div className="xl:w-0 xl:flex-1">
                  <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] sm:text-2xl">¿Necesitas verificar un certificado digital?</h2>
                  <p className="mt-3 max-w-lg text-md leading-5 text-gray-300">Completa el formulario para verificar la autenticidad y validez de un certificado digital de manera rápida y segura.</p>
                </div>
                <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                  <form className="sm:flex" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <label htmlFor="select-type" className="sr-only">Tipo de Búsqueda</label>
                    <select 
                      id="select-type" 
                      name="select-type" 
                      required 
                      className="w-full border border-blue-500/50 px-3 py-2 bg-gray-900/80 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-blue-400"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="">Selecciona tipo</option>
                      <option value="0">Cédula de Identidad</option>
                      <option value="1">Nombre del Titular</option>
                      <option value="2">Serial de Firma</option>
                      <option value="3">Correo Electrónico</option>
                    </select>
                    <label htmlFor="certificate-code" className="sr-only">Código de Certificado</label>
                    <input 
                      id="certificate-code" 
                      required 
                      className="w-full border border-blue-500/50 px-3 py-2 placeholder-gray-400 bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-blue-400 rounded-md sm:ml-3 sm:flex-grow" 
                      placeholder="Introduce tu código" 
                      type="text" 
                      name="certificate-code"
                      value={searchCode.toLowerCase()}
                      onChange={(e) => setSearchCode(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-lg shadow-blue-600/20 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400 transition-colors duration-300 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                      disabled={isSearching}
                    >
                      {isSearching ? 'Verificando...' : 'Verificar'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados de la búsqueda */}
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 rounded-lg border bg-gradient-to-br from-gray-900 to-black"
            >
              <div className="flex items-start gap-4">
                {searchResult.valid ? (
                  <FaCheckCircle className="text-3xl text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <FaTimesCircle className="text-3xl text-red-500 flex-shrink-0 mt-1" />
                )}
                <div className="w-full">
                  <h3 className={`text-xl font-bold mb-6 ${searchResult.valid ? 'text-green-400' : 'text-red-400'}`}>
                    {searchResult.message}
                  </h3>
                  {searchResult.valid && searchResult.details && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-700/50 rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-gray-800/50 border-b border-gray-700">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-r border-gray-700/50">Estado</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-r border-gray-700/50">Fecha de Expiración</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-r border-gray-700/50">Serial</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Nombre</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResult.details.map((cert, index) => (
                            <tr 
                              key={index}
                              className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 border-r border-gray-700/50">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cert.state === 'Vigente' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                  {cert.state}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-300 border-r border-gray-700/50">{cert.expirationTime}</td>
                              <td className="px-6 py-4 text-gray-300 border-r border-gray-700/50">
                                <span className="font-mono">{cert.serial}</span>
                              </td>
                              <td className="px-6 py-4 text-gray-300">{cert.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {searchResult && !searchResult.valid && (
                    <div className="mt-4 p-6 bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 rounded-xl backdrop-blur-sm">
                      <div className="flex items-start gap-4">
                        <div>
                          <p className="text-red-400 font-medium mb-3 text-lg"></p>
                          <p className="text-gray-300 leading-relaxed">
                            No se ha encontrado ningún certificado con los datos proporcionados. 
                            Por favor, verifica que la información ingresada sea correcta e intenta nuevamente.
                            Si el problema persiste, puedes intentar con otro tipo de búsqueda o consulte al soporte@firmedigital.com, para encontrar el posible fallo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
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