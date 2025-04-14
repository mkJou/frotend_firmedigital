'use client';

import React, { useRef } from 'react';
import ScrollTriggerComponent from '../utils/ScrollTriggerComponent';

interface OptimizedScrollAnimationsProps {
  children: React.ReactNode;
  sectionId?: string;
  className?: string;
}

/**
 * Componente optimizado para animaciones de scroll en la página principal
 * Utiliza carga diferida de ScrollTrigger para mejorar el rendimiento
 */
const OptimizedScrollAnimations = ({
  children,
  sectionId,
  className = ''
}: OptimizedScrollAnimationsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Esta función se ejecutará cuando el componente entre en el viewport
  const initializeAnimations = (gsap: any, ScrollTrigger: any) => {
    if (!sectionRef.current) return;

    // Configuración común para las animaciones
    const commonConfig = {
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2
    };

    // Animación para cards
    const cards = sectionRef.current.querySelectorAll('.feature-card, .pricing-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        ...commonConfig,
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Animación para features
    const features = sectionRef.current.querySelectorAll('.feature');
    if (features.length > 0) {
      gsap.from(features, {
        ...commonConfig,
        y: 30,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Animación para misión y visión
    const missionCards = sectionRef.current.querySelectorAll('.mission-card');
    if (missionCards.length > 0) {
      gsap.from(missionCards, {
        ...commonConfig,
        x: -50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }

    // Animación para visión
    const visionCards = sectionRef.current.querySelectorAll('.vision-card');
    if (visionCards.length > 0) {
      gsap.from(visionCards, {
        ...commonConfig,
        x: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  };

  // Función para limpiar las animaciones
  const cleanupAnimations = () => {
    // La limpieza básica ya está implementada en ScrollTriggerComponent
  };

  return (
    <ScrollTriggerComponent
      onInitialize={initializeAnimations}
      onCleanup={cleanupAnimations}
      lazyLoad={true}
      options={{
        fastScrollEnd: true,
        preventOverlaps: true
      }}
    >
      <div 
        ref={sectionRef} 
        id={sectionId} 
        className={`optimized-scroll-section ${className}`}
      >
        {children}
      </div>
    </ScrollTriggerComponent>
  );
};

export default OptimizedScrollAnimations;