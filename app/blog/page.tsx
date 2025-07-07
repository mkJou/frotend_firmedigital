'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTag, FaComment, FaCalendar, FaStar, FaChevronDown } from 'react-icons/fa';
import MegaMenu from '@/components/MegaMenu';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  isVisible: boolean;
  isFeatured: boolean;
  comments: Comment[];
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const categories = ['all','Legal', 'Ingenieria', 'salud', 'contadores', 'Gubernamentales','Tecnologia Financiera','Industria y comercio','Educativo','RRHH','Banca y Finanzas','Agropecuario','Eventos','firma electronica','analisis personalizable','validador de identidad','aplicaciones','kyc','flujo de trabajo','trazabilidad','carnet certificado','cuentas multiples', 'multifirma','gestor de documentos'];

  // Estado para controlar si el menú de categorías móvil está abierto
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPostsAndComments = async () => {
      try {
        // Obtener todos los artículos y comentarios en paralelo
        const [articlesResponse, commentsResponse] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/comments')
        ]);

        if (!articlesResponse.ok) {
          throw new Error('Error al obtener los artículos');
        }

        const articlesData = await articlesResponse.json();
        let commentsData = { success: false, data: [] };

        if (commentsResponse.ok) {
          commentsData = await commentsResponse.json();
        }

        // Organizar comentarios por ID de artículo para acceso rápido
        const commentsByArticleId: any = {};
        if (commentsData.success && Array.isArray(commentsData.data)) {
          commentsData.data.forEach((comment: any) => {
            if (comment.articleId) {
              if (!commentsByArticleId[comment.articleId]) {
                commentsByArticleId[comment.articleId] = [];
              }
              commentsByArticleId[comment.articleId].push(comment);
            }
          });
        }

        if (articlesData.success && Array.isArray(articlesData.data)) {
          const formattedPosts = articlesData.data
            .filter((post:any) => post._id && post.title)
            .map((post:any) => {
              // Obtener comentarios para este artículo del objeto mapeado
              const postComments = commentsByArticleId[post._id] || [];

              return {
                ...post,
                id: post._id.toString(),
                comments: postComments,
                excerpt: post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : ''),
                isVisible: typeof post.isVisible === 'boolean' ? post.isVisible : true,
                isFeatured: typeof post.isFeatured === 'boolean' ? post.isFeatured : false
              };
            });
          setPosts(formattedPosts);
        } else {
          console.error('Formato de datos inválido:', articlesData);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error:', error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostsAndComments();
  }, []);

  const handleAddComment = async (postId: number) => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          author: 'Usuario',
          postId: postId
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el comentario');
      }

      const newCommentData = await response.json();
      setPosts(posts.map((post:any) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newCommentData]
          };
        }
        return post;
      }));
      setNewComment('');
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error apropiadamente
    }
  };

  const filteredPosts = posts.filter(post => {
    if (!post || !post.title) return false;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory && post.isVisible;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const postsPerPage = 6;
  
  // Cerrar dropdowns cuando se hace clic fuera de ellos
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sortedAndFilteredPosts = filteredPosts
    .filter(post => post !== null)
    .sort((a, b) => sortBy === 'date' ?
      new Date(b.date).getTime() - new Date(a.date).getTime() :
      a.title.localeCompare(b.title));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedAndFilteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedAndFilteredPosts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100 overflow-x-hidden">
      <MegaMenu />

      {/* Hero Section */}
      <section className="relative py-10 sm:py-12 lg:py-20 overflow-hidden mt-[80px] sm:mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Blog de Firma Digital
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto px-2">
              Mantente actualizado con las últimas tendencias, normativas y mejores prácticas en el mundo de la firma digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Section */}

      {/* Search and Filter Section */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start w-full max-w-full">
            {/* Buscador - Adaptativo para todos los tamaños */}
            <div className="relative w-full col-span-1 sm:col-span-1 order-1">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 sm:py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm sm:text-base"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Contenedor para filtros (en tablet/desktop se muestran en fila) */}
            <div className="col-span-1 order-2 sm:flex gap-3 sm:gap-4 w-full">
              {/* Filtro de categorías - Custom dropdown */}
              <div className="relative w-full mb-3 sm:mb-0 sm:flex-1" ref={categoryDropdownRef}>
                <button
                  onClick={() => {
                    setCategoryDropdownOpen(!categoryDropdownOpen);
                    setSortDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm sm:text-base cursor-pointer flex justify-between items-center"
                >
                  <span className="truncate">{selectedCategory === 'all' ? 'Todas las categorías' : selectedCategory}</span>
                  <FaChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${categoryDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {categoryDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-700 text-sm sm:text-base ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-100'}`}
                      >
                        {category === 'all' ? 'Todas las categorías' : category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Ordenar por - Custom dropdown */}
              <div className="relative w-full sm:flex-1" ref={sortDropdownRef}>
                <button
                  onClick={() => {
                    setSortDropdownOpen(!sortDropdownOpen);
                    setCategoryDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 text-sm sm:text-base cursor-pointer flex justify-between items-center"
                >
                  <span>{sortBy === 'date' ? 'Ordenar por fecha' : 'Ordenar por título'}</span>
                  <FaChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${sortDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {sortDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-30">
                    <button
                      onClick={() => {
                        setSortBy('date');
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-700 text-sm sm:text-base ${sortBy === 'date' ? 'bg-blue-500 text-white' : 'text-gray-100'}`}
                    >
                      Ordenar por fecha
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('title');
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-700 text-sm sm:text-base ${sortBy === 'title' ? 'bg-blue-500 text-white' : 'text-gray-100'}`}
                    >
                      Ordenar por título
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 w-full">
            {filteredPosts.slice(0, 2).map((post:any) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                  </div>
                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-4 text-xs sm:text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-blue-400" />
                        {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Por {post.author}</span>
                      <span className="text-blue-400 text-sm group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          {/* Recent Posts Grid */}
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Artículos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 w-full">
            {currentPosts.map((post:any) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                  whileHover={{ y: -3 }}
                >
                  <div className="h-36 sm:h-40 md:h-44 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-blue-400" />
                        {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 line-clamp-1">Por {post.author}</span>
                      <span className="text-blue-400 text-xs sm:text-sm group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="relative w-full py-6 mb-8 sm:mb-12">
        <div className="max-w-full overflow-x-auto pb-2 no-scrollbar mx-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex flex-nowrap justify-center gap-1 sm:gap-2 px-4 min-w-max w-fit mx-auto max-w-[90vw]">
            {totalPages > 10 && currentPage > 4 && (
              <button
                onClick={() => paginate(1)}
                className="min-w-[36px] h-[36px] sm:min-w-[40px] sm:h-[40px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm sm:text-base"
              >
                1
              </button>
            )}
            
            {totalPages > 10 && currentPage > 4 && (
              <span className="flex items-center justify-center text-gray-400 px-1">...</span>
            )}
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(num => {
                if (totalPages <= 10) return true;
                if (num === 1 || num === totalPages) return false;
                return Math.abs(currentPage - num) < 3;
              })
              .map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`min-w-[36px] h-[36px] sm:min-w-[40px] sm:h-[40px] flex items-center justify-center rounded-lg transition-colors text-sm sm:text-base ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {number}
                </button>
              ))}
              
            {totalPages > 10 && currentPage < totalPages - 3 && (
              <span className="flex items-center justify-center text-gray-400 px-1">...</span>
            )}
            
            {totalPages > 10 && currentPage < totalPages - 3 && (
              <button
                onClick={() => paginate(totalPages)}
                className="min-w-[36px] h-[36px] sm:min-w-[40px] sm:h-[40px] flex items-center justify-center rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm sm:text-base"
              >
                {totalPages}
              </button>
            )}
          </div>
        </div>
        
        {/* CSS para ocultar la barra de desplazamiento pero mantener la funcionalidad */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </main>
  );
}
