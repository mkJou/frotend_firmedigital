import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: 'ID de artículo no válido' }, { status: 400 });
    }
    const post = await Blog.findById(params.id);
    if (!post) {
      return NextResponse.json({ success: false, error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener el artículo' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: 'ID de artículo no válido' }, { status: 400 });
    }
    const body = await request.json();
    const post = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return NextResponse.json({ success: false, error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al actualizar el artículo' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ success: false, error: 'ID de artículo no válido' }, { status: 400 });
    }
    const post = await Blog.findByIdAndDelete(params.id);
    if (!post) {
      return NextResponse.json({ success: false, error: 'Artículo no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al eliminar el artículo' }, { status: 500 });
  }
}