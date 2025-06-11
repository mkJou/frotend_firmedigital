'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiExternalLink, FiClock, FiTag } from 'react-icons/fi';

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

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/videos/${params.id}`);
        const result = await response.json();
        
        if (result.success) {
          // Mapear el video de la API
          const apiVideo: Video = {
            id: result.data._id,
            title: result.data.title,
            description: result.data.description,
            category: result.data.category,
            youtubeId: result.data.youtubeId,
            createdAt: result.data.createdAt,
            blogArticleId: result.data.blogArticleId || '',
            blogArticleUrl: result.data.blogArticleUrl || ''
          };
          
          setVideo(apiVideo);
        } else {
          setError('No se pudo cargar el video');
          console.error('Error fetching video:', result.error);
        }
      } catch (error) {
        setError('Error al cargar el video');
        console.error('Error fetching video:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (params.id) {
      fetchVideo();
    }
  }, [params.id]);

  const goBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-[#050510] text-white">
      {/* Header con botón de regreso y logo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent py-3 px-4 md:px-8 transition-all duration-300">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <button 
              onClick={goBack}
              className="flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Regresar"
            >
              <FiArrowLeft className="h-5 w-5 text-white" />
            </button>
            <h1 className="text-lg font-medium">Academia</h1>
          </div>
          
          {/* Logo en la esquina superior derecha */}
          <Link href="/" className="relative h-10 w-28 md:w-32 flex-shrink-0 transition-opacity duration-300 hover:opacity-80">
            <Image 
              src="/images/logo.webp" 
              alt="Firma Digital Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>
      </header>

      <section className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="space-y-8">
            <div className="aspect-video w-full bg-gray-900 animate-pulse rounded-xl"></div>
            <div className="h-8 bg-gray-800 animate-pulse rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-800 animate-pulse rounded-md w-full"></div>
            <div className="h-4 bg-gray-800 animate-pulse rounded-md w-full"></div>
            <div className="h-4 bg-gray-800 animate-pulse rounded-md w-2/3"></div>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-20 px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{error}</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">No se pudo cargar la información del video solicitado.</p>
            <button 
              onClick={goBack}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Volver a Academia
            </button>
          </motion.div>
        ) : video ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Video player */}
            <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl bg-black">
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
            
            {/* Video info */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{video.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-blue-400">
                  <FiTag className="h-4 w-4" />
                  {video.category}
                </span>
                <span className="flex items-center gap-2 text-gray-400">
                  <FiClock className="h-4 w-4" />
                  {new Date(video.createdAt).toLocaleDateString()}
                </span>
                {video.blogArticleUrl && (
                  <Link 
                    href={video.blogArticleUrl}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    target="_blank"
                  >
                    <FiExternalLink className="h-4 w-4" />
                    Ver artículo relacionado
                  </Link>
                )}
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-xl font-medium text-white mb-4">Descripción</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{video.description}</p>
              </div>
              
              {/* Acciones */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  Ver en YouTube
                </Link>
                <button 
                  onClick={goBack}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiArrowLeft className="h-5 w-5" />
                  Volver a Academia
                </button>
              </div>
            </div>
            
            {/* Videos relacionados - Implementación futura */}
            {/* <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Videos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Aquí irían los videos relacionados */}
            {/* </div> */}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">No se encontró el video solicitado.</p>
          </div>
        )}
      </section>
    </main>
  );
}
