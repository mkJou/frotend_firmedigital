import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { allowedIPs } from './lib/allowedIPs';

// Este middleware se ejecutará en las rutas especificadas en el matcher
export function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const path = request.nextUrl.pathname;
  
  
  // Solo aplicar restricciones a la ruta de administración del blog
  if (path.startsWith('/blog/admin')) {
    // Obtener la IP del cliente - mejorar la detección de IP
    let ip = request.ip || '';
    const forwardedFor = request.headers.get('x-forwarded-for');
    
    if (forwardedFor) {
      // x-forwarded-for puede contener múltiples IPs separadas por comas
      // tomamos la primera que es la del cliente original
      ip = forwardedFor.split(',')[0].trim();
    }
    
    // Si no se detecta ninguna IP, usar una por defecto
    if (!ip) {
      ip = '0.0.0.0';
    }
    
    // Agregar logs detallados para depuración
    console.log('IP detectada (raw):', request.ip);
    console.log('X-Forwarded-For:', forwardedFor);
    console.log('IP final utilizada:', ip);
    console.log('Lista de IPs permitidas:', allowedIPs);
    
    // Normalizar la IP para manejar el formato IPv4 mapeado a IPv6 (::ffff:)
    if (ip.startsWith('::ffff:')) {
      const normalizedIP = ip.substring(7); // Eliminar el prefijo '::ffff:'
      console.log('IP normalizada:', normalizedIP);
      ip = normalizedIP;
    }
    
    // Verificar si la IP está en la lista de IPs permitidas
    // Comparación más robusta
    const isAllowed = allowedIPs.some(allowedIP => {
      const match = ip === allowedIP;
      console.log(`Comparando ${ip} con ${allowedIP}: ${match}`);
      return match;
    });
    
    console.log('¿IP permitida?:', isAllowed);
    
    // Si la IP no está permitida, redirigir a la página de acceso no autorizado
    if (!isAllowed) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }
  
  // Continuar con la solicitud si la IP está permitida o si no es una ruta restringida
  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: ['/blog/admin/:path*'],
};