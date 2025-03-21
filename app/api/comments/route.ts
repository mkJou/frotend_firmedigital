import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';
import Blog from '@/models/Blog';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

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

    // Crear el comentario
    const comment = await Comment.create({
      content: body.content,
      author: body.name,
      email: body.email,
      articleId: body.articleId,
      date: new Date()
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