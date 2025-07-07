'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaSearch } from 'react-icons/fa';
import MegaMenu from '@/components/MegaMenu';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
}

interface GroupedPosts {
  [key: string]: BlogPost[];
}

export default function BlogArchive() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const groupPostsByMonth = (posts: BlogPost[]): GroupedPosts => {
    return posts.reduce((groups, post) => {
      const date = new Date(post.date);
      const monthYear = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(post);
      return groups;
    }, {} as GroupedPosts);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPosts = groupPostsByMonth(filteredPosts);

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
              Archivo del Blog
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explora nuestro archivo completo de artículos sobre firma digital
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="space-y-16">
            {Object.entries(groupedPosts).map(([monthYear, monthPosts]) => (
              <motion.div
                key={monthYear}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  <FaCalendar className="text-blue-400" />
                  {monthYear}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {monthPosts.map((post:any) => (
                    <Link href={`/blog/${post?._id}`} key={post?._id}>
                      <motion.article
                        className="group bg-gray-800/50 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl border border-gray-700/50 h-full"
                        whileHover={{ y: -5 }}
                      >
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-60"></div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <FaCalendar className="text-blue-400" />
                              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Por {post.author}</span>
                            <span className="text-blue-400 group-hover:translate-x-2 transition-transform duration-300">Leer más →</span>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {Object.keys(groupedPosts).length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No se encontraron artículos que coincidan con tu búsqueda.</p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}