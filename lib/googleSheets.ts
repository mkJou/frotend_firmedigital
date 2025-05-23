import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

// Configuración para la autenticación con Google Sheets
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// ID de la hoja de cálculo donde se guardarán los datos
// Debes reemplazar esto con el ID de tu hoja de cálculo
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1O5xkDy4pDiC524B19pOvWbfENYK5ZS__aHHZMqm4mSw';

// Nombres de las hojas dentro del documento de Google Sheets
const SHEET_NAME = 'Contactos';
const FEDEINDUSTRIA_SHEET_NAME = 'Fedeindustria';

// Imprimir información de configuración al iniciar
console.log('Configuración de Google Sheets:');
console.log('- ID de la hoja de cálculo:', SPREADSHEET_ID);
console.log('- Nombre de la hoja de contactos:', SHEET_NAME);
console.log('- Nombre de la hoja de Fedeindustria:', FEDEINDUSTRIA_SHEET_NAME);

/**
 * Configura la autenticación con Google usando una cuenta de servicio
 * Utiliza variables de entorno en lugar de un archivo JSON
 */
async function getAuthClient() {
  try {
    // Verificar si existen las variables de entorno necesarias
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Variables de entorno para la autenticación de Google no encontradas');
    }
    
    // Crear objeto de credenciales a partir de variables de entorno
    const credentials = {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
    };
    
    // Crear cliente de autenticación
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
    
    console.log('Cliente de autenticación creado usando variables de entorno');
    return auth;
  } catch (error) {
    console.error('Error al configurar la autenticación con Google:', error);
    throw error;
  }
}

/**
 * Guarda los datos de contacto en Google Sheets
 */
export async function saveContactToGoogleSheet(contactData: { email: string; companyName: string; section?: string }) {
  try {
    console.log('Iniciando guardado en Google Sheets con datos:', contactData);
    
    // Obtener cliente autenticado
    const auth = await getAuthClient();
    console.log('Cliente de autenticación obtenido correctamente');
    
    // Crear cliente de Google Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Cliente de Google Sheets creado correctamente');
    
    // Verificar si existe la hoja "Contactos"
    console.log(`Verificando si existe la hoja "${SHEET_NAME}" en el documento con ID: ${SPREADSHEET_ID}`);
    
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      
      const sheetsInfo = spreadsheet.data.sheets || [];
      const contactsSheet = sheetsInfo.find(sheet => 
        sheet.properties?.title === SHEET_NAME
      );
      
      if (!contactsSheet) {
        console.log(`La hoja "${SHEET_NAME}" no existe. Intentando crearla...`);
        
        // Crear la hoja si no existe
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: SHEET_NAME,
                  },
                },
              },
            ],
          },
        });
        
        console.log(`Hoja "${SHEET_NAME}" creada correctamente`);
        
        // Añadir encabezados
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A1:D1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Fecha', 'Email', 'Nombre de Empresa', 'Sección']],
          },
        });
        
        console.log('Encabezados añadidos correctamente');
      } else {
        console.log(`Hoja "${SHEET_NAME}" encontrada con ID: ${contactsSheet.properties?.sheetId}`);
      }
    } catch (error) {
      console.error('Error al verificar/crear la hoja:', error);
      throw error;
    }
    
    // Preparar los datos para insertar
    const values = [
      [
        new Date().toISOString(), 
        contactData.email, 
        contactData.companyName,
        contactData.section || 'No especificado'
      ]
    ];
    
    console.log('Datos a insertar:', values);
    
    // Insertar datos en la hoja de cálculo
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });
    
    console.log('Datos guardados en Google Sheets:', response.data);
    console.log('URL de la hoja de cálculo:', `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${response.data.updates?.spreadsheetId}`);
    console.log('Rango actualizado:', response.data.updates?.updatedRange);
    
    // Intentar obtener los valores actuales para verificar
    try {
      const getResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: response.data.updates?.updatedRange || `${SHEET_NAME}!A:D`,
      });
      
      console.log('Valores actuales en la hoja:', getResponse.data.values);
    } catch (getError) {
      console.error('Error al obtener valores actuales:', getError);
    }
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al guardar datos en Google Sheets:', error);
    return { success: false, error };
  }
}

/**
 * Verifica la conexión con Google Sheets
 */
/**
 * Guarda los datos del formulario de Fedeindustria en Google Sheets
 */
