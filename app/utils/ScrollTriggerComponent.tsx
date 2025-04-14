'use client';

import { useEffect, useRef } from 'react';
import { loadScrollTrigger, loadGSAP } from './gsapUtils';
import { scrollTriggerDefaults } from './gsapConfig';

interface ScrollTriggerComponentProps {
  children: React.ReactNode;
  // Función que recibe gsap y ScrollTrigger y define las animaciones
  onInitialize?: (gsap: any, ScrollTrigger: any) => void;
  // Función para limpiar las animaciones
  onCleanup?: () => void;
  // Determina si ScrollTrigger debe cargarse inmediatamente o solo cuando el componente entre en viewport
  lazyLoad?: boolean;
  // Opciones adicionales para ScrollTrigger
  options?: Record<string, any>;
}

/**
 * Componente que carga ScrollTrigger de manera optimizada
 * Solo carga el plugin cuando es necesario y proporciona una API sencilla para definir animaciones
 */
const ScrollTriggerComponent = ({
  children,
  onInitialize,
  onCleanup,
  lazyLoad = true,
  options = {}
}: ScrollTriggerComponentProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    let cleanup: (() => void) | undefined;

    const initScrollTrigger = async () => {
      if (initialized.current) return;

      try {
        // Cargar GSAP y ScrollTrigger de manera asíncrona
        const [gsap, ScrollTrigger] = await Promise.all([
          loadGSAP(),
          loadScrollTrigger()
        ]);

        // Configurar ScrollTrigger con opciones optimizadas
        ScrollTrigger.config({
          ...options
        });

        // Inicializar animaciones si se proporciona la función
        if (onInitialize && typeof onInitialize === 'function') {
          onInitialize(gsap, ScrollTrigger);

          // Guardar la función de limpieza para ejecutarla al desmontar
          cleanup = () => {
            // Limpiar todas las animaciones de ScrollTrigger asociadas a este componente
            ScrollTrigger.getAll()
              .filter(trigger => {
                const triggerElement: any = trigger.vars.trigger;
                return componentRef.current?.contains(triggerElement);
              })
              .forEach(trigger => trigger.kill());

            // Ejecutar función de limpieza personalizada si existe
            if (onCleanup && typeof onCleanup === 'function') {
              onCleanup();
            }
          };
        }

        initialized.current = true;
      } catch (error) {
        console.error('Error al inicializar ScrollTrigger:', error);
      }
    };

    // Si lazyLoad es true, usar IntersectionObserver para cargar ScrollTrigger
    // solo cuando el componente entre en el viewport
    if (lazyLoad && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            initScrollTrigger();
            // Desconectar el observer una vez que se ha inicializado
            observer.disconnect();
          }
        },
        { threshold: 0.1 } // Inicializar cuando al menos el 10% del componente sea visible
      );

      if (componentRef.current) {
        observer.observe(componentRef.current);
      }
    } else {
      // Si lazyLoad es false, inicializar inmediatamente
      initScrollTrigger();
    }

    return () => {
      // Limpiar observer si existe
      if (observer) {
        observer.disconnect();
      }

      // Ejecutar función de limpieza si existe
      if (cleanup) {
        cleanup();
      }
    };
  }, [onInitialize, onCleanup, lazyLoad, options]);

  return (
    <div ref={componentRef} className="scroll-trigger-component">
      {children}
    </div>
  );
};

export default ScrollTriggerComponent;