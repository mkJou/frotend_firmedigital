'use client';

import React, { useEffect, useRef, Suspense, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import dynamic from 'next/dynamic';
import MegaMenu from '../../../components/MegaMenu';
import { AiOutlineFileDone, AiOutlineSafety, AiOutlineCheck } from 'react-icons/ai';
import { BsFillShieldLockFill, BsSpeedometer2 } from 'react-icons/bs';
import { FaUserShield, FaHandshake } from 'react-icons/fa';
import gsap from 'gsap';
import { 
  TitleSkeleton, 
  TextSkeleton, 
  ButtonSkeleton, 
  CardSkeleton,
  SVGSkeleton 
} from '../../../components/ui/Skeletons';

// Lazy load the AnimatedDocumentSVG component
const AnimatedDocumentSVG = dynamic(() => {
  const Component = () => {
    const svgRef = useRef(null);
    const signatureRef = useRef(null);
    const checkmarkRef = useRef(null);

    useEffect(() => {
      const svg = svgRef.current;
      const signature = signatureRef.current;
      const checkmark = checkmarkRef.current;

      // Create floating animation
      gsap.to(svg, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Animate signature drawing
      gsap.fromTo(signature,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 2
        }
      );

      // Animate checkmark
      gsap.fromTo(checkmark,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 2.5,
          repeat: -1,
          repeatDelay: 2.5,
          ease: "back.out(1.7)"
        }
      );
    }, []);

    return (
      <svg
        ref={svgRef}
        width="400"
        height="400"
        viewBox="0 0 300 300"
        className="transform-gpu"
        style={{
          filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 255, 0.2))'
        }}
      >
        {/* Document background */}
        <rect
          x="50"
          y="30"
          width="200"
          height="240"
          rx="10"
          fill="#fff"
          className="drop-shadow-xl"
        />
        
        {/* Document lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="70"
            y1={80 + i * 25}
            x2="230"
            y2={80 + i * 25}
            stroke="#e5e7eb"
            strokeWidth="2"
          />
        ))}
        
        {/* Signature line */}
        <path
          ref={signatureRef}
          d="M70 200 C90 180, 110 220, 130 200 C150 180, 170 220, 190 200 C210 180, 230 220, 230 200"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeLinecap="round"
        />
        
        {/* Checkmark circle */}
        <circle
          cx="220"
          cy="70"
          r="20"
          fill="#3b82f6"
          fillOpacity="0.1"
        />
        
        {/* Checkmark */}
        <path
          ref={checkmarkRef}
          d="M210 70 L218 78 L230 62"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  return Promise.resolve(Component);
}, {
  loading: () => <SVGSkeleton />,
  ssr: false
});

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Lazy load feature cards component
const FeatureCards = dynamic(() => Promise.resolve(() => {
  const features = [
    {
      icon: <BsFillShieldLockFill className="text-4xl text-blue-500 mb-4" />,
      title: "Certificación Digital SUSCERTE",
      description: "Respaldada por un proveedor de confianza autorizado, garantizando validez legal y fácil identificación."
    },
    {
      icon: <FaUserShield className="text-4xl text-purple-500 mb-4" />,
      title: "Autenticación Segura",
      description: "Inicio de firma vía correo electrónico o WhatsApp con segundo factor de autenticación opcional."
    },
    {
      icon: <BsSpeedometer2 className="text-4xl text-blue-500 mb-4" />,
      title: "Proceso Optimizado",
      description: "Dile adiós a las firmas manuscritas que conllevan riesgos legales y demandan más esfuerzo."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
        >
          {feature.icon}
          <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
          <p className="text-gray-300">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
});

export default function FirmaElectronica() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative pt-32 pb-16 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              {isLoading ? (
                <div className="space-y-8">
                  <TitleSkeleton />
                  <TextSkeleton />
                  <ButtonSkeleton />
                </div>
              ) : (
                <>
                  <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <AiOutlineFileDone className="text-6xl text-blue-500" />
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                      Firma Electrónica
                    </h1>
                  </motion.div>
                  
                  <motion.p 
                    {...fadeIn}
                    className="text-xl text-gray-300 max-w-3xl mb-8"
                  >
                    Firma Electrónica Legalmente Válida, Rápida y Segura. Optimiza los procesos de firma de documentos en tu empresa con Firmedigital PSC.
                  </motion.p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/30"
                  >
                    Comenzar Ahora
                  </motion.button>
                </>
              )}
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <Suspense fallback={<SVGSkeleton />}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative transform hover:scale-105 transition-transform duration-300"
                >
                  <AnimatedDocumentSVG />
                </motion.div>
              </Suspense>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Características Principales */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Firma Electrónica con Atribución, Seguridad e Integridad Garantizadas
              </motion.h2>

              <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              }>
                <FeatureCards />
              </Suspense>
            </>
          )}
        </div>
      </section>

      {/* Flexibilidad y Adaptabilidad */}
      <section className="px-4 md:px-8 py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="space-y-12">
              <TitleSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(2)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-12 text-center"
              >
                Firma Electrónica Flexible y Adaptable
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    icon: <FaHandshake className="text-4xl text-blue-500 mb-4" />,
                    title: "Diseña Flujos de Trabajo",
                    description: "Crea procesos de firma electrónica ajustados a las necesidades específicas de tu negocio."
                  },
                  {
                    icon: <AiOutlineCheck className="text-4xl text-purple-500 mb-4" />,
                    title: "Establece Firmantes",
                    description: "Define quiénes firmarán, el tipo de firma requerida y el orden en que se realizará."
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-xl"
                  >
                    {feature.icon}
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-4 md:px-8 py-16"
      >
        <div className="max-w-3xl mx-auto text-center">
          {isLoading ? (
            <div className="space-y-8">
              <TitleSkeleton />
              <TextSkeleton />
              <ButtonSkeleton />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-6">
                Transacciones Digitales Personalizables y Seguras
              </h2>
              <p className="text-gray-300 mb-8">
                  En FIRMEDIGITAL, hemos diseño una solución de firma electrónica especialmente para grandes empresas como la tuya. Optimiza tus flujos de trabajo, incrementa la eficiencia y asegura el cumplimiento normativo en cada operación.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/30"
              >
                Comienza tu Transformación Digital
              </motion.button>
            </>
          )}
        </div>
      </motion.section>
    </main>
  );
}
