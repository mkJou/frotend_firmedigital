'use client';

import { useState, useEffect } from 'react';
import Loader from './Loader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reducir aún más el tiempo mínimo de carga
    const minLoadTime = 500; // Reducido a 0.5 segundos
    const startTime = Date.now();

    const handleComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setLoading(false);
      }, remainingTime);
    };

    // Iniciar carga de recursos
    Promise.all([
      // Aquí puedes agregar promesas de precarga de recursos si es necesario
      new Promise(resolve => setTimeout(resolve, minLoadTime))
    ]).then(handleComplete);
  }, []);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
