'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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

// Interfaz para los artículos del blog
interface BlogArticle {
  _id: string;
  title: string;
  category: string;
  slug?: string;
}

export default function AdminPage() {
  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [blogArticleId, setBlogArticleId] = useState('');
  const [blogArticleUrl, setBlogArticleUrl] = useState('');
  
  // Sectores disponibles basados en el menú de navegación
  const sectores = [
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
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);

  useEffect(() => {
    // Fetch videos, categories, and blog articles from API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsLoadingArticles(true);
        
        // Fetch videos from the API
        const response = await fetch('/api/videos');
        const result = await response.json();
        
        if (result.success) {
          const apiVideos: Video[] = result.data.map((video: any) => ({
            id: video._id,
            title: video.title,
            description: video.description,
            category: video.category,
            youtubeId: video.youtubeId,
            createdAt: video.createdAt,
            blogArticleId: video.blogArticleId,
            blogArticleUrl: video.blogArticleUrl
          }));
          
          setVideos(apiVideos);
        } else {
          console.error('Error fetching videos:', result.error);
        }
        
        setIsLoading(false);
        
        // Fetch blog articles
        try {
          const articlesResponse = await fetch('/api/articles');
          const articlesResult = await articlesResponse.json();
          
          if (articlesResult.success) {
            setBlogArticles(articlesResult.data);
          } else {
            console.error('Error fetching blog articles:', articlesResult.error);
          }
        } catch (error) {
          console.error('Error fetching blog articles:', error);
        } finally {
          setIsLoadingArticles(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        setIsLoadingArticles(false);
      }
    };

    fetchData();
  }, []);

  // Extract YouTube ID from URL
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle YouTube URL input
  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    const id = extractYoutubeId(url);
    if (id) {
      setYoutubeId(id);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !sector || !youtubeId) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos.',
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const videoData = {
        title,
        description,
        category: sector, // Usamos el sector como categoría
        youtubeId,
        blogArticleUrl: blogArticleUrl.trim() || null,
        isVisible: true,
      };
      
      console.log('Enviando datos de video:', videoData);
      
      let response;
      let result;
      
      if (editingVideo) {
        // Update existing video via API
        response = await fetch(`/api/videos/${editingVideo.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoData),
        });
        
        result = await response.json();
        
        if (result.success) {
          // Update the video in the local state
          const updatedVideo: Video = {
            id: result.data._id,
            title: result.data.title,
            description: result.data.description,
            category: result.data.category,
            youtubeId: result.data.youtubeId,
            createdAt: result.data.createdAt,
            blogArticleUrl: result.data.blogArticleUrl,
          };
          
          setVideos(videos.map(video => video.id === editingVideo.id ? updatedVideo : video));
          
          setFormStatus({
            type: 'success',
            message: 'Video actualizado correctamente.',
          });
        } else {
          throw new Error(result.error || 'Error al actualizar el video');
        }
      } else {
        // Add new video via API
        response = await fetch('/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoData),
        });
        
        result = await response.json();
        
        if (result.success) {
          // Add the new video to the local state
          const newVideo: Video = {
            id: result.data._id,
            title: result.data.title,
            description: result.data.description,
            category: result.data.category,
            youtubeId: result.data.youtubeId,
            createdAt: result.data.createdAt,
            blogArticleUrl: result.data.blogArticleUrl,
          };
          
          setVideos([...videos, newVideo]);
          
          setFormStatus({
            type: 'success',
            message: 'Video agregado correctamente.',
          });
        } else {
          throw new Error(result.error || 'Error al crear el video');
        }
      }

      // Reset form
      setTitle('');
      setDescription('');
      setSector('');
      setYoutubeId('');
      setYoutubeUrl('');
      setBlogArticleUrl('');
      setEditingVideo(null);
    } catch (error) {
      console.error('Error saving video:', error);
      setFormStatus({
        type: 'error',
        message: 'Ha ocurrido un error al guardar el video. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit video
  const handleEditVideo = (video: Video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setDescription(video.description);
    setSector(video.category); // Usamos la categoría como sector
    setYoutubeId(video.youtubeId);
    setYoutubeUrl(`https://www.youtube.com/watch?v=${video.youtubeId}`);
    
    // Set blog article URL if available
    if (video.blogArticleUrl) {
      setBlogArticleUrl(video.blogArticleUrl);
    } else {
      setBlogArticleUrl('');
    }
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete video
  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este video?')) {
      try {
        // Delete video via API
        const response = await fetch(`/api/videos/${id}`, {
          method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Remove the video from the local state
          setVideos(videos.filter(video => video.id !== id));
          
          // If we're editing this video, reset the form
          if (editingVideo && editingVideo.id === id) {
            setTitle('');
            setDescription('');
            setSector('');
            setYoutubeId('');
            setYoutubeUrl('');
            setEditingVideo(null);
          }
          
          setFormStatus({
            type: 'success',
            message: 'Video eliminado correctamente.',
          });
        } else {
          throw new Error(result.error || 'Error al eliminar el video');
        }
      } catch (error) {
        console.error('Error deleting video:', error);
        setFormStatus({
          type: 'error',
          message: 'Ha ocurrido un error al eliminar el video. Por favor, inténtalo de nuevo.',
        });
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Administración de Videos
              </h1>
              <p className="mt-2 text-gray-300">
                Gestiona los videos educativos de la Academia FIRMEDIGITAL
              </p>
            </div>
            <Link 
              href="/academia" 
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver a Academia
            </Link>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-6">
                {editingVideo ? 'Editar Video' : 'Agregar Nuevo Video'}
              </h2>
              
              {formStatus.type && (
                <div className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ingresa el título del video"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ingresa una descripción para el video"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-300 mb-2">
                    Sector *
                  </label>
                  <select
                    id="sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Selecciona un sector</option>
                    {sectores.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    URL de YouTube *
                  </label>
                  <input
                    type="url"
                    id="youtubeUrl"
                    value={youtubeUrl}
                    onChange={handleYoutubeUrlChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                  {youtubeId && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">ID de YouTube: {youtubeId}</p>
                      <div className="mt-2 aspect-video w-full max-w-md">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          title="YouTube video preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="blogArticleUrl" className="block text-sm font-medium text-gray-300 mb-2">
                    Enlace al Artículo del Blog (Opcional)
                  </label>
                  <input
                    type="url"
                    id="blogArticleUrl"
                    value={blogArticleUrl}
                    onChange={(e) => setBlogArticleUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="/blog/nombre-del-articulo o URL completa"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Introduce la ruta al artículo del blog (ej: /blog/firma-electronica-ventajas)
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? 'Guardando...' : editingVideo ? 'Actualizar Video' : 'Agregar Video'}
                  </button>
                  
                  {editingVideo && (
                    <button
                      type="button"
                      onClick={() => {
                        setTitle('');
                        setDescription('');
                        setSector('');
                        setYoutubeId('');
                        setYoutubeUrl('');
                        setEditingVideo(null);
                      }}
                      className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Videos List Section */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Videos Existentes</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl" />
                  <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                    <div className="h-6 bg-gray-800 animate-pulse mb-2 rounded-md w-1/3" />
                    <div className="h-4 bg-gray-800 animate-pulse mb-4 rounded-md w-full" />
                    <div className="h-4 bg-gray-800 animate-pulse rounded-md w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl" />
                  <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{video.title}</h3>
                        <p className="text-gray-400 mt-1 line-clamp-2">{video.description}</p>
                        <div className="flex flex-wrap items-center mt-2 gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full text-sm text-blue-400">
                            {video.category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ID: {video.youtubeId}
                          </span>
                          {video.blogArticleUrl && (
                            <span className="px-3 py-1 bg-green-600/30 rounded-full text-sm text-green-400">
                              Artículo vinculado
                            </span>
                          )}
                          <span className="text-gray-500 text-sm">
                            {new Date(video.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <button
                          onClick={() => handleEditVideo(video)}
                          className="px-4 py-2 bg-blue-600/30 text-blue-400 font-medium rounded-lg hover:bg-blue-600/50 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="px-4 py-2 bg-red-600/30 text-red-400 font-medium rounded-lg hover:bg-red-600/50 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-xl">No hay videos disponibles.</p>
              <p className="text-gray-500 mt-2">Agrega un nuevo video utilizando el formulario de arriba.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
