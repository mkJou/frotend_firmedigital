import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsPlayCircleFill } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { ActiveCardManager } from './VideoCard';

// Define the Video type based on your usage
interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  blogArticleUrl?: string;
  isFree?: boolean;
}

interface Top10VideoCardProps {
  video: Video;
  rank: number;
}

const Top10VideoCard = ({ video, rank }: Top10VideoCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardManager = ActiveCardManager.getInstance();
  
  // Suscribirse a cambios en la tarjeta activa
  useEffect(() => {
    const unsubscribe = cardManager.subscribe((activeId: string | null) => {
      // Si la tarjeta activa cambió y no es esta tarjeta, contraer esta tarjeta
      if (activeId !== video.id && isExpanded) {
        setIsExpanded(false);
      }
    });
    
    // Limpieza al desmontar
    return () => unsubscribe();
  }, [video.id, isExpanded]);
  
  // Función para manejar la expansión de la tarjeta
  const handleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Si se está expandiendo, notificar al gestor
    if (newExpandedState) {
      cardManager.setActiveCardId(video.id);
    }
  };

  return (
    // El contenedor principal de la tarjeta.
    <div className="min-w-[280px] w-[280px] snap-start">
      <motion.div
        className="relative cursor-pointer group rounded-lg overflow-hidden shadow-xl shadow-black/40"
        whileHover={{
          scale: 1.05,
          zIndex: 20,
        }}
        // Anima la altura total de la tarjeta
        animate={{
          height: isExpanded ? 'auto' : '200px',
          opacity: 1,
          y: 0,
        }}
        initial={{ opacity: 0, y: 20 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        onClick={handleExpand}
        onHoverStart={() => handleExpand()}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Contenido visible siempre (thumbnail + título) */}
        <div className="w-full bg-gray-900 relative overflow-hidden aspect-video">
          {/* Contenedor para la imagen con overflow hidden */}
          <div className="w-full h-full overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
              }}
            />
          </div>
          
          {/* Overlay de play al hacer hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-white/10 backdrop-blur-sm p-2 md:p-3 rounded-full"
            >
              <BsPlayCircleFill className="h-8 w-8 md:h-10 md:w-10 text-white drop-shadow-lg" />
            </motion.div>
          </div>
          
          {/* Capa de sombreado oscuro que cubre toda la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black to-transparent pointer-events-none"></div>
          
          {/* Tooltip para el título completo */}
          <div className="group/tooltip relative">
            {/* Título truncado que siempre es visible */}
            <div className="absolute bottom-0 left-0 right-0 p-3 pb-4 z-10">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white line-clamp-1 drop-shadow-md">{video.title}</h3>
            </div>
            
            {/* Título completo que aparece al hacer hover */}
            <div className="absolute -top-full left-0 right-0 transform -translate-y-2 opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 z-20 pointer-events-none">
              <div className="bg-black/90 p-3 m-2 rounded-lg shadow-xl border border-gray-700">
                <p className="text-sm sm:text-base text-white">{video.title}</p>
              </div>
            </div>
          </div>
          
          {/* Fondo sólido para cubrir cualquier desbordamiento */}
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-black"></div>
          
          {/* Número de ranking estilo grande */}
          <div className="absolute top-0 left-0 z-20 p-0 w-full h-full flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full">
              <span 
                className="absolute text-[90px] md:text-[100px] font-black text-transparent leading-none" 
                style={{ 
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.7)',
                  textShadow: '0 0 15px rgba(0, 0, 0, 0.8)',
                  opacity: 0.8,
                  left: '5px',
                  bottom: '10px',
                  fontFamily: '"Arial Black", sans-serif',
                  // Quitamos la transformación que causa la deformación
                  filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.7))',
                  zIndex: 5
                }}
              >
                {rank}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido expandido - ahora dentro del flujo normal */}
        <motion.div
          className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] relative"
          initial={{ height: 0, opacity: 0, y: 0 }}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-5 space-y-4">
            {/* Información del curso */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-blue-300">
                  {video.category}
                </span>
                <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                <span className="text-gray-400 text-xs">
                  {new Date(video.createdAt).getFullYear()}
                </span>
              </div>
            </div>
            {/* Botón de acción */}
            <Link href={`/academia/${video.id}`}>
              <motion.button
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-md flex items-center justify-center gap-2 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => e.stopPropagation()}
              >
                <span>Ver Video</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Indicador de artículo relacionado */}
        {video.blogArticleUrl && video.blogArticleUrl.trim() !== '' && (
          <div className="absolute top-1 right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-0.5 rounded-sm shadow-lg shadow-purple-900/30 font-medium flex items-center space-x-1 z-10">
            <FiExternalLink className="h-3 w-3" />
            <span>Blog</span>
          </div>
        )}

        {/* Indicador de curso gratis */}
        {video.isFree && (
          <div className="absolute top-1 left-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-0.5 rounded-sm shadow-lg shadow-emerald-900/30 font-medium z-10">
            gratis
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Top10VideoCard;
