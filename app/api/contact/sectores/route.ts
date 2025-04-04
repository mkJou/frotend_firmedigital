import { NextResponse } from 'next/server';
import { saveContactToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, companyName, section } = data;
    
    // Validación básica
    if (!email || !companyName) {
      return NextResponse.json(
        { success: false, message: 'Email y nombre de empresa son requeridos' },
        { status: 400 }
      );
    }

    // Guardar los datos en Google Sheets
    const sheetsResult = await saveContactToGoogleSheet({ email, companyName, section });
    
    // Registrar los datos recibidos
    console.log('Datos de contacto de sector recibidos:', { email, companyName, section });
    
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
