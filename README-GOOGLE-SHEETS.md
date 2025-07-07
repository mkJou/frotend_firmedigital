# Integración con Google Sheets para Formularios de Contacto

Este documento explica cómo configurar y utilizar la integración con Google Sheets para almacenar los datos de los formularios de contacto.

## Requisitos Previos

1. Una cuenta de Google
2. Acceso a Google Cloud Console
3. Una hoja de cálculo de Google Sheets creada

## Configuración de Google Cloud

1. Accede a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets para tu proyecto
   - Ve a "APIs y Servicios" > "Biblioteca"
   - Busca "Google Sheets API" y habilítala
4. Crea una cuenta de servicio
   - Ve a "APIs y Servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "Cuenta de servicio"
   - Completa la información requerida y crea la cuenta
5. Genera una clave para la cuenta de servicio
   - En la lista de cuentas de servicio, haz clic en la cuenta recién creada
   - Ve a la pestaña "Claves"
   - Haz clic en "Agregar clave" > "Crear nueva clave"
   - Selecciona el formato JSON y descarga el archivo

## Configuración de Google Sheets

1. Crea una nueva hoja de cálculo en Google Sheets o utiliza una existente
2. Añade una hoja llamada "Contactos" (o asegúrate de que el nombre coincida con el valor de `SHEET_NAME` en el archivo `lib/googleSheets.ts`)
3. Configura las columnas con los siguientes encabezados:
   - Fecha
   - Email
   - Nombre de Empresa
   - Sección
4. Comparte la hoja de cálculo con la dirección de correo electrónico de la cuenta de servicio que creaste, dándole permisos de edición
5. Copia el ID de la hoja de cálculo (se encuentra en la URL entre `/d/` y `/edit`)

## Configuración del Proyecto

1. Actualiza el archivo `.env` con los siguientes valores:

```
GOOGLE_SHEET_ID="tu_id_de_hoja_de_calculo"
GOOGLE_PRIVATE_KEY_ID="tu_private_key_id"
GOOGLE_PRIVATE_KEY="tu_private_key"
GOOGLE_CLIENT_EMAIL="tu_client_email@tu_proyecto.iam.gserviceaccount.com"
GOOGLE_CLIENT_ID="tu_client_id"
GOOGLE_CERT_URL="https://www.googleapis.com/robot/v1/metadata/x509/tu_client_email%40tu_proyecto.iam.gserviceaccount.com"
```

Reemplaza los valores con la información de tu cuenta de servicio y hoja de cálculo.

**Nota importante sobre GOOGLE_PRIVATE_KEY**: Este valor debe incluir las comillas y los saltos de línea. Por ejemplo:

```
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSj...\n-----END PRIVATE KEY-----\n"
```

## Verificación

Para verificar que la integración funciona correctamente:

1. Inicia el servidor de desarrollo con `npm run dev`
2. Completa y envía el formulario de contacto en la página del sector legal
3. Verifica que los datos aparezcan en tu hoja de cálculo de Google Sheets

## Solución de Problemas

Si encuentras problemas con la integración:

1. Verifica los registros de la consola del servidor para ver mensajes de error detallados
2. Asegúrate de que la cuenta de servicio tenga permisos de edición en la hoja de cálculo
3. Comprueba que los valores en el archivo `.env` sean correctos y estén formateados adecuadamente
4. Verifica que la API de Google Sheets esté habilitada en tu proyecto de Google Cloud