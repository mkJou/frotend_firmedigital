import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener los artículos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Asegurarse de que el excerpt esté presente
    if (!body.excerpt && body.content) {
      body.excerpt = body.content.substring(0, 150) + '...';
    }
    
    const newPost = await Blog.create(body);
    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al crear el artículo' }, { status: 500 });
  }
}