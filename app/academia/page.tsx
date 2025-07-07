'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiX, FiExternalLink } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';
import VideoCard from '../components/VideoCard';
import Top10VideoCard from '../components/Top10VideoCard';

// Define the video type
interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeId: string;
  createdAt: string;
  blogArticleId?: string;
  blogArticleUrl?: string;
  top10Rank?: number | null;
}

// Video modal component - Estilo Netflix
const VideoModal = ({ video, isOpen, onClose }: { video: Video | null, isOpen: boolean, onClose: () => void }) => {
  if (!video || !isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0" 
            onClick={onClose}
          />
          
          {/* Botón de cerrar en la esquina superior derecha */}
          <div className="absolute top-4 right-4 z-50">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-all hover:scale-110 bg-black/40 hover:bg-black/60 rounded-full p-2"
              aria-label="Cerrar"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl z-10 overflow-hidden"
          >
            {/* Video de YouTube */}
            <div className="aspect-video w-full overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            {/* Información del video - Estilo Netflix */}
            <div className="bg-gradient-to-b from-[#141414] to-black p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">{video.title}</h2>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <span className="text-green-500 font-medium">97% coincidencia</span>
                    <span className="text-gray-400">
                      {new Date(video.createdAt).getFullYear()}
                    </span>
                    <span className="px-2 py-0.5 border border-gray-600 text-gray-300 text-xs">
                      HD
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl">{video.description}</p>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Categoría:</span>
                    <span className="text-white text-sm font-medium">{video.category}</span>
                  </div>
                  
                  {/* Mostrar el botón 'Saber más' solo si hay una URL de blog disponible */}
                  {video.blogArticleUrl && video.blogArticleUrl.trim() !== '' && (
                    <Link 
                      href={video.blogArticleUrl}
                      className="inline-flex items-center px-5 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-all duration-300"
                      target="_blank"
                    >
                      <FiExternalLink className="h-4 w-4 mr-2" />
                      Artículo relacionado
                    </Link>
                  )}
                </div>
              </div>
              
              {/* Botones de acción estilo Netflix */}
              <div className="flex items-center gap-3 mt-8">
                <button className="flex items-center gap-2 px-5 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-all duration-300">
                  <BsPlayCircleFill className="h-5 w-5" />
                  Reproducir
                </button>
                <button className="flex items-center gap-2 px-5 py-2 bg-gray-600/40 text-white font-medium rounded hover:bg-gray-600/60 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Mi lista
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// El componente VideoCard ahora se importa desde '../components/VideoCard'

// Video row component with navigation buttons
const VideoRow = ({ title, videos, isRanked = false }: { title: string, videos: Video[], isRanked?: boolean }) => {
  const rowRef = React.useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const currentRow = rowRef.current;
    if (currentRow) {
      currentRow.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      return () => currentRow.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  return (
    <div className={`mb-4 relative group ${isRanked ? 'mt-8 pb-4' : ''}`}>
      <h3 className={`text-xl font-medium mb-2 ${isRanked ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-white'}`}>{title}</h3>
      
      <div className="relative">
        {/* Left navigation button */}
        {showLeftButton && (
          <div className="hidden md:flex absolute left-0 top-0 bottom-0 z-30 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={scrollLeft}
              className="h-full px-3 flex items-center justify-center"
              aria-label="Scroll left"
              style={{ 
                background: 'linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))', 
                backdropFilter: 'blur(4px)' 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Right navigation button */}
        {showRightButton && (
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 z-30 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={scrollRight}
              className="h-full px-3 flex items-center justify-center"
              aria-label="Scroll right"
              style={{ 
                background: 'linear-gradient(to left, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))', 
                backdropFilter: 'blur(4px)' 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
        
        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth overflow-y-hidden py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video, index) => (
            isRanked ? (
              <div key={video.id} className="relative">
                <Top10VideoCard video={{...video, isFree: true}} rank={index + 1} />
              </div>
            ) : (
              <VideoCard key={video.id} video={{...video, isFree: true}} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

// Filter component
const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: string[], 
  selectedCategory: string, 
  onCategoryChange: (category: string) => void 
}) => {
  // Estado para controlar la apertura del menú desplegable
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Separar las categorías principales de las secundarias
  const mainCategories = ['Todos', 'General', 'Tutorial'];
  const otherCategories = categories.filter(cat => 
    !mainCategories.includes(cat) && cat !== 'Todos'
  );
  
  // Referencia para el menú desplegable
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // Cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* Botón Todos */}
      <motion.button
        onClick={() => onCategoryChange('all')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Todos
      </motion.button>
      
      {/* Botón General */}
      <motion.button
        onClick={() => onCategoryChange('General')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'General'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        General
      </motion.button>
      
      {/* Botón Tutorial */}
      <motion.button
        onClick={() => onCategoryChange('Tutorial')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'Tutorial'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tutorial
      </motion.button>
      
      {/* Menú desplegable para otras categorías */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            otherCategories.includes(selectedCategory)
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {otherCategories.includes(selectedCategory) ? selectedCategory : 'Más categorías'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>
        
        {/* Menú desplegable */}
        {isDropdownOpen && (
          <motion.div 
            className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1">
              {otherCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${selectedCategory === category ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function AcademiaPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Estado para los videos destacados en la Hero Section
  const [heroVideos, setHeroVideos] = useState<Video[]>([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Fetch videos from API
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/videos');
        const result = await response.json();
        
        console.log('API response:', result);
        
        if (result.success) {
          // Mapear los videos de la API y asegurarse de que todos los campos estén presentes
          const apiVideos: Video[] = result.data.map((video: any) => {
            // Asegurarse de que la categoría esté presente y sea una cadena
            let category = video.category || '';
            
            // Si la categoría está vacía, asignar 'General' por defecto
            if (!category || category.trim() === '') {
              category = 'General';
            }
            
            // Log para depurar el campo top10Rank
            console.log(`Video ${video.title}: top10Rank = ${video.top10Rank}, tipo: ${typeof video.top10Rank}`);
            
            return {
              id: video._id,
              title: video.title,
              description: video.description,
              category: category,
              youtubeId: video.youtubeId,
              createdAt: video.createdAt,
              blogArticleId: video.blogArticleId || '',
              blogArticleUrl: video.blogArticleUrl || '',
              top10Rank: video.top10Rank || null
            };
          });
          
          // Log para ver cuántos videos tienen top10Rank válido
          const videosWithRank = apiVideos.filter(v => v.top10Rank !== null && v.top10Rank !== undefined && typeof v.top10Rank === 'number');
          console.log(`Total videos: ${apiVideos.length}, Videos con top10Rank válido: ${videosWithRank.length}`);
          if (videosWithRank.length > 0) {
            console.log('Videos con top10Rank:', videosWithRank.map(v => ({ title: v.title, rank: v.top10Rank })));
          }
          
          console.log('Videos cargados:', apiVideos);
          
          setVideos(apiVideos);
          setFilteredVideos(apiVideos);
          
          // Seleccionar los 5 videos más recientes como destacados para la Hero Section
          const sortedByDate = [...apiVideos].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setHeroVideos(sortedByDate.slice(0, 5));
          
          // Extraer categorías únicas directamente de los videos
          const categoriesFromVideos = new Set<string>();
          
          // Extraer todas las categorías de los videos
          apiVideos.forEach(video => {
            if (video.category) {
              const videoCategories = video.category.split(',');
              videoCategories.forEach(cat => {
                const trimmedCat = cat.trim();
                if (trimmedCat) {
                  categoriesFromVideos.add(trimmedCat);
                }
              });
            }
          });
          
          console.log('Categorías extraídas de videos:', Array.from(categoriesFromVideos));
          
          // Categorías predefinidas para asegurar que siempre estén disponibles
          const predefinedCategories = [
            'Legal y jurídico',
            'Ingenieros',
            'Salud',
            'Contadores',
            'Gubernamentales',
            'Educación',
            'Comercio',
            'Financiero',
            'Tecnología',
            'Recursos Humanos',
            'Tutorial',
            'Eventos',
            'Agropecuario',
            'Banca y Finanzas',
            'General'
          ];
          
          // Combinar categorías de videos y predefinidas
          const allCategories = new Set<string>();
          
          // Primero añadir las categorías de los videos (prioridad)
          categoriesFromVideos.forEach(cat => allCategories.add(cat));
          
          // Luego añadir las predefinidas que no existan ya
          predefinedCategories.forEach(cat => allCategories.add(cat));
          
          // Convertir a array y ordenar alfabéticamente
          const sortedCategories = Array.from(allCategories).sort();
          
          // Añadir 'Todos' al principio
          const uniqueSectors = ['Todos', ...sortedCategories];
          
          console.log('Categorías finales disponibles:', uniqueSectors);
          setSectors(uniqueSectors);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVideos();
  }, []);
  
  // Filtrar videos por sector y término de búsqueda
  const filterVideos = () => {
    console.log('filterVideos called, videos length:', videos.length);
    let result = [...videos];
    
    // Filtrar por sector
    if (selectedSector !== 'Todos') {
      console.log('Filtering by sector:', selectedSector);
      result = result.filter(video => {
        // Verificar si la categoría está incluida en la cadena de categorías separadas por comas
        if (video.category) {
          const categories = video.category.split(',').map(cat => cat.trim());
          return categories.includes(selectedSector);
        }
        return false;
      });
    }
    
    // Si no hay resultados para la categoría seleccionada, mostrar un mensaje en consola
    if (result.length === 0 && selectedSector !== 'Todos') {
      console.log(`No hay videos en la categoría: ${selectedSector}`);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      console.log('Filtering by search term:', searchTerm);
      const term = searchTerm.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(term) || 
        video.description.toLowerCase().includes(term)
      );
    }
    
    console.log('Filtered videos result:', result.length, 'items');
    setFilteredVideos(result);
  };
  
  // Aplicar filtros cuando cambia el sector o el término de búsqueda
  useEffect(() => {
    filterVideos();
  }, [selectedSector, searchTerm, videos]);
  
  // Efecto para cambiar el video destacado cada 15 segundos
  useEffect(() => {
    if (heroVideos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentHeroIndex(prevIndex => {
        // Animación de transición con framer-motion se maneja en el componente
        return (prevIndex + 1) % heroVideos.length;
      });
    }, 15000); // Cambiar cada 15 segundos
    
    return () => clearInterval(interval);
  }, [heroVideos.length]);
  
  // Manejar cambio de sector
  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
  };
  
  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#050510] text-white">
      {/* Header - Estilo Netflix */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent py-3 px-4 md:px-8 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <Image 
                src="/images/logo.webp" 
                alt="FIRMEDIGITAL Logo" 
                width={150} 
                height={50} 
                className="w-[120px] md:w-[150px] h-auto object-contain"
              />
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium">Inicio</Link>
              <Link href="/academia" className="text-white text-sm font-medium">Academia</Link>
              <Link href="/blog" className="text-gray-300 hover:text-white text-sm font-medium">Blog</Link>
            </nav>
          </div>
          <div>
            <Link 
              href="https://firmedigital.com/" 
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
            >
              Ir a FIRMEDIGITAL
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Estilo Netflix */}
      <section className="relative h-screen overflow-hidden">
        {/* Video de fondo con reproductor de YouTube */}
        <AnimatePresence mode="wait">
          {heroVideos.length > 0 && (
            <motion.div 
              key={`hero-video-${currentHeroIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full z-0"
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <iframe 
                  src={`https://www.youtube.com/embed/${heroVideos[currentHeroIndex]?.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${heroVideos[currentHeroIndex]?.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`}
                  title={heroVideos[currentHeroIndex]?.title}
                  className="absolute inset-0 w-full h-full"
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.5)' // Escalar para eliminar bordes negros
                  }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsVideoLoaded(true)}
                />
              </div>
              
              {/* Gradientes para mejorar legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* El botón de Mute/Unmute para pantallas grandes ha sido eliminado */}
        
        {/* Contenido superpuesto al estilo Netflix */}
        {heroVideos.length > 0 && (
          <div className="absolute inset-0 flex items-end sm:items-center pb-16 sm:pb-0 z-10">
            <div className="container mx-auto px-4 md:px-8 lg:px-12 pt-16">
              <div className="max-w-2xl mb-16 sm:mb-0">
                <motion.div
                  key={`hero-content-${currentHeroIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 text-blue-300 font-medium">
                    {heroVideos[currentHeroIndex]?.category}
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                    {heroVideos[currentHeroIndex]?.title}
                  </h1>
                  
                  <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg line-clamp-3">
                    {heroVideos[currentHeroIndex]?.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <Link 
                      href={`/academia/${heroVideos[currentHeroIndex]?.id}`}
                      className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-opacity-80 transition-all flex items-center space-x-2"
                      aria-label="Reproducir video"
                    >
                      <BsPlayCircleFill className="h-5 w-5" />
                      <span>Reproducir</span>
                    </Link>
                    
                    {/* Botón de Mute/Unmute para todos los dispositivos */}
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="flex items-center justify-center bg-black/60 hover:bg-black/80 p-3 rounded-full transition-all duration-300"
                      aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Videos Section */}
      <section id="videos-section" className="pt-2 md:pt-6 pb-4 bg-transparent mt-0 md:mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado y título */}
          <div className="mb-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Videos Educativos</h2>
            </div>
            
            {/* Filtros y barra de búsqueda - Responsive */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              {/* Barra de búsqueda */}
              <div className="relative w-full md:w-64 order-1 md:order-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className={`h-4 w-4 transition-colors duration-300 ${searchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
                </div>
                <input
                  id="search-videos"
                  type="text"
                  placeholder="Títulos, categorías..."
                  className={`w-full bg-black/40 border text-sm rounded-sm pl-9 pr-4 py-2 focus:outline-none transition-all duration-300 text-white ${searchFocused 
                    ? 'border-blue-500 bg-black/60' 
                    : 'border-white/20 hover:border-white/40'}`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>
            
            {/* Filtro por sectores con selector para categorías adicionales - Responsive */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 order-2 md:order-1">
              {/* Botón Todos */}
              <button
                onClick={() => handleSectorChange('Todos')}
                className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${selectedSector === 'Todos' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
              >
                Todos
              </button>
              
              {/* Selector de Cursos Externos */}
              <div className="relative">
                {(() => {
                  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
                  const coursesRef = React.useRef<HTMLButtonElement>(null);
                  
                  // Cerrar el menú al hacer clic en cualquier parte
                  useEffect(() => {
                    const handleClickOutside = (e: MouseEvent) => {
                      if (isCoursesOpen && coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
                        setIsCoursesOpen(false);
                      }
                    };
                    
                    document.addEventListener('click', handleClickOutside);
                    return () => document.removeEventListener('click', handleClickOutside);
                  }, [isCoursesOpen]);
                  
                  return (
                    <>
                      <button
                        ref={coursesRef}
                        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                        className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg hover:shadow-xl flex items-center gap-1"
                      >
                        <span>Cursos Gratis</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {isCoursesOpen && (
                        <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                window.open('https://aulavirtual.suscerte.gob.ve/', '_blank');
                                setIsCoursesOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              Cursos Gratis SUSCERTE
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
              
              {/* Selector para otras categorías - Con click para móviles */}
              <div className="relative">
                {(() => {
                  const [isOpen, setIsOpen] = useState(false);
                  const buttonRef = React.useRef<HTMLButtonElement>(null);
                  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
                  const [isMounted, setIsMounted] = useState(false);
                  
                  // Detectar cuando el componente está montado para usar createPortal
                  useEffect(() => {
                    setIsMounted(true);
                    return () => setIsMounted(false);
                  }, []);
                  
                  // Actualizar posición del botón cuando se abre el menú
                  useEffect(() => {
                    if (isOpen && buttonRef.current) {
                      const rect = buttonRef.current.getBoundingClientRect();
                      setButtonPosition({
                        top: rect.top + window.scrollY,
                        left: rect.left + window.scrollX,
                        width: rect.width,
                        height: rect.height
                      });
                    }
                  }, [isOpen]);
                  
                  // Cerrar el menú al hacer clic en cualquier parte
                  useEffect(() => {
                    const handleClickOutside = (e: MouseEvent) => {
                      if (isOpen && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
                        setIsOpen(false);
                      }
                    };
                    
                    document.addEventListener('click', handleClickOutside);
                    return () => document.removeEventListener('click', handleClickOutside);
                  }, [isOpen]);
                  
                  // Cerrar el menú al presionar Escape
                  useEffect(() => {
                    const handleEscape = (e: KeyboardEvent) => {
                      if (e.key === 'Escape' && isOpen) {
                        setIsOpen(false);
                      }
                    };
                    
                    document.addEventListener('keydown', handleEscape);
                    return () => document.removeEventListener('keydown', handleEscape);
                  }, [isOpen]);
                  
                  return (
                    <>
                      <button
                        ref={buttonRef}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(!isOpen);
                        }}
                        className={`px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1 sm:gap-2 ${!['Todos', 'General'].includes(selectedSector) 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className="truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                          {!['Todos', 'General'].includes(selectedSector) ? selectedSector : 'Más categorías'}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Menú desplegable usando Portal para evitar problemas de recorte */}
                      {isOpen && isMounted && createPortal(
                        <div 
                          style={{
                            position: 'absolute',
                            top: `${buttonPosition.top + buttonPosition.height + 8}px`,
                            left: `${buttonPosition.left + buttonPosition.width - 224}px`, // 224px = ancho del menú (w-56)
                            zIndex: 9999,
                            maxHeight: '300px',
                            overflowY: 'auto',
                            width: '224px' // Equivalente a w-56
                          }}
                          className="rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="py-1">
                            {/* Mostrar todas las categorías excepto Todos y General */}
                            {sectors
                              .filter(sector => sector !== 'Todos' && sector !== 'General')
                              .map((sector) => (
                                <button
                                  key={sector}
                                  onClick={() => {
                                    handleSectorChange(sector);
                                    setIsOpen(false);
                                  }}
                                  className={`block w-full text-left px-4 py-2 text-xs sm:text-sm ${selectedSector === sector ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                >
                                  {sector}
                                </button>
                              ))}
                            {/* Si no hay categorías adicionales, mostrar mensaje */}
                            {sectors.filter(sector => sector !== 'Todos' && sector !== 'General').length === 0 && (
                              <div className="px-4 py-2 text-xs sm:text-sm text-gray-400">No hay categorías adicionales</div>
                            )}
                          </div>
                        </div>,
                        document.body
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {[...Array(12)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="relative aspect-video bg-gray-900 animate-pulse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              ))}
            </div>
          ) : (
            <div>
              {filteredVideos.length > 0 ? (
                <div>
                  {/* Si hay un término de búsqueda o un sector seleccionado que no sea 'Todos', mostrar todos los videos filtrados en una cuadrícula */}
                  {(searchTerm || selectedSector !== 'Todos') ? (
                    <VideoRow
                      title={searchTerm ? `Resultados para "${searchTerm}"` : `Categoría: ${selectedSector}`}
                      videos={filteredVideos}
                    />
                  ) : (
                    /* Si no hay filtros, organizar por categorías */
                    <div className="space-y-2">
                      {/* Mostrar los videos más recientes primero */}
                      <VideoRow
                        title="Más recientes"
                        videos={[...filteredVideos]
                          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                          .slice(0, 7)
                        }
                      />
                      
                      {/* Top 10 videos de la semana */}
                      {(() => {
                        // Filtrar videos con top10Rank válido
                        const top10Videos = [...filteredVideos]
                          .filter(video => video.top10Rank !== null && video.top10Rank !== undefined && typeof video.top10Rank === 'number')
                          .sort((a, b) => {
                            // Ordenar por el campo top10Rank
                            const rankA = typeof a.top10Rank === 'number' ? a.top10Rank : 999;
                            const rankB = typeof b.top10Rank === 'number' ? b.top10Rank : 999;
                            return rankA - rankB;
                          })
                          .slice(0, 10);
                        
                        // Log para depurar
                        console.log('Videos filtrados para Top 10:', top10Videos.map(v => ({ title: v.title, rank: v.top10Rank })));
                        
                        return (
                          <VideoRow
                            title={`Top 10 Videos más vistos`}
                            videos={top10Videos}
                            isRanked={true}
                          />
                        );
                      })()}
                      
                      {/* Organizar el resto por categorías con Top 10 cada 5 secciones */}
                      {(() => {
                        // Preparar Top 10 videos para reutilizarlo
                        const top10Videos = [...filteredVideos]
                          .filter(video => video.top10Rank !== null && video.top10Rank !== undefined && typeof video.top10Rank === 'number')
                          .sort((a, b) => {
                            const rankA = typeof a.top10Rank === 'number' ? a.top10Rank : 999;
                            const rankB = typeof b.top10Rank === 'number' ? b.top10Rank : 999;
                            return rankA - rankB;
                          })
                          .slice(0, 10);
                          
                        // Filtrar categorías que tienen videos
                        const validCategories = sectors
                          .filter(sector => sector !== 'Todos')
                          .map(category => {
                            const categoryVideos = videos.filter(video => {
                              if (video.category) {
                                const videoCategories = video.category.split(',').map(cat => cat.trim());
                                return videoCategories.includes(category);
                              }
                              return false;
                            });
                            return { category, videos: categoryVideos };
                          })
                          .filter(item => item.videos.length > 0);
                        
                        // Crear componentes para renderizar
                        return validCategories.map((item, index) => {
                          // Crear un array para almacenar los componentes a renderizar
                          const components = [];
                          
                          // Agregar la categoría actual
                          components.push(
                            <VideoRow 
                              key={`category-${item.category}`}
                              title={item.category}
                              videos={item.videos}
                            />
                          );
                          
                          // Si es múltiplo de 5 (después de cada 5 categorías) y hay videos en Top 10, agregar sección Top 10
                          if ((index + 1) % 5 === 0 && top10Videos.length > 0 && index < validCategories.length - 1) {
                            components.push(
                              <VideoRow
                                key={`top10-repeat-${index}`}
                                title={`Top 10 Videos más vistos`}
                                videos={top10Videos}
                                isRanked={true}
                              />
                            );
                          }
                          
                          return components;
                        }).flat();
                      })()}

                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  className="text-center py-20 px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-900/20 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">No hay videos disponibles</h3>
                  <p className="text-gray-400 max-w-md mx-auto">No se encontraron videos para la categoría o búsqueda actual. Intenta con otra categoría o término de búsqueda.</p>
                </motion.div>
              )}
              
              {/* Video Modal */}
              <VideoModal 
                video={selectedVideo} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
