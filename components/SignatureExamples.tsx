import React, { useState } from 'react';
import Signature from './Signature';

const SignatureExamples: React.FC = () => {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  const handleReplay = () => {
    setTriggerAnimation(false);
    setTimeout(() => setTriggerAnimation(true), 100);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Ejemplos de Firmas Animadas
        </h1>

        {/* Firma básica */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Firma Básica (Verde)</h2>
          <div className="bg-white p-4 rounded">
            <Signature />
          </div>
        </div>

        {/* Diferentes colores */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Diferentes Colores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Azul</p>
              <Signature color="blue" delay={0} />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Púrpura</p>
              <Signature color="purple" delay={500} />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Dorado</p>
              <Signature color="gold" delay={1000} />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Verde con resplandor</p>
              <Signature color="green" showGlow={true} delay={1500} />
            </div>
          </div>
        </div>

        {/* Diferentes tamaños */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Diferentes Tamaños</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Pequeña (200x40)</p>
              <Signature width={200} height={40} color="blue" />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Mediana (300x60) - Por defecto</p>
              <Signature color="purple" />
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-gray-700 mb-2">Grande (400x80)</p>
              <Signature width={400} height={80} color="gold" />
            </div>
          </div>
        </div>

        {/* Firma en fondo oscuro */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">En Fondo Oscuro</h2>
          <div className="bg-gray-900 p-6 rounded border border-gray-700">
            <div className="text-center mb-4">
              <p className="text-gray-300 mb-2">Atentamente,</p>
              <Signature color="green" showGlow={true} />
              <p className="text-gray-400 mt-2 text-sm">FIRMEDIGITAL</p>
            </div>
          </div>
        </div>

        {/* Control manual */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Control Manual</h2>
          <div className="bg-white p-4 rounded">
            <button
              onClick={handleReplay}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Reproducir Animación
            </button>
            <Signature  
              color="blue" 
              key={triggerAnimation ? 'animate' : 'static'}
              autoPlay={triggerAnimation}
            />
          </div>
        </div>

        {/* Uso en documentos */}
        <div className="mb-12 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Uso en Documentos</h2>
          <div className="bg-white p-8 rounded shadow-lg">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contrato de Servicios Digitales</h3>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>Por medio del presente documento, FIRMEDIGITAL se compromete a proporcionar servicios de firma electrónica de alta calidad...</p>
                <p>Los términos y condiciones establecidos en este contrato son vinculantes para ambas partes...</p>
                <p>Este documento ha sido firmado electrónicamente y tiene plena validez legal.</p>
              </div>
              
              <div className="border-t pt-6 mt-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Firmado digitalmente por:</p>
                    <Signature color="blue" width={250} height={50} />
                    <p className="text-sm text-gray-800 font-semibold mt-2">FIRMEDIGITAL</p>
                    <p className="text-xs text-gray-500">Certificado Digital SUSCERTE</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Fecha: {new Date().toLocaleDateString('es-ES')}</p>
                    <p>Hora: {new Date().toLocaleTimeString('es-ES')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Código de ejemplo */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Código de Ejemplo</h2>
          <div className="bg-gray-900 p-4 rounded overflow-x-auto">
            <pre className="text-green-400 text-sm">
{`import Signature from '@/components/Signature';

// Uso básico
<Signature />

// Con opciones personalizadas
<Signature 
  width={400} 
  height={80} 
  color="blue" 
  showGlow={true}
  delay={1000}
/>

// Sin reproducción automática
<Signature autoPlay={false} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureExamples;
