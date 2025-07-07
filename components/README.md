# Componentes FIRMEDIGITAL

Este directorio contiene todos los componentes reutilizables del proyecto FIRMEDIGITAL.

## Uso de Componentes

### Importación Centralizada

```typescript
// Importar componentes desde el índice centralizado
import { Header, Footer, MegaMenu, Modal } from '@/components';

// O importar componentes específicos
import { Header } from '@/components';
import { TitleSkeleton, CardSkeleton } from '@/components';
```

## Componentes Principales

### Header

Componente de navegación principal con múltiples variantes.

```typescript
import { Header } from '@/components';

// Uso básico
<Header />

// Con variantes
<Header variant="simple" showAuthButtons={false} currentPage="Inicio" />
```

**Props:**
- `variant`: `'default' | 'simple' | 'transparent'` - Estilo visual del header
- `showAuthButtons`: `boolean` - Mostrar botones de autenticación
- `currentPage`: `string` - Página actual para resaltar en navegación

### Footer

Componente de pie de página con información de la empresa.

```typescript
import { Footer } from '@/components';

<Footer />
```

### MegaMenu

Navegación completa con menús desplegables y submenús.

```typescript
import { MegaMenu } from '@/components';

<MegaMenu />
```

### Modal

Componente modal reutilizable.

```typescript
import { Modal } from '@/components';

<Modal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Título del Modal"
>
  <p>Contenido del modal</p>
</Modal>
```

## Componentes de UI

### Skeletons

Componentes de carga para mejorar la experiencia de usuario.

```typescript
import { TitleSkeleton, TextSkeleton, ButtonSkeleton, CardSkeleton } from '@/components';

// Durante la carga
{isLoading ? <TitleSkeleton /> : <h1>{title}</h1>}
```

## Componentes Optimizados

### MegaMenuOptimized

Versión optimizada del MegaMenu con mejor rendimiento.

```typescript
import { MegaMenuOptimized } from '@/components';

<MegaMenuOptimized />
```

## Ejemplos de Uso Común

### Layout básico con Header y Footer

```typescript
import { Header, Footer } from '@/components';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Header variant="default" currentPage="Inicio" />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

### Layout simple sin botones de autenticación

```typescript
import { Header, Footer } from '@/components';

export default function SimpleLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Header 
        variant="simple" 
        showAuthButtons={false} 
        currentPage="Academia" 
      />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
```

### Página con carga y skeleton

```typescript
import { Header, Footer, TitleSkeleton, CardSkeleton } from '@/components';

export default function LoadingPage({ isLoading, data }) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 px-4">
        {isLoading ? (
          <div className="space-y-4">
            <TitleSkeleton />
            <div className="grid grid-cols-3 gap-4">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        ) : (
          <div>{/* Contenido real */}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
```

## Iconos

Todos los iconos están centralizados y disponibles desde la exportación principal:

```typescript
import { 
  HiOutlineMenu, 
  HiOutlineX, 
  AiOutlineFileDone,
  BsBuilding 
} from '@/components';
```

## Notas Importantes

1. **Importación**: Siempre usar la importación centralizada desde `@/components`
2. **Responsividad**: Todos los componentes están optimizados para móvil
3. **Accesibilidad**: Los componentes incluyen atributos de accesibilidad
4. **Rendimiento**: Usar versiones optimizadas cuando estén disponibles
5. **Consistencia**: Mantener el mismo patrón de colores y espaciado

## Desarrollo

Para agregar un nuevo componente:

1. Crear el archivo en el directorio apropiado
2. Exportarlo en `index.tsx`
3. Documentar su uso en este README
4. Asegurar que sea responsive y accesible 