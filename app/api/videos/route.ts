import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find({ isVisible: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al obtener los videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validar los campos requeridos
    if (!body.title || !body.description || !body.category || !body.youtubeId) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Asegurarse de que blogArticleUrl esté incluido en el objeto
    const videoData = {
      title: body.title,
      description: body.description,
      category: body.category,
      youtubeId: body.youtubeId,
      blogArticleUrl: body.blogArticleUrl || null,
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      isFeatured: body.isFeatured !== undefined ? body.isFeatured : false,
      tags: body.tags || []
    };
    
    console.log('Creando video con datos:', videoData);
    
    const newVideo = await Video.create(videoData);
    console.log('Video creado:', newVideo);
    
    return NextResponse.json({ success: true, data: newVideo }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ success: false, error: 'Error al crear el video' }, { status: 500 });
  }
}
