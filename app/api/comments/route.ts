import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Blog from '@/models/Blog';

const COMMENTS_PER_IP_LIMIT = 5;
const COMMENT_COOLDOWN_MS = 30000; // 30 segundos

interface CommentCache {
  count: number;
  lastCommentTime: number;
}

const ipCommentCache = new Map<string, CommentCache>();

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Verificar límites de comentarios por IP
    const now = Date.now();
    const ipCache = ipCommentCache.get(ip) || { count: 0, lastCommentTime: 0 };
    
    if (ipCache.count >= COMMENTS_PER_IP_LIMIT) {
      return NextResponse.json(
        { success: false, error: 'Has alcanzado el límite de comentarios permitidos.' },
        { status: 429 }
      );
    }
    
    if (now - ipCache.lastCommentTime < COMMENT_COOLDOWN_MS) {
      return NextResponse.json(
        { success: false, error: 'Por favor, espera un momento antes de comentar nuevamente.' },
        { status: 429 }
      );
    }

    // Validar que el artículo existe
    if (!mongoose.Types.ObjectId.isValid(body.articleId)) {
      return NextResponse.json(
        { success: false, error: 'ID de artículo no válido' },
        { status: 400 }
      );
    }

    const article = await Blog.findById(body.articleId);
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Artículo no encontrado' },
        { status: 404 }
      );
    }

    // Validar contenido del comentario
    const bannedWords = ['spam', 'publicidad', 'casino', 'xxx', 'viagra'];
    const contentLower = body.content.toLowerCase();
    if (bannedWords.some(word => contentLower.includes(word))) {
      return NextResponse.json(
        { success: false, error: 'El comentario contiene contenido inapropiado.' },
        { status: 400 }
      );
    }

    // Crear el comentario
    const comment = await Comment.create({
      content: body.content,
      author: body.name,
      email: body.email,
      articleId: body.articleId,
      date: new Date(),
      ip: ip,
      isModerated: false
    });

    // Actualizar cache de IP
    ipCommentCache.set(ip, {
      count: ipCache.count + 1,
      lastCommentTime: now
    });

    // Formatear la respuesta para el cliente
    const formattedComment = {
      id: comment._id.toString(),
      name: comment.author,
      content: comment.content,
      date: comment.date,
      articleId: comment.articleId.toString()
    };

    return NextResponse.json({ success: true, data: formattedComment });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear el comentario. Por favor, intenta nuevamente.' },
      { status: 500 }
    );
  }
}