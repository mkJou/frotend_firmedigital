'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTag, FaComment, FaCalendar, FaStar } from 'react-icons/fa';
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

  const categories = ['all', 'Legal', 'Ingenieria', 'salud', 'contadores', 'Gubernamentales', 'Tecnologia Financiera', 'Industria y comercio', 'Educativo', 'RRHH', 'Banca y Finanzas', 'Agropecuario', 'Eventos'];

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
      (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory && post.isVisible;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const postsPerPage = 6;

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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />

      {/* Hero Section */}
      <section className="relative py-12 lg:py-20 overflow-hidden mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              Blog de Firma Digital
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Mantente actualizado con las últimas tendencias, normativas y mejores prácticas en el mundo de la firma digital
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Section */}

      {/* Search and Filter Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {/* Buscador - Ocupa todo el ancho en móvil, 2 columnas en tablet, 1 columna en desktop */}
            <div className="relative w-full md:col-span-2 lg:col-span-1">
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Ordenar por - Ocupa la mitad del ancho en tablet y desktop */}
            <div className="w-full">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              >
                <option value="date">Ordenar por fecha</option>
                <option value="title">Ordenar por título</option>
              </select>
            </div>

            {/* Categorías en móvil - Menú desplegable */}
            <div className="md:hidden w-full relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
              >
                <span>{selectedCategory === 'all' ? 'Todas las categorías' : selectedCategory}</span>
                <svg className={`w-5 h-5 transition-transform ${isCategoryMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-100'}`}
                    >
                      {category === 'all' ? 'Todas las categorías' : category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Categorías en tablet y desktop - Botones horizontales */}
          <div className="hidden md:flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
              >
                {category === 'all' ? 'Todas las categorías' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredPosts.slice(0, 2).map((post:any) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 sm:h-64 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-blue-400" />
                        {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>

                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">Por {post.author}</span>
                      <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          {/* Recent Posts Grid */}
          <h2 className="text-2xl font-bold mb-8">Artículos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {currentPosts.map((post:any) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <motion.article
                  className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-40 sm:h-48 overflow-hidden relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="text-blue-400" />
                        {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>

                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-500">Por {post.author}</span>
                      <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-lg transition-colors ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </main>
  );
}
