'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaClock } from 'react-icons/fa';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
  articleId: string;
}

interface CommentSectionProps {
  articleId: string;
  initialComments?: Comment[];
}

export default function CommentSection({ articleId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${articleId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los comentarios');
        }
        const data = await response.json();
        if (data.success && data.data) {
          const formattedComments = data.data.map((comment: any) => ({
            id: comment._id.toString(),
            name: comment.author,
            email: comment.email,
            content: comment.content,
            date: comment.date,
            articleId: comment.articleId.toString()
          }));
          setComments(formattedComments);
        }
      } catch (error) {
        console.error('Error al cargar los comentarios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [articleId]);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(newComment.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (newComment.content.length < 10) {
      setError('El comentario debe tener al menos 10 caracteres.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newComment,
          articleId
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }

      const { data } = await response.json();
      setComments([...comments, data]);
      setNewComment({ name: '', email: '', content: '' });
      setSuccess('¡Comentario publicado exitosamente!');
    } catch (error) {
      setError('Error al publicar el comentario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Comentarios</h2>

      {/* Lista de comentarios */}
      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-700 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2 text-gray-300">
              <FaUser className="text-blue-400" />
              <span>{comment.name}</span>
              <span className="text-gray-500">•</span>
              <FaClock className="text-blue-400" />
              <span className="text-sm">
                {new Date(comment.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-200">{comment.content}</p>
          </motion.div>
        ))}

        {comments.length === 0 && (
          <p className="text-gray-400 text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
      </div>

      {/* Formulario de comentarios */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              id="name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Tu nombre"
              maxLength={50}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              value={newComment.email}
              onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="tu@email.com"
              maxLength={100}
            />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">
            Comentario *
          </label>
          <textarea
            id="comment"
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white min-h-[100px]"
            placeholder="Escribe tu comentario aquí..."
            maxLength={1000}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}

        {success && (
          <div className="text-green-400 text-sm">{success}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Enviando...' : 'Publicar comentario'}
        </button>
      </form>
    </div>
  );
}