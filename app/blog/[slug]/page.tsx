'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaCalendar, FaUser, FaTag, FaShare, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import CommentSection from '@/components/CommentSection';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/articles/${slug}`);
        if (!response.ok) {
          throw new Error('Error al obtener el artículo');
        }
        const data = await response.json();
        if (data.success && data.data) {
          setPost({
            ...data.data,
            id: data.data._id
          });
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error:', error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

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

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
        <MegaMenu />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-red-500 text-center">Artículo no encontrado</h1>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaArrowLeft />
            Volver al Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-100">
      <MegaMenu />
      
      <article className="relative pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 md:mb-8 group">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Volver al Blog
          </Link>

          {post.imageUrl && (
            <div className="relative w-full h-[250px] md:h-[400px] mb-6 md:mb-8 rounded-xl overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FaCalendar className="text-blue-400" />
              {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <FaUser className="text-blue-400" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <FaTag className="text-blue-400" />
              {post.category}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('URL copiada al portapapeles');
              }}
              className="flex items-center gap-1 hover:text-blue-400 transition-colors ml-auto"
            >
              <FaShare className="text-blue-400" />
              Compartir
            </button>
          </div>

          <div className="prose !prose-invert prose-base md:prose-lg max-w-none mb-12 md:mb-16 text-black bg-white rounded-lg p-4 md:p-8 prose-headings:text-black prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-p:text-black prose-a:text-black-600 hover:prose-a:text-black-700 prose-blockquote:border-black-600 prose-strong:text-black prose-ul:text-black prose-ol:text-black prose-li:text-black prose-pre:bg-black-100 prose-pre:border prose-pre:border-black-300 prose-code:text-blue-600 space-y-4 md:space-y-6">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <CommentSection articleId={post.id} />
        </motion.div>
      </article>
    </main>
  );
}