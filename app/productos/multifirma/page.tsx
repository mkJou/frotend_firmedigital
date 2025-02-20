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
                La multifirma permite que varios firmantes autoricen un documento de manera rápida y segura. Con Firmedigital disfruta de un proceso simplificado y protegido, donde cada firma se registra y verifica. Nuestra solución optimiza la colaboración y asegura que cada documento sea legalmente vinculante. Elige Firmedigital  como tu aliado y lleva la gestión de tus documentos al siguiente nivel, garantizando eficiencia, seguridad y tranquilidad en cada firma.
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
              className="relative w-full h-screen max-h-[800px] pt-20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
              <Image
                src="/images/Multifirma.svg"
                alt="Multifirma Illustration"
                fill
                className="object-contain object-top relative z-10"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contenido Principal */}
      <section className="relative py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Secciones Principales */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative">
                    Para Empresas
                  </h2>
                  <h3 className="text-xl text-gray-200 mb-4 relative">Agilidad y Control en la Gestión Documental</h3>
                </div>
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-gray-300 text-center">La multifirma permite a las empresas gestionar de manera eficiente la firma de múltiples documentos por varios firmantes. Este proceso es fundamental para agilizar flujos de trabajo, reducir tiempos de espera y asegurar que todos los documentos sean revisados y aprobados en el orden correcto. Con la multifirma, las empresas pueden definir el orden de las firmas, personalizar permisos y garantizar que cada firmante tenga acceso solo a los documentos que necesita.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="group relative h-[180px] bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
              <div className="flex flex-col items-center justify-center text-center h-full relative z-10">
                <div className="transform transition-all duration-500 opacity-100 group-hover:opacity-0">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text relative">
                    Para Personas Naturales
                  </h2>
                  <h3 className="text-xl text-gray-200 mb-4 relative">Simplificación y Seguridad en tus Trámites</h3>
                </div>
                <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-gray-300 text-center">La multifirma también ofrece grandes beneficios a personas naturales que necesitan firmar múltiples documentos. Este proceso permite gestionar y completar trámites de forma rápida y segura, desde la comodidad de tu hogar o lugar de trabajo. Con la multifirma, puedes asegurarte de que todos los documentos sean firmados en el orden adecuado y que cada firmante reciba notificaciones en tiempo real sobre el estado de los documentos.</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}
