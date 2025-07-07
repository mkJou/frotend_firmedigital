import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';
import mongoose from 'mongoose';

// Función para validar si un ID de MongoDB es válido
function isValidObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET - Obtener un video específico por ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de video inválido' },
        { status: 400 }
      );
    }
    
    await connectDB();
    const video = await Video.findById(id);
    
    if (!video) {
      return NextResponse.json(
        { success: false, error: 'Video no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener el video' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar un video existente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de video inválido' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    console.log('Datos recibidos en PUT /api/videos/' + id + ':', body);
    console.log('Tipo de category:', typeof body.category, 'Valor:', body.category);
    
    // Validar los campos requeridos
    if (!body.title || !body.description || !body.youtubeId) {
      console.log('Error: Campos requeridos faltantes');
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }
    
    // Validar que la categoría principal no esté vacía
    if (!body.category || body.category.trim() === '') {
      console.log('Error: categoría principal vacía');
      return NextResponse.json(
        { success: false, error: 'Debe seleccionar al menos una categoría' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    // Asegurarse de que blogArticleUrl esté incluido en el objeto
    const videoData = {
      title: body.title,
      description: body.description,
      category: body.category,
      youtubeId: body.youtubeId,
      blogArticleUrl: body.blogArticleUrl || null,
      isVisible: body.isVisible !== undefined ? body.isVisible : true,
      updatedAt: new Date()
    };
    
    console.log('Actualizando video con datos:', videoData);
    
    // Primero obtenemos el documento actual para ver su estructura
    const existingVideo = await Video.findById(id);
    if (!existingVideo) {
      return NextResponse.json(
        { success: false, error: 'Video no encontrado' },
        { status: 404 }
      );
    }
    
    console.log('Video existente:', existingVideo);
    
    // Actualizar directamente usando updateOne para evitar problemas de casting
    const updateResult = await Video.updateOne(
      { _id: id },
      { $set: videoData },
      { runValidators: false } // Desactivamos validadores para evitar problemas de tipo
    );
    
    console.log('Resultado de la actualización:', updateResult);
    
    // Obtener el video actualizado
    const updatedVideo = await Video.findById(id);
    
    if (!updatedVideo) {
      return NextResponse.json(
        { success: false, error: 'Video no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedVideo });
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
      error: 'Error al actualizar el video: ' + errorMessage 
    }, { status: 500 });
  }
}

// DELETE - Eliminar un video
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: 'ID de video inválido' },
        { status: 400 }
      );
    }
    
    await connectDB();
    const deletedVideo = await Video.findByIdAndDelete(id);
    
    if (!deletedVideo) {
      return NextResponse.json(
        { success: false, error: 'Video no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Video eliminado correctamente' }
    );
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { success: false, error: 'Error al eliminar el video' },
      { status: 500 }
    );
  }
}
