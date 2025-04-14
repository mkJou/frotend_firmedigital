/**
 * Utilidades para optimizar el uso de GSAP en la aplicación
 * Este archivo centraliza la importación y registro de plugins de GSAP
 * para mejorar el rendimiento y reducir el tamaño del bundle
 */

// Importación bajo demanda de GSAP y sus plugins
export const loadGSAP = async () => {
  // Importación dinámica de GSAP core
  const gsapModule = await import('gsap/dist/gsap');
  return gsapModule.gsap;
};

// Carga ScrollTrigger solo cuando sea necesario y optimizado para rendimiento
export const loadScrollTrigger = async () => {
  // Usamos dynamic import para cargar ScrollTrigger solo cuando sea necesario
  // Esto reduce el tamaño del bundle inicial
  const [gsap, ScrollTriggerModule] = await Promise.all([
    loadGSAP(),
    // Importamos desde la ruta específica para mejor tree-shaking
    import('gsap/dist/ScrollTrigger')
  ]);
  
  // Registrar el plugin solo si no está ya registrado
  if (!gsap.plugins?.ScrollTrigger) {
    gsap.registerPlugin(ScrollTriggerModule.ScrollTrigger);
  }
  
  return ScrollTriggerModule.ScrollTrigger;
};

// Carga TextPlugin solo cuando sea necesario
export const loadTextPlugin = async () => {
  const [gsap, TextPluginModule] = await Promise.all([
    loadGSAP(),
    import('gsap/TextPlugin')
  ]);
  
  // Registrar el plugin solo si no está ya registrado
  if (!gsap.plugins?.TextPlugin) {
    gsap.registerPlugin(TextPluginModule.TextPlugin);
  }
  
  return TextPluginModule.TextPlugin;
};

// Función para cargar múltiples plugins a la vez
export const loadGSAPWithPlugins = async (plugins = []) => {
  const gsap = await loadGSAP();
  const pluginPromises = [];
  
  // Cargar plugins solicitados
  if (plugins.includes('ScrollTrigger')) {
    pluginPromises.push(loadScrollTrigger());
  }
  
  if (plugins.includes('TextPlugin')) {
    pluginPromises.push(loadTextPlugin());
  }
  
  // Esperar a que todos los plugins se carguen
  await Promise.all(pluginPromises);
  
  return gsap;
};

// Función para crear animaciones con mejor rendimiento
export const createOptimizedAnimation = (element, animationType, props) => {
  // Usar requestAnimationFrame para sincronizar con el ciclo de renderizado del navegador
  return new Promise(async (resolve) => {
    const gsap = await loadGSAP();
    
    requestAnimationFrame(() => {
      // Aplicar configuraciones optimizadas por defecto
      const optimizedProps = {
        ...props,
        // Forzar renderizado por GPU cuando sea posible
        force3D: props.force3D !== undefined ? props.force3D : true,
        // Optimizar para dispositivos móviles
        overwrite: props.overwrite !== undefined ? props.overwrite : 'auto',
      };
      
      // Crear la animación según el tipo
      let animation;
      
      switch (animationType) {
        case 'to':
          animation = gsap.to(element, optimizedProps);
          break;
        case 'from':
          animation = gsap.from(element, optimizedProps);
          break;
        case 'fromTo':
          // Para fromTo necesitamos props.fromVars y props.toVars
          animation = gsap.fromTo(element, 
            props.fromVars || {}, 
            { ...optimizedProps, ...props.toVars }
          );
          break;
        default:
          animation = gsap.to(element, optimizedProps);
      }
      
      resolve(animation);
    });
  });
};

// Función para limpiar animaciones y liberar memoria
export const clearAnimations = (animations = []) => {
  animations.forEach(animation => {
    if (animation && typeof animation.kill === 'function') {
      animation.kill();
    }
  });
};