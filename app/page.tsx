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

  // Función para procesar la respuesta de la API
  const processResponse = (data: any, queryType: string): void => {
    console.log('Procesando respuesta para tipo:', queryType);
    let certificateDetails: Array<{
      state: string;
      expirationTime: string;
      serial: string;
      name: string;
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
        
        certificateDetails.push({
          state: state,
          expirationTime: cert.expirationTime || 'No disponible',
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
      
      // Construimos una URL que funcione para todos los tipos de búsqueda
      let searchValue = searchCode;
      if (queryParam === 'email') {
        searchValue = searchCode.toLowerCase();
      } else if (queryParam === 'serial') {
        searchValue = searchCode.toUpperCase();
      } else if (queryParam === 'ci') {
        // Para cédula, aseguramos que sea un valor numérico sin espacios
        searchValue = searchCode.trim().replace(/\D/g, '');
      }
      
      // Usamos la misma estructura de URL para todos los tipos de búsqueda
      const apiUrl = `https://ca.firmedigital.com/api/v1/certificate/list?${queryParam}=${encodeURIComponent(searchValue)}`;
      console.log('API URL:', apiUrl);
      
      // Obtenemos el origen actual de la ventana
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://firmedigital.com';
      
      // Headers comunes para todas las solicitudes
      const response = await fetch(apiUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': currentOrigin,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server Error:', { status: response.status, statusText: response.statusText, body: errorText });
        
        // Si es un error 404 y no es una búsqueda por email, intentamos con un endpoint alternativo
        if (response.status === 404 && queryParam !== 'email') {
          console.log('Intentando con endpoint alternativo...');
          
          // Construimos una URL alternativa (podría ser un endpoint diferente o con parámetros diferentes)
          const alternativeUrl = `https://ca.firmedigital.com/api/v1/certificate/search?${queryParam}=${encodeURIComponent(searchCode)}`;
          console.log('URL Alternativa:', alternativeUrl);
          
          const alternativeResponse = await fetch(alternativeUrl, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Origin': currentOrigin,
              'X-Requested-With': 'XMLHttpRequest'
            }
          });
          
          if (alternativeResponse.ok) {
            const alternativeData = await alternativeResponse.json();
            console.log('Respuesta alternativa:', alternativeData);
            
            // Procesamos la respuesta alternativa aquí mismo
            if (alternativeData && (alternativeData.certs || alternativeData.status === true)) {
              // Procesamos los datos de la respuesta alternativa
              processResponse(alternativeData, queryParam);
              return;
            }
          } else {
            console.error('También falló el endpoint alternativo');
          }
        }
        
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
      }
      


      const data = await response.json();
      console.log('Raw API Response:', data);
      console.log('Tipo de búsqueda:', queryParam);
      
      // Verificamos si hay datos adicionales en la respuesta
      if (queryParam === 'ci' && data && data.status === true) {
        console.log('Respuesta de búsqueda por cédula:', data);
        // Intentamos extraer más información si está disponible
        if (data.certs && Array.isArray(data.certs)) {
          console.log('Estructura de certificados para cédula:', data.certs);
        }
      }
      
      // Procesamos la respuesta
      processResponse(data, queryParam);
      return;

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
            }, '-=0.3');
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
      <section ref={heroRef} className="relative pt-[200px] pb-[100px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/20 rounded-full mix-blend-normal filter blur-[100px] animate-pulse" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 w-full pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {isLoading ? (
                <>
                  <div className="w-40">
                    <TextSkeleton />
                  </div>
                  <div className="space-y-4">
                    <TitleSkeleton />
                    <TitleSkeleton />
                  </div>
                  <div className="max-w-xl">
                    <TextSkeleton />
                  </div>
                  <div className="w-40">
                    <ButtonSkeleton />
                  </div>
                </>
              ) : (
                <>

                  
                  <h1 className="hero-title">
                    <span className="text-4xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg">
                      FIRMEDIGITAL 
                    </span>
                    <span className="block mt-4 text-xl lg:text-2xl font-semibold">Plataforma de firma electrónica<br/>Acreditada por SUSCERTE y con soberanía de datos en la República Bolviariana de Venezuela</span>
                    <span className="block mt-3 text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                      Certificación y Firma Digital
                    </span>
                  </h1>

                  <p className="hero-subtitle text-lg text-gray-300 max-w-xl backdrop-blur-sm bg-black/10 p-4 rounded-lg border border-white/5 shadow-lg">
                    La solución perfecta para todas las empresas que necesitan una firma digital
                    <span className="typewriter ml-2 inline-block min-w-[150px] font-semibold"></span>
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link href="https://app.firmedigital.com/auth/signup" className="hero-button inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10">
                      <span className="mr-2">Comenzar Ahora</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Right Content */}
            <Suspense fallback={<CardSkeleton />}>
              <FeaturesCard />
            </Suspense>
          </div>
        </div>
      </section>
      {/* Misión y Visión Section */}
      <section className="relative py-20 border-t border-white/5 mission-vision-section">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[400px] h-[400px] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[400px] h-[400px] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Misión */}
            <div className="mission-card relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300 flex flex-col hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-lg">
                  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Nuestra Misión</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed flex-grow">
              Proporcionar soluciones de certificación y firma electrónica innovadoras y seguras que faciliten la gestión de documentos digitales en Venezuela.

              </p>
              <div className="mt-6 w-1/3 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
            
            {/* Visión */}
            <div className="vision-card relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-300 flex flex-col hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] transform hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-lg">
                  <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8v1m0 6v1m4-4h-1m-6 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Nuestra Visión</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed flex-grow">
              Ser la plataforma líder en certificación y firma electrónica en América Latina, reconocida por nuestra innovación continua y por brindar soluciones digitales que transforman la manera en que las empresas y los individuos gestionan y autenticar sus documentos. 
              </p>
              <div className="mt-6 w-1/3 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SUSCERTE Certification Banner */}
      <section className="relative py-16 border-t border-white/5 suscerte-banner-section bg-gradient-to-b from-black to-[#050A20]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[400px] h-[400px] bg-blue-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[400px] h-[400px] bg-purple-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5" />
          
          {/* Abstract Background Elements */}
          <div className="absolute right-1/4 top-1/3 w-[250px] h-[250px] bg-blue-600/3 rounded-full mix-blend-normal filter blur-[80px]" />
          <div className="absolute left-1/4 bottom-1/3 w-[200px] h-[200px] bg-purple-600/3 rounded-full mix-blend-normal filter blur-[60px]" />
          
          {/* Stars in arc formation like Venezuelan flag */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-25">
            <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 8 stars in an arc formation - larger size */}
              <path d="M75,150 L85,120 L95,150 L65,130 L105,130 Z" fill="white" />
              <path d="M150,120 L160,90 L170,120 L140,100 L180,100 Z" fill="white" />
              <path d="M225,100 L235,70 L245,100 L215,80 L255,80 Z" fill="white" />
              <path d="M300,90 L310,60 L320,90 L290,70 L330,70 Z" fill="white" />
              <path d="M375,100 L385,70 L395,100 L365,80 L405,80 Z" fill="white" />
              <path d="M450,120 L460,90 L470,120 L440,100 L480,100 Z" fill="white" />
              <path d="M525,150 L535,120 L545,150 L515,130 L555,130 Z" fill="white" />
              <path d="M300,180 L310,150 L320,180 L290,160 L330,160 Z" fill="white" />
            </svg>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <span className="text-white font-semibold">Certificación Oficial</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight">
              Proveedor certificado por SUSCERTE
            </h2>
            <p className="text-xl md:text-2xl text-white max-w-3xl mb-8">
              Te aseguramos la soberanía de tus datos en Venezuela
            </p>
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-gray-300 text-lg">
                  Nuestra certificación por SUSCERTE garantiza que todos sus documentos y firmas electrónicas cumplen con los más altos estándares de seguridad y validez legal en  la República Bolivariana de Venezuela.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://app.firmedigital.com/auth/signup" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                Comenzar ahora
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="relative border-t border-white/5 pricing-section bg-gradient-to-b from-black to-[#050A20]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[400px] h-[400px] bg-blue-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[400px] h-[400px] bg-purple-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-4 relative z-10">
          <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-400">
              Planes y Precios
            </h2>
            <p className="mt-4 text-xl text-gray-400">Soluciones flexibles para todas tus necesidades</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Emisión de Firma Electrónica */}
            <div className={`${styles['flip-card']} relative group pricing-card`}
                 onMouseMove={handleMouseMove}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div className={styles['flip-card-inner']}>
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/rocket-svgrepo-com.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="2" x2="20" y2="17.8" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Despegue</h3>
                    <p className="text-gray-400 text-sm">¡Impulso al siguiente nivel!</p>
                    <p className="text-gray-400 text-sm">Para persona natural</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/rocket-svgrepo-com.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                      <h3 className="text-2xl font-semibold mb-2">Plan Despegue</h3>
                        <p className="text-gray-400 text-sm">Carga, publica y gestiona miles de docs.</p>
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
                            </div>
                          </div>
                        </div>
                        <div className="text-sm font-medium mb-4 text-blue-400 mt-10">¿QUÉ INCLUYE?</div>
                        <ul className="space-y-4 mb-8">
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Firmas ilimitadas</span>
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
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/efficiency.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Élite</h3>
                    <p className="text-gray-400 text-sm">¡Gestión eficiente de Documentos!</p>
                    <p className="text-gray-400 text-sm">Para persona jurídica</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/efficiency.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Plan Élite</h3>
                        <p className="text-gray-400 text-sm mb-6">Carga, publica y gestiona miles de docs.</p>
                        <div className="flex flex-col items-center space-y-6 mb-8" style={{ paddingTop: '1rem' }}>
                          <div className="flex flex-col items-center justify-center w-full max-w-[280px]">
                          <div className="ml-2 flex flex-col">
                                
                                </div>
                            <div className="flex flex-col items-center">
                              <span className="text-gray-400 text-base mb-2">Inversión anual:</span>
                              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                30$
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
                            <span>Firmas ilimitadas</span>
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
                            <span>Gestor de Documentos</span>
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
                  <div className={`${styles['flip-card-front']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-center items-center`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/organizacion.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Plan Max</h3>
                    <p className="text-gray-400 text-sm"> ¡Mantén tus certificados emitidos al día!</p>
                    <p className="text-gray-400 text-sm">Para corporaciones</p>
                  </div>
                  <div className={`${styles['flip-card-back']} relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[#0A0A0A] p-3 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <image href="/images/organizacion.svg" width="24" height="24" />
                          <defs>
                            <linearGradient id="grad1" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#60A5FA" />
                              <stop offset="1" stopColor="#A78BFA" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-2">Plan Max</h3>
                        <p className="text-gray-400 text-sm mb-2">Creditos Ilimitados</p>
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
                            <span>Firmas ilimitadas</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Gestor de Documentos</span>
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
                          <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>IA</span>
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
      <div className="mt-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] hover:from-blue-500/10 hover:via-purple-500/10 hover:to-blue-500/10 text-white rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
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
          <div className="w-full overflow-x-auto rounded-none border border-white/10">
          
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
 {/* Verificación de Documentos Section */}
 <section className="relative py-12 sm:py-16 border-t border-white/5 verificacion-section">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[100px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3 sm:mb-4">
              Verificación de Documentos
            </h2>
            <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto px-2">
              Verifica la autenticidad de documentos firmados digitalmente con nuestra herramienta de verificación rápida y segura.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Formulario y Resultados en un solo div */}
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 sm:p-8 hover:border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Verificar Documento</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label htmlFor="searchType" className="block text-sm font-medium text-gray-300 mb-1 sm:mb-2">Tipo de Búsqueda</label>
                  <select
                    id="searchType"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white text-sm sm:text-base"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white text-sm sm:text-base"
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchType || !searchCode}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
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
              className="group inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 shadow-sm shadow-blue-500/5 hover:shadow-blue-500/10"
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
      {/* Nuestras Soluciones Digitales Section */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
          Nuestras Soluciones Digitales
        </h2>
        <div className="tag-list mx-auto">
          <div className="loop-slider" style={{ "--duration": "15951ms", "--direction": "normal" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag  rounded-xl"><span>#</span> Firma Digital</div>
              <div className="tag  rounded-xl"><span>#</span> Certificados</div>
              <div className="tag  rounded-xl"><span>#</span> Seguridad</div>
              <div className="tag  rounded-xl"><span>#</span> Blockchain</div>
              <div className="tag  rounded-xl"><span>#</span> Trazabilidad</div>
              <div className="tag  rounded-xl"><span>#</span> Firma Digital</div>
              <div className="tag  rounded-xl"><span>#</span> Certificados</div>
              <div className="tag  rounded-xl"><span>#</span> Seguridad</div>
              <div className="tag  rounded-xl"><span>#</span> Blockchain</div>
              <div className="tag  rounded-xl"><span>#</span> Trazabilidad</div>
            </div>
          </div>
          <div className="loop-slider" style={{ "--duration": "19260ms", "--direction": "reverse" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag rounded-xl"><span>#</span> Autenticación</div>
              <div className="tag rounded-xl"><span>#</span> Validación</div>
              <div className="tag rounded-xl"><span>#</span> Documentos</div>
              <div className="tag rounded-xl"><span>#</span> Encriptación</div>
              <div className="tag rounded-xl"><span>#</span> Seguridad</div>
              <div className="tag rounded-xl"><span>#</span> Autenticación</div>
              <div className="tag rounded-xl"><span>#</span> Validación</div>
              <div className="tag rounded-xl"><span>#</span> Documentos</div>
              <div className="tag rounded-xl"><span>#</span> Encriptación</div>
              <div className="tag rounded-xl"><span>#</span> Seguridad</div>
            </div>
          </div>
          <div className="loop-slider" style={{ "--duration": "10449ms", "--direction": "normal" } as React.CSSProperties}>
            <div className="inner">
              <div className="tag"><span>#</span> Innovación</div>
              <div className="tag"><span>#</span> Digital</div>
              <div className="tag"><span>#</span> Confianza</div>
              <div className="tag"><span>#</span> Eficiencia</div>
              <div className="tag"><span>#</span> Futuro</div>
              <div className="tag"><span>#</span> Innovación</div>
              <div className="tag"><span>#</span> Digital</div>
              <div className="tag"><span>#</span> Confianza</div>
              <div className="tag"><span>#</span> Eficiencia</div>
              <div className="tag"><span>#</span> Futuro</div>
            </div>
          </div>
          <div className="fade"></div>
        </div>
      </div>

      <style jsx>{`
        .tag-list {
          width: 90%;
          max-width: 1200px;
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          gap: 1rem 0;
          position: relative;
          padding: 1.5rem 0;
          overflow: hidden;
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 85%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        .loop-slider .inner {
          display: flex;
          width: fit-content;
          animation-name: loop;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--direction);
          animation-duration: var(--duration);
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 0 0.2rem;
          color: #e2e8f0;
          font-size: 1rem;
          background-color: rgba(15, 23, 42, 0.5);
          border-radius: 0;
          padding: 0.7rem 1rem;
          margin-right: 1rem;
          box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2),
            0 0.1rem 0.5rem rgba(0, 0, 0, 0.3),
            0 0.2rem 1.5rem rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        .tag::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(96, 165, 250, 0.1),
            rgba(168, 85, 247, 0.1),
            transparent
          );
          z-index: -1;
          animation: border-glow 3s linear infinite;
        }

        .tag::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 0;
          z-index: -1;
        }

        .tag:hover {
          transform: translateY(-2px);
          background-color: rgba(15, 23, 42, 0.7);
          box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3),
            0 0.2rem 1rem rgba(0, 0, 0, 0.4),
            0 0.4rem 2rem rgba(0, 0, 0, 0.5);
        }

        .tag:hover::before {
          animation: border-glow 1.5s linear infinite;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(96, 165, 250, 0.2),
            rgba(168, 85, 247, 0.2),
            transparent
          );
        }

        .tag span {
          font-size: 1.2rem;
          color: #60a5fa;
          position: relative;
          z-index: 1;
        }

        .fade {
          pointer-events: none;
          background: linear-gradient(
              to bottom,
              #000,
              transparent 30%,
              transparent 70%,
              #000
            ),
            linear-gradient(to right, transparent 0%, transparent 85%, #000);
          position: absolute;
          inset: 0;
        }

        @keyframes border-glow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes loop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalContent.title}
      >
        <div className="whitespace-pre-line">
          {modalContent.description}
        </div>
      </Modal>

      {/* Why Choose FIRMEDIGITAL Banner */}
      <section className="relative py-16 border-t border-white/5 why-choose-banner bg-gradient-to-b from-black to-[#050A20]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-4 w-[400px] h-[400px] bg-blue-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute bottom-0 -left-4 w-[400px] h-[400px] bg-purple-500/5 rounded-full mix-blend-normal filter blur-[100px]" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-5" />
          
          {/* Venezuela Map Background */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-10">
            <svg width="400" height="400" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M250,50 C350,100 400,200 350,300 C300,400 200,450 100,400 C50,350 50,250 100,150 C150,100 200,75 250,50 Z" fill="url(#map-gradient)" />
              <defs>
                <linearGradient id="map-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCDF52" />
                  <stop offset="33%" stopColor="#5470C6" />
                  <stop offset="66%" stopColor="#EE6666" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 z-10">
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <span className="text-white font-semibold">¿Por qué elegir FIRMEDIGITAL?</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 leading-tight max-w-4xl">
              Soberanía digital y cumplimiento legal garantizado
            </h2>
          </div>
          
          <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="space-y-6 text-left">
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  En FirmeDigital, garantizamos que sus documentos y firmas electrónicas cumplen con las leyes venezolanas y se gestionan 100% dentro del territorio nacional, respaldados por SUSCERTE.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Nuestra plataforma ofrece una solución integral que asegura la validez legal de sus documentos electrónicos, cumpliendo con todos los requisitos establecidos en la Ley de Mensajes de Datos y Firmas Electrónicas de Venezuela. Al elegir FIRMEDIGITAL, usted obtiene:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Certificación oficial por SUSCERTE</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Validez legal en todo el territorio nacional</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Protección de datos bajo legislación venezolana</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Infraestructura 100% en territorio nacional</span>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Al mantener todos sus datos dentro del territorio venezolano, garantizamos no solo el cumplimiento legal sino también la soberanía digital de su información, evitando riesgos asociados con el almacenamiento de datos en servidores extranjeros que podrían estar sujetos a legislaciones diferentes.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://app.firmedigital.com/auth/signup" className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    Comenzar ahora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative border-t border-white/5 contact-section my-10  ">
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
      </section>

      
      {/* Footer */}
    </main>
  );
}