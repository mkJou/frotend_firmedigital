'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaClock } from '../icons/comment-icons';

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

// Componente memoizado para cada comentario individual
const CommentItem = memo(({ comment }: { comment: Comment }) => {
  return (
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
  );
});

CommentItem.displayName = 'CommentItem';

// Componente memoizado para el formulario de comentarios
const CommentForm = memo(({ 
  newComment, 
  setNewComment, 
  handleSubmit, 
  isSubmitting, 
  error, 
  success, 
  isVerified,
  userCode,
  setUserCode,
  verificationCode,
  regenerateCode
}: { 
  newComment: { name: string; email: string; content: string };
  setNewComment: React.Dispatch<React.SetStateAction<{ name: string; email: string; content: string }>>;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  error: string;
  success: string;
  isVerified: boolean;
  userCode: string;
  setUserCode: React.Dispatch<React.SetStateAction<string>>;
  verificationCode: string;
  regenerateCode: () => void;
}) => {
  return (
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
            required
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
            required
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
          maxLength={500}
          required
        />
      </div>

      <div>
        <div className="mt-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div 
                className="bg-gray-700 p-4 rounded-lg select-none cursor-default"
                style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.25em',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  msUserSelect: 'none',
                  background: 'linear-gradient(45deg, #1a1a1a, #2d2d2d)',
                  border: '1px solid #3a3a3a',
                  color: '#fff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontWeight: 'bold'
                }}
              >
                {verificationCode}
              </div>
              <button
                type="button"
                onClick={regenerateCode}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ml-4"
              >
                Regenerar
              </button>
            </div>
            <input
              type="text"
              placeholder="Ingrese el código de verificación"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              maxLength={6}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-400 text-sm">{success}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !isVerified}
        className={`w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors ${(isSubmitting || !isVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Enviando...' : 'Publicar comentario'}
      </button>
    </form>
  );
});

CommentForm.displayName = 'CommentForm';

// Componente principal optimizado
function CommentSectionOptimized({ articleId, initialComments = [] }: CommentSectionProps) {
  // Estados memoizados para evitar recreaciones innecesarias
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSpamming, setIsSpamming] = useState(false);
  const [lastCommentTime, setLastCommentTime] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');

  // Efecto para verificar el código
  useEffect(() => {
    setIsVerified(userCode === verificationCode && userCode !== '');
  }, [userCode, verificationCode]);

  // Efecto para generar el código de verificación inicial
  useEffect(() => {
    generateVerificationCode();
  }, []);

  // Efecto para cargar comentarios - memoizado para evitar recreaciones
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

  // Funciones memoizadas para evitar recreaciones en cada renderizado
  const validateEmail = useCallback((email: string) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  }, []);

  const validateContent = useCallback((content: string) => {
    // Lista de palabras prohibidas
    const bannedWords = ['spam', 'publicidad', 'casino', 'xxx', 'viagra'];
    const contentLower = content.toLowerCase();
    return !bannedWords.some(word => contentLower.includes(word));
  }, []);

  const checkSpamming = useCallback(() => {
    const now = Date.now();
    const timeSinceLastComment = now - lastCommentTime;
    const isSpamming = timeSinceLastComment < 30000; // 30 segundos entre comentarios
    const tooManyComments = commentCount >= 5; // Máximo 5 comentarios por sesión

    return isSpamming || tooManyComments;
  }, [lastCommentTime, commentCount]);

  const validateVerificationCode = useCallback(() => {
    return userCode === verificationCode;
  }, [userCode, verificationCode]);

  const generateVerificationCode = useCallback(() => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(randomCode);
    setUserCode('');
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateVerificationCode()) {
      setError('El código de verificación no es correcto.');
      return;
    }

    // Validaciones básicas
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!validateEmail(newComment.email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (newComment.content.length < 10 || newComment.content.length > 500) {
      setError('El comentario debe tener entre 10 y 500 caracteres.');
      return;
    }

    if (!validateContent(newComment.content)) {
      setError('El comentario contiene contenido inapropiado.');
      return;
    }

    if (checkSpamming()) {
      setError('Por favor, espera un momento antes de publicar otro comentario.');
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
      setComments(prev => [...prev, data]);
      setNewComment({ name: '', email: '', content: '' });
      setSuccess('¡Comentario publicado exitosamente!');
      setIsVerified(false);
      setLastCommentTime(Date.now());
      setCommentCount(prev => prev + 1);
    } catch (error) {
      setError('Error al publicar el comentario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, articleId, validateVerificationCode, validateEmail, validateContent, checkSpamming]);

  // Memoización de la lista de comentarios para evitar re-renderizados innecesarios
  const commentsList = useMemo(() => {
    return (
      <div className="space-y-6 mb-8">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    );
  }, [comments]);

  return (
    <div className="mt-12 bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Comentarios</h2>

      {/* Lista de comentarios memoizada */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : commentsList}

      {/* Formulario de comentarios memoizado */}
      <CommentForm 
        newComment={newComment}
        setNewComment={setNewComment}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
        success={success}
        isVerified={isVerified}
        userCode={userCode}
        setUserCode={setUserCode}
        verificationCode={verificationCode}
        regenerateCode={generateVerificationCode}
      />
    </div>
  );
}

export default memo(CommentSectionOptimized);