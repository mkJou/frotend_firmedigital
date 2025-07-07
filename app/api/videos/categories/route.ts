import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

// GET - Obtener todas las categorías únicas de videos
export async function GET() {
  try {
    await connectDB();
    
    // Obtener todas las categorías únicas de los videos
    const categories = await Video.distinct('category');
    
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener las categorías' },
      { status: 500 }
    );
  }
}
