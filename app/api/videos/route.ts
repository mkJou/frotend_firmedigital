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
    
    console.log('Datos recibidos en POST /api/videos:', body);
    console.log('Tipo de category:', typeof body.category, 'Valor:', body.category);
    
    // Validar los campos requeridos
    if (!body.title || !body.description || !body.youtubeId) {
      console.log('Error: Campos requeridos faltantes');
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Validar que category sea un array y tenga al menos un elemento
    if (!Array.isArray(body.category)) {
      console.log('Error: category no es un array:', body.category);
      return NextResponse.json(
        { success: false, error: 'La categoría debe ser un array' },
        { status: 400 }
      );
    }
    
    if (body.category.length === 0) {
      console.log('Error: category es un array vacío');
      return NextResponse.json(
        { success: false, error: 'Debe seleccionar al menos una categoría' },
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
    
    try {
      // Usar create con validación desactivada para evitar problemas de tipo
      const newVideo = new Video(videoData);
      await newVideo.save({ validateBeforeSave: false });
      console.log('Video creado:', newVideo);
      
      // Si llegamos aquí, la creación fue exitosa
      return NextResponse.json({ success: true, data: newVideo }, { status: 201 });
    } catch (createError: any) {
      console.error('Error específico al crear video:', createError);
      return NextResponse.json({ 
        success: false, 
        error: 'Error al crear el video: ' + createError.message 
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Database error:', error);
    // Mostrar el mensaje de error específico para depuración
    const errorMessage = error.message || 'Error desconocido';
    console.error('Mensaje de error específico:', errorMessage);
    
    if (error.name === 'ValidationError') {
      console.error('Error de validación de Mongoose:', error.errors);
      return NextResponse.json({ 
        success: false, 
        error: 'Error de validación: ' + errorMessage,
        validationErrors: error.errors 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Error al crear el video: ' + errorMessage 
    }, { status: 500 });
  }
}
