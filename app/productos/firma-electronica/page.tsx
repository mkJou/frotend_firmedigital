'use client';
import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { HiOutlineDocumentText } from 'react-icons/hi';
const MegaMenu = dynamic(() => import('@/components/MegaMenu'), {
  loading: () => <div className="h-16 bg-gray-800 animate-pulse"></div>
});

// Preload critical images
const preloadImages = () => {
  const images = [
    '/images/bg-hero.webp',
    '/images/logo.webp'
  ];
  images.forEach(src => {
    const img = new window.Image();
    img.src = src;
  });
};
import styles from '@/app/styles/FlipCard.module.css';
import { BsFillShieldLockFill, BsSpeedometer2 } from 'react-icons/bs';
import { FaQuestionCircle, FaChevronDown, FaEnvelope, FaBuilding, FaPaperPlane, FaCalendar } from 'react-icons/fa';
import Link from 'next/link';
import { FaUserShield, FaMoneyBillWave, FaDatabase, FaHistory, FaLeaf, FaGraduationCap, FaTools } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import { motion,AnimatePresence } from 'framer-motion';
import { 
  TitleSkeleton, 
  TextSkeleton, 
  ButtonSkeleton,
  CardSkeleton 
} from '@/components/ui/Skeletons';
const SkeletonHero = () => (
  <div className="space-y-8">
    <div className="flex justify-center">
      <div className="animate-pulse h-16 w-16 bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-6">
      <div className="animate-pulse h-14 max-w-3xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-2xl mx-auto bg-gray-700 rounded"></div>
      <div className="animate-pulse h-4 max-w-xl mx-auto bg-gray-700 rounded"></div>
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700/50 space-y-4 animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-2/3"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);
const faqs = [
  {
    pregunta: "¿Qué es la firma electrónica?",
    respuesta: "Es un método para firmar documentos digitalmente con la misma validez legal que una firma manuscrita, respaldado por tecnología criptográfica que garantiza la autenticidad e integridad del documento."
  },
  {
    pregunta: "¿Cómo garantiza FIRMEDIGITAL la validez legal de sus firmas electrónicas?",
    respuesta: "Cumpliendo con las normativas y estándares internacionales, utilizando certificados digitales emitidos por una Autoridad de Certificación acreditada y tecnología de cifrado avanzada que cumple con los requisitos legales vigentes."
  },
  {
    pregunta: "¿Qué ventajas ofrece la firma electrónica frente a la firma tradicional?",
    respuesta: "La firma electrónica ofrece mayor seguridad, ahorro de tiempo y costos, facilidad de uso desde cualquier dispositivo, validez legal garantizada, y contribuye a la sostenibilidad ambiental al eliminar el uso de papel."
  },
  {
    pregunta: "¿Puedo firmar cualquier tipo de documento con la firma electrónica?",
    respuesta: "Sí, nuestra solución permite firmar prácticamente cualquier formato de documento digital, incluyendo PDF, Word, Excel, imágenes y muchos otros formatos comunes utilizados en entornos empresariales y personales."
  },
  {
    pregunta: "¿Cómo puedo verificar la autenticidad de un documento firmado electrónicamente?",
    respuesta: "Puede verificar la autenticidad utilizando nuestro validador de documentos en línea, que comprueba la integridad del documento, la validez del certificado y la identidad del firmante de manera instantánea y segura."
  }
];

const testimonials = [
  {
    client: "Dohmi",
    role: "Instituto Culinario",
    quote: "La implementación de la firma electrónica ha revolucionado nuestros procesos internos, reduciendo el tiempo de firma de contratos de días a minutos y mejorando nuestra eficiencia operativa."
  },
  {
    client: "IUTCM",
    role: "Instituto Universitario",
    quote: "La seguridad y validez legal que ofrece FIRMEDIGITAL nos da total tranquilidad en la gestión de documentos académicos y administrativos con nuestros estudiantes y personal."
  },
  {
    client: "CIDEZ",
    role: "Colegio de Ingenieros",
    quote: "Hemos logrado optimizar todo el proceso de certificación profesional gracias a la firma electrónica, mejorando significativamente la experiencia de nuestros agremiados."
  }
];

export default function FirmaElectronica() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('legal');
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{success: boolean, message: string} | null>(null);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, companyName, section: 'Firma Electrónica' }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ success: true, message: 'Información recibida correctamente. Nos pondremos en contacto pronto.' });
        setEmail('');
        setCompanyName('');
      } else {
        setFormStatus({ success: false, message: data.message || 'Ocurrió un error al enviar el formulario.' });
      }
    } catch (error) {
      setFormStatus({ success: false, message: 'Error de conexión. Por favor, inténtelo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [isLoading]);
  
  useEffect(() => {
    // Obtener artículos con categoría 'firma electronica' desde la API
    const fetchFirmaElectronicaArticles = async () => {
      try {
        const response = await fetch('/api/articles/category/firma electronica');
        const data = await response.json();
        
        if (data.success) {
          setBlogArticles(data.data);
        } else {
          console.error('Error al obtener artículos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      }
    };
    
    fetchFirmaElectronicaArticles();
  }, []);

  return (
    <>
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[7rem]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/PORTADA DE FIRMA ELECTRONICA.jpg"
            alt="Firma Electrónica Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
              
        <div className="relative z-10 mx-auto max-w-4xl px-4 lg:px-8 text-center">
          <div className="space-y-8">
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-blue-300">Firma Electrónica Certificada</span>
                      </div>
                      
                      {/* Main Title */}
                      <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                          <span className="block text-white mb-2 relative inline-block">
                            <span 
                              className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                              data-text=""
                            >
                              Firma Electrónica
                            </span>
                          </span>
                          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent text-xl md:text-2xl lg:text-3xl">
                            La Solución Más Rápida y Segura
                          </span>
                        </h1>
                      </div>

                      {/* Description */}
                      <div className="space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                          Digitaliza tus procesos con una herramienta diseñada para ser segura, eficiente y 100% legal. ¡Optimiza tu tiempo y recursos!
                        </p>
                      </div>
                      
                      {/* Formulario de contacto */}
                      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 p-6 rounded-xl border border-blue-500/30 shadow-lg shadow-blue-500/10 mb-8 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-0">Solicita más información</h3>
                        </div>
                        
                        {formStatus && (
                          <div className={`mb-4 p-3 rounded-lg ${formStatus.success ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
                            {formStatus.message}
                          </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                                placeholder="tu@email.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Nombre personal o de la empresa</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaBuilding className="text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-gray-400"
                                placeholder="Nombre"
                              />
                            </div>
                          </div>
                          
                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full flex items-center justify-center px-6 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20 border border-white/10 disabled:opacity-70 disabled:cursor-not-allowed h-[42px]"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Enviando...
                                </>
                              ) : (
                                <>
                                  <FaPaperPlane className="mr-2" /> Enviar
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
        </div>
      </section>



      {/* ¿Por Qué Elegir FIRMEDIGITAL? Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text tracking-wide uppercase">Ventajas Competitivas</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">¿Por Qué Elegir</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                FIRMEDIGITAL?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre las razones que nos convierten en la mejor opción para tu transformación digital
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Main Content - Tarjetas centradas y responsivas */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[
                  {
                    icon: <BsSpeedometer2 className="text-3xl" />,
                    title: "Ahorro de Tiempo",
                    description: "Firma documentos al instante, desde cualquier lugar del mundo. Elimina esperas y optimiza tus procesos.",
                    color: "blue",
                    gradient: "from-blue-500 to-blue-600",
                    textColor: "text-blue-300",
                    borderColor: "hover:border-blue-400/40",
                    lineGradient: "from-blue-400 to-transparent"
                  },
                  {
                    icon: <FaUserShield className="text-3xl" />,
                    title: "Legalmente Válida",
                    description: "Cumple con todas las normativas y regulaciones internacionales para un respaldo legal completo.",
                    color: "green",
                    gradient: "from-green-500 to-green-600",
                    textColor: "text-green-300",
                    borderColor: "hover:border-green-400/40",
                    lineGradient: "from-green-400 to-transparent"
                  },
                  {
                    icon: <BsFillShieldLockFill className="text-3xl" />,
                    title: "Seguridad Garantizada",
                    description: "Protege datos sensibles con tecnología de encriptación avanzada y certificaciones de seguridad.",
                    color: "purple",
                    gradient: "from-purple-500 to-purple-600",
                    textColor: "text-purple-300",
                    borderColor: "hover:border-purple-400/40",
                    lineGradient: "from-purple-400 to-transparent"
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${benefit.borderColor}`}
                  >
                    {/* Card background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Icon and title */}
                    <div className="relative z-10 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <div className={benefit.textColor}>
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${benefit.textColor} mb-3 group-hover:text-white transition-colors duration-300`}>
                        {benefit.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className="relative z-10 text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                      {benefit.description}
                    </p>
                    
                    {/* Decorative line */}
                    <div className={`relative z-10 mt-8 h-1 bg-gradient-to-r ${benefit.lineGradient} rounded-full group-hover:h-2 transition-all duration-300`}></div>
                    
                    {/* Hover glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Cómo Funciona Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">Proceso Simple</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">¿Cómo Funciona</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                la Firma Electrónica?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Un proceso simple y seguro en solo 3 pasos
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-green-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-green-300">Carga tu Documento</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Sube archivos directamente a la plataforma de forma segura y rápida.
              </p>
              <div className="flex justify-center">
                <svg className="w-16 h-16 text-green-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                </svg>
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-blue-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Añade Firmas</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Selecciona y asigna firmantes en segundos con nuestra interfaz intuitiva.
              </p>
              <div className="flex justify-center">
                <svg className="w-16 h-16 text-blue-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"></path>
                </svg>
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-purple-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-purple-300">Envía y Confirma</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Firma y comparte documentos de manera segura con validez legal completa.
              </p>
              <div className="flex justify-center">
                <svg className="w-16 h-16 text-purple-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                </svg>
              </div>
              <div className="mt-6 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Adicionales Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 via-teal-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-teal-500/20 rounded-full border border-orange-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-orange-300 to-teal-300 bg-clip-text tracking-wide uppercase">Beneficios Adicionales</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">Más Razones para</span>
              <span className="block bg-gradient-to-r from-orange-400 via-teal-500 to-purple-500 bg-clip-text text-transparent">
                Elegirnos
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre todas las ventajas que obtienes al elegir nuestra plataforma de firma electrónica
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-orange-400 via-teal-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaDatabase className="text-3xl" />,
                title: "Acceso y Almacenamiento",
                description: "Gestión centralizada y acceso inmediato a documentos firmados desde cualquier dispositivo con máxima seguridad.",
                color: "orange",
                gradient: "from-orange-500 to-orange-600",
                textColor: "text-orange-300",
                borderColor: "hover:border-orange-400/40",
                lineGradient: "from-orange-400 to-transparent"
              },
              {
                icon: <FaHistory className="text-3xl" />,
                title: "Trazabilidad Completa",
                description: "Seguimiento detallado de firmas, fechas y participantes para total transparencia y auditoría.",
                color: "teal",
                gradient: "from-teal-500 to-teal-600",
                textColor: "text-teal-300",
                borderColor: "hover:border-teal-400/40",
                lineGradient: "from-teal-400 to-transparent"
              },
              {
                icon: <FaLeaf className="text-3xl" />,
                title: "Sostenibilidad Ambiental",
                description: "Reduce significativamente el impacto ambiental eliminando el uso de papel y procesos físicos.",
                color: "green",
                gradient: "from-green-500 to-green-600",
                textColor: "text-green-300",
                borderColor: "hover:border-green-400/40",
                lineGradient: "from-green-400 to-transparent"
              },
              {
                icon: <FaUserShield className="text-3xl" />,
                title: "Verificación de Identidad",
                description: "Garantiza que solo personas autorizadas puedan firmar tus documentos con tecnología avanzada.",
                color: "blue",
                gradient: "from-blue-500 to-blue-600",
                textColor: "text-blue-300",
                borderColor: "hover:border-blue-400/40",
                lineGradient: "from-blue-400 to-transparent"
              },
              {
                icon: <FaTools className="text-3xl" />,
                title: "Integración Sencilla",
                description: "Se integra perfectamente con tus sistemas y flujos de trabajo existentes sin complicaciones.",
                color: "purple",
                gradient: "from-purple-500 to-purple-600",
                textColor: "text-purple-300",
                borderColor: "hover:border-purple-400/40",
                lineGradient: "from-purple-400 to-transparent"
              },
              {
                icon: <FaGraduationCap className="text-3xl" />,
                title: "Soporte y Capacitación",
                description: "Acceso completo a soporte técnico especializado y capacitación integral para tu equipo.",
                color: "pink",
                gradient: "from-pink-500 to-pink-600",
                textColor: "text-pink-300",
                borderColor: "hover:border-pink-400/40",
                lineGradient: "from-pink-400 to-transparent"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 ${benefit.borderColor}`}
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon and title */}
                <div className="relative z-10 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={benefit.textColor}>
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold ${benefit.textColor} mb-3 group-hover:text-white transition-colors duration-300`}>
                    {benefit.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="relative z-10 text-gray-300 leading-relaxed text-base group-hover:text-gray-200 transition-colors duration-300">
                  {benefit.description}
                </p>
                
                {/* Decorative line */}
                <div className={`relative z-10 mt-8 h-1 bg-gradient-to-r ${benefit.lineGradient} rounded-full group-hover:h-2 transition-all duration-300`}></div>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Casos de Uso Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full border border-cyan-400/30 mb-8 backdrop-blur-sm">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text tracking-wide uppercase">Casos de Uso</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block text-white mb-2">Soluciones por</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Sectores
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubre cómo FIRMEDIGITAL transforma los procesos de firma en diferentes industrias
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Enhanced Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { key: 'legal', label: 'Sector Legal', gradient: 'from-blue-500 to-blue-600', activeGradient: 'from-blue-500 to-blue-600' },
              { key: 'financiero', label: 'Sector Financiero', gradient: 'from-green-500 to-green-600', activeGradient: 'from-green-500 to-green-600' },
              { key: 'gobierno', label: 'Sector Gobierno', gradient: 'from-purple-500 to-purple-600', activeGradient: 'from-purple-500 to-purple-600' },
              { key: 'empresarial', label: 'Sector Empresarial', gradient: 'from-orange-500 to-orange-600', activeGradient: 'from-orange-500 to-orange-600' }
            ].map((filter) => (
              <button 
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`group relative px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-500 transform hover:scale-105 ${
                  activeFilter === filter.key 
                    ? `bg-gradient-to-r ${filter.activeGradient} text-white shadow-2xl shadow-blue-500/25` 
                    : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 text-gray-300 hover:text-white hover:border-gray-200/40'
                }`}
              >
                {/* Active state glow */}
                {activeFilter === filter.key && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${filter.gradient} rounded-2xl opacity-20 blur-xl`}></div>
                )}
                
                {/* Button content */}
                <span className="relative z-10">{filter.label}</span>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
          
          {/* Contenido de casos de uso */}
          <div className="mt-12">
              {/* Caso de uso para Sector Legal */}
              {activeFilter === 'legal' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Firma Electrónica para el Sector Legal</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Firma de contratos legales con validez jurídica y trazabilidad completa de todas las partes</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autenticación segura de documentos notariales con sello de tiempo y validación de identidad</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de acuerdos de confidencialidad y documentos legales con múltiples firmantes</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Evidencia legal certificada con valor probatorio para procedimientos judiciales y arbitrajes</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Firma Electrónica Legal
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/legalH.webp"
                      alt="Firma electrónica para el sector legal"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Financiero */}
              {activeFilter === 'financiero' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Firma Electrónica para el Sector Financiero</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Firma de contratos bancarios y apertura de cuentas con validación biométrica</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autorización de créditos y préstamos con FIRMEDIGITAL certificada</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de pólizas de seguros y reclamaciones con firma electrónica avanzada</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Cumplimiento normativo con trazabilidad completa de firmas para auditorías financieras</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Firma Electrónica Financiera
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/fintech.webp"
                      alt="Firma electrónica para el sector financiero"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Gobierno */}
              {activeFilter === 'gobierno' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Firma Electrónica para el Sector Gobierno</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Firma de documentos oficiales con validez legal y certificación de tiempo</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de contrataciones públicas con FIRMEDIGITAL certificada y trazabilidad completa</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Expedientes electrónicos con firma avanzada para trámites ciudadanos y administrativos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Certificación de documentos oficiales con sello electrónico institucional</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Firma Electrónica Gubernamental
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/gobiernoss.webp"
                      alt="Firma electrónica para el sector gobierno"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Empresarial */}
              {activeFilter === 'empresarial' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Firma Electrónica para el Sector Empresarial</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Firma de contratos comerciales y acuerdos con proveedores con validez legal</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Autorización de facturas y órdenes de compra con FIREMDIGITAL certificada</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Firma de documentos internos con trazabilidad completa para auditorías y cumplimiento</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de documentación corporativa con firma electrónica de múltiples ejecutivos</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Firma Electrónica Empresarial
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/ingennieria.webp"
                      alt="Firma electrónica para el sector empresarial"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
              
              {/* Caso de uso para Sector Salud */}
              {activeFilter === 'salud' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <h3 className="text-3xl font-bold mb-6 text-blue-400">Flujos de trabajo para el Sector Salud</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de protocolos médicos con aprobaciones secuenciales y notificaciones automáticas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Coordinación de procesos de admisión y alta de pacientes con asignación de tareas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Automatización de autorizaciones médicas con flujos de aprobación y seguimiento</p>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-gray-300">Gestión de programación de citas y recursos médicos con alertas y recordatorios</p>
                      </div>
                    </div>
                    <div className="mt-8">
                      <Link href="https://app.firmedigital.com/auth/signup/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 text-white">
                        Implementar Flujos de Trabajo para Salud
                      </Link>
                    </div>
                  </div>
                  <div className="order-1 lg:order-2">
                    <Image
                      src="/images/salud.jpg"
                      alt="Flujos de trabajo para el sector salud"
                      width={600}
                      height={400}
                      className="rounded-xl shadow-2xl w-full h-auto object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
        </div>
      </section>
      
     {/* Planes y Precios Section */}
     <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Planes Flexibles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Planes y</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Soluciones flexibles para todas tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                    <p className="text-gray-300 text-sm">¡Impulso al siguiente nivel!</p>
                    <p className="text-gray-300 text-sm">Para persona natural</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                      <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                        <p className="text-gray-300 text-sm">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8 mt-5">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                
                              </div>
                              <div className="ml-2 flex flex-col">
                                
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="flex flex-col items-center">
  <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    10$
  </span>
  <span className="text-gray-400 text-sm mt-1">Equivale a</span>
  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    {(10/12).toFixed(2)}$/mes
  </span>
</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400 mt-10">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>400 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          
                         
                          
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Valor del Bloque */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                    <p className="text-gray-300 text-sm">¡Gestión eficiente de Documentos!</p>
                    <p className="text-gray-300 text-sm">Para persona jurídica</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                        <p className="text-gray-300 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8" style={{ paddingTop: '1rem' }}>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="ml-2 flex flex-col">
                                
                                </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
                              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                30$
                              </span>
                              <span className="text-gray-400 text-sm mt-1">Equivale a</span>
                              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                {(30/12).toFixed(2)}$/mes
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>1000 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Renovación de Certificados */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                    <p className="text-gray-300 text-sm"> ¡Mantén tus certificados emitidos al día!</p>
                    <p className="text-gray-300 text-sm">Para corporaciones</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                        <p className="text-gray-300 text-sm mb-2">Créditos Ilimitados</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                 
                                </span>
                              </div>
                           
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-6">Te ofrecemos soluciones personalizadas y eficientes para la seguridad y validación de tus documentos, adaptándonos a tus requerimientos específicos</p>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                        
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Documentos ilimitados</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Trazabilidad</span>
                          </li>
                          
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Corporativo */}

          </div>
        </div>
      </section>

      
      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-blue-950 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
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
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos Adicionales Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-950 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-blue-800/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aprende Más con Nuestros Recursos
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : blogArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No se encontraron artículos en la categoría Firma Electrónica.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => (
                <Link href={`/blog/${article._id}`} key={article._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 absolute z-10"></div>
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-blue-400" />
                          {new Date(article.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por {article.author}</span>
                        <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
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
    </>
  );
}
