import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Video from '@/models/Video';

export async function PUT(request: Request) {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log('Conexión a la base de datos establecida');
    
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    const { videos } = body;
    
    console.log('Datos recibidos para actualizar Top 10:', videos);
    
    if (!videos || !Array.isArray(videos)) {
      console.error('Datos inválidos recibidos:', body);
      return NextResponse.json({ success: false, error: 'Datos inválidos' }, { status: 400 });
    }
    
    // Primero, reiniciar todos los rankings de Top 10
    const resetResult = await Video.updateMany({}, { $set: { top10Rank: null } });
    console.log('Reset de rankings completado:', resetResult);
    
    // Luego, actualizar cada video con su nuevo ranking
    const updatePromises = videos.map(async (item: { id: string, rank: number }) => {
      console.log(`Actualizando video ${item.id} con rank ${item.rank}`);
      const updated = await Video.findByIdAndUpdate(
        item.id,
        { $set: { top10Rank: item.rank } },
        { new: true }
      );
      
      if (!updated) {
        console.error(`No se encontró el video con ID ${item.id}`);
        return null;
      }
      
      console.log(`Video ${item.id} actualizado con rank ${item.rank}:`, updated);
      return updated;
    });
    
    const results = await Promise.all(updatePromises);
    const successfulUpdates = results.filter(result => result !== null);
    
    console.log(`${successfulUpdates.length} de ${videos.length} videos actualizados correctamente`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Top 10 actualizado correctamente',
      updatedCount: successfulUpdates.length
    });
  } catch (error) {
    console.error('Error al actualizar el Top 10:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar el Top 10: ' + (error instanceof Error ? error.message : 'Error desconocido') },
      { status: 500 }
    );
  }
}
