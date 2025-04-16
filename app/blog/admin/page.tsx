'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MegaMenu from '@/components/MegaMenu';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaStar, FaImage } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

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
}

export default function BlogAdmin() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
    imageUrl: '',
    isVisible: true,
    isFeatured: false
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const categories = ['Normativas','Legal', 'Ingenieria', 'salud', 'contadores', 'Gubernamentales','Tecnologia Financiera','Industria y comercio','Educativo','RRHH','Banca y Finanzas','Agropecuario','Eventos','firma electronica','analisis personalizable','validador de identidad','aplicaciones','kyc'];

  const validateForm = (post: Partial<BlogPost>) => {
    const errors: {[key: string]: string} = {};
    if (!post.title?.trim()) errors.title = 'El título es requerido';
    if (!post.excerpt?.trim()) errors.excerpt = 'El resumen es requerido';
    if (!post.content?.trim()) errors.content = 'El contenido es requerido';
    if (!post.category?.trim()) errors.category = 'La categoría es requerida';
    if (!post.author?.trim()) errors.author = 'El autor es requerido';
    if (!post.imageUrl?.trim()) errors.imageUrl = 'La imagen es requerida';
    return errors;
  };

  const handleCreatePost = async () => {
    const errors = validateForm(newPost);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el artículo');
      }

      setPosts([data.data, ...posts]);
      setShowCreateModal(false);
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        imageUrl: '',
        isVisible: true,
        isFeatured: false
      });
      setFormErrors({});
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al crear el artículo');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost?._id) return;

    const errors = validateForm(editingPost);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Actualizar el estado local inmediatamente para mejor UX
      const updatedPosts = posts.map(post =>
        post._id === editingPost._id ? { ...post, ...editingPost } : post
      );
      setPosts(updatedPosts);

      const response = await fetch(`/api/articles/${editingPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPost),
      });

      const data = await response.json();

      if (!response.ok) {
        // Revertir cambios si hay error
        setPosts(posts);
        throw new Error(data.error || 'Error al actualizar el artículo');
      }

      // Confirmar actualización con datos del servidor
      setPosts(posts.map((post:any) =>
        post._id === editingPost._id ? { ...data.data, comments: post?.comments } : post
      ));
      setShowEditModal(false);
      setEditingPost(null);
      setFormErrors({});
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al actualizar el artículo');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      alert('ID de artículo no válido');
      return;
    }

    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      try {
        const response = await fetch(`/api/articles/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al eliminar el artículo');
        }

        setPosts(posts.filter(post => post._id !== id));
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error('Error:', error);
        alert(error instanceof Error ? error.message : 'Error al eliminar el artículo');
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const post = posts.find(p => p._id === id);
    if (!post) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, isVisible: !post.isVisible }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar la visibilidad');
      }

      setPosts(posts.map(p =>
        p._id === id ? { ...p, isVisible: !p.isVisible } : p
      ));
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al actualizar la visibilidad');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const post = posts.find(p => p._id === id);
    if (!post) return;

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, isFeatured: !post.isFeatured }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al actualizar el estado destacado');
      }

      setPosts(posts.map(p =>
        p._id === id ? { ...p, isFeatured: !p.isFeatured } : p
      ));
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Error al actualizar el estado destacado');
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Error al obtener los artículos');
        }
        
        setPosts(data.data);
      } catch (error) {
        console.error('Error:', error);
        alert(error instanceof Error ? error.message : 'Error al obtener los artículos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
              Panel de Administración del Blog
            </h1>
          </motion.div>

          <div className="mt-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <FaPlus />
              Crear Nuevo Artículo
            </button>
          </div>

          <div className="mt-8 grid gap-6">
            {posts.map(post => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeatured(post._id)}
                      className={`p-2 rounded-lg ${post.isFeatured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-600/20 text-gray-400'} hover:bg-yellow-500/30 transition-colors`}
                      title="Marcar como destacado"
                    >
                      <FaStar />
                    </button>
                    <button
                      onClick={() => setEditingPost(post)}
                      className="p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleToggleVisibility(post._id)}
                      className={`p-2 rounded-lg ${post.isVisible ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/20 text-gray-400'} hover:bg-opacity-30 transition-colors`}
                      title={post.isVisible ? 'Ocultar artículo' : 'Mostrar artículo'}
                    >
                      {post.isVisible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-gray-400">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.category}</span>
                  <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
                  <span>Por {post.author}</span>
                  {post.isFeatured && (
                    <span className="flex items-center gap-1 text-yellow-400">
                      <FaStar className="w-4 h-4" />
                      Destacado
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-out">
          Operación realizada con éxito
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Crear Nuevo Artículo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.title && <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resumen</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
                {formErrors.excerpt && <p className="text-red-400 text-sm mt-1">{formErrors.excerpt}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contenido</label>
                <MDEditor
                  value={newPost.content}
                  onChange={(value) => setNewPost({ ...newPost, content: value || '' })}
                  preview="edit"
                />
                {formErrors.content && <p className="text-red-400 text-sm mt-1">{formErrors.content}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {formErrors.category && <p className="text-red-400 text-sm mt-1">{formErrors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Autor</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.author && <p className="text-red-400 text-sm mt-1">{formErrors.author}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL de la imagen</label>
                <input
                  type="text"
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formErrors.imageUrl && <p className="text-red-400 text-sm mt-1">{formErrors.imageUrl}</p>}
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPost.isVisible}
                    onChange={(e) => setNewPost({ ...newPost, isVisible: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Visible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPost.isFeatured}
                    onChange={(e) => setNewPost({ ...newPost, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Destacado</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePost}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Crear Artículo
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {editingPost && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-6">Editar Artículo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Resumen</label>
                <textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contenido</label>
                <MDEditor
                  value={editingPost.content}
                  onChange={(value) => setEditingPost({ ...editingPost, content: value || '' })}
                  preview="edit"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  value={editingPost.category}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Autor</label>
                <input
                  type="text"
                  value={editingPost.author}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL de la imagen</label>
                <input
                  type="text"
                  value={editingPost.imageUrl}
                  onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setEditingPost(null)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdatePost}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Guardar Cambios
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}