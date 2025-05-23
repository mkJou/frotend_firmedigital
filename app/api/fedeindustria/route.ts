import { NextResponse } from 'next/server';
import { saveFedeindustriaToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { nombre, tipoPersona, empresa, email, telefono } = data;
    
    // Validación básica
    if (!nombre || !email || !telefono || !tipoPersona) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Guardar los datos en Google Sheets
    const sheetsResult = await saveFedeindustriaToGoogleSheet({ 
      nombre, 
      tipoPersona, 
      empresa: empresa || 'N/A', 
      email, 
      telefono 
    });
    
    // Registrar los datos recibidos
    console.log('Datos de Fedeindustria recibidos:');
    console.log('- Nombre:', nombre);
    console.log('- Tipo de Persona:', tipoPersona);
    console.log('- Empresa:', empresa || 'N/A');
    console.log('- Email:', email);
    console.log('- Teléfono:', telefono);
    
    // Si hay un error al guardar en Google Sheets, lo registramos pero no fallamos la petición
    if (!sheetsResult.success) {
      console.error('Error al guardar en Google Sheets:', sheetsResult.error);
    }
    
    return NextResponse.json(
      { success: true, message: 'Información recibida correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json(
      { success: false, message: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
