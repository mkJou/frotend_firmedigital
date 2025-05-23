'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiX, FiExternalLink } from 'react-icons/fi';
import { BsPlayCircleFill } from 'react-icons/bs';

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
}

// Video modal component
const VideoModal = ({ video, isOpen, onClose }: { video: Video | null, isOpen: boolean, onClose: () => void }) => {
  if (!video || !isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0" 
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="relative w-full max-w-6xl bg-gradient-to-br from-[#0A0A0A] to-[#121212] border border-white/10 rounded-2xl z-10 overflow-hidden my-8 max-h-[90vh] shadow-2xl shadow-blue-900/20"
          >
            {/* Botón de cerrar fijo en la esquina superior derecha */}
            <div className="sticky top-0 right-0 flex justify-end p-4 bg-gradient-to-b from-[#0A0A0A] to-transparent backdrop-blur-sm z-20">
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-all hover:scale-110 bg-white/5 hover:bg-white/10 rounded-full p-2"
                aria-label="Cerrar"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            {/* Contenido del modal con scroll */}
            <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Video de YouTube */}
              <div className="aspect-video w-full mb-8 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg">
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
              
              {/* Información del video */}
              <div className="p-4">
                <h2 className="text-3xl font-bold mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{video.title}</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">{video.description}</p>
                
                <div className="flex flex-wrap justify-between items-center mb-8">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full text-sm font-medium text-blue-300 shadow-lg shadow-blue-900/10 border border-blue-500/20">
                    {video.category}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    {new Date(video.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                {/* Mostrar el botón 'Saber más' solo si hay una URL de blog disponible */}
                {video.blogArticleUrl && video.blogArticleUrl.trim() !== '' && (
                  <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link 
                      href={video.blogArticleUrl}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-1"
                      target="_blank"
                    >
                      Saber más
                      <FiExternalLink className="h-5 w-5 ml-2" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Video card component
const VideoCard = ({ video, onClick }: { video: Video, onClick: (video: Video) => void }) => {
  return (
    <motion.div 
      className="relative rounded-2xl overflow-hidden cursor-pointer group h-full"
      onClick={() => onClick(video)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-700" />
      <div className="relative bg-gradient-to-br from-[#0A0A0A]/90 to-[#121212]/90 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/20">
        {/* Thumbnail con overlay de play */}
        <div className="aspect-video w-full bg-gray-900 rounded-xl mb-5 relative overflow-hidden shadow-lg shadow-black/30 ring-1 ring-white/5">
          <img 
            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
            onError={(e) => {
              // Si la imagen maxresdefault no está disponible, usar la hqdefault
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center opacity-70 group-hover:opacity-90 transition-all duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
            >
              <BsPlayCircleFill className="h-12 w-12 text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
        
        {/* Título y descripción */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{video.title}</h3>
        <p className="text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">{video.description}</p>
        
        {/* Categoría y fecha */}
        <div className="flex justify-between items-center mt-auto">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full text-xs font-medium text-blue-300 border border-blue-500/20">
            {video.category}
          </span>
          <span className="text-gray-500 text-xs font-medium">
            {new Date(video.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        
        {/* Indicador de artículo relacionado */}
        {video.blogArticleUrl && video.blogArticleUrl.trim() !== '' && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-purple-900/30 font-medium flex items-center space-x-1">
            <FiExternalLink className="h-3 w-3" />
            <span>Blog</span>
          </div>
        )}
      </div>
    </motion.div>
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
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <motion.button
        onClick={() => onCategoryChange('all')}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          selectedCategory === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20'
            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Todos
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
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

  useEffect(() => {
    // Fetch videos from API
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        
        // Fetch videos from the API
        const response = await fetch('/api/videos');
        const result = await response.json();
        
        if (result.success) {
          // Mapear los videos de la API y asegurarse de que todos los campos estén presentes
          const apiVideos: Video[] = result.data.map((video: any) => ({
            id: video._id,
            title: video.title,
            description: video.description,
            category: video.category,
            youtubeId: video.youtubeId,
            createdAt: video.createdAt,
            blogArticleId: video.blogArticleId || '',
            blogArticleUrl: video.blogArticleUrl || ''
          }));
          
          console.log('Videos cargados:', apiVideos);
          
          setVideos(apiVideos);
          setFilteredVideos(apiVideos);
          
          // Extraer sectores únicos de los videos
          const uniqueSectors = Array.from(new Set(apiVideos.map(video => video.category)));
          setSectors(['Todos', ...uniqueSectors]);
        } else {
          console.error('Error fetching videos:', result.error);
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
    let result = videos;
    
    // Filtrar por sector si no es 'Todos'
    if (selectedSector !== 'Todos') {
      result = result.filter(video => video.category === selectedSector);
    }
    
    // Filtrar por término de búsqueda si no está vacío
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(term) || 
        video.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredVideos(result);
  };
  
  // Manejar cambio de sector
  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
  };
  
  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Aplicar filtros cuando cambia el sector o el término de búsqueda
  useEffect(() => {
    filterVideos();
  }, [selectedSector, searchTerm, videos]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#050510] text-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/beneeduca.jpg" 
            alt="Academia FIRMEDIGITAL" 
            fill 
            className="object-cover opacity-20 blur-sm"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/30 to-black/80 z-0" />
        
        {/* Partículas decorativas */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Logo en la esquina superior izquierda */}
          <div className="fixed top-4 left-4 md:absolute md:top-0 md:left-8 lg:left-10 z-50">
            <Link href="/">
              <Image 
                src="/images/logo.webp" 
                alt="FIRMEDIGITAL Logo" 
                width={220} 
                height={73} 
                className="w-[140px] md:w-[190px] lg:w-[220px] h-auto object-contain transition-all duration-300 bg-black/40 p-1 md:bg-transparent md:p-0"
              />
            </Link>
          </div>
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
              className="inline-block mb-4 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-blue-300 font-medium"
            >
              Recursos Educativos
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300"
            >
              Academia FIRMEDIGITAL
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Explora nuestra colección de videos educativos sobre firma electrónica, 
              certificados digitales y seguridad documental.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 md:mb-0 flex items-center"
            >
              <span className="mr-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">Videos</span>
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Educativos</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </span>
            </motion.h2>
            {isLoading ? null : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link 
                  href="https://firmedigital.com/" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Ir a FIRMEDIGITAL
                  <FiExternalLink className="h-5 w-5 ml-2" />
                </Link>
              </motion.div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="relative rounded-2xl overflow-hidden h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="relative bg-gradient-to-br from-[#0A0A0A]/90 to-[#121212]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
                    <div className="aspect-video w-full bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse mb-5 rounded-xl shadow-lg shadow-black/30 ring-1 ring-white/5" />
                    <div className="h-7 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse mb-3 rounded-md w-3/4" />
                    <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse mb-2 rounded-md w-full" />
                    <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse mb-2 rounded-md w-full" />
                    <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse mb-5 rounded-md w-4/5" />
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 animate-pulse rounded-full w-1/3" />
                      <div className="h-4 bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse rounded-md w-1/4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <motion.div 
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row gap-5 mb-8">
                  {/* Buscador */}
                  <div className="relative flex-1">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-lg transition-opacity duration-300 ${searchFocused ? 'opacity-100' : 'opacity-0'}`} />
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiSearch className={`h-5 w-5 transition-colors duration-300 ${searchFocused ? 'text-blue-400' : 'text-gray-400'}`} />
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar videos por título o descripción..."
                        className={`w-full bg-white/5 border rounded-xl pl-12 pr-4 py-3.5 focus:outline-none transition-all duration-300 text-white ${searchFocused 
                          ? 'border-blue-500 bg-white/10 shadow-lg shadow-blue-900/20' 
                          : 'border-white/10 hover:border-white/20'}`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Filtro por sectores */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {sectors.map(sector => (
                    <motion.button
                      key={sector}
                      onClick={() => handleSectorChange(sector)}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedSector === sector 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/20'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {sector}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {filteredVideos.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredVideos.map((video, index) => (
                    <VideoCard 
                      key={video.id} 
                      video={video} 
                      onClick={(video) => {
                        setSelectedVideo(video);
                        setIsModalOpen(true);
                      }} 
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  className="text-center py-20 px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-900/20 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">No hay videos disponibles</h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">No se encontraron videos para la categoría o búsqueda actual. Intenta con otra categoría o término de búsqueda.</p>
                </motion.div>
              )}
              
              {/* Video Modal */}
              <VideoModal 
                video={selectedVideo} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
              />
            </>
          )}
        </div>
      </section>
    </main>
  );
}
