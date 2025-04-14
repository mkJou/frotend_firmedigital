'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const loaderRef = useRef(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete
        });
      }
    });

    // Animación de la barra de progreso
    tl.to(progressBarRef.current, {
      width: '100vw',
      duration: 0.5,
      ease: 'linear',
      backgroundPosition: '200% center',
      backgroundSize: '200% auto',
      repeat: -1,
      yoyo: true
    }, 0);
  }, [onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
      <div className="fixed top-0 w-full h-2 bg-gray-800 overflow-hidden">
        <div 
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          style={{ width: '0%', background: 'linear-gradient(270deg, #6ee7b7, #3b82f6, #8b5cf6)', backgroundSize: '400% 400%' }}
        />
      </div>
      <div className="relative w-60 h-60 mb-8">
        <Image
          src="/images/logo.webp"
          alt="Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Loader;
