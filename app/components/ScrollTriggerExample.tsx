'use client';

import React, { useRef } from 'react';
import ScrollTriggerComponent from '../utils/ScrollTriggerComponent';

interface ScrollTriggerExampleProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente de ejemplo que muestra cómo utilizar ScrollTriggerComponent
 * para implementar animaciones con ScrollTrigger de manera optimizada
 */
const ScrollTriggerExample = ({ children, className = '' }: ScrollTriggerExampleProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Esta función se ejecutará cuando el componente entre en el viewport
  // y ScrollTrigger se haya cargado
  const initializeAnimations = (gsap: any, ScrollTrigger: any) => {
    // Ejemplo de animación con ScrollTrigger
    if (sectionRef.current) {
      // Animación de los elementos hijos
      gsap.from(sectionRef.current.querySelectorAll('.animate-item'), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  };

  // Esta función se ejecutará cuando el componente se desmonte
  const cleanupAnimations = () => {
    // La limpieza básica ya está implementada en ScrollTriggerComponent
    // Aquí podemos agregar lógica adicional si es necesario
    console.log('Animations cleaned up');
  };

  return (
    <ScrollTriggerComponent
      onInitialize={initializeAnimations}
      onCleanup={cleanupAnimations}
      // Solo carga ScrollTrigger cuando el componente entre en el viewport
      lazyLoad={true}
      // Opciones adicionales para ScrollTrigger
      options={{
        fastScrollEnd: true,
        preventOverlaps: true
      }}
    >
      <div ref={sectionRef} className={`scroll-section ${className}`}>
        {children}
      </div>
    </ScrollTriggerComponent>
  );
};

export default ScrollTriggerExample;