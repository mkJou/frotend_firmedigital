import type { Metadata } from 'next';
import MegaMenu from '@/components/MegaMenu';

export const metadata: Metadata = {
  title: 'Política de Privacidad | FIRMEDIGITAL',
  description: 'Conoce nuestra política de privacidad conforme a la legislación venezolana y los lineamientos de SUSCERTE. FIRMEDIGITAL protege tus datos personales según la Ley de Protección de Datos Personales de Venezuela.',
  keywords: 'política privacidad, SUSCERTE, protección datos Venezuela, FIRMEDIGITAL, certificados digitales, ley protección datos',
  openGraph: {
    title: 'Política de Privacidad | FIRMEDIGITAL',
    description: 'Política de privacidad conforme a la legislación venezolana y lineamientos de SUSCERTE para la protección de datos personales.',
    type: 'website',
  },
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <MegaMenu />
      
      {/* Hero Section */}
      <div className="relative pt-[200px] pb-[100px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-500/20 rounded-full mix-blend-normal filter blur-[100px] animate-pulse" />
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-purple-400 text-transparent bg-clip-text drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Política de Privacidad
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprometidos con la protección de tus datos y la transparencia en nuestros servicios
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Política de Privacidad */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 border-b-2 border-blue-600 pb-3 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text text-center">
            Política de Privacidad de FIRMEDIGITAL
          </h2>
          
          <div className="mb-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30 backdrop-blur-sm">
            <p className="text-gray-300">
              <strong className="text-white">Fecha de entrada en vigor:</strong> 01 de enero de 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-300 space-y-6">
            <p>
              FIRMEDIGITAL (&quot;nosotros&quot;, &quot;nuestro&quot;, &quot;la empresa&quot;), inscrita en el Registro Mercantil de Venezuela bajo el RIF J-50541585-9, opera el sitio web 
              <strong className="text-white"> www.firmedigital.com</strong> (en adelante, el &quot;Servicio&quot;). Esta política describe cómo 
              recopilamos, utilizamos y protegemos su información personal de acuerdo con la <strong className="text-blue-400">Ley de Protección de Datos Personales de Venezuela (2013)</strong> y los lineamientos de <strong className="text-blue-400">SUSCERTE</strong> (Superintendencia de Servicios de Certificación Electrónica). Al acceder o utilizar el Servicio, usted acepta las prácticas descritas en esta política.
            </p>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">1. Información Recopilada</h3>
              <p>Recopilamos los siguientes tipos de información:</p>
              
              <div className="ml-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">Datos personales:</h4>
                  <p>Nombre, cédula de identidad, dirección de correo electrónico, número de teléfono, dirección física y otros datos necesarios para brindarle el Servicio, conforme a los requisitos legales venezolanos.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-400">Datos de uso:</h4>
                  <p>Dirección IP, tipo de navegador, páginas visitadas y tiempo de acceso, para mejorar la experiencia del usuario y garantizar la seguridad del Servicio.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-400">Cookies:</h4>
                  <p>Utilizamos cookies técnicas (sesiones, preferencias) y de seguridad, alineadas con los estándares de SUSCERTE. Puede desactivarlas en su navegador, pero esto podría limitar funcionalidades esenciales.</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30 backdrop-blur-sm">
                <h4 className="font-semibold text-yellow-400 mb-2">Aviso importante:</h4>
                <p className="font-semibold text-white">
                  FIRMEDIGITAL no almacena los certificados digitales generados para los clientes, en cumplimiento del <strong className="text-yellow-400">Artículo 28 de la Ley de Mensajes de Datos y Firmas Electrónicas</strong>. Estos son procesados en tiempo real y eliminados automáticamente al finalizar la sesión.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">2. Uso de los Datos</h3>
              <p>Utilizamos su información para:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Generar y validar certificados digitales según los estándares de SUSCERTE.</li>
                <li>Cumplir con obligaciones legales (ej. facturación electrónica, normativas tributarias venezolanas).</li>
                <li>Brindar soporte técnico y notificar actualizaciones del Servicio.</li>
                <li>Enviar comunicaciones promocionales (solo si usted otorga consentimiento expreso).</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">3. Compartir Datos</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400">Proveedores de servicios:</h4>
                  <p>Terceros contratados para operar el Servicio (ej. hosting en Venezuela) bajo acuerdos que garantizan la confidencialidad, según el <strong className="text-blue-400">Artículo 12 de la Ley de Protección de Datos Personales</strong>.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400">Autoridades competentes:</h4>
                  <p>Divulgaremos datos si es requerido por órganos venezolanos (ej. SENIAT, SUSCERTE) o para proteger derechos legales de la empresa.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">4. Seguridad</h3>
              <p>
                Implementamos medidas técnicas (encriptación, firewalls) y organizativas (accesos restringidos) para proteger sus datos, siguiendo los <strong className="text-blue-400">estándares de seguridad de SUSCERTE</strong>. Sin embargo, ningún método electrónico es infalible.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">5. Derechos del Usuario</h3>
              <p>De acuerdo con la legislación venezolana, usted puede:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Acceder, rectificar o eliminar sus datos personales.</li>
                <li>Revocar su consentimiento para el tratamiento de datos (contactándonos a <a href="mailto:info@firmedigital.com" className="text-blue-400 hover:text-blue-300 transition-colors">info@firmedigital.com</a>).</li>
                <li>Solicitar prueba de la destrucción de sus datos, cuando aplique.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">6. Enlaces a Terceros</h3>
              <p>
                No somos responsables por los sitios externos vinculados en nuestro Servicio. Recomendamos revisar sus políticas de privacidad.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">7. Menores de Edad</h3>
              <p>
                El Servicio está dirigido exclusivamente a mayores de 18 años. Si detectamos datos de menores, los eliminaremos inmediatamente.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">8. Cambios en la Política</h3>
              <p>Notificaremos cambios mediante:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Correo electrónico registrado.</li>
                <li>Aviso destacado en nuestro sitio web por 15 días continuos, según el <strong className="text-blue-400">Artículo 10 de la Ley de Mensajes de Datos</strong>.</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30 backdrop-blur-sm">
              <p>
                <strong className="text-white">Contacto:</strong> Para ejercer sus derechos o consultas, escriba a <a href="mailto:info@firmedigital.com" className="text-blue-400 hover:text-blue-300 transition-colors">info@firmedigital.com</a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
