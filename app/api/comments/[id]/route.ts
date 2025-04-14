import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'ID de artículo no válido' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ articleId: params.id }).sort({ date: -1 });
    return NextResponse.json({ success: true, data: comments });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener los comentarios' },
      { status: 500 }
    );
  }
}