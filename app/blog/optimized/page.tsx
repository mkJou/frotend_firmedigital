'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTag, FaComment, FaCalendar, FaStar } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Importación dinámica del MegaMenu optimizado
const MegaMenu = dynamic(
  () => import('@/components/optimized/MegaMenuOptimized').then(mod => mod.default),
  { ssr: false, loading: () => <div className="h-[120px]"></div> }
);

interface BlogPost {
  _id: string;
  id: string;
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

// Componente memoizado para la sección de héroe
const HeroSection = memo(() => (
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
));

HeroSection.displayName = 'HeroSection';

// Componente memoizado para los controles de búsqueda y filtrado
const SearchAndFilterControls = memo(({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
  categories
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: 'date' | 'title';
  setSortBy: (sort: 'date' | 'title') => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}) => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-col w-full md:w-auto space-y-4 md:space-y-0 md:flex-row gap-4 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="w-full md:w-auto px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          >
            <option value="date">Ordenar por fecha</option>
            <option value="title">Ordenar por título</option>
          </select>
          <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'} w-full md:w-auto`}
              >
                <FaTag className="text-sm" />
                {category === 'all' ? 'Todas' : category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
));

SearchAndFilterControls.displayName = 'SearchAndFilterControls';

// Componente memoizado para cada artículo
const BlogPostCard = memo(({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post?.id || post?._id}`} key={post?.id || post._id}>
    <motion.article
      className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="h-40 sm:h-48 overflow-hidden relative">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <FaCalendar className="text-blue-400" />
            {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1">
            <FaComment className="text-blue-400" />
            {post.comments?.length || 0}
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
));

BlogPostCard.displayName = 'BlogPostCard';

// Componente memoizado para la paginación
const Pagination = memo(({
  currentPage,
  totalPages,
  paginate
}: {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}) => (
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
));

Pagination.displayName = 'Pagination';

// Componente principal optimizado
export default function BlogOptimized() {
  // Estados
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

  // Constantes memoizadas
  const categories = useMemo(() => ['all', 'Tutoriales', 'Normativas', 'Casos de Éxito', 'Seguridad'], []);
  const postsPerPage = 6;

  // Función memoizada para cambiar de página
  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll suave hacia arriba cuando se cambia de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Efecto para cargar los posts
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
        const commentsByArticleId: Record<string, any[]> = {};
        if (commentsData.success && Array.isArray(commentsData.data)) {
          commentsData.data.forEach((comment: any) => {
            if (comment?.articleId) {
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

  // Filtrado y ordenación de posts memoizados
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (!post || !post.title) return false;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory && post.isVisible;
    });
  }, [posts, searchTerm, selectedCategory]);

  const sortedAndFilteredPosts = useMemo(() => {
    return [...filteredPosts]
      .filter(post => post !== null)
      .sort((a, b) => sortBy === 'date' ?
        new Date(b.date).getTime() - new Date(a.date).getTime() :
        a.title.localeCompare(b.title));
  }, [filteredPosts, sortBy]);

  // Cálculos de paginación memoizados
  const { currentPosts, totalPages, featuredPosts } = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = sortedAndFilteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(sortedAndFilteredPosts.length / postsPerPage);
    const featuredPosts = sortedAndFilteredPosts.filter(post => post.isFeatured).slice(0, 2);

    return { currentPosts, totalPages, featuredPosts };
  }, [sortedAndFilteredPosts, currentPage, postsPerPage]);

  // Renderizado condicional para el estado de carga
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <MegaMenu />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-24 w-24 md:h-32 md:w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />

      {/* Hero Section - Memoizado */}
      <HeroSection />

      {/* Search and Filter Section - Memoizado */}
      <SearchAndFilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Featured Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Artículos Destacados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id || post._id} post={post} />
            ))}
          </div>

          {/* Recent Posts Grid */}
          <h2 className="text-2xl font-bold mb-8">Artículos Recientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {currentPosts.map((post) => (
              <BlogPostCard key={post.id || post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination - Memoizado */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </main>
  );
}