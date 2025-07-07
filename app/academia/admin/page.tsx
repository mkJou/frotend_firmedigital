'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// Definir la interfaz Video
interface Video {
  id: string;
  _id?: string;  // MongoDB usa _id, pero en el frontend usamos id
  title: string;
  description: string;
  category: string;
  youtubeId: string;
  createdAt: string;
  blogArticleId?: string;
  blogArticleUrl?: string;
  top10Rank?: number | null;
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
  const [sectors, setSectors] = useState<string[]>([]);
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
  
  // Estado para manejar los videos del Top 10
  const [top10Videos, setTop10Videos] = useState<Video[]>([]);
  const [hasTop10Changes, setHasTop10Changes] = useState(false);
  const [isSavingTop10, setIsSavingTop10] = useState(false);

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
            blogArticleUrl: video.blogArticleUrl,
            top10Rank: video.top10Rank || null
          }));
          
          setVideos(apiVideos);
          
          // Filtrar y ordenar los videos del Top 10
          const top10 = apiVideos
            .filter(video => {
              return video.top10Rank !== null && 
                     video.top10Rank !== undefined && 
                     typeof video.top10Rank === 'number' && 
                     video.top10Rank > 0 && 
                     video.top10Rank <= 10;
            })
            .sort((a, b) => {
              const rankA = typeof a.top10Rank === 'number' ? a.top10Rank : 999;
              const rankB = typeof b.top10Rank === 'number' ? b.top10Rank : 999;
              return rankA - rankB;
            });
          setTop10Videos(top10);
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
    
    if (!title || !description || sectors.length === 0 || !youtubeId) {
      setFormStatus({
        type: 'error',
        message: 'Por favor, completa todos los campos requeridos y selecciona al menos una categoría.',
      });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      // Convertimos el array de sectores a una cadena separada por comas
      const categoryString = sectors.join(',');
      
      const videoData = {
        title,
        description,
        category: categoryString, // Usamos todas las categorías como una cadena separada por comas
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
      setSectors([]);
      setYoutubeId('');
      setYoutubeUrl('');
      setBlogArticleUrl('');
      setEditingVideo(null);
    } catch (error: any) {
      console.error('Error saving video:', error);
      // Mostrar mensaje de error más detallado si está disponible
      const errorMessage = error.message || 'Ha ocurrido un error al guardar el video. Por favor, inténtalo de nuevo.';
      setFormStatus({
        type: 'error',
        message: errorMessage,
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
    
    // Convertir la cadena de categorías separada por comas a un array
    if (video.category && typeof video.category === 'string') {
      setSectors(video.category.split(','));
    } else {
      setSectors([]);
    }
    
    setYoutubeId(video.youtubeId);
    setYoutubeUrl(`https://www.youtube.com/watch?v=${video.youtubeId}`);
    setBlogArticleUrl(video.blogArticleUrl || '');
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Manejar el reordenamiento de los videos del Top 10
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(top10Videos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    // Actualizar los rankings
    const updatedItems = items.map((video, index) => ({
      ...video,
      top10Rank: index + 1
    }));
    
    setTop10Videos(updatedItems);
    setHasTop10Changes(true);
  };
  
  // Guardar el orden del Top 10
  const saveTop10Order = async () => {
    setIsSavingTop10(true);
    try {
      console.log('Top 10 videos antes de guardar:', top10Videos);
      
      // Preparar los datos para enviar a la API
      const videosToUpdate = top10Videos.map((v, i) => {
        // Asegurarse de que estamos usando el ID correcto (MongoDB usa _id)
        const videoId = v.id || v._id;
        console.log(`Video ${i+1}: ID=${videoId}, Título=${v.title}`);
        return { id: videoId, rank: i + 1 };
      });
      
      console.log('Datos a enviar a la API:', videosToUpdate);
      
      // Llamada real a la API
      const response = await fetch('/api/videos/updateTop10', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videos: videosToUpdate }),
      });
      
      const result = await response.json();
      console.log('Respuesta de la API:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Error al actualizar el Top 10');
      }
      
      // Actualizar el estado local de todos los videos
      const updatedVideos = videos.map(video => {
        const top10Video = top10Videos.find(v => v.id === video.id);
        if (top10Video) {
          return { ...video, top10Rank: top10Video.top10Rank };
        }
        // Si el video no está en el top10Videos, asegurarse de que su top10Rank sea null
        return { ...video, top10Rank: null };
      });
      
      setVideos(updatedVideos);
      setHasTop10Changes(false);
      
      setFormStatus({
        type: 'success',
        message: `Orden del Top 10 guardado correctamente en la base de datos. ${result.updatedCount || 0} videos actualizados.`,
      });
      
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setFormStatus({ type: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error al guardar el orden del Top 10:', error);
      setFormStatus({
        type: 'error',
        message: 'Ha ocurrido un error al guardar el orden del Top 10 en la base de datos.',
      });
    } finally {
      setIsSavingTop10(false);
    }
  };
  
  // Añadir un video al Top 10
  const addToTop10 = (video: Video) => {
    console.log('Añadiendo video al Top 10:', video);
    
    // Verificar si ya hay 10 videos en el Top 10
    if (top10Videos.length >= 10) {
      setFormStatus({
        type: 'error',
        message: 'No se pueden añadir más de 10 videos al Top 10.',
      });
      return;
    }
    
    // Verificar si el video ya está en el Top 10
    const alreadyInTop10 = top10Videos.some(v => v.id === video.id);
    if (alreadyInTop10) {
      setFormStatus({
        type: 'error',
        message: 'Este video ya está en el Top 10.',
      });
      return;
    }
    
    // Añadir el video al final del Top 10
    const newRank = top10Videos.length + 1;
    const updatedVideo = { ...video, top10Rank: newRank };
    
    console.log('Video actualizado con rank:', updatedVideo);
    
    setTop10Videos([...top10Videos, updatedVideo]);
    setHasTop10Changes(true);
    
    // Actualizar el video en la lista completa
    const updatedVideos = videos.map(v => v.id === video.id ? updatedVideo : v);
    setVideos(updatedVideos);
    
    setFormStatus({
      type: 'success',
      message: `Video "${video.title}" añadido al Top 10 en la posición ${newRank}.`,
    });
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      setFormStatus({ type: null, message: '' });
    }, 3000);
  };
  
  // Quitar un video del Top 10
  const removeFromTop10 = (videoId: string) => {
    // Encontrar el video a quitar
    const videoToRemove = top10Videos.find(v => v.id === videoId);
    if (!videoToRemove) return;
    
    // Filtrar el video de la lista del Top 10
    const filteredVideos = top10Videos.filter(v => v.id !== videoId);
    
    // Reordenar los rankings
    const reorderedVideos = filteredVideos.map((video, index) => ({
      ...video,
      top10Rank: index + 1
    }));
    
    setTop10Videos(reorderedVideos);
    setHasTop10Changes(true);
    
    // Actualizar el video en la lista completa
    const updatedVideos = videos.map(v => {
      if (v.id === videoId) {
        return { ...v, top10Rank: null };
      }
      return v;
    });
    
    setVideos(updatedVideos);
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
            setSectors([]);
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sectores * (selecciona uno o más)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                    {sectores.map((s) => (
                      <div key={s} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`sector-${s}`}
                          checked={sectors.includes(s)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSectors([...sectors, s]);
                            } else {
                              setSectors(sectors.filter(sector => sector !== s));
                            }
                          }}
                          className="mr-2 h-4 w-4 accent-blue-500"
                        />
                        <label htmlFor={`sector-${s}`} className="text-sm text-gray-300">
                          {s}
                        </label>
                      </div>
                    ))}
                  </div>
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
                        setSectors([]);
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

      {/* Top 10 Management Section */}
      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Gestionar Top 10 de la Semana
                </h2>
                <button
                  onClick={saveTop10Order}
                  disabled={!hasTop10Changes || isSavingTop10}
                  className={`mt-4 md:mt-0 px-6 py-3 rounded-lg font-medium transition-all ${hasTop10Changes ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:opacity-90' : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'}`}
                >
                  {isSavingTop10 ? 'Guardando...' : 'Guardar Orden del Top 10'}
                </button>
              </div>
              
              {top10Videos.length > 0 ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="top10List">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {top10Videos.map((video, index) => (
                          <Draggable key={video.id} draggableId={video.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center p-4 rounded-lg ${snapshot.isDragging ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 shadow-lg' : 'bg-white/5'} transition-all`}
                              >
                                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mr-4 flex-shrink-0">
                                  <span className="text-xl font-bold text-white">{index + 1}</span>
                                </div>
                                <div className="flex-grow">
                                  <h3 className="text-white font-medium truncate">{video.title}</h3>
                                  <div className="flex items-center text-sm text-gray-400 mt-1">
                                    <span className="mr-2">ID: {video.youtubeId}</span>
                                    <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removeFromTop10(video.id)}
                                  className="ml-4 px-3 py-1 bg-red-600/30 text-red-400 rounded-md hover:bg-red-600/50 transition-colors flex-shrink-0"
                                >
                                  Quitar del Top 10
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400">No hay videos en el Top 10.</p>
                  <p className="text-gray-500 mt-2">Añade videos desde la lista inferior.</p>
                </div>
              )}
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
                          {/* Dividimos la categoría por comas y mostramos cada una */}
                          {video.category && video.category.split(',').map((cat: string, index: number) => (
                            <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full text-sm text-blue-400">
                              {cat}
                            </span>
                          ))}
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
                        {!top10Videos.some(v => v.id === video.id) && (
                          <button
                            onClick={() => addToTop10(video)}
                            disabled={top10Videos.length >= 10}
                            className={`px-4 py-2 font-medium rounded-lg transition-colors ${top10Videos.length >= 10 ? 'bg-gray-600/30 text-gray-400 cursor-not-allowed' : 'bg-green-600/30 text-green-400 hover:bg-green-600/50'}`}
                          >
                            Añadir al Top 10
                          </button>
                        )}
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
