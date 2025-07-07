# Guía de Optimización de ScrollTrigger

## Introducción

Esta guía explica cómo utilizar los componentes optimizados para implementar animaciones con ScrollTrigger de GSAP de manera eficiente, reduciendo el tamaño del bundle inicial y mejorando el rendimiento de la aplicación.

## Componentes Optimizados

Se han creado tres componentes principales para optimizar el uso de ScrollTrigger:

1. **ScrollTriggerComponent**: Componente base que implementa la carga diferida de ScrollTrigger.
2. **OptimizedScrollAnimations**: Componente para animaciones de scroll en la página principal.
3. **ScrollTriggerExample**: Componente de ejemplo que muestra cómo utilizar ScrollTriggerComponent.

## Cómo Utilizar los Componentes

### ScrollTriggerComponent

Este es el componente base que implementa la carga diferida de ScrollTrigger. Solo carga el plugin cuando el componente entra en el viewport, reduciendo el tamaño del bundle inicial.

```tsx
import ScrollTriggerComponent from '../utils/ScrollTriggerComponent';

// En tu componente
return (
  <ScrollTriggerComponent
    onInitialize={(gsap, ScrollTrigger) => {
      // Definir animaciones aquí
      gsap.from('.elemento', {
        y: 50,
        opacity: 0,
        scrollTrigger: {
          trigger: '.elemento',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }}
    onCleanup={() => {
      // Limpiar animaciones si es necesario
    }}
    lazyLoad={true} // Solo carga ScrollTrigger cuando el componente entra en el viewport
    options={{
      fastScrollEnd: true,
      preventOverlaps: true
    }}
  >
    {/* Contenido del componente */}
  </ScrollTriggerComponent>
);
```

### OptimizedScrollAnimations

Este componente está diseñado específicamente para animaciones de scroll en la página principal. Utiliza ScrollTriggerComponent internamente y proporciona una API más sencilla para definir animaciones comunes.

```tsx
import OptimizedScrollAnimations from '../components/OptimizedScrollAnimations';

// En tu componente
return (
  <OptimizedScrollAnimations
    sectionId="features-section"
    className="my-section"
  >
    <div className="feature-card">Característica 1</div>
    <div className="feature-card">Característica 2</div>
    <div className="feature">Otra característica</div>
    <div className="mission-card">Nuestra misión</div>
    <div className="vision-card">Nuestra visión</div>
  </OptimizedScrollAnimations>
);
```

### ScrollTriggerExample

Este es un componente de ejemplo que muestra cómo utilizar ScrollTriggerComponent para implementar animaciones personalizadas.

```tsx
import ScrollTriggerExample from '../components/ScrollTriggerExample';

// En tu componente
return (
  <ScrollTriggerExample className="my-section">
    <div className="animate-item">Elemento 1</div>
    <div className="animate-item">Elemento 2</div>
    <div className="animate-item">Elemento 3</div>
  </ScrollTriggerExample>
);
```

## Migración de Componentes Existentes

Para migrar componentes existentes que utilizan ScrollTrigger, sigue estos pasos:

1. Elimina las importaciones directas de ScrollTrigger:
   ```tsx
   // Eliminar esto
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   gsap.registerPlugin(ScrollTrigger);
   ```

2. Envuelve el contenido del componente con ScrollTriggerComponent:
   ```tsx
   import ScrollTriggerComponent from '../utils/ScrollTriggerComponent';

   // En tu componente
   return (
     <ScrollTriggerComponent
       onInitialize={(gsap, ScrollTrigger) => {
         // Mover aquí las animaciones existentes
       }}
     >
       {/* Contenido del componente */}
     </ScrollTriggerComponent>
   );
   ```

3. Mueve las animaciones existentes a la función onInitialize.

## Beneficios de la Optimización

- **Reducción del tamaño del bundle inicial**: ScrollTrigger solo se carga cuando es necesario.
- **Mejor rendimiento**: Las animaciones se inicializan solo cuando el componente entra en el viewport.
- **Código más limpio**: API sencilla para definir animaciones.
- **Mejor gestión de memoria**: Las animaciones se limpian automáticamente cuando el componente se desmonta.

## Consideraciones Adicionales

- Utiliza `lazyLoad={false}` si necesitas que ScrollTrigger se cargue inmediatamente.
- Utiliza `options` para configurar ScrollTrigger según tus necesidades.
- Asegúrate de limpiar las animaciones en la función `onCleanup` si es necesario.