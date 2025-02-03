'use client';
import { useEffect, useState, useRef } from 'react';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import MegaMenu from '@/components/MegaMenu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

export default function Trazabilidad() {
  const [isLoading, setIsLoading] = useState(true);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    if (!isLoading) {
      // Animación inicial de carga
      tl.from('.hero-section', { 
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      .from('.hero-icon', {
        scale: 0,
        rotation: 360,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Efecto de escritura para el título
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          duration: 2,
          text: "Trazabilidad: Tu Aliado en la Gestión Segura y Transparente",
          ease: "none",
          delay: 0.5
        });
      }

      // Animación del texto descriptivo
      tl.from('.hero-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 2.5
      });

      // Animaciones de las cards al hacer scroll
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach((card) => {
        if (card instanceof HTMLElement) {
          gsap.set(card, { opacity: 1, y: 0 }); // Asegura que las cards sean visibles inicialmente
          gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              end: 'top center',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });
    }

    // Simular tiempo de carga
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimeout);
      // Limpia las animaciones al desmontar
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-b from-black via-black to-[#111827] text-white py-24 px-4 mt-[100px] relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {isLoading ? (
            <SkeletonHero />
          ) : (
            <>
              <HiOutlineSearchCircle className="hero-icon text-6xl mx-auto mb-4 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <h1 
                ref={titleRef}
                className="hero-title text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              ></h1>
              <p className="hero-text text-xl max-w-3xl mx-auto text-white leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                La trazabilidad en Firmedigital PSC te ofrece la tranquilidad de saber que cada paso en el proceso de firma electrónica está registrado y es verificable.
              </p>
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="features-section py-20 px-4 bg-gradient-to-b from-[#111827] to-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              <>
                <div className="feature-card bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group" style={{ opacity: 1, transform: 'none', willChange: 'transform, opacity' }}>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    Visibilidad Completa
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Monitorea cada paso del proceso de firma electrónica desde el inicio hasta la finalización, asegurando que todas tus transacciones sean claras y comprensibles.
                  </p>
                </div>
                <div className="feature-card bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group" style={{ opacity: 1, transform: 'none', willChange: 'transform, opacity' }}>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    Seguridad Personal
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Cada acción se registra, proporcionando un historial detallado y verificable que te protege contra fraudes y usos indebidos de tus documentos.
                  </p>
                </div>
                <div className="feature-card bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group" style={{ opacity: 1, transform: 'none', willChange: 'transform, opacity' }}>
                  <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                    Historial Detallado
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Accede a un registro completo de todas las firmas y acciones realizadas, con información precisa sobre quién, cuándo y qué se firmó.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Optimización y Transparencia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
              <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                Auditoría Integral
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Lleva un registro completo de todas las actividades relacionadas con la firma de documentos, facilitando la auditoría interna y el cumplimiento normativo.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
              <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                Monitoreo en Tiempo Real
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Supervisa el progreso de los documentos en tiempo real, asegurándote de que todos los procesos se desarrollen de manera eficiente y sin interrupciones.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group">
              <h3 className="text-2xl font-bold mb-4 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] group-hover:text-blue-300 transition-colors">
                Cumplimiento Normativo
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                Asegura que todas las firmas y transacciones cumplan con las normativas legales, reduciendo el riesgo de incumplimiento y sanciones.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
