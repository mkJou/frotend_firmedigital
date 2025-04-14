import { NextResponse } from 'next/server';
import { testGoogleSheetsConnection, saveContactToGoogleSheet } from '@/lib/googleSheets';

export async function GET() {
  try {
    // Probar la conexión con Google Sheets
    console.log('Probando conexión con Google Sheets...');
    const connectionTest = await testGoogleSheetsConnection();
    
    if (connectionTest.success) {
      console.log('Conexión exitosa con Google Sheets');
      
      // Intentar guardar datos de prueba
      console.log('Intentando guardar datos de prueba...');
      const testData = {
        email: 'prueba@ejemplo.com',
        companyName: 'Empresa de Prueba',
        section: 'Test API'
      };
      
      const saveResult = await saveContactToGoogleSheet(testData);
      
      if (saveResult.success) {
        console.log('Datos de prueba guardados correctamente');
        return NextResponse.json({
          success: true,
          message: 'Conexión exitosa y datos guardados correctamente',
          connectionTest,
          saveResult
        });
      } else {
        console.error('Error al guardar datos de prueba:', saveResult.error);
        return NextResponse.json({
          success: false,
          message: 'Conexión exitosa pero error al guardar datos',
          connectionTest,
          saveError: saveResult.error
        }, { status: 500 });
      }
    } else {
      console.error('Error en la conexión con Google Sheets:', connectionTest.error);
      return NextResponse.json({
        success: false,
        message: 'Error en la conexión con Google Sheets',
        error: connectionTest.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error al probar la conexión con Google Sheets:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al probar la conexión con Google Sheets',
      error
    }, { status: 500 });
  }
}
