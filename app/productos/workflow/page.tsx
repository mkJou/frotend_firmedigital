'use client';

import React, { useEffect, useRef } from 'react';
import MegaMenu from '../../../components/MegaMenu';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Workflow() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const ctx = gsap.context(() => {
      timelineSteps.forEach((step, index) => {
        // Animación del contenedor principal
        gsap.fromTo(step,
          {
            opacity: 0,
            y: 50,
            duration: 0
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top bottom-=150",
              end: "top center",
              toggleActions: "play none none reverse",
              markers: false,
              scrub: false,
              once: false
            }
          }
        );

        // Animación de la tarjeta
        const card = step.querySelector('.timeline-card');
        if (card) {
          gsap.fromTo(card,
            {
              x: index % 2 === 0 ? -30 : 30,
              opacity: 0,
              duration: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: step,
                start: "top bottom-=150",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false,
                scrub: false
              }
            }
          );
        }

        // Animación del punto del timeline
        const dot = step.querySelector('.timeline-dot');
        if (dot) {
          gsap.fromTo(dot,
            {
              scale: 0,
              opacity: 0,
              duration: 0
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: 0.2,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: step,
                start: "top bottom-=150",
                end: "top center",
                toggleActions: "play none none reverse",
                markers: false,
                scrub: false
              }
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const steps = [
    {
      title: "Registro y Configuración",
      description: "Comienza tu viaje con nosotros registrándote en nuestra plataforma. Configura tu cuenta con tus datos y preferencias. Nuestro sistema es intuitivo y te guiará en cada paso del camino, asegurando que todo esté listo para empezar a trabajar de manera eficiente.",
      icon: "🔐"
    },
    {
      title: "Creación de Documentos",
      description: "Sube o crea documentos directamente en nuestra plataforma. Ofrecemos herramientas fáciles de usar para que puedas redactar, editar y organizar tus documentos sin complicaciones. Todo está diseñado para que te concentres en lo que realmente importa.",
      icon: "📄"
    },
    {
      title: "Flujo de Trabajo Personalizado",
      description: "Configura tu Workflow según las necesidades de tu empresa. Asigna tareas, establece plazos y define el orden de aprobación. Nuestro sistema automatizado asegura que cada paso se siga de manera precisa, evitando retrasos y errores.",
      icon: "⚙️"
    },
    {
      title: "Firma Electrónica Segura",
      description: "Cuando tus documentos estén listos, es el momento de firmarlos electrónicamente. Con Firmedigital PSC, puedes estar seguro de que cada firma es legalmente vinculante y está protegida con la tecnología más avanzada. Firma desde cualquier dispositivo, en cualquier lugar y en cualquier momento.",
      icon: "✍️"
    },
    {
      title: "Monitoreo y Gestión",
      description: "Mantente al tanto de cada etapa del proceso con nuestras herramientas de monitoreo y gestión. Recibe notificaciones en tiempo real y accede a informes detallados sobre el progreso de tus documentos. Así, siempre tendrás el control y la visibilidad que necesitas.",
      icon: "📊"
    },
    {
      title: "Archivo Seguro",
      description: "Una vez completado el proceso, todos tus documentos serán almacenados de manera segura en nuestra plataforma. Accede a ellos cuando los necesites y disfruta de la tranquilidad de saber que están protegidos y organizados.",
      icon: "🔒"
    }
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-30">
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <object
              type="image/svg+xml"
              data="/images/workflow.svg"
              className="w-full h-full"
              aria-label="Workflow Animation"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-90" />
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center" style={{ marginTop: '60vh' }}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Optimiza tus procesos con nuestro sistema de workflow inteligente.
              Automatiza, controla y mejora la eficiencia de tu negocio.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
          
          <div className="mapa relative py-20 overflow-hidden bg-black">
            <div className="timeline-container max-w-6xl mx-auto relative px-4">
              {/* Línea central del timeline */}
              <div className="timeline-line absolute left-[50%] top-0 w-1 h-full transform -translate-x-1/2">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-purple-400" />
                <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-blue-300 to-purple-300 opacity-75" />
              </div>
              
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="timeline-step opacity-0 flex items-center gap-8 mb-32"
                  style={{
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                  }}
                >
                  <div className="flex-1">
                    <div className={`timeline-card group bg-black/95 backdrop-blur-sm border border-white/20 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-500 hover:border-white/40 ${
                      index % 2 === 0 ? 'mr-12' : 'ml-12'
                    }`}>
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-3xl transform group-hover:scale-110 transition-transform duration-500">
                            {step.icon}
                          </div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-white/90 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-dot w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-2xl font-bold relative z-10 transform hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                    <div className="absolute inset-0 rounded-full animate-ping bg-gradient-to-r from-blue-400 to-purple-400 opacity-30" />
                    {index + 1}
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Automatización</h3>
              <p className="text-gray-300">
                Automatiza tareas repetitivas y procesos complejos con facilidad.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Personalización</h3>
              <p className="text-gray-300">
                Adapta los flujos de trabajo a tus necesidades específicas.
              </p>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Integración</h3>
              <p className="text-gray-300">
                Conecta con tus herramientas y sistemas existentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Workflow */}
      <section className="px-4 md:px-8 py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Proceso de Workflow</h2>
          <div className="relative">
            {/* Línea de conexión */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-500 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Diseño</h3>
                <p className="text-gray-300">Crea flujos de trabajo personalizados</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Asignación</h3>
                <p className="text-gray-300">Define roles y responsabilidades</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Ejecución</h3>
                <p className="text-gray-300">Implementa y monitorea el proceso</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl relative z-10">
                <div className="text-2xl font-bold text-blue-500 mb-4">4</div>
                <h3 className="text-xl font-bold mb-2">Optimización</h3>
                <p className="text-gray-300">Analiza y mejora continuamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Workflow */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Tipos de Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Secuencial</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Procesos paso a paso</li>
                <li>• Aprobaciones en cadena</li>
                <li>• Seguimiento lineal</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Paralelo</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Tareas simultáneas</li>
                <li>• Múltiples aprobadores</li>
                <li>• Procesos concurrentes</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow Condicional</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Rutas dinámicas</li>
                <li>• Decisiones automatizadas</li>
                <li>• Reglas personalizadas</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Workflow de Estado</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Control de estados</li>
                <li>• Transiciones definidas</li>
                <li>• Seguimiento de progreso</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección adicional después del timeline */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Simplifica tu Trabajo con Firmedigital PSC
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            En Firmedigital PSC, estamos comprometidos a ofrecerte soluciones que hagan tu vida más fácil. Nuestro Workflow optimizado y nuestras herramientas de firma digital están diseñadas para brindarte la máxima eficiencia y seguridad. Descubre cómo podemos ayudarte a llevar tu negocio al siguiente nivel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Revoluciona tu flujo de trabajo con Firmedigital PSC
            </h3>
            <p className="text-gray-300 leading-relaxed">
              ¿Te imaginas un proceso donde cada tarea se realiza sin contratiempos, desde la creación del primer documento hasta su aprobación final? En Firmedigital PSC, lo hemos hecho posible. Nuestro sistema es intuitivo y automatizado, diseñado para gestionar tus documentos con rapidez y eficiencia.
            </p>
          </div>

          <div className="bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Fluidez en cada paso
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Cada etapa de nuestro Workflow está cuidadosamente pensada para ser sencilla y clara, reduciendo al mínimo el tiempo y esfuerzo necesarios. Olvídate de los cuellos de botella y las complicaciones: con Firmedigital PSC, cada paso es un avance hacia la eficiencia y la seguridad.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
