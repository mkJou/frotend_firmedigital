"use client"
import { useEffect, useState } from 'react';
import { motion,AnimatePresence } from "framer-motion";
import Image from "next/image";
import MegaMenu from '../../../components/MegaMenu';
import { GiCookingPot } from 'react-icons/gi';
import { FaQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { FaFileSignature, FaUserCheck, FaUserShield, FaMoneyBillWave, FaDatabase, FaHistory, FaLeaf, FaGraduationCap, FaTools, FaBolt, FaLock, FaRocket, FaClipboardCheck, FaBuilding, FaUser, FaBell, FaIdCard } from 'react-icons/fa';

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
    pregunta: "¿Qué es la Verificación de Identidad?",
    respuesta: "Es el proceso de validar que una persona es quien dice ser, utilizando tecnología de reconocimiento y validación de documentos."
  },
  {
    pregunta: "¿Cuánto tiempo toma la verificación?",
    respuesta: "La mayoría de las verificaciones se completan en segundos, gracias a nuestra tecnología en tiempo real."
  },
  {
    pregunta: "¿Qué tipos de documentos puedo verificar?",
    respuesta: "Puedes verificar una variedad de documentos, incluyendo cédulas de identidad, pasaportes, licencias de conducir y otros documentos oficiales."
  },
  {
    pregunta: "¿Cómo se lleva a cabo la verificación facial?",
    respuesta: "Utilizamos algoritmos de reconocimiento facial que comparan la imagen del documento con la imagen del usuario en tiempo real para validar su identidad."
  },
  {
    pregunta: "¿Qué medidas de seguridad tienen para proteger los datos?",
    respuesta: "Implementamos encriptación de datos, autenticación de múltiples factores y protocolos de seguridad avanzados para garantizar la protección de la información."
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


export default function VerificacionIdentidad() {
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
              <FaUserShield className="text-5xl text-blue-500" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Verificación de Identidad
              </h1>
            </motion>
            
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              Con nuestra plataforma, podrás validar la identidad de tus usuarios de manera rápida y segura, cumpliendo con las normativas y protegiendo tu negocio.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="relative max-w-3xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
              <p className="text-2xl text-purple-400 font-semibold italic relative bg-black/50 p-6 rounded-xl border border-purple-500/20">
                "La seguridad y confianza que tu empresa necesita, con la tecnología de FIRMEDIGITAL PSC"
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      
      
      {/* Beneficios Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-900/50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Beneficios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nuestra solución de verificación de identidad ofrece múltiples ventajas para tu negocio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaUserCheck className="text-4xl text-blue-400" />,
                title: "Verificación de Edad",
                description: "Asegúrate de que tus clientes cumplan con la edad mínima requerida para acceder a tus servicios."
              },
              {
                icon: <FaIdCard className="text-4xl text-purple-400" />,
                title: "Verificación de Documentos",
                description: "Valida documentos de identidad con tecnología avanzada para garantizar su autenticidad."
              },
              {
                icon: <FaHistory className="text-4xl text-blue-400" />,
                title: "KYC Reutilizable",
                description: "Simplifica el proceso de verificación al reutilizar datos de clientes ya verificados, optimizando el tiempo y los recursos."
              },
              {
                icon: <FaUserShield className="text-4xl text-purple-400" />,
                title: "AML Screening",
                description: "Realiza un análisis exhaustivo para cumplir con las normativas de prevención de lavado de dinero."
              },
              {
                icon: <FaUser className="text-4xl text-blue-400" />,
                title: "Reconocimiento Facial",
                description: "Utiliza tecnología de reconocimiento facial para autenticar la identidad de manera precisa y confiable."
              },{
                icon: <FaBolt className="text-4xl text-purple-400" />,
                title: "Verificación NFC",
                description: "Valida documentos mediante tecnología de comunicación de campo cercano (NFC) para una autenticación rápida y segura."
              },{
                icon: <FaDatabase className="text-4xl text-blue-400" />,
                title: "Business Console",
                description: " Accede a un panel de control intuitivo que te permite gestionar todas las verificaciones desde un solo lugar."
              },{
                icon: <FaBell className="text-4xl text-purple-400" />,
                title: "Monitoreo de Documentos:",
                description: "Realiza un seguimiento continuo de la validez de los documentos de identidad de tus clientes."
              },
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
      </section>
      
      
      {/* Características Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-transparent relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Características Principales
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nuestra solución de verificación de identidad ofrece un conjunto completo de herramientas para garantizar la seguridad y el cumplimiento normativo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBolt className="text-4xl text-blue-400" />,
                title: "Validación Instantánea",
                description: "No solo comprueba identidades al instante, sino que también automatiza el flujo de trabajo para una mayor eficiencia operativa."
              },
              {
                icon: <FaIdCard className="text-4xl text-purple-400" />,
                title: "Verificación Eficiente de Documentos",
                description: "Procesa y valida documentos de identidad de forma ágil y precisa."
              },
              {
                icon: <FaUserCheck className="text-4xl text-blue-400" />,
                title: "Diseño Intuitivo",
                description: "Interfaz optimizada para una experiencia de usuario fluida y accesible."
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

      {/* Proceso Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Un proceso simple y efectivo para verificar la identidad de tus usuarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: "Captura del Documento",
                description: "El usuario fotografía su documento de identidad por ambos lados."
              },
              {
                step: 2,
                title: "Verificación Biométrica",
                description: "Se realiza una comparación facial con la foto del documento."
              },
              {
                step: 3,
                title: "Prueba de Vida",
                description: "Verificación de que es una persona real mediante detección de vida."
              },
              {
                step: 4,
                title: "Validación y Resultado",
                description: "Confirmación inmediata de la identidad con reporte detallado."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/30 shadow-lg backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-blue-400 mt-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
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
                quote: "La Verificación de Identidad de FIRMEDIGITAL ha reducido nuestros casos de fraude en un 95% y ha acelerado nuestro proceso de onboarding digital, mejorando significativamente la experiencia del cliente.",
                role: "Director de Seguridad"
              },
              {
                client: "IUTCM",
                quote: "Implementar esta solución nos permitió cumplir con todas las regulaciones KYC sin sacrificar la experiencia del usuario. El proceso es rápido, seguro y altamente confiable.",
                role: "CEO"
              },
              {
                client: "CIDEZ",
                quote: "La precisión y eficiencia de la verificación biométrica nos ha permitido digitalizar completamente nuestro proceso de contratación de pólizas, reduciendo costos operativos y aumentando la satisfacción del cliente.",
                role: "Gerente de Operaciones"
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
      {/* Preguntas Frecuentes Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
