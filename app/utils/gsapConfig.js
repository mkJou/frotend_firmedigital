/**
 * Configuración optimizada para GSAP
 * Este archivo centraliza la configuración de GSAP para mejorar el rendimiento
 */

import { gsap } from 'gsap';

// Configuración global para optimizar el rendimiento de GSAP
gsap.defaults({
  // Forzar renderizado por GPU cuando sea posible
  force3D: true,
  // Reducir la precisión de los cálculos para mejorar el rendimiento
  precision: 0.001,
  // Optimizar para dispositivos móviles
  overwrite: 'auto',
  // Reducir la cantidad de actualizaciones por segundo en dispositivos de bajo rendimiento
  lazy: true,
  // Utilizar requestAnimationFrame para sincronizar con el ciclo de renderizado del navegador
  useFrames: false
});

// Configuración para ScrollTrigger para mejorar el rendimiento
export const scrollTriggerDefaults = {
  // Reducir la frecuencia de actualización durante el scroll
  invalidateOnRefresh: false,
  // Desactivar marcadores en producción
  markers: false,
  // Optimizar para dispositivos móviles
  fastScrollEnd: true,
  // Reducir la precisión de los cálculos
  preventOverlaps: true,
  // Optimizar para dispositivos de bajo rendimiento
  onUpdate: null,
  // Desactivar el scrub por defecto para mejorar el rendimiento
  scrub: false
};

// Exportar configuración por defecto para diferentes tipos de animaciones
export const animationDefaults = {
  // Configuración para animaciones de entrada
  from: {
    duration: 0.5,
    ease: 'power2.out',
    clearProps: 'all',
    overwrite: 'auto'
  },
  // Configuración para animaciones de salida
  to: {
    duration: 0.5,
    ease: 'power2.inOut',
    overwrite: 'auto'
  },
  // Configuración para animaciones de ida y vuelta
  fromTo: {
    duration: 0.5,
    ease: 'power2.inOut',
    overwrite: 'auto'
  }
};

// Función para limpiar animaciones y liberar memoria
export const clearAnimations = (animations = []) => {
  animations.forEach(animation => {
    if (animation && typeof animation.kill === 'function') {
      animation.kill();
    }
  });
};

// Exportar GSAP configurado
export default gsap;