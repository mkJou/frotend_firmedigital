import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request: Request, { params }: { params: { category: string } }) {
  try {
    await connectDB();
    const { category } = params;
    const decodedCategory = decodeURIComponent(category);
    
    // Buscar artículos por categoría
    const posts = await Blog.find({ 
      category: { $regex: new RegExp(decodedCategory, 'i') },
      isVisible: true
    }).sort({ date: -1 });
    
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener los artículos por categoría' }, { status: 500 });
  }
}