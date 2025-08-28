import React, { useEffect, useState, useId } from 'react';
import styles from '../app/styles/Signature.module.css';

interface SignatureProps {
  width?: number;
  height?: number;
  color?: 'green' | 'blue' | 'purple' | 'gold';
  autoPlay?: boolean;
  delay?: number;
  className?: string;
  showGlow?: boolean;
}

const Signature: React.FC<SignatureProps> = ({
  width = 300,
  height = 60,
  color = 'green',
  autoPlay = true,
  delay = 0,
  className = '',
  showGlow = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientId = useId().replace(/:/g, '-');

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, delay]);

  const getColorClass = () => {
    switch (color) {
      case 'blue': return styles.signatureBlue;
      case 'purple': return styles.signaturePurple;
      case 'gold': return styles.signatureGold;
      default: return styles.signatureGreen;
    }
  };

  const getStrokeColor = () => {
    switch (color) {
      case 'blue': return '#60a5fa';
      case 'purple': return '#a78bfa';
      case 'gold': return '#fbbf24';
      default: return '#4ade80';
    }
  };

  return (
    <div 
      className={`${styles.signatureContainer} ${styles.fadeIn} ${className}`}
      style={{ width, height }}
    >
      <svg
        viewBox="0 0 300 60"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${styles.signaturePath} ${styles.penEffect} ${showGlow ? styles.glowEffect : ''} ${getColorClass()}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="300" y2="0">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        {/* Trazo principal de la firma corrida */}
        <path
          d="M18,44 C28,18 50,18 62,34 C68,46 74,24 88,30 C104,36 116,52 126,44 C136,38 146,18 164,34 C174,46 184,24 198,30 C212,36 224,52 234,44 C244,38 254,18 268,34 C278,46 288,24 292,30"
          strokeDasharray="800"
          strokeDashoffset={isAnimating ? "0" : "800"}
          className={isAnimating ? styles.animateSignature : ''}
          style={{ 
            transition: 'stroke-dashoffset 3s ease-in-out',
            strokeDashoffset: isAnimating ? 0 : 800
          }}
        />
        
        {/* Rúbrica o subrayado decorativo */}
        <path
          d="M36,52 C96,56 205,56 282,50"
          strokeDasharray="400"
          strokeDashoffset={isAnimating ? "0" : "400"}
          strokeWidth="1.6"
          opacity="0.7"
          className={isAnimating ? styles.animateSignatureDelay : ''}
          style={{ 
            transition: 'stroke-dashoffset 2s ease-in-out 1s',
            strokeDashoffset: isAnimating ? 0 : 400
          }}
        />
        
        {/* Flourish adicional para dar volumen caligráfico */}
        <path
          d="M84,46 C110,36 138,40 162,46"
          strokeDasharray="200"
          strokeDashoffset={isAnimating ? "0" : "200"}
          strokeWidth="1.2"
          opacity="0.6"
          className={isAnimating ? styles.animateSignatureDelay : ''}
          style={{ 
            transition: 'stroke-dashoffset 1.6s ease-in-out 1.2s',
            strokeDashoffset: isAnimating ? 0 : 200
          }}
        />
        
        {/* Punto final elegante */}
        <circle
          cx="290"
          cy="30"
          r="1.5"
          fill={getStrokeColor()}
          opacity={isAnimating ? "1" : "0"}
          style={{ 
            transition: 'opacity 0.5s ease-in-out 2.8s',
            opacity: isAnimating ? 1 : 0
          }}
        />
      </svg>
    </div>
  );
};

export default Signature;