export async function saveFedeindustriaToGoogleSheet(formData: { 
  nombre: string; 
  tipoPersona: string; 
  empresa: string; 
  email: string; 
  telefono: string 
}) {
  try {
    console.log('Iniciando guardado en Google Sheets para Fedeindustria con datos:', formData);
    
    // Obtener cliente autenticado
    const auth = await getAuthClient();
    console.log('Cliente de autenticación obtenido correctamente');
    
    // Crear cliente de Google Sheets
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Cliente de Google Sheets creado correctamente');
    
    // Verificar si existe la hoja "Fedeindustria"
    console.log(`Verificando si existe la hoja "${FEDEINDUSTRIA_SHEET_NAME}" en el documento con ID: ${SPREADSHEET_ID}`);
    
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      
      const sheetsInfo = spreadsheet.data.sheets || [];
      const fedeindustriaSheet = sheetsInfo.find(sheet => 
        sheet.properties?.title === FEDEINDUSTRIA_SHEET_NAME
      );
      
      if (!fedeindustriaSheet) {
        console.log(`La hoja "${FEDEINDUSTRIA_SHEET_NAME}" no existe. Intentando crearla...`);
        
        // Crear la hoja si no existe
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SPREADSHEET_ID,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: {
                    title: FEDEINDUSTRIA_SHEET_NAME,
                  },
                },
              },
            ],
          },
        });
        
        console.log(`Hoja "${FEDEINDUSTRIA_SHEET_NAME}" creada correctamente`);
        
        // Añadir encabezados
        await sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: `${FEDEINDUSTRIA_SHEET_NAME}!A1:F1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [['Fecha', 'Nombre', 'Tipo de Persona', 'Empresa', 'Email', 'Teléfono']],
          },
        });
        
        console.log(`Encabezados añadidos a la hoja "${FEDEINDUSTRIA_SHEET_NAME}"`);
      } else {
        console.log(`Hoja "${FEDEINDUSTRIA_SHEET_NAME}" encontrada con ID: ${fedeindustriaSheet.properties?.sheetId}`);
      }
    } catch (error) {
      console.error('Error al verificar/crear la hoja:', error);
      throw error;
    }
    
    // Preparar los datos para insertar
    const values = [
      [
        new Date().toISOString(), 
        formData.nombre,
        formData.tipoPersona,
        formData.empresa,
        formData.email,
        formData.telefono
      ]
    ];
    
    console.log('Datos a insertar:', values);
    console.log('Verificación de datos:');
    console.log('- Fecha:', new Date().toISOString());
    console.log('- Nombre:', formData.nombre);
    console.log('- Tipo de Persona:', formData.tipoPersona);
    console.log('- Empresa:', formData.empresa);
    console.log('- Email:', formData.email);
    console.log('- Teléfono:', formData.telefono);
    
    // Insertar datos en la hoja de cálculo
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${FEDEINDUSTRIA_SHEET_NAME}!A:F`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });
    
    console.log('Datos de Fedeindustria guardados en Google Sheets:', response.data);
    console.log('URL de la hoja de cálculo:', `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit#gid=${response.data.updates?.spreadsheetId}`);
    console.log('Rango actualizado:', response.data.updates?.updatedRange);
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al guardar datos de Fedeindustria en Google Sheets:', error);
    return { success: false, error };
  }
}

export async function testGoogleSheetsConnection() {
  try {
    console.log('Iniciando prueba de conexión con Google Sheets...');
    
    const auth = await getAuthClient();
    console.log('Cliente de autenticación obtenido correctamente');
    
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('Cliente de Google Sheets creado correctamente');
    
    // Intentar obtener información de la hoja de cálculo
    console.log(`Intentando obtener información de la hoja de cálculo con ID: ${SPREADSHEET_ID}`);
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    console.log('Información de la hoja de cálculo obtenida correctamente:', response.data.properties?.title);
    
    // Verificar si existe la hoja "Contactos"
    console.log('Verificando si existe la hoja "Contactos"...');
    const sheets_info = response.data.sheets || [];
    const contactsSheet = sheets_info.find(sheet => 
      sheet.properties?.title === SHEET_NAME
    );
    
    if (contactsSheet) {
      console.log(`Hoja "${SHEET_NAME}" encontrada con ID: ${contactsSheet.properties?.sheetId}`);
      
      // Intentar escribir datos de prueba
      console.log('Intentando escribir datos de prueba...');
      const testValues = [['Prueba de conexión', new Date().toISOString(), 'test@example.com', 'Test Company', 'Test Section']];
      
      const appendResponse = await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:E`,
        valueInputOption: 'RAW',
        requestBody: {
          values: testValues,
        },
      });
      
      console.log('Datos de prueba escritos correctamente:', appendResponse.data);
      
      return { 
        success: true, 
        data: response.data,
        sheetInfo: contactsSheet,
        testWrite: appendResponse.data
      };
    } else {
      console.error(`Hoja "${SHEET_NAME}" no encontrada. Hojas disponibles:`, 
        sheets_info.map(s => s.properties?.title).join(', '));
      
      return { 
        success: false, 
        error: `Hoja "${SHEET_NAME}" no encontrada`,
        availableSheets: sheets_info.map(s => s.properties?.title)
      };
    }
  } catch (error) {
    console.error('Error al verificar la conexión con Google Sheets:', error);
    return { success: false, error };
  }
}