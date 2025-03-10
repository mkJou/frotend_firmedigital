"use client"
import { useEffect, useState } from 'react';
import { motion,AnimatePresence } from "framer-motion";
import Image from "next/image";
import MegaMenu from '../../../components/MegaMenu';
import { GiCookingPot } from 'react-icons/gi';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { FaFileSignature, FaUserCheck, FaUserShield, FaMoneyBillWave, FaDatabase, FaHistory, FaLeaf, FaGraduationCap, FaTools, FaBolt, FaLock, FaRocket, FaClipboardCheck, FaBuilding, FaUser, FaBell } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
const faqs = [
  {
    pregunta: "¿Qué es la Multifirma de FirmaDigital y cómo funciona?",
    respuesta: "Permite que varias personas firmen un mismo documento, ya sea en paralelo o en secuencia. Cada firmante puede validar el documento con su firma electrónica certificada, manteniendo la integridad y validez legal del documento."
  },
  {
    pregunta: "¿En qué situaciones es útil la Multifirma?",
    respuesta: "Contratos, acuerdos, aprobaciones internas, cualquier documento que requiera la firma de múltiples partes. Es especialmente útil en entornos corporativos, instituciones educativas y organizaciones donde se requieren múltiples autorizaciones."
  },
  {
    pregunta: "¿Tiene validez legal la Multifirma electrónica?",
    respuesta: "Sí, la Multifirma tiene plena validez legal según la legislación vigente sobre firma electrónica. Cada firma individual cumple con los requisitos legales de autenticidad, integridad y no repudio, garantizando la validez jurídica del documento firmado."
  },
  {
    pregunta: "¿Cómo se garantiza la seguridad en el proceso de Multifirma?",
    respuesta: "El sistema utiliza certificados digitales emitidos por una Autoridad de Certificación acreditada, encriptación avanzada y protocolos de seguridad que garantizan la identidad de cada firmante y la integridad del documento durante todo el proceso de firma múltiple."
  },
  {
    pregunta: "¿Se puede establecer un orden específico para las firmas?",
    respuesta: "Sí, la plataforma permite configurar flujos de firma secuenciales donde se establece un orden específico para los firmantes, o simultáneos donde todos pueden firmar en cualquier momento. Esto facilita la adaptación a diferentes procesos y requerimientos organizacionales."
  }
];
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


export default function Multifirma() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  return (
    <main className="bg-transparent">
      <MegaMenu />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <Image
            src="/images/bg-hero.webp"
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 pt-20 relative z-10"
        >
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-32">
            <motion
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-8"
            >
              <FaFileSignature className="text-5xl text-blue-500" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Multifirma: Eficiencia y seguridad
              </h1>
            </motion>
            
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Con Multifirma, varios firmantes pueden autorizar documentos de forma segura y ordenada. Optimiza tu tiempo y recursos con un sistema eficiente y legalmente válido.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="relative max-w-3xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
              <p className="text-2xl text-purple-400 font-semibold italic relative bg-black/50 p-6 rounded-xl border border-purple-500/20">
                "La eficiencia y seguridad que necesitas, con la confiabilidad de Firmedigital PSC"
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contenido Principal */}
      <section className="relative py-20 bg-transparent">
        <div className="container mx-auto px-4">
          {/* Secciones Principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-12 mb-12 md:mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="group relative h-[160px] sm:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative">
                    Para Empresas
                  </h2>
                  <h3 className="text-lg sm:text-2xl text-gray-200 mb-2 md:mb-4 relative">Agilidad y Control en la Gestión Documental</h3>
                </div>
                <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium">Optimiza procesos con firmas múltiples seguras. Control total de documentos.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="group relative h-[160px] sm:h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl md:rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text relative">
                    Para Personas Naturales
                  </h2>
                  <h3 className="text-lg sm:text-2xl text-gray-200 mb-2 md:mb-4 relative">Simplificación y Seguridad en tus Trámites</h3>
                </div>
                <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-base sm:text-lg md:text-xl text-white text-center font-medium">Firma documentos rápido y seguro desde cualquier lugar. Trámites con total confianza.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* Beneficios Section */}
        <div className="py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Beneficios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLock className="text-4xl text-blue-400" />,
                title: "Seguridad Avanzada",
                description: "Garantiza la protección de tus documentos con tecnología de encriptación de última generación."
              },
              {
                icon: <FaRocket className="text-4xl text-purple-400" />,
                title: "Eficiencia en Procesos",
                description: "Reduce significativamente el tiempo de gestión documental."
              },
              {
                icon: <FaClipboardCheck className="text-4xl text-blue-400" />,
                title: "Cumplimiento Legal",
                description: "Cumple con las normativas y leyes vigentes en materia de firma electrónica."
              },
              {
                icon: <FaTools className="text-4xl text-purple-400" />,
                title: "Integración Flexible",
                description: "Permite una integración fluida que mejora la productividad sin interrumpir tus operaciones."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {benefit.title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-4">
                      {benefit.icon}
                    </div>
                    <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Características Section */}
        <div className="py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBuilding className="text-4xl text-blue-400" />,
                title: "Multiusuario",
                description: "Permite que varios firmantes colaboren en un mismo documento."
              },
              {
                icon: <FaHistory className="text-4xl text-purple-400" />,
                title: "Rastreo y Auditoría",
                description: "Ofrece un registro completo de cada acción realizada sobre el documento."
              },
              {
                icon: <FaBell className="text-4xl text-blue-400" />,
                title: "Notificaciones Automáticas",
                description: "Mantén a todos los involucrados informados con recordatorios automáticos sobre el estado de los documentos."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="group relative bg-gray-800/50 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm overflow-hidden h-[180px] cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <div className="absolute inset-0 p-6 transition-transform duration-500 transform group-hover:-translate-y-full flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                </div>

                <div className="absolute inset-0 p-6 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 bg-gradient-to-b from-gray-800 to-gray-900">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="mb-4">
                      {feature.icon}
                    </div>
                    <p className="text-gray-300 text-center group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Testimonios de Clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                client: "Dohmi",
                quote: "La Multifirma de Firmedigital ha transformado nuestra gestión de contratos corporativos. Ahora podemos obtener múltiples firmas de forma simultánea, reduciendo el tiempo de cierre de acuerdos en un 70%.",
                role: "Director de Operaciones"
              },
              {
                client: "IUTCM",
                quote: "Como institución educativa, la Multifirma nos permite gestionar eficientemente la aprobación de documentos académicos que requieren múltiples autorizaciones, manteniendo un registro legal y seguro de cada proceso.",
                role: "Coordinador Académico"
              },
              {
                client: "CIDEZ",
                quote: "La capacidad de establecer flujos de firma secuenciales ha optimizado nuestros procesos de aprobación de proyectos. La trazabilidad y seguridad que ofrece la Multifirma es exactamente lo que necesitábamos.",
                role: "Gerente de Proyectos"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500/10 rounded-full mb-2">
                      <span className="text-2xl font-bold text-blue-400">{testimonial.client.charAt(0)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-center text-blue-400">{testimonial.client}</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-300 text-center italic mb-4">"{testimonial.quote}"</p>
                  </div>
                  <div className="text-sm text-gray-400 text-center">
                    <span>{testimonial.role}</span>
                  </div>
                  <div className="flex justify-center mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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
