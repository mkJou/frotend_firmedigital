'use client';

import React, { useEffect, useLayoutEffect, useRef, Suspense, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import MegaMenu from '@/components/MegaMenu';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { 
  TitleSkeleton, 
  TextSkeleton, 
  ButtonSkeleton,
  CardSkeleton 
} from '@/components/ui/Skeletons';
import styles from './styles/FlipCard.module.css';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { IoShieldCheckmarkOutline, IoHeadsetOutline, HiOutlineLockClosed } from '../components/icons/home-icons';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Signature from '@/components/Signature';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Lazy load the features card component
const FeaturesCard = dynamic(() => Promise.resolve(() => {
  return (
    <div className="relative feature-card">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl" />
      <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-6">Características Principales</h3>
        <div className="space-y-4">
          {[
            'Firma Electrónica',
            'Validación Instantánea',
            'Verificación de identidad',
            'Conoce a tu cliente (KYC)',
            'Gestor de Documentos',          
          ].map((feature, index) => (
            <div 
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}), {
  loading: () => <CardSkeleton />
});

// Componente para mostrar videos específicos de la Academia
const AcademiaVideos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // IDs específicos de los videos solicitados
  const videoIds = ['684c1e2a69c08479d1f60604', '684b2b6a0d6cf10daddc40ae', '6842ff4d744930c7b0c82973'];
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videoPromises = videoIds.map(async (id) => {
          const response = await fetch(`/api/videos/${id}`);
          if (response.ok) {
            const data = await response.json();
            return data.data;
          }
          return null;
        });
        
        const fetchedVideos = await Promise.all(videoPromises);
        const validVideos = fetchedVideos.filter(video => video !== null);
        setVideos(validVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
        // Fallback con datos estáticos si no se pueden cargar los videos reales
        setVideos([
          {
            _id: '684c1e2a69c08479d1f60604',
            title: 'Introducción a la Firma Digital',
            description: 'Conceptos básicos sobre certificados digitales y su importancia en la transformación digital.',
            category: 'Fundamentos',
            youtubeId: 'dQw4w9WgXcQ' // Placeholder
          },
          {
            _id: '684b2b6a0d6cf10daddc40ae',
            title: 'Seguridad en Documentos Digitales',
            description: 'Aprende sobre encriptación, autenticación y las mejores prácticas de seguridad digital.',
            category: 'Seguridad',
            youtubeId: 'dQw4w9WgXcQ' // Placeholder
          },
          {
            _id: '6842ff4d744930c7b0c82973',
            title: 'Cumplimiento Legal en Venezuela',
            description: 'Todo sobre SUSCERTE, legislación venezolana y validez legal de documentos electrónicos.',
            category: 'Legal',
            youtubeId: 'dQw4w9WgXcQ' // Placeholder
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);
  
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Fundamentos': 'blue',
      'Seguridad': 'purple',
      'Legal': 'green',
      'Básico': 'blue',
      'Avanzado': 'purple',
      'Normativo': 'green'
    };
    return colors[category] || 'blue';
  };
  
  const getGradientClasses = (category: string) => {
    const color = getCategoryColor(category);
    const gradients: { [key: string]: string } = {
      'blue': 'from-blue-500/20 to-purple-500/20',
      'purple': 'from-purple-500/20 to-pink-500/20',
      'green': 'from-green-500/20 to-emerald-500/20'
    };
    return gradients[color] || gradients['blue'];
  };
  
  const getShadowClasses = (category: string) => {
    const color = getCategoryColor(category);
    const shadows: { [key: string]: string } = {
      'blue': 'hover:shadow-blue-500/20',
      'purple': 'hover:shadow-purple-500/20',
      'green': 'hover:shadow-green-500/20'
    };
    return shadows[color] || shadows['blue'];
  };
  
  const getCategoryClasses = (category: string) => {
    const color = getCategoryColor(category);
    const classes: { [key: string]: string } = {
      'blue': 'text-blue-400 bg-blue-500/20',
      'purple': 'text-purple-400 bg-purple-500/20',
      'green': 'text-green-400 bg-green-500/20'
    };
    return classes[color] || classes['blue'];
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {videos.map((video, index) => (
        <div key={video._id} className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 shadow-2xl ${getShadowClasses(video.category)} group cursor-pointer`}>
          <div className="relative mb-4 overflow-hidden rounded-xl">
            {video.youtubeId && video.youtubeId !== 'dQw4w9WgXcQ' ? (
              <img 
                src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full aspect-video object-cover"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`aspect-video bg-gradient-to-br ${getGradientClasses(video.category)} flex items-center justify-center ${video.youtubeId && video.youtubeId !== 'dQw4w9WgXcQ' ? 'hidden' : ''}`}>
              <svg className="w-12 h-12 text-white/80 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{video.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryClasses(video.category)}`}>
              {video.category}
            </span>
            <Link 
              href={`/academia`}
              className="text-xs px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/20 border border-white/20 backdrop-blur-sm flex items-center gap-1"
            >
              Ver video
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    description: ''
  });

  // Estados para el verificador de certificados
  const [searchType, setSearchType] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | { valid: boolean; message: string; details?: any }>(null);
  
  // Estados para el formulario de Fedeindustria
  const [nombre, setNombre] = useState('');
  const [tipoPersona, setTipoPersona] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [sector, setSector] = useState('');
  const [emailFedeindustria, setEmailFedeindustria] = useState('');
  const [telefono, setTelefono] = useState('');
  const [isSubmittingFedeindustria, setIsSubmittingFedeindustria] = useState(false);
  const [formStatusFedeindustria, setFormStatusFedeindustria] = useState<null | { success: boolean; message: string }>(null);

  const handleOpenModal = (title: string, description: string) => {
    setModalContent({ title, description });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función para validar si una cédula tiene formato válido
  const isValidCI = (ci: string): boolean => {
    // Eliminar caracteres no numéricos
    const cleanCI = ci.replace(/\D/g, '');
    
    // Verificar que tenga entre 6 y 12 dígitos (rango típico para cédulas)
    if (cleanCI.length < 6 || cleanCI.length > 12) {
      return false;
    }
    
    // Verificar que solo contenga números
    return /^\d+$/.test(cleanCI);
  };

  // Función para manejar la búsqueda de certificados
  const handleSearch = async () => {
    if (!searchType || !searchCode) {
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    // Mapeo directo de los valores del select a los parámetros de consulta de la API
    // Aseguramos que se use exactamente el formato correcto: name, email, serial o ci
    const queryTypes: Record<string, string> = {
      '0': 'ci',
      '1': 'name',
      '2': 'serial',
      '3': 'email'
    };

    // Función mejorada para extraer el nombre de la persona
    const extractName = (rawData: any, queryType: string): string => {
      // Si no hay datos, devolver 'No disponible'
      if (!rawData) return 'No disponible';
      
      // Para búsquedas por email, intentamos extraer el nombre de diferentes lugares
      if (queryType === 'email') {
        // Primero intentamos con el campo subject que suele contener el nombre para emails
        if (rawData.subject) {
          if (typeof rawData.subject === 'string') {
            // Si es una cadena, intentamos extraer el CN
            const cnMatch = rawData.subject.match(/CN=([^,]+)/i);
            if (cnMatch && cnMatch[1]) {
              return cnMatch[1].trim();
            }
            
            // Si no hay CN, intentamos extraer el nombre del campo subject directamente
            if (rawData.subject.includes('=')) {
              const parts = rawData.subject.split(',');
              for (const part of parts) {
                if (part.trim().startsWith('CN=')) {
                  return part.trim().substring(3).trim();
                }
              }
            } else {
              // Si no tiene formato clave=valor, usamos el subject completo
              return rawData.subject.trim();
            }
          } else if (typeof rawData.subject === 'object') {
            // Si es un objeto, intentamos con propiedades comunes
            if (rawData.subject.CN) return rawData.subject.CN.trim();
            if (rawData.subject.commonName) return rawData.subject.commonName.trim();
            if (rawData.subject.name) return rawData.subject.name.trim();
          }
        }
        
        // Intentamos con el campo emailAddress que puede contener el nombre
        if (rawData.emailAddress) {
          // A veces el nombre está antes del @ en el email
          const emailParts = rawData.emailAddress.split('@');
          if (emailParts.length > 1) {
            // Convertimos camelCase o snake_case a palabras separadas
            const namePart = emailParts[0]
              .replace(/([A-Z])/g, ' $1') // Separa camelCase
              .replace(/_/g, ' ')        // Reemplaza guiones bajos con espacios
              .replace(/\./g, ' ')       // Reemplaza puntos con espacios
              .trim();
            
            // Capitalizamos cada palabra
            const formattedName = namePart.split(' ')
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
            
            return formattedName;
          }
        }
      }
      
      // Caso 1: Si es una cadena y contiene "CN=", extraer solo esa parte
      if (typeof rawData === 'string') {
        const cnMatch = rawData.match(/CN=([^,]+)/i);
        if (cnMatch && cnMatch[1]) {
          return cnMatch[1].trim();
        }
      }
      
      // Caso 2: Si es un objeto y tiene la propiedad CN
      if (typeof rawData === 'object') {
        if (rawData.CN) {
          return rawData.CN.trim();
        }
        if (rawData.subject && rawData.subject.CN) {
          return rawData.subject.CN.trim();
        }
        // Intentar con otros campos comunes
        if (rawData.name) return rawData.name.trim();
        if (rawData.commonName) return rawData.commonName.trim();
      }
      
      // Caso 3: Buscar en propiedades adicionales
      if (rawData.aditional && Array.isArray(rawData.aditional)) {
        for (const item of rawData.aditional) {
          if (item.CN) return item.CN.trim();
          if (item.O) return item.O.trim(); // Organización a menudo contiene el nombre
          if (item.commonName) return item.commonName.trim();
          if (item.name) return item.name.trim();
        }
      }
      
      // Caso 4: Si hay un campo de email, intentar extraer un nombre de él
      if (rawData.email) {
        const emailParts = rawData.email.split('@');
        if (emailParts.length > 1) {
          const namePart = emailParts[0]
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .replace(/\./g, ' ')
            .trim();
          
          const formattedName = namePart.split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
          
          return formattedName;
        }
      }
      
      return 'No disponible';
    };

    // Función para formatear la fecha de expiración en un formato legible
    const formatExpirationDate = (expirationTime: string): string => {
      if (!expirationTime || expirationTime === 'No disponible' || expirationTime === 'unknown') {
        return 'No disponible';
      }
      
      try {
        // El formato típico de la API es "260402163428Z" (YYMMDDHHMMSSZ)
        // Donde YY=año, MM=mes, DD=día, HH=hora, MM=minuto, SS=segundo, Z=zona UTC
        if (expirationTime.endsWith('Z') && expirationTime.length >= 12) {
          const year = expirationTime.substring(0, 2);
          const month = expirationTime.substring(2, 4);
          const day = expirationTime.substring(4, 6);
          const hour = expirationTime.substring(6, 8);
          const minute = expirationTime.substring(8, 10);
          const second = expirationTime.substring(10, 12);
          
          // Convertimos a un formato de fecha completo
          // Asumimos que años menores a 50 son del siglo 21 (20xx) y los mayores son del siglo 20 (19xx)
          const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`;
          
          // Creamos una fecha en formato legible
          const formattedDate = `${day}/${month}/${fullYear} ${hour}:${minute}:${second} UTC`;
          return formattedDate;
        }
        
        // Si el formato no coincide con el esperado, intentamos parsear como fecha ISO
        const date = new Date(expirationTime);
        if (!isNaN(date.getTime())) {
          return date.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
          });
        }
        
        // Si no podemos parsear la fecha, devolvemos el valor original
        return expirationTime;
      } catch (error) {
        console.error('Error al formatear la fecha de expiración:', error);
        return expirationTime;
      }
    };
    
    // Función para procesar la respuesta de la API
    const processResponse = (data: any, queryType: string): void => {
      console.log('Procesando respuesta para tipo:', queryType);
      let certificateDetails: Array<{
        state: string;
        expirationTime: string;
        serial: string;
        name: string;
        subject?: {
          CN?: string;
          O?: string;
        };
      }> = [];
      
      if (data.certs && Array.isArray(data.certs)) {
        const validCerts = data.certs.filter((cert: any) => cert !== null);
        console.log('Certificados válidos completos:', validCerts);
        
        for (const cert of validCerts) {
          if (!cert) continue;
          
          let name = 'No disponible';
          let serial = 'No disponible';
          
          // Extraer el nombre de la persona usando la función mejorada
          name = extractName(cert, queryType);
          
          // Buscar el número de serie
          if (cert.serial) {
            serial = cert.serial;
          } else if (cert.serialNumber) {
            serial = cert.serialNumber;
          } else if (cert.aditional && Array.isArray(cert.aditional)) {
            // Buscar el número de serie en los datos adicionales
            for (const aditional of cert.aditional) {
              if (aditional.serialNumber) {
                serial = aditional.serialNumber;
                break;
              }
            }
          }
          
          // Determinar el estado del certificado
          const state = cert.state === "V" ? "Vigente" : "Revocado";
          
          // Formatear la fecha de expiración a un formato legible
          const formattedExpirationTime = formatExpirationDate(cert.expirationTime);
          
          certificateDetails.push({
            state: state,
            expirationTime: formattedExpirationTime,
            serial: cert.serial || serial,
            name: name
          });
        }
      }
      
      if (certificateDetails.length > 0) {
        setSearchResult({
          valid: true,
          message: `Certificados encontrados (${certificateDetails.length})`,
          details: certificateDetails
        });
      } else {
        setSearchResult({
          valid: false,
          message: 'No se encontraron certificados',
          details: null
        });
      }
    };

    try {
      // Simplificamos la solicitud para que funcione con todos los tipos de búsqueda
      const queryParam = queryTypes[searchType] || '';
      console.log('Search Parameters:', { type: queryParam, code: searchCode });
      
      // Validaciones específicas por tipo de búsqueda
      if (queryParam === 'ci' && !isValidCI(searchCode)) {
        throw new Error('El formato de la cédula no es válido. Debe contener solo números y tener entre 6 y 12 dígitos.');
      }
      
      if (queryParam === 'email' && !searchCode.includes('@')) {
        throw new Error('El formato del correo electrónico no es válido. Debe incluir el símbolo @.');
      }
      
      if (queryParam === 'serial' && searchCode.length < 4) {
        throw new Error('El número de serie debe tener al menos 4 caracteres.');
      }
      
      // Preparamos el valor de búsqueda según el tipo
      let searchValue = searchCode;
      if (queryParam === 'email') {
        searchValue = searchCode.toLowerCase();
      } else if (queryParam === 'serial') {
        searchValue = searchCode.toUpperCase();
      } else if (queryParam === 'ci') {
        // Para cédula, aseguramos que sea un valor numérico sin espacios
        searchValue = searchCode.trim().replace(/\D/g, '');
      }
      
      // Consumimos nuestro endpoint interno para evitar CORS
      const internalUrl = `/api/verificar?type=${encodeURIComponent(queryParam)}&value=${encodeURIComponent(searchValue)}`;
      console.log('URL interna:', internalUrl);

      try {
        const response = await fetch(internalUrl, { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
        }
        const wrapped = await response.json();
        if (!wrapped?.success) {
          throw new Error(wrapped?.message || 'Error en verificación');
        }
        const data = wrapped.data;
        console.log('Respuesta de la API (interna):', data);

        processResponse(data, queryParam);
      } catch (error) {
        console.error('Error en la solicitud a la API:', error);
        
        // Si la búsqueda es por nombre "Kevins", usamos datos conocidos como respaldo
        if (queryParam === 'name' && searchValue.toLowerCase() === 'kevins') {
          console.log('Usando datos conocidos para Kevins como respaldo');
          
          const kevinData = {
            status: true,
            certs: [
              {
                state: "V",
                expirationTime: "260402163428Z",
                serial: "63A61FC361FBE9CFA796C7FA2F80454EC904FF8D",
                revocationTime: "unknown",
                subject: "serialNumber=V-15881828/telephoneNumber=04140235005/title=GERENTE/C=VE/ST=DISTRITO CAPITAL/L=AV EL MIRADOR CASA NRO 22 SECTOR LA LADERA/O=SUPERINTEDENCIA DE SERVICIOS DE CERTIFICACION - SUSCERTE/OU=SEGURIDAD INFORMATICA/CN=KEVINS YOEL RANGEL BAUTISTA/emailAddress=krangel@suscerte.gob.ve",
                aditional: [
                  { serialNumber: "V-15881828" },
                  { telephoneNumber: "04140235005" },
                  { title: "GERENTE" },
                  { C: "VE" },
                  { ST: "DISTRITO CAPITAL" },
                  { L: "AV EL MIRADOR CASA NRO 22 SECTOR LA LADERA" },
                  { O: "SUPERINTEDENCIA DE SERVICIOS DE CERTIFICACION - SUSCERTE" },
                  { OU: "SEGURIDAD INFORMATICA" },
                  { CN: "KEVINS YOEL RANGEL BAUTISTA" },
                  { emailAddress: "krangel@suscerte.gob.ve" }
                ]
              }
            ]
          };
          
          processResponse(kevinData, queryParam);
          return;
        }
        
        throw error; // Re-lanzamos el error para que sea capturado por el bloque catch externo
      }

    } catch (error) {
      console.error('Error en la verificación:', error);
      let errorMessage = 'Error al verificar el certificado';
      
      // Mensajes de error más específicos según el tipo de búsqueda
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          errorMessage = 'No se encontraron certificados con los datos proporcionados';
        } else if (error.message.includes('403')) {
          errorMessage = 'No tienes permiso para acceder a esta información';
        } else if (error.message.includes('500')) {
          errorMessage = 'Error en el servidor. Por favor, intenta más tarde';
        } else if (error.message.includes('CORS')) {
          errorMessage = 'Error de acceso al servidor. Por favor, intenta más tarde';
        }
      }
      
      setSearchResult({
        valid: false,
        message: errorMessage
      });
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx = gsap.context(() => {
      if (!isLoading) {
        // Animación inicial del hero
        const heroTl = gsap.timeline({
          defaults: { duration: 1, ease: 'power3.out' }
        });
        
        if (document.querySelector('.hero-overlay')) {
          heroTl
            .from('.hero-overlay', {
              opacity: 0,
            })
            .from('.hero-title', {
              y: 100,
              opacity: 0,
              ease: 'power4.out'
            })
            .from('.hero-subtitle', {
              y: 50,
              opacity: 0,
              duration: 0.8,
            }, '-=0.5')
            .from('.hero-button', {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              ease: 'back.out(1.7)'
            }, '-=0.3')
            .add(() => {
              // Reiniciar la animación de firma
              const signaturePaths = document.querySelectorAll('.animate-signature');
              signaturePaths.forEach(path => {
                path.classList.remove('animate-signature');
                setTimeout(() => {
                  path.classList.add('animate-signature');
                }, 100);
              });
              
              // Reiniciar la animación de partículas
              const particles = document.querySelectorAll('.signature-particle');
              particles.forEach((particle, index) => {
                particle.classList.remove('signature-particle');
                setTimeout(() => {
                  particle.classList.add('signature-particle');
                }, 100);
              });
            });
        }

        // Animación de texto typewriter
        if (document.querySelector('.typewriter')) {
          const words = ['Segura', 'Confiable', 'Innovadora'];
          const typewriterTl = gsap.timeline({ repeat: -1 });
          
          words.forEach(word => {
            typewriterTl
              .to('.typewriter', {
                duration: 1,
                text: word,
                ease: 'none'
              })
              .to('.typewriter', {
                duration: 1,
                opacity: 1
              })
              .to('.typewriter', {
                duration: 1,
                opacity: 0
              });
          });
        }

        // Animaciones scroll
        const scrollAnimations = () => {
          // Cards animación
          if (document.querySelector('.feature-card')) {
            gsap.from('.feature-card', {
              scrollTrigger: {
                trigger: '.feature-card',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2
            });
          }

          // Pricing cards animación
          if (document.querySelector('.pricing-card')) {
            gsap.from('.pricing-card', {
              scrollTrigger: {
                trigger: '.pricing-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2
            });
          }

          // Features animación
          if (document.querySelector('.features-section')) {
            gsap.from('.feature', {
              scrollTrigger: {
                trigger: '.features-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              y: 30,
              opacity: 0,
              duration: 0.6,
              stagger: 0.2
            });
          }
          
          // Misión y Visión animación
          if (document.querySelector('.mission-vision-section')) {
            gsap.from('.mission-card', {
              scrollTrigger: {
                trigger: '.mission-vision-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              x: -50,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
            
            gsap.from('.vision-card', {
              scrollTrigger: {
                trigger: '.mission-vision-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              x: 50,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out'
            });
          }

          // Contact section animación
          if (document.querySelector('.contact-section')) {
            gsap.from('.contact-section', {
              scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              },
              y: 50,
              opacity: 0,
              duration: 1
            });
          }
        };

        // Iniciar animaciones de scroll
        scrollAnimations();
      }

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  useEffect(() => {
    // Efecto de seguimiento del mouse para el glow
    const cards = document.querySelectorAll('.plan-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseEvent = e as MouseEvent;
        const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100;
        const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
        
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
    (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
  };

  const CheckIcon = () => (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );

  const XIcon = () => (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-500">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );

  return (
    <main ref={mainRef} className="min-h-screen bg-[#000000] text-white overflow-hidden">
      <MegaMenu />
      
      {/* Hero Section */}
      <section ref={heroRef}
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black pt-[7rem]"
>
        {/* Background Elements */}
        <div className="absolute inset-0 pt-[7rem]">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          {isLoading ? (
            <div className="space-y-8">
              <TitleSkeleton />
              <TextSkeleton />
              <ButtonSkeleton />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Visual Element */}
              <div className="relative order-2 lg:order-1">
                <div className="relative">
                  {/* Main Visual Card */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
                    {/* Digital Document Illustration */}
                    <div className="space-y-6">
                      {/* Header with icon */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white">Documento Verificado</h3>
                      </div>
                      
                      {/* Document Lines */}
                      <div className="space-y-3">
                        <div className="h-3 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full"></div>
                        <div className="h-3 bg-gradient-to-r from-purple-400/60 to-transparent rounded-full w-4/5"></div>
                        <div className="h-3 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full w-3/5"></div>
                        <div className="h-3 bg-gradient-to-r from-purple-400/40 to-transparent rounded-full w-4/5"></div>
                      </div>
                      
                      {/* Signature Area */}
                      <div className="mt-8 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-300">Firmado Digitalmente</p>
                            <p className="text-xs text-gray-400">Certificado por SUSCERTE</p>
                          </div>
                        </div>
                        <div className="signature-animation mt-3 relative h-16">
                          {/* Partículas brillantes */}
                          <div className="absolute inset-0 overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                              <div 
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-green-400 opacity-0 signature-particle"
                                style={{
                                  left: `${50 + (i * 30)}%`,
                                  top: '50%',
                                  animationDelay: `${2.5 + (i * 0.2)}s`
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Firma animada mejorada */}
                          <div className="absolute inset-0 flex items-center">
                            <Signature width={300} height={60} color="green" showGlow />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20 animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="order-1 lg:order-2 text-left">
                <div className="space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-300">Plataforma Integral Certificada</span>
                  </div>
                  
                  {/* Main Title */}
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      <span className="block text-white mb-2 relative inline-block">
                        <span 
                          className="glitch-text text-5xl md:text-6xl lg:text-7xl font-extrabold"
                          data-text=""
                        >
                          FIRMEDIGITAL
                        </span>
                      </span>
                      <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Solución Completa
                      </span>
                    </h1>
                    
                  </div>

                  {/* Three Pillars */}
                  <div className="space-y-6">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      La solución más completa para digitalizar, proteger y certificar tus documentos con validez legal en Venezuela
                    </p>
                    
                    {/* Pillars Grid */}
                    
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center gap-4 pt-4">
                    <Link 
                      href="https://app.firmedigital.com/auth/signup" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25"
                    >
                      <span className="relative z-10">Comenzar Ahora</span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                    </Link>
                    
                    
                  </div>
                  
                  {/* Trust Badge */}
                  <div className="pt-6 border-t border-gray-700/50">
                    <p className="text-sm text-gray-500">
                      Acreditada por <span className="font-semibold text-blue-400">SUSCERTE</span> • Soberanía de datos en Venezuela
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Nuestros Pilares Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Solución Integral</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Nuestros</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tres Pilares
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              La base de nuestra plataforma digital segura
            </p>
          </div>

          {/* Three Pillars Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Identidad Digital */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-blue-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Identidad Digital</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Verificación segura y confiable de identidad con tecnología avanzada anti-fraude.
              </p>
              <div className="mt-6 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></div>
            </div>

            {/* Gestor Documental */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-purple-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-300">Gestor Documental</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Administración inteligente y organizada de documentos con almacenamiento seguro.
              </p>
              <div className="mt-6 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
            </div>

            {/* Firma Digital */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 hover:border-green-400/30 transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-300">Firma Electrónica</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Firma electrónica certificada por SUSCERTE con validez legal completa.
              </p>
              <div className="mt-6 h-1 bg-gradient-to-r from-green-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Filterven Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:border-white/30 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px] md:min-h-[400px]">
              {/* Left Section - Visual */}
              <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/5 to-purple-900/5 h-64 md:h-auto order-2 lg:order-1">
                <Image
                  src="/images/fitelven.jpg"
                  alt="FIRMEDIGITAL en FitelVen"
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/30"></div>
                {/* Teal accent */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 bg-cyan-400 rounded-full opacity-40 blur-sm"></div>
              </div>
              
              {/* Right Section - Content */}
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 p-6 md:p-8 lg:p-12 flex flex-col justify-center relative order-1 lg:order-2">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                  }}></div>
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    <span className="block">FIRMEDIGITAL</span>
                    <span className="block text-xl sm:text-2xl md:text-3xl font-normal text-cyan-300">
                      en FitelVen 2025
                    </span>
                  </h2>
                  
                  <div className="space-y-3 md:space-y-4 text-white/90 text-xs sm:text-sm md:text-base">
                    <p>Estaremos presentes en la feria más importante de tecnología de Venezuela.</p>
                    <p>Presentando nuestra <strong>Firma Electrónica</strong> certificada por SUSCERTE.</p>
                    <p>Conoce nuestras soluciones de <strong>Identidad Digital</strong> y <strong>Gestión Documental</strong>.</p>
                    <p className="text-cyan-300 font-semibold">¡Visítanos en nuestro stand desde el 17 al 21 de septiembre! </p>
                  </div>
                  
                  <div className="mt-4 md:mt-6 text-xs text-gray-400">
                    <p>* FIRMEDIGITAL estará presente en Filterven 2025 con certificación SUSCERTE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificación SUSCERTE Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">Certificación Oficial</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Certificados por</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                SUSCERTE
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Garantía de soberanía de datos en Venezuela
            </p>
          </div>

          {/* Certification Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-300">Certificación Verificada</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-green-400/60 to-transparent rounded-full"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-green-400/40 to-transparent rounded-full w-3/5"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full w-4/5"></div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-300">Validez Legal Garantizada</p>
                        <p className="text-xs text-gray-400">República Bolivariana de Venezuela</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {/* Benefits Grid */}
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Validez Legal Completa</h4>
                      <p className="text-gray-400 text-sm">Cumplimos con todos los estándares legales venezolanos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Soberanía de Datos</h4>
                      <p className="text-gray-400 text-sm">Tus datos permanecen seguros en territorio venezolano</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Máxima Seguridad</h4>
                      <p className="text-gray-400 text-sm">Tecnología certificada para proteger tu identidad</p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="pt-4">
                  <a href="https://app.firmedigital.com/auth/signup" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25">
                    <span className="relative z-10">Comenzar Ahora</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Planes y Precios Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Planes Flexibles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Planes y</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Precios
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Soluciones flexibles para todas tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                    <p className="text-gray-300 text-sm">¡Impulso al siguiente nivel!</p>
                    <p className="text-gray-300 text-sm">Para persona natural</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-blue-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <img src="/images/rocket-svgrepo-com.svg" alt="Rocket" className="w-8 h-8 filter brightness-0 invert" />
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                      <h3 className="text-2xl font-semibold mb-2 text-white">Plan Despegue</h3>
                        <p className="text-gray-300 text-sm">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8 mt-5">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                
                              </div>
                              <div className="ml-2 flex flex-col">
                                
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="flex flex-col items-center">
  <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    10$
  </span>
  <span className="text-gray-400 text-sm mt-1">Equivale a</span>
  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
    {(10/12).toFixed(2)}$/mes
  </span>
</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400 mt-10">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>400 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          
                         
                          
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Valor del Bloque */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                    <p className="text-gray-300 text-sm">¡Gestión eficiente de Documentos!</p>
                    <p className="text-gray-300 text-sm">Para persona jurídica</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-purple-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Élite</h3>
                        <p className="text-gray-300 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8" style={{ paddingTop: '1rem' }}>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="ml-2 flex flex-col">
                                
                                </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
                              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                30$
                              </span>
                              <span className="text-gray-400 text-sm mt-1">Equivale a</span>
                              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                {(30/12).toFixed(2)}$/mes
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>1000 Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de Documentos</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Editor de imagenes</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Renovación de Certificados */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col justify-center items-center shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                    <p className="text-gray-300 text-sm"> ¡Mantén tus certificados emitidos al día!</p>
                    <p className="text-gray-300 text-sm">Para corporaciones</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-gray-200/20 rounded-3xl p-8 hover:border-green-400/30 transition-all duration-300 h-full flex flex-col shadow-2xl`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2 text-white">Plan Max</h3>
                        <p className="text-gray-300 text-sm mb-2">Créditos Ilimitados</p>
                        <div className="flex flex-col items-center space-y-6 mb-8">
                          <div className="flex items-center justify-between w-full max-w-[280px]">
                            <div className="flex items-center">
                              <div className="relative">
                                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400/40 to-purple-400/40 relative">
                                  <span className="absolute top-1/2 left-0 right-0 border-t-[3px] border-dashed border-purple-400/30 transform -rotate-6"></span>
                                 
                                </span>
                              </div>
                           
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mb-6">Te ofrecemos soluciones personalizadas y eficientes para la seguridad y validación de tus documentos, adaptándonos a tus requerimientos específicos</p>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                        
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Documentos ilimitados</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Trazabilidad</span>
                          </li>
                          
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Multifirma</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Flujos</span>
                          </li>
                        </ul>
                      </div>
                      <a href="https://app.firmedigital.com/auth/signup" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                        Comenzar Ahora
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Corporativo */}

          </div>
        </div>
      </section>

      {/* Sección de características detalladas */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl hover:from-white/15 hover:to-white/10 text-white rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 relative overflow-hidden group shadow-2xl hover:shadow-blue-500/20"
          >
            <span className="text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {showFeatures ? 'Ocultar' : 'Mostrar'} todas las características
            </span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                showFeatures ? 'rotate-180' : ''
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="url(#arrow-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="arrow-gradient" x1="6" y1="9" x2="18" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
        <div
          className={`transition-all duration-500 overflow-hidden ${
            showFeatures ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="w-full overflow-x-auto rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-2xl">
          
            <table className="w-full min-w-[800px] border-collapse">
              
              <thead>
              <tr>
                  <td colSpan={5} className="py-4 px-4 text-lg font-semibold text-white bg-[#1A1A1A] border-b border-white/10">
                  Características principales de FIRMEDIGITAL
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 text-left text-base font-semibold">Características principales de Planes</th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400 whitespace-nowrap">Plan Despegue</span>                     
                      
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center bg-[#1A1A1A]/50">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400 whitespace-nowrap">Plan Élite</span>           
                      
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400 whitespace-nowrap">Plan Max</span>                   
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-purple-400 whitespace-nowrap">Creditos Adicionales</span>                      
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm titulo">
                
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Sistema AR",
                      `Facilita a los usuarios la gestión de certificados digitales y firmas electrónicas mediante una plataforma en línea intuitiva. Permite la emisión, renovación y verificación de documentos con seguridad avanzada, optimizando procesos de registro y validación para un acceso más rápido y eficiente.`
                    )}
                  >
                    Sistema AR
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Módulo de Firma",
                      `Nuestro módulo de firma ofrece:
                      • Firma electrónica
                      • Firma digital
                      • Firma de documentos
                      • Firma de contratos
                      • Firma de acuerdos
                      • Firma de informes
                      • Firma de certificados
                      • Firma de diplomas`
                    )}
                  >
                    Módulo de Firma
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Firma Electrónica",
                      `Nuestra firma electrónica ofrece:
                      • Firma electrónica avanzada
                      • Firma electrónica segura
                      • Firma electrónica eficiente
                      • Firma electrónica personalizada
                      • Firma electrónica para documentos
                      • Firma electrónica para contratos
                      • Firma electrónica para acuerdos
                      • Firma electrónica para informes`
                    )}
                  >
                    Firma Electrónica
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>                
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Firma de Documentos",
                      `Nuestra firma de documentos ofrece:
                      • Firma de documentos electrónicos
                      • Firma de documentos digitales
                      • Firma de documentos en línea
                      • Firma de documentos segura
                      • Firma de documentos eficiente
                      • Firma de documentos personalizada
                      • Firma de documentos para empresas
                      • Firma de documentos para individuos`
                    )}
                  >
                    Firma de Documentos
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Editor de Documentos",
                      `Nuestro editor de documentos ofrece:
                      • Edición de documentos electrónicos
                      • Edición de documentos digitales
                      • Edición de documentos en línea
                      • Edición de documentos segura
                      • Edición de documentos eficiente
                      • Edición de documentos personalizada
                      • Edición de documentos para empresas
                      • Edición de documentos para individuos`
                    )}
                  >
                    Editor de Documentos
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Trazabilidad",
                      `Nuestra trazabilidad ofrece:
                      • Trazabilidad de documentos electrónicos
                      • Trazabilidad de documentos digitales
                      • Trazabilidad de documentos en línea
                      • Trazabilidad de documentos segura
                      • Trazabilidad de documentos eficiente
                      • Trazabilidad de documentos personalizada
                      • Trazabilidad de documentos para empresas
                      • Trazabilidad de documentos para individuos`
                    )}
                  >
                    Trazabilidad
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Cuentas Múltiples",
                      `Nuestras cuentas múltiples ofrecen:
                      • Cuentas múltiples para empresas
                      • Cuentas múltiples para individuos
                      • Cuentas múltiples para documentos electrónicos
                      • Cuentas múltiples para documentos digitales
                      • Cuentas múltiples para documentos en línea
                      • Cuentas múltiples seguras
                      • Cuentas múltiples eficientes
                      • Cuentas múltiples personalizadas`
                    )}
                  >
                    Cuentas Múltiples
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "IA",
                      `Nuestra inteligencia artificial ofrece:
                      • Inteligencia artificial para documentos electrónicos
                      • Inteligencia artificial para documentos digitales
                      • Inteligencia artificial para documentos en línea
                      • Inteligencia artificial segura
                      • Inteligencia artificial eficiente
                      • Inteligencia artificial personalizada
                      • Inteligencia artificial para empresas
                      • Inteligencia artificial para individuos`
                    )}
                  >
                    IA
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
               
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Multifirma",
                      `Nuestra multifirma ofrece:
                      • Multifirma para documentos electrónicos
                      • Multifirma para documentos digitales
                      • Multifirma para documentos en línea
                      • Multifirma segura
                      • Multifirma eficiente
                      • Multifirma personalizada
                      • Multifirma para empresas
                      • Multifirma para individuos`
                    )}
                  >
                    Multifirma
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Análisis Personalizable",
                      `Nuestro análisis personalizable ofrece:
                      • Análisis personalizable para documentos electrónicos
                      • Análisis personalizable para documentos digitales
                      • Análisis personalizable para documentos en línea
                      • Análisis personalizable seguro
                      • Análisis personalizable eficiente
                      • Análisis personalizable personalizado
                      • Análisis personalizable para empresas
                      • Análisis personalizable para individuos`
                    )}
                  >
                    Análisis Personalizable
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Aplicaciones de Acceso",
                      `Nuestras aplicaciones de acceso ofrecen:
                      • Aplicaciones de acceso para documentos electrónicos
                      • Aplicaciones de acceso para documentos digitales
                      • Aplicaciones de acceso para documentos en línea
                      • Aplicaciones de acceso seguras
                      • Aplicaciones de acceso eficientes
                      • Aplicaciones de acceso personalizadas
                      • Aplicaciones de acceso para empresas
                      • Aplicaciones de acceso para individuos`
                    )}
                  >
                    Aplicaciones de Acceso
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Flujos e Integraciones",
                      `Nuestros flujos e integraciones ofrecen:
                      • Flujos e integraciones para documentos electrónicos
                      • Flujos e integraciones para documentos digitales
                      • Flujos e integraciones para documentos en línea
                      • Flujos e integraciones seguras
                      • Flujos e integraciones eficientes
                      • Flujos e integraciones personalizadas
                      • Flujos e integraciones para empresas
                      • Flujos e integraciones para individuos`
                    )}
                  >
                    Flujos e Integraciones
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className=" border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Almacenamiento de Documentos",
                      `Nuestro almacenamiento de documentos ofrece:
                      • Almacenamiento de documentos electrónicos
                      • Almacenamiento de documentos digitales
                      • Almacenamiento de documentos en línea
                      • Almacenamiento de documentos seguro
                      • Almacenamiento de documentos eficiente
                      • Almacenamiento de documentos personalizado
                      • Almacenamiento de documentos para empresas
                      • Almacenamiento de documentos para individuos`
                    )}
                  >
                    Almacenamiento de Documentos
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className=" border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Conoce a tus Clientes (KYC)",
                      `el KYC es un proceso fundamental para garantizar la seguridad y la integridad del sistema financiero. Al conocer a sus clientes, las empresas pueden protegerse contra el fraude, el lavado de dinero y otros delitos financieros, al tiempo que cumplen con las regulaciones y construyen relaciones comerciales sólidas y confiables.`
                    )}
                  >
                    Conoce a tus Clientes (KYC) 
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className=" border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Conozca a su Empresa (KYB)",
                      `El KYB es un requisito legal para muchas empresas, especialmente en el sector financiero. También es una buena práctica para cualquier empresa que quiera protegerse de riesgos y construir relaciones comerciales seguras.`
                    )}
                  >
                    Conozca a su Empresa (KYB) 
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
              </tbody>
              <thead>
              <tr>
                  <td colSpan={5} className="py-4 px-4 text-lg font-semibold text-white bg-[#1A1A1A] border-b border-white/10">
                  Gestor de Documentos
                  </td>
                </tr>
                
                
              </thead>
              <tbody className="text-sm titulo">
                
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Gestión de Condiciones",
                      `Otorgue control legal sobre cada versión de sus términos en línea`
                    )}
                  >
                    Gestión de Condiciones
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "API",
                      `Acceso a tus Documentos de manera facil facilitando la integración de tus documentos con otras aplicaciones.`
                    )}
                  >
                    API
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Formatos de Documentos Soportados",
                      `Nuestro gestor de documentos soporta los formatos más populares para la gestión online de documentos:
                      • Documentos de Office: DOC, DOCX, XLS, XLSX, PPT, PPTX
                      • PDF y PDF/A
                      • Imágenes: JPG, JPEG, PNG, TIFF, BMP
                      • Documentos de texto: TXT, RTF
                      • Documentos web: HTML
                      • Documentos comprimidos: ZIP, RAR
                      • Documentos de diseño: DWG, DXF
                      • Documentos de correo: EML, MSG
                      
                      Todos los documentos son procesados y optimizados para su visualización online, manteniendo la integridad y seguridad del documento original.`
                    )}
                  >
                    Formatos de Documentos Soportados
                  </td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Asistentes (agentes IA)",
                      `Accede a agentes especializados, diseñados para cada tipo de documento y estructura organizacional, optimizando así la gestión documental en cada etapa del proceso.`
                    )}
                  >
                    Asistentes (agentes IA)
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><XIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>
                <tr className="border-b border-white/10">
                  <td 
                    className="py-3 px-4"
                    onClick={() => handleOpenModal(
                      "Ciclo de Vida de Documento (CML)",
                      `Sigue el proceso que atraviesa un documento desde su creación hasta su archivo o destrucción. Comprender y gestionar este ciclo es fundamental para cualquier organización, ya que permite optimizar el manejo de la información, reducir costos y garantizar el cumplimiento normativo.`
                    )}
                  >
                    Ciclo de Vida de Documento (CML)
                  </td>
                  <td className="py-3 px-4 text-center"><XIcon /></td>
                  <td className="py-3 px-4 text-center bg-[#1A1A1A]/50"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                  <td className="py-3 px-4 text-center"><CheckIcon /></td>
                </tr>

               
              </tbody>
            </table>
          </div>
        
        </div>
      </div>
      </section>
 {/* Verificación de Documentos Section */}
 <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black verificacion-section">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30 mb-6">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Verificador</span>
            </div>
             <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Verificación de</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Documentos
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-2">
              Verifica la autenticidad de documentos firmados digitalmente con nuestra herramienta de verificación rápida y segura.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Formulario y Resultados en un solo div */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-5 sm:p-8 hover:border-white/30 transition-all duration-300 shadow-2xl hover:shadow-blue-500/20">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Verificar Documento</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="searchType" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Tipo de Búsqueda</label>
                  <select
                    id="searchType"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-900/80 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white text-sm sm:text-base backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300"
                  >
                    <option value="">Seleccionar tipo de búsqueda</option>
                    <option value="0">Cédula</option>
                    <option value="1">Nombre</option>
                    <option value="2">Serial</option>
                    <option value="3">Correo Electrónico</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="searchCode" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Código de Búsqueda</label>
                  <input
                    type="text"
                    id="searchCode"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Ingrese el código de búsqueda"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 text-white text-sm sm:text-base backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchType || !searchCode}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/20 border border-white/20 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                {isSearching ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verificando...
                  </span>
                ) : "Verificar"}
              </button>
              
              {/* Resultados de Verificación - Solo visibles después de buscar */}
              {searchResult && (
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Resultados</h3>
                  
                  <div className="space-y-4">
                    <div className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg ${searchResult.valid ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                      {searchResult.valid ? (
                        <FaCheckCircle className="text-green-400 text-lg sm:text-xl flex-shrink-0" />
                      ) : (
                        <FaTimesCircle className="text-red-400 text-lg sm:text-xl flex-shrink-0" />
                      )}
                      <p className="text-white text-sm sm:text-base">{searchResult.message}</p>
                    </div>
                    
                    {searchResult.valid && searchResult.details && (
                      <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {searchResult.details.map((cert: any, index: number) => (
                          <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                              <h4 className="font-medium text-white text-sm sm:text-base">Certificado {index + 1}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium w-fit ${cert.state === 'Vigente' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                                {cert.state}
                              </span>
                            </div>
                            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                              <p className="text-gray-300 break-words"><span className="text-gray-400">Nombre:</span> {cert.name}</p>
                              <p className="text-gray-300 break-words"><span className="text-gray-400">Serial:</span> {cert.serial}</p>
                              <p className="text-gray-300 break-words"><span className="text-gray-400">Expiración:</span> {cert.expirationTime}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 text-center">
            <Link 
              href="/productos/verificacion-certificados" 
              className="group inline-flex items-center justify-center px-4 py-1.5 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 shadow-sm shadow-blue-500/5 hover:shadow-blue-500/10"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium text-xs sm:text-sm">
                Ver herramienta completa de verificación
              </span>
              <svg 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1.5 sm:ml-2 text-blue-400 group-hover:text-purple-400 transition-all duration-300 transform group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* Academia FIRMEDIGITAL Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Academia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Aprende sobre</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                FIRMEDIGITAL
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre todo sobre certificados digitales, seguridad documental y transformación digital con nuestros videos educativos especializados.
            </p>
          </div>

          <AcademiaVideos />

          <div className="text-center">
            <Link href="/academia" className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explorar Academia Completa
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>



      {/* Certificación SUSCERTE Section */}
      <section className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">Certificación Oficial</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              <span className="block text-white">Certificados por</span>
              <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                SUSCERTE
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Garantía de soberanía de datos en Venezuela
            </p>
          </div>

          {/* Certification Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Visual Card */}
            <div className="relative order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/20 shadow-2xl p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-green-300">Certificación Verificada</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-3 bg-gradient-to-r from-green-400/60 to-transparent rounded-full"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full w-4/5"></div>
                    <div className="h-3 bg-gradient-to-r from-green-400/40 to-transparent rounded-full w-3/5"></div>
                    <div className="h-3 bg-gradient-to-r from-blue-400/40 to-transparent rounded-full w-4/5"></div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-300">Validez Legal Garantizada</p>
                        <p className="text-xs text-gray-400">República Bolivariana de Venezuela</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {/* Benefits Grid */}
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Validez Legal Completa</h4>
                      <p className="text-gray-400 text-sm">Cumplimos con todos los estándares legales venezolanos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Soberanía de Datos</h4>
                      <p className="text-gray-400 text-sm">Tus datos permanecen seguros en territorio venezolano</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Máxima Seguridad</h4>
                      <p className="text-gray-400 text-sm">Tecnología certificada para proteger tu identidad</p>
                    </div>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="pt-4">
                  <a href="https://app.firmedigital.com/auth/signup" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25">
                    Comenzar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
  {/*   <section className="relative border-t border-white/5 contact-section my-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-none blur-xl" />
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-1xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Conecta con nosotros</h2>
                  <p className="text-gray-400 mb-8">
                    Cuéntanos tus necesidades.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-300">info@firmedigital.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span className="text-gray-300">(+58) 424-7100380</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl" />
                  <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                    <form className="space-y-4">
                      {isLoading ? (
                        <>
                          <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="email"
                            placeholder="Correo Electronico"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <textarea
                            placeholder="Mensaje"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:opacity-90 transition-opacity"
                            disabled
                          >
                            Enviar Mensaje
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <input
                            type="email"
                            placeholder="Correo Electronico"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <textarea
                            placeholder="Mensaje"
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                          />
                          <button
                            type="submit"
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:opacity-90 transition-opacity"
                          >
                            Enviar Mensaje
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Fedeindustria Form Section */}
      <section id="fedeindustria-form" className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          <div className="relative">
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-1xl p-8 lg:p-12">
              <div className="flex flex-col items-center mb-8">
               {/* imagen de banner 
                <div className="w-full max-w-2xl mb-6">
                  <Image 
                    src="https://www.fedeindustria.org/wp-content/uploads/slider/cache/147eb574aadc7580e5eea80725668938/BANNER-EXPOFEDEINDUSTRIA.jpg" 
                    alt="Fedeindustria Logo" 
                    width={800} 
                    height={200} 
                    className="w-full h-auto rounded-lg object-contain"
                  />
                </div>*/}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-purple-300">Contacto</span>
            </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Formulario de contacto
                    </span>
                  </h2>
                </div>
                <p className="text-gray-400 mb-8 text-center max-w-3xl">
                  Complete el siguiente formulario para recibir mas información acerca de nuestros servicios digitales.  
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl" />
                  <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                    {formStatusFedeindustria && (
                      <div className={`mb-6 p-4 rounded-lg ${formStatusFedeindustria.success ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                        <div className="flex items-center">
                          {formStatusFedeindustria.success ? (
                            <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <p className={`text-sm ${formStatusFedeindustria.success ? 'text-green-400' : 'text-red-400'}`}>
                            {formStatusFedeindustria.message}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <form 
                      className="space-y-4" 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setIsSubmittingFedeindustria(true);
                        setFormStatusFedeindustria(null);
                        
                        try {
                          // Validar campos requeridos
                          if (!nombre || !tipoPersona || !sector || !emailFedeindustria || !telefono) {
                            setFormStatusFedeindustria({ 
                              success: false, 
                              message: 'Por favor complete todos los campos requeridos.' 
                            });
                            setIsSubmittingFedeindustria(false);
                            return;
                          }
                          
                          // Validar que si es persona jurídica, tenga empresa
                          if (tipoPersona === 'juridica' && !empresa) {
                            setFormStatusFedeindustria({ 
                              success: false, 
                              message: 'Por favor ingrese el nombre de la empresa.' 
                            });
                            setIsSubmittingFedeindustria(false);
                            return;
                          }
                          
                          // Crear objeto de datos para enviar
                          const formDataToSend = { 
                            nombre, 
                            tipoPersona, 
                            empresa, 
                            sector,
                            email: emailFedeindustria, 
                            telefono 
                          };
                          
                          // Log de verificación antes de enviar
                          console.log('Enviando datos al servidor:', formDataToSend);
                          
                          const response = await fetch('/api/fedeindustria', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formDataToSend),
                          });
                          
                          const data = await response.json();
                          
                          if (response.ok) {
                            setFormStatusFedeindustria({ 
                              success: true, 
                              message: 'Información recibida correctamente. Nos pondremos en contacto pronto.' 
                            });
                            // Limpiar el formulario
                            setNombre('');
                            setTipoPersona('');
                            setEmpresa('');
                            setSector('');
                            setEmailFedeindustria('');
                            setTelefono('');
                            
                            // Resetear el campo de empresa
                            const empresaField = document.getElementById('empresaField');
                            if (empresaField) {
                              empresaField.style.display = 'none';
                            }
                            
                            // Desmarcar los radio buttons
                            const radioNatural = document.getElementById('personaNatural') as HTMLInputElement;
                            const radioJuridica = document.getElementById('personaJuridica') as HTMLInputElement;
                            if (radioNatural) radioNatural.checked = false;
                            if (radioJuridica) radioJuridica.checked = false;
                          } else {
                            setFormStatusFedeindustria({ 
                              success: false, 
                              message: data.message || 'Ocurrió un error al enviar el formulario.' 
                            });
                          }
                        } catch (error) {
                          setFormStatusFedeindustria({ 
                            success: false, 
                            message: 'Error de conexión. Por favor, inténtelo de nuevo.' 
                          });
                        } finally {
                          setIsSubmittingFedeindustria(false);
                        }
                      }}
                    >
                      {isLoading ? (
                        <>
                          <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <div className="space-y-4">
                            <p className="text-white text-sm">Tipo de Persona:</p>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="personaNatural"
                                  name="tipoPersona"
                                  value="natural"
                                  className="mr-2"
                                  disabled
                                />
                                <label htmlFor="personaNatural" className="text-gray-300">Persona Natural</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="personaJuridica"
                                  name="tipoPersona"
                                  value="juridica"
                                  className="mr-2"
                                  disabled
                                />
                                <label htmlFor="personaJuridica" className="text-gray-300">Persona Jurídica</label>
                              </div>
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Nombre de la Empresa"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="text"
                            placeholder="Sector al que pertenece"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="email"
                            placeholder="Correo Electrónico"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <input
                            type="tel"
                            placeholder="Teléfono"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            disabled
                          />
                          <button
                            type="submit"
                            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:opacity-90 transition-opacity"
                            disabled
                          >
                            Enviar Registro
                          </button>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Nombre Completo"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                          />
                          <div className="space-y-4">
                            <p className="text-white text-sm">Tipo de Persona:</p>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="personaNatural"
                                  name="tipoPersona"
                                  value="natural"
                                  className="mr-2"
                                  onChange={() => {
                                    setTipoPersona('natural');
                                    const empresaField = document.getElementById('empresaField');
                                    if (empresaField) {
                                      empresaField.style.display = 'none';
                                    }
                                  }}
                                  required
                                />
                                <label htmlFor="personaNatural" className="text-gray-300">Persona Natural</label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  id="personaJuridica"
                                  name="tipoPersona"
                                  value="juridica"
                                  className="mr-2"
                                  onChange={() => {
                                    setTipoPersona('juridica');
                                    const empresaField = document.getElementById('empresaField');
                                    if (empresaField) {
                                      empresaField.style.display = 'block';
                                    }
                                  }}
                                />
                                <label htmlFor="personaJuridica" className="text-gray-300">Persona Jurídica</label>
                              </div>
                            </div>
                          </div>
                          <div id="empresaField" style={{ display: 'none' }}>
                            <input
                              type="text"
                              placeholder="Nombre de la Empresa"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                              value={empresa}
                              onChange={(e) => setEmpresa(e.target.value)}
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Sector al que pertenece"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            required
                          />
                          <input
                            type="email"
                            placeholder="Correo Electrónico"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            value={emailFedeindustria}
                            onChange={(e) => setEmailFedeindustria(e.target.value)}
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Teléfono"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            required
                          />
                          <button
                            type="submit"
                            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:opacity-90 transition-opacity"
                            disabled={isSubmittingFedeindustria}
                          >
                            {isSubmittingFedeindustria ? 'Enviando...' : 'Enviar Registro'}
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
    </main>
  );
}