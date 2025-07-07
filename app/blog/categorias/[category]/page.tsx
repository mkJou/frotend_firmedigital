'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaSearch, FaTag, FaComment, FaCalendar, FaStar } from 'react-icons/fa';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
  comments: Comment[];
  featured?: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga de datos por categoría
    const mockPosts: BlogPost[] = [
      {
        id: 1,
        title: 'Guía Completa de Firma Digital: Todo lo que Necesitas Saber',
        excerpt: 'Descubre los fundamentos de la firma digital, sus beneficios y cómo implementarla en tu negocio.',
        content: 'La firma digital es una tecnología que permite autenticar documentos electrónicos de manera segura...',
        category: 'Tutoriales',
        date: '2024-03-15',
        imageUrl: '/images/workflow.svg',
        author: 'María González',
        featured: true,
        comments: [
          {
            id: 1,
            author: 'Juan Pérez',
            content: 'Excelente artículo, muy informativo.',
            date: '2024-03-16'
          }
        ]
      },
      {
        id: 2,
        title: 'Normativa 2024: Cambios en la Legislación de Firma Digital',
        excerpt: 'Actualización sobre las nuevas regulaciones y su impacto en el uso de firmas digitales.',
        content: 'Este año trae importantes cambios en la normativa que regula las firmas digitales...',
        category: 'Normativas',
        date: '2024-03-14',
        imageUrl: '/images/gestiondocumental.svg',
        author: 'Carlos Ruiz',
        featured: true,
        comments: []
      },
      // Más posts simulados...
    ].filter(post => post.category.toLowerCase() === decodeURIComponent(category as string).toLowerCase());

    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 500);
  }, [category]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <MegaMenu />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </main>
    );
  }

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      
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
              Categoría: {decodeURIComponent(category as string)}
            </h1>
          </motion.div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              Artículos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl h-full"
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-blue-400" />
                          {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-400" />
                          {post.comments.length}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                      <p className="text-gray-400 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por {post.author}</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-400">No hay artículos en esta categoría</h2>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl h-full"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-blue-400" />
                          {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaComment className="text-blue-400" />
                          {post.comments.length}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                      <p className="text-gray-400 mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Por {post.author}</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}