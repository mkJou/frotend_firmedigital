"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import MegaMenu from '../../../components/MegaMenu';

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

export default function Multifirma() {
  return (
    <main className="bg-black">
      <MegaMenu />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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
          className="container mx-auto px-4 py-20 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-center lg:text-left pt-32">
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                    Multifirma
                  </span>
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl text-gray-200">
                    Eficiencia y Seguridad con Firmedigital PSC
                  </span>
                </h1>
              </motion.div>
              
              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed p-10"
              >
                Simplifica el proceso de firmas múltiples en tus documentos. Con Multifirma, varios firmantes pueden autorizar documentos de forma segura y ordenada. Optimiza tu tiempo y recursos con un sistema eficiente y legalmente válido.
              </motion.p>
              
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-xl"></div>
                <p className="text-2xl text-purple-400 font-semibold italic relative bg-black/50 p-6 rounded-xl border border-purple-500/20">
                  "La eficiencia y seguridad que necesitas, con la confiabilidad de Firmedigital PSC."
                </p>
              </motion.div>
            </div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-[600px] md:h-[700px] pt-32 md:pt-40 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <div className="relative w-full h-full max-w-3xl mx-auto">
                <Image
                  src="/images/Multifirma.svg"
                  alt="Multifirma Illustration"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contenido Principal */}
      <section className="relative py-20 bg-black">
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
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative">
                    Para Empresas
                  </h2>
                  <h3 className="text-base sm:text-xl text-gray-200 mb-2 md:mb-4 relative">Agilidad y Control en la Gestión Documental</h3>
                </div>
                <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm sm:text-base text-gray-300 text-center">Optimiza los procesos empresariales con firmas múltiples ordenadas y seguras. Define el orden de firmas, gestiona permisos y mantén el control total de tus documentos.</p>
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
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text relative">
                    Para Personas Naturales
                  </h2>
                  <h3 className="text-base sm:text-xl text-gray-200 mb-2 md:mb-4 relative">Simplificación y Seguridad en tus Trámites</h3>
                </div>
                <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm sm:text-base text-gray-300 text-center">Firma múltiples documentos de forma rápida y segura desde cualquier lugar. Recibe notificaciones en tiempo real y completa tus trámites con total confianza.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
