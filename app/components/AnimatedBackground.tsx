'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar el canvas para pantalla completa
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear partículas
    const particles: Particle[] = [];
    const particleCount = 20; // Reducido de 50 a 30 para mejorar rendimiento

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.25, // Tamaño reducido para mejor rendimiento
        speedX: Math.random() * 1 - 0.5, // Velocidad reducida
        speedY: Math.random() * 1 - 0.5, // Velocidad reducida
        opacity: Math.random() * 0.4 + 0.1 // Opacidad reducida
      });
    }

    // Variables para throttling
    let lastConnectionsUpdate = 0;
    const connectionsUpdateInterval = 20; // Actualizar conexiones cada 50ms
    
    // Animar partículas
    const animate = () => {
      const now = Date.now();
      const shouldUpdateConnections = now - lastConnectionsUpdate > connectionsUpdateInterval;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar posiciones y dibujar partículas
      particles.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Rebote en los bordes
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(66, 153, 225, ${particle.opacity})`;
        ctx.fill();
        
        // Solo actualizar conexiones según el intervalo de throttling
        if (shouldUpdateConnections) {
          // Conectar partículas cercanas - optimizado para reducir cálculos
          for (let j = index + 1; j < particles.length; j++) {
            const particle2 = particles[j];
            const dx = particle.x - particle2.x;
            const dy = particle.y - particle2.y;
            // Usar distancia al cuadrado para evitar cálculo de raíz cuadrada
            const distanceSquared = dx * dx + dy * dy;
            
            if (distanceSquared < 22500) { // 150^2 = 22500
              const distance = Math.sqrt(distanceSquared);
              ctx.beginPath();
              ctx.strokeStyle = `rgba(66, 153, 225, ${0.15 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5; // Línea más delgada
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.stroke();
            }
          }
        }
      });
      
      if (shouldUpdateConnections) {
        lastConnectionsUpdate = now;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;
